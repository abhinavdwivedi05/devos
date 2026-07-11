"use client";

import React, { useState, useRef, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { toast } from "@/components/ui/Toast";
import { aiService } from "@/services/ai.service";

// Import modular sub-components
import { AIMentorChat } from "./AIMentorChat";
import { AIMentorTools } from "./AIMentorTools";

export function AIMentorClient() {
  const { aiMessages, addAIMessage, clearAIChat, roadmaps, addRoadmap, toggleRoadmapStep } = useStore();
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("roadmap");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Roadmap Form states
  const [roadmapRole, setRoadmapRole] = useState("Frontend Engineer");
  const [roadmapDiff, setRoadmapDiff] = useState("intermediate");
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);

  // Code Review states
  const [codeSnippet, setCodeSnippet] = useState("");
  const [codeReviewFeedback, setCodeReviewFeedback] = useState<string | null>(null);
  const [reviewingCode, setReviewingCode] = useState(false);

  // Resume Review states
  const [selectedResumeVersion, setSelectedResumeVersion] = useState("res-1");
  const [resumeFeedback, setResumeFeedback] = useState<string | null>(null);
  const [reviewingResume, setReviewingResume] = useState(false);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, isTyping]);

  const handleSendMessage = async (text: string, customMode?: "general" | "roadmap" | "resume" | "code") => {
    if (!text.trim()) return;
    
    // Add user message
    addAIMessage({
      sender: "user",
      content: text,
      mode: customMode || "general",
    });
    
    setInputText("");
    setIsTyping(true);

    try {
      const response = await aiService.sendMessage(text, customMode || "general");
      addAIMessage({
        sender: "mentor",
        content: response.content,
        mode: response.mode,
      });
    } catch (e) {
      toast("Error sending message", "error");
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt: string, mode: "general" | "roadmap" | "resume" | "code") => {
    if (mode === "roadmap") setActiveTab("roadmap");
    if (mode === "resume") setActiveTab("resume");
    if (mode === "code") setActiveTab("code");
    handleSendMessage(prompt, mode);
  };

  const handleGenerateRoadmap = async () => {
    setGeneratingRoadmap(true);
    try {
      const rm = await aiService.generateRoadmap(roadmapRole, roadmapDiff);
      addRoadmap(rm);
      handleSendMessage(`Generate a learning roadmap for a ${roadmapDiff} ${roadmapRole}.`, "roadmap");
      toast("Personalized learning roadmap generated!", "success");
    } catch (e) {
      toast("Error generating roadmap", "error");
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const handleReviewCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeSnippet.trim()) return;
    setReviewingCode(true);
    try {
      const reply = await aiService.sendMessage(`Please review my code:\n\n${codeSnippet}`, "code");
      setCodeReviewFeedback(reply.content);
      addAIMessage({ sender: "user", content: `Review code: ${codeSnippet.substring(0, 40)}...`, mode: "code" });
      addAIMessage({ sender: "mentor", content: reply.content, mode: "code" });
      toast("Code review completed!", "success");
    } catch (e) {
      toast("Error during code review", "error");
    } finally {
      setReviewingCode(false);
    }
  };

  const handleReviewResumeSubmit = async () => {
    setReviewingResume(true);
    try {
      const reply = await aiService.sendMessage("Please review my active resume template metrics.", "resume");
      setResumeFeedback(reply.content);
      addAIMessage({ sender: "user", content: "Analyze my uploaded resume.", mode: "resume" });
      addAIMessage({ sender: "mentor", content: reply.content, mode: "resume" });
      toast("Resume parsing audit complete!", "success");
    } catch (e) {
      toast("Error checking resume", "error");
    } finally {
      setReviewingResume(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-100px)] overflow-hidden select-none animate-fade-in">
      {/* Left Column: Chat Dialogue Interface */}
      <AIMentorChat
        aiMessages={aiMessages}
        inputText={inputText}
        onChangeInputText={setInputText}
        isTyping={isTyping}
        onClearChat={clearAIChat}
        onSendMessage={handleSendMessage}
        onPromptClick={handlePromptClick}
        messagesEndRef={messagesEndRef}
      />

      {/* Right Column: Interactive Tools Workspace */}
      <AIMentorTools
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        roadmaps={roadmaps}
        roadmapRole={roadmapRole}
        onChangeRoadmapRole={setRoadmapRole}
        roadmapDiff={roadmapDiff}
        onChangeRoadmapDiff={setRoadmapDiff}
        generatingRoadmap={generatingRoadmap}
        onGenerateRoadmap={handleGenerateRoadmap}
        onToggleRoadmapStep={toggleRoadmapStep}
        codeSnippet={codeSnippet}
        onChangeCodeSnippet={setCodeSnippet}
        reviewingCode={reviewingCode}
        onReviewCode={handleReviewCodeSubmit}
        codeReviewFeedback={codeReviewFeedback}
        selectedResumeVersion={selectedResumeVersion}
        onChangeResumeVersion={setSelectedResumeVersion}
        reviewingResume={reviewingResume}
        onReviewResume={handleReviewResumeSubmit}
        resumeFeedback={resumeFeedback}
      />
    </div>
  );
}

export default AIMentorClient;
