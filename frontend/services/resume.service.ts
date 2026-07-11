import { ResumeVersion } from "@/types";

const mockResumes: ResumeVersion[] = [
  { id: "res-1", name: "Alex_Rivera_Resume_v3.pdf", uploadedAt: "2026-07-10", fileSize: "1.2 MB", atsScore: 82, suggestions: ["Add quantified achievements in Stripe integration role.", "Expand on Next.js 15 routing optimizations.", "Include Kubernetes in active skills list."], isActive: true },
  { id: "res-2", name: "Alex_Rivera_Resume_v2.pdf", uploadedAt: "2026-06-15", fileSize: "1.1 MB", atsScore: 75, suggestions: ["Simplify header styling for parser compliance.", "Highlight TypeScript metrics."], isActive: false }
];

export const resumeService = {
  getResumes: async (): Promise<ResumeVersion[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResumes), 300);
    });
  }
};
