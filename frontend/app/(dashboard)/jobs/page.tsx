import React from "react";
import { jobsService } from "@/services/jobs.service";
import JobsClient from "@/features/jobs/components/JobsClient";

export default async function JobsPage() {
  const jobs = await jobsService.getJobs();

  return <JobsClient initialJobs={jobs} />;
}
