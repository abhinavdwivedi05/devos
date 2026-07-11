import React from "react";
import { analyticsService } from "@/services/analytics.service";
import AnalyticsClient from "@/features/analytics/components/AnalyticsClient";

export default async function AnalyticsPage() {
  const stats = await analyticsService.getProductivityStats();

  return <AnalyticsClient stats={stats} />;
}
