import React from "react";
import { interviewsService } from "@/services/interviews.service";
import InterviewsClient from "@/features/interviews/components/InterviewsClient";

export default async function InterviewsPage() {
  const interviews = await interviewsService.getInterviews();

  return <InterviewsClient initialInterviews={interviews} />;
}
