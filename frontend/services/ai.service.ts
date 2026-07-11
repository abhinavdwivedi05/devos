import { AIMessage, AIRoadmap } from "@/types";

export const aiService = {
  sendMessage: async (
    content: string,
    mode: "general" | "roadmap" | "resume" | "code"
  ): Promise<AIMessage> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let reply = "";
        if (mode === "code") {
          reply = `Here is my feedback on your code sample:\n\n1. **Complexity:** The overall time complexity can be optimized from O(N^2) to O(N log N) by utilizing a sliding window or a sorting preprocessing step.\n2. **Cleanliness:** Avoid nesting conditional operations. Try using guard clauses early to exit functions early.\n3. **Modern Features:** In React 19 / Next.js 16, prefer Server Actions or compiler optimization steps instead of writing verbose custom hooks for basic fetching.\n\nWould you like me to rewrite the snippet for you?`;
        } else if (mode === "resume") {
          reply = `I have analyzed your resume structure. Your parser accessibility rating is **82%** (ATS-friendly).\n\n**Main Issues:**\n- **Impact Metrics:** You should quantify your engineering achievements. For instance, replace 'Optimized React rendering' with 'Improved LCP by 35% through dynamic imports and component memoization'.\n- **Skills Density:** Ensure keywords like 'TypeScript', 'Next.js App Router', and 'Tailwind CSS v4' appear in descriptions, not just in a sidebar list.`;
        } else if (mode === "roadmap") {
          reply = `I have generated a customized learning roadmap for your target role! You can view the steps on the right. Let's start with Phase 1: Advanced Routing Protocols.`;
        } else {
          reply = `That is an interesting question. In frontend system design, the Vercel/Linear approach focuses on pushing static assets to the Edge while executing micro-animations locally. What specific part of state coordination or CSS styles would you like to drill into next?`;
        }

        resolve({
          id: `msg-reply-${Date.now()}`,
          sender: "mentor",
          content: reply,
          mode,
          timestamp: new Date().toISOString(),
        });
      }, 1000);
    });
  },

  generateRoadmap: async (role: string, difficulty: string): Promise<AIRoadmap> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `roadmap-${Date.now()}`,
          title: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ${role} Learning Path`,
          role,
          difficulty: difficulty as any,
          steps: [
            {
              id: "step-1",
              title: "Next.js 15 App Router Deep-Dive",
              description: "Master React Server Components, Client Components boundary boundaries, layouts nesting, and route handlers.",
              duration: "2 weeks",
              topics: ["RSC vs Client Components", "Streaming HTML & Suspense", "Partial Prerendering"],
              resources: ["Next.js Docs", "Vercel Guides"],
              isCompleted: false,
            },
            {
              id: "step-2",
              title: "State Coordination & Caching",
              description: "Coordinate global client layout properties with Zustand and API synchronicity with TanStack Query.",
              duration: "1 week",
              topics: ["Store Hydration", "Query Keys Invalidation", "Optimistic Updates"],
              resources: ["Zustand Github", "TanStack Docs"],
              isCompleted: false,
            },
            {
              id: "step-3",
              title: "Tailwind CSS v4 Design Systems",
              description: "Build custom reusable design systems with CSS theme variables, fluid grids, and screen overlays.",
              duration: "1 week",
              topics: ["@theme Configuration", "CSS Variable mappings", "Fluid typography"],
              resources: ["Tailwind v4 Blog"],
              isCompleted: false,
            },
          ],
        });
      }, 800);
    });
  },
};
