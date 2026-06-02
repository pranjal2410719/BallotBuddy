"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/lib/language-context";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Clock,
  FileText,
  MapPin,
  User,
  AlertCircle,
} from "lucide-react";

interface UserProfile {
  name: string;
  age: string;
  state: string;
  registered: string;
  hasId: string;
}

interface RoadmapResult {
  isEligible: boolean;
  isRegistered: boolean;
  hasId: boolean;
  steps: { text: string; done: boolean }[];
  estimatedTime: number;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir",
  "Ladakh", "Chandigarh", "Puducherry", "Andaman & Nicobar",
  "Dadra & Nagar Haveli", "Lakshadweep",
];

function generateRoadmap(profile: UserProfile): RoadmapResult {
  const age = parseInt(profile.age) || 0;
  const isEligible = age >= 18;
  const isRegistered = profile.registered === "yes";
  const hasId = profile.hasId === "yes";

  const steps: { text: string; done: boolean }[] = [];
  let estimatedTime = 0;

  if (!isEligible) {
    steps.push({ text: "Wait until you turn 18 years old", done: false });
    steps.push({ text: "Learn about elections in the meantime", done: false });
    estimatedTime = 0;
  } else {
    steps.push({ text: "Verify your eligibility ✓", done: true });

    if (!hasId) {
      steps.push({ text: "Apply for a valid photo ID (Aadhaar, Passport, PAN)", done: false });
      steps.push({ text: "Visit nearest Aadhaar center / Passport office", done: false });
      steps.push({ text: "Wait for ID to be issued (1-4 weeks)", done: false });
      estimatedTime += 120;
    } else {
      steps.push({ text: "Have valid photo ID ready ✓", done: true });
    }

    if (!isRegistered) {
      steps.push({ text: "Visit nvsp.in or local ERO office", done: false });
      steps.push({ text: "Fill Form 6 for voter registration", done: false });
      steps.push({ text: "Submit documents (age proof, residence proof, photo ID)", done: false });
      steps.push({ text: "Wait for verification (1-2 weeks)", done: false });
      steps.push({ text: "Check name on electoral roll", done: false });
      estimatedTime += 30;
    } else {
      steps.push({ text: "Already registered as a voter ✓", done: true });
    }

    steps.push({ text: "Research candidates in your constituency", done: false });
    steps.push({ text: "Note polling booth location and election date", done: false });
    steps.push({ text: "Carry valid photo ID on voting day", done: false });
    steps.push({ text: "Cast your vote! 🗳️", done: false });
    estimatedTime += 10;
  }

  return { isEligible, isRegistered, hasId, steps, estimatedTime };
}

export default function RoadmapPage() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    state: "",
    registered: "",
    hasId: "",
  });
  const [result, setResult] = useState<RoadmapResult | null>(null);

  const handleGenerate = () => {
    if (!profile.name || !profile.age || !profile.state || !profile.registered || !profile.hasId) return;
    setResult(generateRoadmap(profile));
  };

  const handleReset = () => {
    setProfile({ name: "", age: "", state: "", registered: "", hasId: "" });
    setResult(null);
  };

  const isFormComplete =
    profile.name && profile.age && profile.state && profile.registered && profile.hasId;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("roadmap.title")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {t("roadmap.subtitle")}
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
              <CardContent className="pt-6 space-y-6">
                {/* Profile Summary */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{profile.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Age {profile.age} • {profile.state}
                    </p>
                  </div>
                </div>

                {/* Status Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className={`rounded-lg p-4 text-center border ${
                    result.isEligible
                      ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
                      : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
                  }`}>
                    {result.isEligible ? (
                      <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    ) : (
                      <XCircle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                    )}
                    <p className="text-sm font-medium">{t("roadmap.eligible")}</p>
                    <p className={`text-xs ${result.isEligible ? "text-green-600" : "text-red-600"}`}>
                      {result.isEligible ? "Eligible ✓" : "Not Eligible (Under 18)"}
                    </p>
                  </div>

                  <div className={`rounded-lg p-4 text-center border ${
                    result.isRegistered
                      ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
                      : "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800"
                  }`}>
                    {result.isRegistered ? (
                      <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    ) : (
                      <AlertCircle className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                    )}
                    <p className="text-sm font-medium">{t("roadmap.registration")}</p>
                    <p className={`text-xs ${result.isRegistered ? "text-green-600" : "text-yellow-600"}`}>
                      {result.isRegistered ? "Registered ✓" : "Not Registered"}
                    </p>
                  </div>

                  <div className={`rounded-lg p-4 text-center border ${
                    result.hasId
                      ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
                      : "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800"
                  }`}>
                    {result.hasId ? (
                      <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    ) : (
                      <AlertCircle className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                    )}
                    <p className="text-sm font-medium">Voter ID</p>
                    <p className={`text-xs ${result.hasId ? "text-green-600" : "text-yellow-600"}`}>
                      {result.hasId ? "Have ID ✓" : "Need to Get ID"}
                    </p>
                  </div>
                </div>

                {/* Estimated Time */}
                {result.isEligible && result.estimatedTime > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{t("roadmap.estimated")}: <strong>~{result.estimatedTime} {t("roadmap.minutes")}</strong></span>
                  </div>
                )}

                {/* Steps */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">{t("roadmap.nextSteps")}</h3>
                  <div className="space-y-2">
                    {result.steps.map((step, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 rounded-lg border p-3 ${
                          step.done
                            ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                            : "bg-white dark:bg-gray-950"
                        }`}
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                          {step.done ? "✓" : i + 1}
                        </div>
                        <span className={`text-sm ${step.done ? "text-green-700 dark:text-green-400" : ""}`}>
                          {step.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleReset} variant="outline" className="w-full gap-2">
                  <RotateCcw className="h-4 w-4" />
                  {t("roadmap.reset")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tell Us About Yourself</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("roadmap.name")}
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your name"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t("roadmap.age")}
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min={1}
                    max={120}
                    value={profile.age}
                    onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))}
                    placeholder="Enter your age"
                  />
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t("roadmap.state")}
                  </Label>
                  <select
                    value={profile.state}
                    onChange={(e) => setProfile((p) => ({ ...p, state: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select your state</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Registered */}
                <div className="space-y-2">
                  <Label>{t("roadmap.registered")}</Label>
                  <RadioGroup
                    value={profile.registered}
                    onValueChange={(val: string) => setProfile((p) => ({ ...p, registered: val }))}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="reg-yes" />
                      <Label htmlFor="reg-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="reg-no" />
                      <Label htmlFor="reg-no" className="cursor-pointer">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="reg-unsure" />
                      <Label htmlFor="reg-unsure" className="cursor-pointer">Not Sure</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Has ID */}
                <div className="space-y-2">
                  <Label>{t("roadmap.hasId")}</Label>
                  <RadioGroup
                    value={profile.hasId}
                    onValueChange={(val: string) => setProfile((p) => ({ ...p, hasId: val }))}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="id-yes" />
                      <Label htmlFor="id-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="id-no" />
                      <Label htmlFor="id-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!isFormComplete}
                  className="w-full gap-2"
                >
                  {t("roadmap.generate")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
