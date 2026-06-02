"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { electionSteps } from "@/lib/election-data";
import { ChevronRight, Check, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function JourneyPage() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(1);

  const activeStepData = activeStep !== null ? electionSteps.find((s) => s.id === activeStep) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("journey.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {t("journey.subtitle")}
        </p>
      </motion.div>

      {/* Mobile Horizontal Steps Navigation */}
      <div className="lg:hidden mb-6 overflow-x-auto -mx-4 px-4 pb-2 scrollbar-none flex gap-3 snap-x">
        {electionSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`snap-center shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
              activeStep === step.id
                ? "bg-blue-600 text-white border-blue-600 shadow-sm scale-105"
                : "bg-card text-muted-foreground border-border hover:bg-accent"
            }`}
          >
            <span className="text-base">{step.icon}</span>
            <span className="whitespace-nowrap">{step.title}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Steps Sidebar (Desktop Only) */}
        <div className="lg:col-span-1 hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("nav.journey")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {electionSteps.map((step, index) => (
                  <div key={step.id}>
                    <button
                      onClick={() => setActiveStep(step.id)}
                      className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-accent ${
                        activeStep === step.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {step.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{step.title}</div>
                        <div className="text-xs text-muted-foreground">{step.duration}</div>
                      </div>
                      {activeStep === step.id ? (
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {index < electionSteps.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeStepData ? (
              <motion.div
                key={activeStepData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{activeStepData.icon}</span>
                      <div>
                        <CardTitle className="text-xl">{activeStepData.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Duration: {activeStepData.duration}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* What Happens */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        {t("journey.whatHappens")}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {activeStepData.details.whatHappens}
                      </p>
                    </div>

                    <Separator />

                    {/* What to Expect */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2">{t("journey.whatToExpect")}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {activeStepData.details.whatToExpect}
                      </p>
                    </div>

                    {/* What to Bring */}
                    {activeStepData.details.whatToBring && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold text-sm mb-2">{t("journey.whatToBring")}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {activeStepData.details.whatToBring}
                          </p>
                        </div>
                      </>
                    )}

                    <Separator />

                    {/* Do's */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        {t("journey.dos")}
                      </h3>
                      <ul className="space-y-1.5">
                        {activeStepData.details.dos.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="shrink-0 mt-0.5 text-[10px] px-1.5 py-0">
                              ✓
                            </Badge>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Don'ts */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <span className="text-red-600 text-sm">✕</span>
                        {t("journey.donts")}
                      </h3>
                      <ul className="space-y-1.5">
                        {activeStepData.details.donts.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Badge variant="destructive" className="shrink-0 mt-0.5 text-[10px] px-1.5 py-0">
                              ✕
                            </Badge>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={activeStep === 1}
                        onClick={() => setActiveStep(activeStep! - 1)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        {t("journey.previous")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={activeStep === electionSteps.length}
                        onClick={() => setActiveStep(activeStep! + 1)}
                      >
                        {t("journey.next")}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card className="flex flex-col items-center justify-center py-20 text-center">
                  <span className="text-5xl mb-4">🗳️</span>
                  <h3 className="text-xl font-semibold mb-2">{t("journey.selectStep")}</h3>
                  <p className="text-muted-foreground max-w-md">
                    {t("journey.selectStepDesc")}
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
