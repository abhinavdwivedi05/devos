import React from "react";
import { projectsService } from "@/services/projects.service";
import ProjectsClient from "@/features/projects/components/ProjectsClient";

export default async function ProjectsPage() {
  const projects = await projectsService.getProjects();

  return <ProjectsClient initialProjects={projects} />;
}
