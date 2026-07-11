import React from "react";
import { resumeService } from "@/services/resume.service";
import ResumeClient from "@/features/resume/components/ResumeClient";

export default async function ResumePage() {
  const resumes = await resumeService.getResumes();

  return <ResumeClient initialResumes={resumes} />;
}
