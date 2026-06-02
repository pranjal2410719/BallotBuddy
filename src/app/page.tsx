"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Vote,
  CheckCircle,
  Clock,
  BookOpen,
  ArrowRight,
  Users,
  Globe,
  Sparkles,
  AlertTriangle,
  Gamepad2,
  Map,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { ElectionDashboard } from "@/components/election-dashboard";

const featureKeys = [
  { icon: <BookOpen className="h-6 w-6" />, titleKey: "feature.journey", descKey: "feature.journey.desc", href: "/journey" },
  { icon: <CheckCircle className="h-6 w-6" />, titleKey: "feature.eligibility", descKey: "feature.eligibility.desc", href: "/eligibility" },
  { icon: <Clock className="h-6 w-6" />, titleKey: "feature.timeline", descKey: "feature.timeline.desc", href: "/timeline" },
  { icon: <Sparkles className="h-6 w-6" />, titleKey: "feature.quiz", descKey: "feature.quiz.desc", href: "/quiz" },
  { icon: <AlertTriangle className="h-6 w-6" />, titleKey: "feature.myths", descKey: "feature.myths.desc", href: "/myths" },
  { icon: <Gamepad2 className="h-6 w-6" />, titleKey: "feature.simulation", descKey: "feature.simulation.desc", href: "/simulation" },
  { icon: <Map className="h-6 w-6" />, titleKey: "feature.roadmap", descKey: "feature.roadmap.desc", href: "/roadmap" },
];

const statsValues = ["10M+", "60%", "7", "1"];
const statsKeys = ["stat.voters", "stat.confused", "stat.stages", "stat.goal"];

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Home() {
  const { t } = useLanguage();
  const features = featureKeys.map((f) => ({
    ...f,
    title: t(f.titleKey),
    description: t(f.descKey),
  }));
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-1.5 text-sm font-medium backdrop-blur-sm dark:bg-gray-800/60">
              <Vote className="h-4 w-4 text-blue-600" />
              {t("home.badge")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              {t("home.title.line1")}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t("home.title.line2")}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
              {t("home.description")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/journey">
                <Button size="lg" className="gap-2 text-base px-8">
                  {t("home.cta.explore")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/eligibility">
                <Button variant="outline" size="lg" className="gap-2 text-base px-8">
                  <CheckCircle className="h-4 w-4" />
                  {t("home.cta.check")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statsValues.map((val, i) => (
              <motion.div
                key={val}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {val}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {t(statsKeys[i])}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t("home.features.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("home.features.subtitle")}
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-6 justify-center">
            {features.map((feature, i) => (
              <motion.div
                key={feature.href}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <Link href={feature.href} className="block h-full">
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Election Data Dashboard */}
      <ElectionDashboard />

      {/* Who is it for Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("home.audience.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("home.audience.subtitle")}
            </p>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: t("audience.students"),
                desc: t("audience.students.desc"),
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: t("audience.citizens"),
                desc: t("audience.citizens.desc"),
              },
              {
                icon: <Vote className="h-8 w-8" />,
                title: t("audience.rural"),
                desc: t("audience.rural.desc"),
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                      {item.icon}
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("home.cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {t("home.cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/quiz">
                <Button size="lg" className="gap-2 text-base px-8">
                  <Sparkles className="h-4 w-4" />
                  {t("home.cta.quiz")}
                </Button>
              </Link>
              <Link href="/timeline">
                <Button variant="outline" size="lg" className="text-base px-8">
                  {t("home.cta.timeline")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
