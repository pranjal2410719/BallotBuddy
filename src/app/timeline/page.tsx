"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { timelineEvents } from "@/lib/election-data";
import {
  Calendar,
  UserCheck,
  Megaphone,
  Vote,
  Trophy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  registration: <UserCheck className="h-4 w-4" />,
  nomination: <Calendar className="h-4 w-4" />,
  campaign: <Megaphone className="h-4 w-4" />,
  voting: <Vote className="h-4 w-4" />,
  results: <Trophy className="h-4 w-4" />,
};

const categoryColors: Record<string, string> = {
  registration: "bg-blue-100 text-blue-700 border-blue-200",
  nomination: "bg-purple-100 text-purple-700 border-purple-200",
  campaign: "bg-orange-100 text-orange-700 border-orange-200",
  voting: "bg-green-100 text-green-700 border-green-200",
  results: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const categoryDotColors: Record<string, string> = {
  registration: "bg-blue-500",
  nomination: "bg-purple-500",
  campaign: "bg-orange-500",
  voting: "bg-green-500",
  results: "bg-yellow-500",
};

export default function TimelinePage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents =
    filter === "all"
      ? timelineEvents
      : timelineEvents.filter((e) => e.category === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          📅 Election Timeline
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Visualize election stages, deadlines, and important milestones.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="registration">Register</TabsTrigger>
          <TabsTrigger value="nomination">Nominate</TabsTrigger>
          <TabsTrigger value="campaign">Campaign</TabsTrigger>
          <TabsTrigger value="voting">Voting</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Visual Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-0">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16 sm:pl-20"
            >
              {/* Dot */}
              <div className="absolute left-4 sm:left-6 top-6 z-10">
                <div
                  className={`h-4 w-4 rounded-full border-4 border-background ${categoryDotColors[event.category]} ring-2 ring-background`}
                />
              </div>

              {/* Card */}
              <Card className="mb-4 transition-all hover:shadow-md">
                <CardHeader
                  className="cursor-pointer py-4"
                  onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Badge
                        variant="outline"
                        className={`${categoryColors[event.category]} shrink-0`}
                      >
                        <span className="mr-1">{categoryIcons[event.category]}</span>
                        {event.category}
                      </Badge>
                      <div>
                        <CardTitle className="text-base">{event.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {event.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
                      {expandedId === event.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedId === event.id && (
                  <CardContent className="pt-0 pb-4">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-muted-foreground leading-relaxed border-t pt-4"
                    >
                      {event.description}
                    </motion.div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="text-sm">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(categoryDotColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${color}`} />
                <span className="text-sm capitalize text-muted-foreground">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
