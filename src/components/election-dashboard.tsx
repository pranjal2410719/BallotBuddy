"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  voterTurnoutData,
  loksabhaPartyResults,
  voterDemographics,
} from "@/lib/election-data";
import { TrendingUp, PieChart as PieIcon, BarChart3, GitBranch } from "lucide-react";

// --- Custom Tooltip ---
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 shadow-lg p-3 text-sm">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((item, i) => (
        <p key={i} style={{ color: item.color }} className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />
          {item.name}: {item.value.toLocaleString()}M
        </p>
      ))}
    </div>
  );
}

function BarCustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 shadow-lg p-3 text-sm">
      <p className="font-semibold mb-1">{label}</p>
      <p className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: payload[0].color }} />
        {payload[0].value} seats won
      </p>
    </div>
  );
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 shadow-lg p-3 text-sm">
      <p className="font-semibold">{payload[0].name}</p>
      <p className="text-muted-foreground">{payload[0].value}% of voters</p>
    </div>
  );
}

// --- React Flow: Election Process ---
const flowNodes: Node[] = [
  { id: "1", position: { x: 250, y: 0 }, data: { label: "📝 Registration" }, type: "input", style: { background: "#DBEAFE", border: "2px solid #3B82F6", color: "#1E3A8A", borderRadius: "12px", padding: "12px 16px", fontWeight: 600, fontSize: "13px" } },
  { id: "2", position: { x: 250, y: 100 }, data: { label: "🔍 Verification" }, style: { background: "#FEF3C7", border: "2px solid #F59E0B", color: "#78350F", borderRadius: "12px", padding: "12px 16px", fontWeight: 600, fontSize: "13px" } },
  { id: "3", position: { x: 250, y: 200 }, data: { label: "📋 Nomination" }, style: { background: "#F3E8FF", border: "2px solid #8B5CF6", color: "#5B21B6", borderRadius: "12px", padding: "12px 16px", fontWeight: 600, fontSize: "13px" } },
  { id: "4", position: { x: 250, y: 300 }, data: { label: "📢 Campaign" }, style: { background: "#FFE4E6", border: "2px solid #F43F5E", color: "#9F1239", borderRadius: "12px", padding: "12px 16px", fontWeight: 600, fontSize: "13px" } },
  { id: "5", position: { x: 250, y: 400 }, data: { label: "🗳️ Voting Day" }, style: { background: "#D1FAE5", border: "2px solid #10B981", color: "#065F46", borderRadius: "12px", padding: "12px 16px", fontWeight: 600, fontSize: "13px" } },
  { id: "6", position: { x: 250, y: 500 }, data: { label: "🔢 Counting" }, style: { background: "#E0F2FE", border: "2px solid #0EA5E9", color: "#075985", borderRadius: "12px", padding: "12px 16px", fontWeight: 600, fontSize: "13px" } },
  { id: "7", position: { x: 250, y: 600 }, data: { label: "🏆 Results" }, type: "output", style: { background: "#FEF9C3", border: "2px solid #EAB308", color: "#854D0E", borderRadius: "12px", padding: "12px 16px", fontWeight: 600, fontSize: "13px" } },
];

const flowEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#3B82F6", strokeWidth: 2 } },
  { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#F59E0B", strokeWidth: 2 } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#8B5CF6", strokeWidth: 2 } },
  { id: "e4-5", source: "4", target: "5", animated: true, style: { stroke: "#F43F5E", strokeWidth: 2 } },
  { id: "e5-6", source: "5", target: "6", animated: true, style: { stroke: "#10B981", strokeWidth: 2 } },
  { id: "e6-7", source: "6", target: "7", animated: true, style: { stroke: "#0EA5E9", strokeWidth: 2 } },
];

// --- Dashboard Component ---
export function ElectionDashboard() {
  const [activeTab, setActiveTab] = useState("turnout");

  return (
    <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm dark:bg-gray-800/80">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            Election Data Dashboard
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            India&apos;s Electoral Landscape
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore voter turnout trends, party results, and demographics through interactive charts.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto mb-8">
            <TabsTrigger value="turnout" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Voter Turnout</span>
              <span className="sm:hidden">Turnout</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Party Results</span>
              <span className="sm:hidden">Results</span>
            </TabsTrigger>
            <TabsTrigger value="demographics" className="gap-2">
              <PieIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Demographics</span>
              <span className="sm:hidden">Demo</span>
            </TabsTrigger>
            <TabsTrigger value="process" className="gap-2">
              <GitBranch className="h-4 w-4" />
              <span className="hidden sm:inline">Process Flow</span>
              <span className="sm:hidden">Flow</span>
            </TabsTrigger>
          </TabsList>

          {/* Voter Turnout - Line Chart */}
          <TabsContent value="turnout">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Lok Sabha Elections — Voter Turnout Trend (1962–2019)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={voterTurnoutData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="turnout" orientation="left" tick={{ fontSize: 12 }} domain={[50, 75]} label={{ value: "Turnout %", angle: -90, position: "insideLeft", style: { fontSize: 12 } }} />
                        <YAxis yAxisId="voters" orientation="right" tick={{ fontSize: 12 }} label={{ value: "Millions", angle: 90, position: "insideRight", style: { fontSize: 12 } }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line yAxisId="turnout" type="monotone" dataKey="turnout" name="Turnout %" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: "#3B82F6" }} activeDot={{ r: 6 }} />
                        <Line yAxisId="voters" type="monotone" dataKey="voters" name="Voters (M)" stroke="#10B981" strokeWidth={2} dot={{ r: 3, fill: "#10B981" }} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    📊 Voter turnout has steadily increased from 61% in 1962 to 67.4% in 2019, with a significant jump in 2014.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Party Results - Bar Chart */}
          <TabsContent value="results">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                    2024 Lok Sabha — Seats Won by Party
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={loksabhaPartyResults} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} label={{ value: "Seats", angle: -90, position: "insideLeft", style: { fontSize: 12 } }} />
                        <Tooltip content={<BarCustomTooltip />} />
                        <Bar dataKey="seats" name="Seats Won" radius={[6, 6, 0, 0]}>
                          {loksabhaPartyResults.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    🏛️ Total Lok Sabha seats: 543. Majority mark: 272 seats. No single party crossed the majority mark in 2024.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Demographics - Pie Chart */}
          <TabsContent value="demographics">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieIcon className="h-5 w-5 text-purple-600" />
                    Voter Age Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8 sm:grid-cols-2 items-center">
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={voterDemographics}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={3}
                            dataKey="percentage"
                            nameKey="category"
                            label={({ name, value }: { name?: string; value?: number }) => `${name ?? ""}: ${value ?? 0}%`}
                          >
                            {voterDemographics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<PieTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Age Distribution of Indian Voters</h3>
                      <p className="text-sm text-muted-foreground">
                        Young voters (18-35) make up approximately 50% of India&apos;s electorate, making them the most influential demographic bloc.
                      </p>
                      <div className="space-y-3">
                        {voterDemographics.map((demo) => (
                          <div key={demo.category} className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full shrink-0" style={{ background: demo.color }} />
                            <div className="flex-1">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Age {demo.category}</span>
                                <span className="text-muted-foreground">{demo.percentage}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ background: demo.color }}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${demo.percentage}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground text-center">
                    📱 Over 50% of Indian voters are under 35 — the youth vote is shaping Indian democracy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* React Flow - Process */}
          <TabsContent value="process">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-green-600" />
                    Interactive Election Process Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] w-full rounded-lg border bg-white dark:bg-gray-950">
                    <ReactFlow
                      nodes={flowNodes}
                      edges={flowEdges}
                      fitView
                      proOptions={{ hideAttribution: true }}
                      nodesDraggable={false}
                      nodesConnectable={false}
                      preventScrolling={false}
                    >
                      <Background />
                      <Controls />
                    </ReactFlow>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    🔄 Drag to explore the 7-stage election process. Use controls to zoom in/out.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
