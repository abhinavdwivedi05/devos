import { Interview } from "@/types";

const mockInterviews: Interview[] = [
  {
    id: "int-1",
    jobId: "job-2",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    date: "2026-07-13",
    time: "10:00 AM PST",
    type: "technical",
    format: "video",
    interviewer: "Marc Levinson (Staff Architect)",
    preparationChecklist: [
      { id: "c1", text: "Practice billing-related UI flows using Framer Motion", done: true },
      { id: "c2", text: "Review React fiber architecture and rendering optimizations", done: true },
      { id: "c3", text: "Read Stripe's design principles document", done: false }
    ],
    questionsAsked: ["Explain how to optimize heavy DOM list rendering in React", "How does client-side caching affect state synchronization in forms?"],
    status: "upcoming"
  },
  {
    id: "int-2",
    jobId: "job-3",
    company: "Google",
    role: "L5 Software Engineer (Cloud)",
    date: "2026-07-16",
    time: "1:30 PM PST",
    type: "system-design",
    format: "video",
    interviewer: "Deepa Ramakrishnan (Principal Engineer)",
    preparationChecklist: [
      { id: "c4", text: "Study rate limiting, CDNs, and load balancer algorithms", done: true },
      { id: "c5", text: "Design a scalable collaborative text editor (CRDTs)", done: false },
      { id: "c6", text: "Review consistent hashing and database sharding patterns", done: false }
    ],
    status: "upcoming"
  }
];

export const interviewsService = {
  getInterviews: async (): Promise<Interview[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockInterviews), 300);
    });
  }
};
