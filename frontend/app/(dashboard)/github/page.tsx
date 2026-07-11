import React from "react";
import { githubService } from "@/services/github.service";
import GitHubClient from "@/features/github/components/GitHubClient";

export default async function GitHubPage() {
  const data = await githubService.getAnalyticsData("alexrivera");

  return <GitHubClient data={data} />;
}
