"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { quizQuestions } from "@/lib/election-data";
import {
  RotateCcw,
  ChevronRight,
  Trophy,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function QuizPage() {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSelect = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(index);
      setShowExplanation(true);

      const isCorrect = index === question.correctAnswer;
      if (isCorrect) setScore((prev) => prev + 1);

      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = index;
        return newAnswers;
      });
    },
    [selectedAnswer, question.correctAnswer, currentQuestion]
  );

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setQuizComplete(false);
  };

  const scorePercentage = Math.round((score / quizQuestions.length) * 100);

  const getScoreMessage = () => {
    if (scorePercentage >= 90) return { text: "Election Expert! 🏆", color: "text-yellow-600" };
    if (scorePercentage >= 70) return { text: "Well Informed! 🌟", color: "text-green-600" };
    if (scorePercentage >= 50) return { text: "Good Start! 👍", color: "text-blue-600" };
    return { text: "Keep Learning! 📚", color: "text-orange-600" };
  };

  if (quizComplete) {
    const msg = getScoreMessage();
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-6">
                <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
                <h2 className="text-2xl font-bold">{t("quiz.complete")}</h2>
                <div className={`text-xl font-semibold ${msg.color}`}>{msg.text}</div>

                {/* Score Circle */}
                <div className="relative mx-auto w-32 h-32">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      className="fill-none stroke-muted stroke-8"
                    />
                    <circle
                      cx="50" cy="50" r="40"
                      className="fill-none stroke-blue-600 stroke-8"
                      strokeDasharray={`${scorePercentage * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{score}/{quizQuestions.length}</span>
                    <span className="text-xs text-muted-foreground">{t("quiz.correct")}</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Election Literacy Score: {scorePercentage}%
                </div>

                <Separator />

                {/* Answer Review */}
                <div className="text-left space-y-3">
                  <h3 className="font-semibold text-sm">{t("quiz.review")}</h3>
                  {quizQuestions.map((q, i) => (
                    <div key={q.id} className="flex items-start gap-2 text-sm">
                      {answers[i] === q.correctAnswer ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <span className="font-medium">{q.question}</span>
                        {answers[i] !== q.correctAnswer && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {t("quiz.correctAnswer")} {q.options[q.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={handleRestart} className="gap-2 mt-4">
                  <RotateCcw className="h-4 w-4" />
                  {t("quiz.tryAgain")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("quiz.title")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {t("quiz.subtitle")}
        </p>
      </motion.div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            {t("eligibility.question")} {currentQuestion + 1} {t("eligibility.of")} {quizQuestions.length}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            {t("quiz.score")}: {score}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-relaxed">
                  {question.question}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={
                    question.difficulty === "easy"
                      ? "bg-green-50 text-green-700 shrink-0"
                      : question.difficulty === "medium"
                      ? "bg-yellow-50 text-yellow-700 shrink-0"
                      : "bg-red-50 text-red-700 shrink-0"
                  }
                >
                  {question.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correctAnswer;
                  const showResult = selectedAnswer !== null;

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full flex items-center gap-3 rounded-lg border p-4 text-left text-sm transition-all ${
                        !showResult
                          ? "hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer"
                          : isCorrect
                          ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                          : isSelected && !isCorrect
                          ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                          : "opacity-50"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${
                          showResult && isCorrect
                            ? "border-green-500 bg-green-500 text-white"
                            : showResult && isSelected && !isCorrect
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-border"
                        }`}
                      >
                        {showResult && isCorrect ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : showResult && isSelected && !isCorrect ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-lg bg-muted p-4"
                >
                  <p className="text-sm font-medium mb-1">
                    {selectedAnswer === question.correctAnswer ? (
                      <span className="text-green-600">✅ Correct!</span>
                    ) : (
                      <span className="text-red-600">❌ Incorrect</span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </motion.div>
              )}

              {/* Next Button */}
              {showExplanation && (
                <Button onClick={handleNext} className="w-full gap-2">
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>
                      {t("quiz.nextQuestion")}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    t("quiz.seeResults")
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
