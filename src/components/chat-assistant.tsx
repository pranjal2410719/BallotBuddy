"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Bot,
  Send,
  X,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  User,
  GraduationCap,
  Shield,
  BookOpen,
  Scale,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Persona = "default" | "student" | "officer" | "teacher" | "legal";

const personas: {
  id: Persona;
  name: string;
  icon: React.ReactNode;
  description: string;
  systemPrompt: string;
}[] = [
  {
    id: "default",
    name: "Friendly Guide",
    icon: <Bot className="h-4 w-4" />,
    description: "A friendly, casual assistant",
    systemPrompt: "You are BallotBuddy, a friendly AI election assistant.",
  },
  {
    id: "student",
    name: "Student Guide",
    icon: <GraduationCap className="h-4 w-4" />,
    description: "Explains like you're a student",
    systemPrompt:
      "You are a peer student guide explaining elections to a fellow student. Use casual, relatable language. Make analogies to school life. Keep it fun and engaging.",
  },
  {
    id: "officer",
    name: "Election Officer",
    icon: <Shield className="h-4 w-4" />,
    description: "Official & authoritative",
    systemPrompt:
      "You are an authoritative Election Officer explaining official procedures. Be precise, factual, and formal. Cite official rules and regulations.",
  },
  {
    id: "teacher",
    name: "Teacher",
    icon: <BookOpen className="h-4 w-4" />,
    description: "Patient, step-by-step explanations",
    systemPrompt:
      "You are a patient teacher explaining elections. Break complex topics into simple steps. Use examples and analogies. Encourage questions. Be encouraging.",
  },
  {
    id: "legal",
    name: "Legal Expert",
    icon: <Scale className="h-4 w-4" />,
    description: "Detailed legal/regulatory info",
    systemPrompt:
      "You are a legal expert on Indian election law. Provide detailed legal information, cite relevant acts and sections. Be thorough and precise about electoral rules and regulations.",
  },
];

const SUGGESTIONS = [
  "How do I register to vote?",
  "What is NOTA?",
  "What documents do I need for voting?",
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm BallotBuddy, your election education assistant. Ask me anything about elections, voting, or civic duties!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePersona, setActivePersona] = useState<Persona>("default");
  const [showPersonas, setShowPersonas] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const autoSpeakRef = useRef(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check for Web Speech API support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionCtor =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognitionCtor);
    }
  }, []);

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognitionCtor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      // Use ref to avoid stale closure
      setTimeout(() => {
        sendMessageRef.current(transcript);
      }, 100);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening]);

  const speakText = useCallback((text: string) => {
    if (!autoSpeakRef.current || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []); // no deps — reads from ref which is always current

  const sendMessageRef = useRef<(text: string) => void>(() => {});

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    // Capture history BEFORE adding the new user message
    const historySnapshot = messages.slice(-20);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const persona = personas.find((p) => p.id === activePersona);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          persona: persona?.systemPrompt || personas[0].systemPrompt,
          history: historySnapshot,
        }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      speakText(reply);
    } catch {
      const errorMsg = "Sorry, I'm having trouble connecting. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  sendMessageRef.current = sendMessage;

  const currentPersona = personas.find((p) => p.id === activePersona);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="overflow-hidden shadow-2xl border">
              {/* Header */}
              <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    {currentPersona?.icon || <Bot className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">BallotBuddy AI</div>
                    <div className="text-xs text-blue-100">
                      {currentPersona?.name || "Election Education Assistant"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => {
                      autoSpeakRef.current = !autoSpeak;
                      setAutoSpeak(!autoSpeak);
                  }}
                    title={autoSpeak ? "Voice output ON" : "Voice output OFF"}
                  >
                    <Volume2 className={`h-4 w-4 ${!autoSpeak ? "opacity-40" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setShowPersonas(!showPersonas)}
                    title="Change persona"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Persona Selector */}
              <AnimatePresence>
                {showPersonas && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-b bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="p-3 space-y-1.5">
                      <p className="text-[11px] font-medium text-muted-foreground px-1">
                        Choose a persona:
                      </p>
                      {personas.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setActivePersona(p.id);
                            setShowPersonas(false);
                          }}
                          className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            activePersona === p.id
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "hover:bg-accent"
                          }`}
                        >
                          {p.icon}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs">{p.name}</div>
                            <div className="text-[11px] text-muted-foreground truncate">
                              {p.description}
                            </div>
                          </div>
                          {activePersona === p.id && (
                            <span className="text-blue-600 text-xs">●</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-gray-800 border text-foreground shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 border rounded-lg px-3 py-2 shadow-sm">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-1.5 border-t bg-white dark:bg-gray-950 px-3 py-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 text-[11px] text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex items-center gap-2 border-t bg-white dark:bg-gray-950 p-3">
                {speechSupported && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleListening}
                    className={`h-9 w-9 shrink-0 ${
                      isListening
                        ? "text-red-500 animate-pulse"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder={
                    isListening ? "Listening..." : "Ask about elections..."
                  }
                  className="flex-1 text-sm"
                />
                <Button
                  size="icon"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="h-9 w-9 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
