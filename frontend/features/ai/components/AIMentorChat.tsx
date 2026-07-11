import React from "react";
import { Brain, RefreshCw, Send } from "lucide-react";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";

interface AIMentorChatProps {
  aiMessages: any[];
  inputText: string;
  onChangeInputText: (val: string) => void;
  isTyping: boolean;
  onClearChat: () => void;
  onSendMessage: (text: string) => void;
  onPromptClick: (prompt: string, mode: "general" | "roadmap" | "resume" | "code") => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function AIMentorChat({
  aiMessages,
  inputText,
  onChangeInputText,
  isTyping,
  onClearChat,
  onSendMessage,
  onPromptClick,
  messagesEndRef,
}: AIMentorChatProps) {
  return (
    <div className="flex flex-col border border-border rounded-md bg-card/10 overflow-hidden">
      {/* Header toolbar */}
      <div className="px-5 py-3 border-b border-border/40 flex items-center justify-between bg-card/25 select-none">
        <div className="flex items-center space-x-2.5">
          <Brain className="h-5 w-5 text-accent-blue" />
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground">AI Career Mentor</h2>
            <p className="text-[10px] text-muted leading-none font-semibold">DevOS Virtual Advisor</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-[10px]" onClick={onClearChat}>
          <RefreshCw className="h-3 w-3 mr-1" />
          <span>Clear Log</span>
        </Button>
      </div>

      {/* Scrollable messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {aiMessages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex flex-col max-w-[85%] text-xs", {
              "self-end items-end ml-auto": msg.sender === "user",
              "self-start items-start mr-auto": msg.sender === "mentor",
            })}
          >
            <span className="text-[9px] text-muted mb-1 select-none font-bold uppercase tracking-wider">
              {msg.sender === "user" ? "Alex" : "DevOS Mentor"}
            </span>
            <div
              className={cn("rounded-md p-3.5 leading-relaxed font-semibold break-words", {
                "bg-accent-blue text-background": msg.sender === "user",
                "bg-card border border-border text-foreground/90 whitespace-pre-line": msg.sender === "mentor",
              })}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex flex-col items-start max-w-[80%] text-xs select-none">
            <span className="text-[9px] text-muted mb-1 font-bold">DevOS Mentor</span>
            <div className="bg-card border border-border rounded-md p-3 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Grid */}
      <div className="px-4 py-2 border-t border-border/40 bg-card/10 select-none">
        <div className="flex flex-wrap gap-2 py-1 max-w-full overflow-x-auto">
          <button
            onClick={() => onPromptClick("Generate Frontend learning path.", "roadmap")}
            className="text-[10px] bg-card border border-border hover:border-accent-blue/30 hover:text-foreground text-muted px-2.5 py-1 rounded-full cursor-pointer whitespace-nowrap transition-all font-semibold"
          >
            🗺️ Roadmap path
          </button>
          <button
            onClick={() => onPromptClick("Audit my uploaded resume.", "resume")}
            className="text-[10px] bg-card border border-border hover:border-accent-blue/30 hover:text-foreground text-muted px-2.5 py-1 rounded-full cursor-pointer whitespace-nowrap transition-all font-semibold"
          >
            📄 Resume Review
          </button>
          <button
            onClick={() => onPromptClick("Critique my React hooks snippet.", "code")}
            className="text-[10px] bg-card border border-border hover:border-accent-blue/30 hover:text-foreground text-muted px-2.5 py-1 rounded-full cursor-pointer whitespace-nowrap transition-all font-semibold"
          >
            ⚙️ Code Review
          </button>
        </div>
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage(inputText);
        }}
        className="p-3 border-t border-border/50 bg-[#0d1117] flex items-center space-x-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => onChangeInputText(e.target.value)}
          placeholder="Prompt AI Mentor..."
          className="flex-1 bg-card border border-border rounded-md px-3.5 py-2 text-xs text-foreground placeholder:text-muted/65 focus:outline-hidden focus:ring-1 focus:ring-accent-blue/50"
        />
        <Button type="submit" size="icon" className="h-8 w-8 rounded-md" aria-label="Send prompt">
          <Send className="h-3.5 w-3.5" />
        </Button>
      </form>
    </div>
  );
}
