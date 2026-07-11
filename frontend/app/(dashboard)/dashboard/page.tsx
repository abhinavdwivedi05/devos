import React from "react";
import { githubService } from "@/services/github.service";
import { leetcodeService } from "@/services/leetcode.service";
import { jobsService } from "@/services/jobs.service";
import { interviewsService } from "@/services/interviews.service";
import { analyticsService } from "@/services/analytics.service";
import DashboardClient from "@/features/dashboard/components/DashboardClient";

export default async function DashboardPage() {
  // Fetch mock data concurrently on the server
  const [githubData, leetcodeData, jobs, interviews, analytics] = await Promise.all([
    githubService.getAnalyticsData("alexrivera"),
    leetcodeService.getStats("alexrivera_lc"),
    jobsService.getJobs(),
    interviewsService.getInterviews(),
    analyticsService.getProductivityStats(),
  ]);

  return (
    <DashboardClient
      initialGithubData={githubData}
      initialLeetcodeData={leetcodeData}
      initialJobs={jobs}
      initialInterviews={interviews}
      initialAnalytics={analytics}
    />
  );
}
