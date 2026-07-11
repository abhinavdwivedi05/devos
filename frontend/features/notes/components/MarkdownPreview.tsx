import React from "react";

export const stripMarkdown = (content: string) => {
  return content.replace(/[#*`_-]/g, "").substring(0, 45);
};

export function MarkdownPreview({ content }: { content: string }) {
  const lines = content.split("\n");

  const renderedLines = lines.map((line, idx) => {
    // Headers
    if (line.startsWith("# ")) {
      return (
        <h1 key={idx} className="text-xl sm:text-2xl font-black text-foreground border-b border-border/40 pb-2 mb-4 mt-2 select-none">
          {line.slice(2)}
        </h1>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={idx} className="text-lg font-extrabold text-foreground mt-4 mb-2 select-none">
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-sm font-bold text-foreground mt-3 mb-1 select-none">
          {line.slice(4)}
        </h3>
      );
    }
    // Lists
    if (line.startsWith("- ")) {
      return (
        <li key={idx} className="list-disc ml-5 mb-1.5 text-xs text-foreground/90 leading-relaxed font-semibold">
          {line.slice(2)}
        </li>
      );
    }
    // Code blocks placeholder check
    if (line.startsWith("```")) {
      return null; // Simplified code-block boundaries
    }
    if (line.trim().startsWith("SELECT") || line.trim().startsWith("EXPLAIN")) {
      return (
        <pre key={idx} className="bg-card border border-border p-3.5 rounded-sm font-mono text-[10px] text-accent-blue overflow-x-auto my-3 select-all">
          {line}
        </pre>
      );
    }
    // Paragraphs
    if (line.trim() === "") {
      return <div key={idx} className="h-3" />;
    }
    return (
      <p key={idx} className="text-xs text-foreground/80 leading-relaxed mb-1 font-semibold">
        {line}
      </p>
    );
  });

  return <div className="space-y-1 font-sans">{renderedLines}</div>;
}
