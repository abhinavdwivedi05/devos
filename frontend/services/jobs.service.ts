import { JobApplication } from "@/types";

const mockJobs: JobApplication[] = [
  { id: "job-1", company: "Vercel", logo: "⚡", role: "Senior Developer Relations", salary: "$160,000 - $190,000", location: "Remote, US", type: "remote", status: "offered", appliedDate: "2026-06-20", lastContactDate: "2026-07-10", notes: "Offer received! Need to negotiate benefits." },
  { id: "job-2", company: "Stripe", logo: "💳", role: "Senior Frontend Engineer", salary: "$170,000 - $200,000", location: "San Francisco, CA", type: "hybrid", status: "interviewing", appliedDate: "2026-06-25", lastContactDate: "2026-07-09", notes: "Completed technical assessment. Technical round scheduled for Monday." },
  { id: "job-3", company: "Google", logo: "G", role: "L5 Software Engineer (Cloud)", salary: "$180,000 - $210,000", location: "Sunnyvale, CA", type: "on-site", status: "screening", appliedDate: "2026-07-01", lastContactDate: "2026-07-07", notes: "HR recruiter screening completed. Preparing for system design loop." },
  { id: "job-4", company: "Linear", logo: "⚙️", role: "Product Engineer", salary: "$150,000 - $175,000", location: "Remote, EU/US", type: "remote", status: "applied", appliedDate: "2026-07-08", lastContactDate: "2026-07-08", notes: "Applied via referral link. Reached out to HM on Twitter." }
];

export const jobsService = {
  getJobs: async (): Promise<JobApplication[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobs), 300);
    });
  }
};
