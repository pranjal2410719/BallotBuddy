"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { electionMyths } from "@/lib/election-data";
import { RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";

export default function MythsPage() {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleCard = (id: number) => {
    setRevealedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const revealAll = () => {
    if (showAll) {
      setRevealedCards(new Set());
      setShowAll(false);
    } else {
      setRevealedCards(new Set(electionMyths.map((_, i) => i)));
      setShowAll(true);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          🔍 Election Myth Buster
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Don&apos;t fall for misinformation! Tap each card to reveal the truth behind
          common election myths.
        </p>
        <Button
          onClick={revealAll}
          variant="outline"
          className="mt-6 gap-2"
        >
          {showAll ? (
            <>
              <RotateCcw className="h-4 w-4" />
              Hide All Facts
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              Reveal All Facts
            </>
          )}
        </Button>
      </motion.div>

      {/* Myth Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {electionMyths.map((myth, index) => {
          const isRevealed = revealedCards.has(index);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleCard(index)}
                className="w-full text-left"
              >
                <Card
                  className={`h-full transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    isRevealed
                      ? "border-green-200 dark:border-green-800"
                      : "border-red-200 dark:border-red-800 hover:border-red-300"
                  }`}
                >
                  <CardContent className="pt-6 pb-6">
                    {/* Myth Side */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 mb-2"
                        >
                          ❌ Myth
                        </Badge>
                        <p className="font-semibold text-sm leading-relaxed">
                          &ldquo;{myth.myth}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Fact Side (revealed) */}
                    <AnimatePresence>
                      {isRevealed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t pt-4 mt-2">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 mb-2"
                                >
                                  ✅ Fact
                                </Badge>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  {myth.fact}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tap hint */}
                    {!isRevealed && (
                      <p className="text-xs text-muted-foreground mt-4 text-center">
                        👆 Tap to reveal the truth
                      </p>
                    )}
                  </CardContent>
                </Card>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-semibold">
                {revealedCards.size} of {electionMyths.length} myths busted
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden max-w-xs mx-auto">
              <motion.div
                className="h-full bg-green-600 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(revealedCards.size / electionMyths.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
