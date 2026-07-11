"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface FAQItem {
  question: string;
  answer: string;
}

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does the GitHub analytics dashboard sync data?",
      answer: "DevOS connects securely to the GitHub GraphQL API. It aggregates commit streams, pull requests, issues, and language statistics directly into local database schemas to ensure extremely fast render times.",
    },
    {
      question: "Is there support for tracking other coding platforms?",
      answer: "Currently, DevOS supports LeetCode API integration. We are mapping endpoints to integrate HackerRank, Codeforces, and Gitlab in upcoming updates.",
    },
    {
      question: "How does the AI Mentor review my resume?",
      answer: "The AI Mentor reviews your resume by compiling structural text matches, scanning for quantified achievements, and assessing layout parser compatibility, returning a clear ATS optimization list.",
    },
    {
      question: "Can I use DevOS without a database or backend?",
      answer: "Yes, DevOS provides a robust mock promise-based architecture allowing full offline testing with in-memory persistence. If you decide to add a database later, the services layer can easily connect to REST endpoints.",
    },
    {
      question: "Does DevOS support keyboard shortcuts?",
      answer: "Absolutely. Hit Cmd+K or Ctrl+K anywhere to trigger the global Raycast command palette. You can search files, create notes, add tasks, or sign out in single key strokes.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-6 select-none bg-card/10 border-t border-border/40">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-sm text-muted font-medium">
            Everything you need to know about the DevOS workspace console.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card key={idx} className="border-border/60 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-foreground cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="text-muted shrink-0 ml-4">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border/40 bg-border/10"
                    >
                      <p className="p-5 text-xs text-muted leading-relaxed font-semibold">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingFAQ;
