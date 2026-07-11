import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devos.vercel.app";
  const routes = [
    "",
    "/auth/login",
    "/auth/signup",
    "/dashboard",
    "/notes",
    "/projects",
    "/tasks",
    "/ai-mentor",
    "/resume",
    "/github",
    "/leetcode",
    "/jobs",
    "/interviews",
    "/calendar",
    "/journal",
    "/analytics",
    "/profile",
    "/settings"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
