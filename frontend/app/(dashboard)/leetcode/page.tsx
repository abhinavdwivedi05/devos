import React from "react";
import { leetcodeService } from "@/services/leetcode.service";
import LeetCodeClient from "@/features/leetcode/components/LeetCodeClient";

export default async function LeetCodePage() {
  const stats = await leetcodeService.getStats("alexrivera_lc");

  return <LeetCodeClient stats={stats} />;
}
