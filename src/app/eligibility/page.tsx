"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { eligibilityQuestions } from "@/lib/election-data";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

type ResultType = "eligible" | "not-eligible" | "needs-registration" | "needs-id";

export default function EligibilityPage() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<ResultType | null>(null);

  const question = eligibilityQuestions[currentStep];

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    const answer = answers[question.id];
    if (!answer) return;

    const nextStepId = question.nextStep(answer);
    if (nextStepId === null) {
      // Evaluate result
      if (answers[1] === "18orAbove" && answers[2] === "yes" && answers[4] === "yes") {
        setResult("eligible");
      } else if (answers[4] === "no") {
        setResult("needs-id");
      } else {
        setResult("needs-registration");
      }
    } else if (nextStepId >= 100) {
      // Error results
      setResult(nextStepId === 100 ? "not-eligible" : "not-eligible");
    } else {
      setCurrentStep(nextStepId - 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const selectedValue = answers[question?.id] || "";
  const progress = ((currentStep + 1) / eligibilityQuestions.length) * 100;

  const resultConfig = {
    eligible: {
      icon: <CheckCircle className="h-16 w-16 text-green-600" />,
      title: "You Appear Eligible to Vote! 🎉",
      description: "Based on your answers, you meet the basic eligibility criteria for voting.",
      steps: [
        "Register as a voter at your nearest ERO office or online at nvsp.in",
        "Keep your photo ID (Aadhaar, Passport, etc.) ready",
        "Complete registration before the deadline",
        "Your name will appear on the electoral roll once verified",
      ],
      color: "green",
    },
    "needs-registration": {
      icon: <CheckCircle className="h-16 w-16 text-blue-600" />,
      title: "You May Be Eligible! 📋",
      description: "You appear to meet some criteria. Complete registration to confirm your eligibility.",
      steps: [
        "Visit nvsp.in or your local ERO office",
        "Fill out Form 6 for voter registration",
        "Submit required documents (proof of age, residence, photo ID)",
        "Wait for verification (typically 1-2 weeks)",
        "Check your name on the electoral roll",
      ],
      color: "blue",
    },
    "needs-id": {
      icon: <XCircle className="h-16 w-16 text-yellow-600" />,
      title: "Get Your Photo ID First 🪪",
      description: "You need a valid photo ID document to register as a voter.",
      steps: [
        "Apply for an Aadhaar card at your nearest Aadhaar center",
        "Or get a passport from the Passport Office",
        "Or obtain a PAN card from NSDL/UTIITSL",
        "Once you have a valid ID, you can register to vote",
      ],
      color: "yellow",
    },
    "not-eligible": {
      icon: <XCircle className="h-16 w-16 text-red-600" />,
      title: "Not Eligible Yet",
      description: "Based on your answers, you don't currently meet the eligibility criteria.",
      steps: [
        "Make sure you are 18 years or older",
        "You must be an Indian citizen",
        "Residency in the constituency is required",
        "You can still learn about elections through our other features!",
      ],
      color: "red",
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("eligibility.title")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {t("eligibility.subtitle")}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card>
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-4">
                  {resultConfig[result].icon}
                  <h2 className="text-2xl font-bold">{resultConfig[result].title}</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {resultConfig[result].description}
                  </p>
                  <div className="bg-muted rounded-lg p-6 mt-6 text-left max-w-md mx-auto">
                    <h3 className="font-semibold text-sm mb-3">Next Steps:</h3>
                    <ol className="space-y-2">
                      {resultConfig[result].steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Badge
                            variant="outline"
                            className="shrink-0 mt-0.5 text-[10px] px-1.5 py-0"
                          >
                            {i + 1}
                          </Badge>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <Button onClick={handleReset} variant="outline" className="mt-6 gap-2">
                    <RotateCcw className="h-4 w-4" />
                    {t("eligibility.startOver")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>
                  {t("eligibility.question")} {currentStep + 1} {t("eligibility.of")} {eligibilityQuestions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{question.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={selectedValue}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors cursor-pointer hover:bg-accent ${
                        selectedValue === option.value ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : ""
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer flex-1">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between">
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
                    disabled={!selectedValue}
                    className="gap-2"
                  >
                    {currentStep === eligibilityQuestions.length - 1 ? t("eligibility.check") : t("eligibility.next")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
