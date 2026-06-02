"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/lib/language-context";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Vote,
  FileText,
  Search,
  Megaphone,
  Hash,
  Sparkles,
} from "lucide-react";

interface SimulationStep {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  action?: {
    type: "input" | "select" | "confirm";
    options?: { value: string; label: string }[];
    placeholder?: string;
    label?: string;
  };
  doTip: string;
  dontTip: string;
}

const simulationSteps: SimulationStep[] = [
  {
    id: 1,
    title: "Voter Registration",
    icon: <FileText className="h-6 w-6" />,
    description: "Register yourself as a voter in your constituency.",
    details:
      "To vote in India, you must first register as a voter. This involves filling out Form 6 either online at nvsp.in or at your local Electoral Registration Officer (ERO) office.",
    action: {
      type: "input",
      label: "Enter your constituency name",
      placeholder: "e.g., Mumbai South",
    },
    doTip: "Register well before elections — at least a few months in advance.",
    dontTip: "Don't wait until the last minute to register.",
  },
  {
    id: 2,
    title: "Verification",
    icon: <Search className="h-6 w-6" />,
    description: "Your application is verified by election officials.",
    details:
      "After submitting your registration, the Electoral Registration Officer verifies your application. Field verification may be conducted to confirm your residence and identity.",
    action: {
      type: "confirm",
    },
    doTip: "Keep your application reference number safe.",
    dontTip: "Don't ignore requests for additional documents.",
  },
  {
    id: 3,
    title: "Review Candidates",
    icon: <Search className="h-6 w-6" />,
    description: "Research and review the candidates in your constituency.",
    details:
      "Before voting, it's important to know who the candidates are. Review their backgrounds, track records, and manifestos. Check their filed affidavits for criminal cases and assets.",
    action: {
      type: "select",
      label: "What factor matters most to you?",
      options: [
        { value: "education", label: "Education & Qualifications" },
        { value: "track", label: "Past Track Record" },
        { value: "manifesto", label: "Election Manifesto" },
        { value: "clean", label: "Clean Criminal Record" },
      ],
    },
    doTip: "Research candidates from multiple sources.",
    dontTip: "Don't rely solely on party affiliation.",
  },
  {
    id: 4,
    title: "Campaign Period",
    icon: <Megaphone className="h-6 w-6" />,
    description: "The campaign period begins — stay informed!",
    details:
      "Political parties and candidates conduct rallies, door-to-door campaigns, and social media outreach. The Model Code of Conduct comes into effect. Use this time to make an informed decision.",
    action: {
      type: "confirm",
    },
    doTip: "Fact-check claims made during campaigns.",
    dontTip: "Don't share unverified political content.",
  },
  {
    id: 5,
    title: "Voting Day",
    icon: <Vote className="h-6 w-6" />,
    description: "The day you cast your vote!",
    details:
      "Polling stations are open from 7 AM to 6 PM. Bring your Voter ID (EPIC) or any valid photo ID. You'll go through identity verification, get your finger inked, and press the button on the EVM.",
    action: {
      type: "select",
      label: "Which time will you go to vote?",
      options: [
        { value: "early", label: "Early Morning (7-9 AM)" },
        { value: "mid", label: "Mid-Morning (9 AM-12 PM)" },
        { value: "afternoon", label: "Afternoon (12-3 PM)" },
        { value: "late", label: "Late Afternoon (3-6 PM)" },
      ],
    },
    doTip: "Vote during off-peak hours to avoid long queues.",
    dontTip: "Don't carry campaign materials to the booth.",
  },
  {
    id: 6,
    title: "Vote Counting",
    icon: <Hash className="h-6 w-6" />,
    description: "Votes are counted and tallied at counting centers.",
    details:
      "Counting begins at designated centers under strict security. EVMs are opened in the presence of candidates, their agents, and election officials. Results are declared as counting progresses.",
    action: {
      type: "confirm",
    },
    doTip: "Follow official results from the ECI website.",
    dontTip: "Don't spread unverified result claims.",
  },
  {
    id: 7,
    title: "Results",
    icon: <Trophy className="h-6 w-6" />,
    description: "Election results are declared!",
    details:
      "The Election Commission officially declares results. The winning candidate is announced, and the party or coalition with a majority forms the government. The President invites the leader to form the government.",
    action: {
      type: "confirm",
    },
    doTip: "Respect the mandate of the people.",
    dontTip: "Don't engage in post-result unrest.",
  },
];

export default function SimulationPage() {
  const { t } = useLanguage();
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [constituency, setConstituency] = useState("");
  const [completed, setCompleted] = useState(false);

  const step = simulationSteps[currentStep];
  const progress = ((currentStep + 1) / simulationSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < simulationSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentStep(0);
    setAnswers({});
    setConstituency("");
    setCompleted(false);
  };

  const canProceed = () => {
    if (!step.action) return true;
    if (step.action.type === "confirm") return true;
    if (step.action.type === "input") return constituency.trim().length > 0;
    if (step.action.type === "select") return !!answers[step.id];
    return true;
  };

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-1.5 text-sm font-medium backdrop-blur-sm dark:bg-gray-800/60">
            <Sparkles className="h-4 w-4 text-blue-600" />
            {t("feature.simulation")}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("simulation.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t("simulation.subtitle")}
          </p>

          <Card className="mt-10 max-w-lg mx-auto text-left">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold">What you&apos;ll experience:</h3>
              <ul className="space-y-2">
                {simulationSteps.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                    {s.title}
                  </li>
                ))}
              </ul>
              <Button onClick={() => setStarted(true)} className="w-full gap-2 mt-4">
                {t("simulation.start")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-6">
                <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
                <h2 className="text-2xl font-bold">{t("simulation.complete")}</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {t("simulation.completeDesc")}
                </p>

                <Card className="max-w-md mx-auto text-left">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Journey Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Constituency: <strong>{constituency}</strong></span>
                    </div>
                    {simulationSteps.map((s) => (
                      <div key={s.id} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                        <span>{s.title} — Completed ✓</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="bg-muted rounded-lg p-4 max-w-md mx-auto text-left">
                  <p className="text-sm font-medium mb-2">🎓 Key Takeaways:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Register early — don&apos;t wait for deadlines</li>
                    <li>• Research candidates before voting day</li>
                    <li>• Carry valid photo ID to the polling station</li>
                    <li>• Voting is your constitutional right — exercise it!</li>
                  </ul>
                </div>

                <Button onClick={handleRestart} variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  {t("simulation.restart")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("simulation.title")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {t("simulation.subtitle")}
        </p>
      </motion.div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            {t("simulation.step")} {currentStep + 1} {t("simulation.of")} {simulationSteps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  {step.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t("simulation.step")} {step.id} {t("simulation.of")} {simulationSteps.length}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.details}
                </p>
              </div>

              {/* Action */}
              {step.action && (
                <div className="border rounded-lg p-4 space-y-3">
                  <Label className="text-sm font-medium">
                    {step.action.label}
                  </Label>
                  {step.action.type === "input" && (
                    <Input
                      value={constituency}
                      onChange={(e) => setConstituency(e.target.value)}
                      placeholder={step.action.placeholder}
                      className="text-sm"
                    />
                  )}
                  {step.action.type === "select" && step.action.options && (
                    <RadioGroup
                      value={answers[step.id] || ""}
                      onValueChange={(val: string) =>
                        setAnswers((prev) => ({ ...prev, [step.id]: val }))
                      }
                      className="space-y-2"
                    >
                      {step.action.options.map((opt) => (
                        <div
                          key={opt.value}
                          className={`flex items-center space-x-3 rounded-lg border p-3 transition-colors cursor-pointer hover:bg-accent ${
                            answers[step.id] === opt.value
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                              : ""
                          }`}
                        >
                          <RadioGroupItem value={opt.value} id={opt.value} />
                          <Label htmlFor={opt.value} className="cursor-pointer text-sm">
                            {opt.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {step.action.type === "confirm" && (
                    <p className="text-sm text-muted-foreground">
                      ✅ You&apos;ve completed this step. Click &quot;Continue&quot; to proceed.
                    </p>
                  )}
                </div>
              )}

              {/* Tips */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 border border-green-200 dark:border-green-800">
                  <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">
                    ✅ Do&apos;s
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-500">
                    {step.doTip}
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-3 border border-red-200 dark:border-red-800">
                  <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">
                    ❌ Don&apos;ts
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-500">
                    {step.dontTip}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("eligibility.back")}
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="gap-2"
                >
                  {currentStep === simulationSteps.length - 1 ? t("simulation.finish") : t("simulation.continue")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
