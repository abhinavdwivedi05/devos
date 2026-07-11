"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Eye, Bell, Shield, AlertTriangle, Check, Award, Globe } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { toast } from "@/components/ui/Toast";

export function SettingsClient() {
  const router = useRouter();
  const { settings, updateSettings, profile, updateProfile } = useStore();
  const [activeTab, setActiveTab] = useState("general");

  // Form local state
  const [name, setName] = useState(settings.profile.name);
  const [email, setEmail] = useState(settings.profile.email);
  const [githubUser, setGithubUser] = useState(settings.profile.githubUsername);
  const [leetcodeUser, setLeetcodeUser] = useState(settings.profile.leetcodeUsername);

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      profile: {
        name,
        email,
        githubUsername: githubUser,
        leetcodeUsername: leetcodeUser,
      },
    });
    updateProfile({
      name,
      username: githubUser || leetcodeUser || name.toLowerCase().replace(/\s+/g, ""),
    });
    toast("General preferences saved!", "success");
  };

  const handleAppearanceToggle = (key: "reducedMotion" | "sidebarCollapsed") => {
    updateSettings({
      appearance: {
        ...settings.appearance,
        [key]: !settings.appearance[key],
      },
    });
    toast("Appearance setting updated!", "info");
  };

  const handleNotificationToggle = (key: "emailAlerts" | "weeklyDigest" | "browserNotifications" | "marketingEmails") => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
    toast("Notification preferences saved!", "info");
  };

  const handleConnectionToggle = (key: "githubConnected" | "leetcodeConnected" | "googleConnected", name: string) => {
    const isCurrentlyConnected = settings.connections[key];
    updateSettings({
      connections: {
        ...settings.connections,
        [key]: !isCurrentlyConnected,
      },
    });
    toast(
      isCurrentlyConnected
        ? `Successfully disconnected from ${name}.`
        : `Connected to ${name} account successfully!`,
      isCurrentlyConnected ? "info" : "success"
    );
  };

  const handleDeleteAccountSimulation = () => {
    const check = confirm("WARNING: Are you sure you want to permanently delete your DevOS workspace? This cannot be undone.");
    if (check) {
      toast("Resetting local storage cache...", "warning");
      setTimeout(() => {
        localStorage.clear();
        toast("Workspace database cleared. Returning to login...", "success");
        router.push("/auth/login");
      }, 1000);
    }
  };

  const menuItems = [
    { id: "general", label: "General Settings", icon: User },
    { id: "appearance", label: "Console Appearance", icon: Eye },
    { id: "notifications", label: "Alert Configs", icon: Bell },
    { id: "connections", label: "Connected Accounts", icon: Shield },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle, danger: true },
  ];

  return (
    <div className="flex flex-col md:flex-row border border-border rounded-md bg-[#0d1117] min-h-[calc(100vh-120px)] overflow-hidden select-none">
      {/* Side settings Navigation panel - leftmost */}
      <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-border bg-card/25 p-4 shrink-0 flex flex-col space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2 text-xs font-semibold rounded-sm transition-all cursor-pointer text-left",
              activeTab === item.id
                ? "bg-border text-foreground font-extrabold"
                : item.danger
                ? "text-accent-red hover:bg-accent-red/10"
                : "text-muted hover:text-foreground hover:bg-card/45"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main settings Content panel - rightmost */}
      <div className="flex-1 p-6 md:p-8">
        {/* 1. General Panel */}
        {activeTab === "general" && (
          <form onSubmit={handleGeneralSubmit} className="space-y-6">
            <Card className="border-border/60">
              <CardHeader className="p-5 border-b border-border/40 pb-4">
                <CardTitle className="text-sm font-bold">General Settings</CardTitle>
                <CardDescription className="text-[10px]">Your personal details and dashboard identities.</CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="GitHub Username" value={githubUser} onChange={(e) => setGithubUser(e.target.value)} />
                  <Input label="LeetCode Username" value={leetcodeUser} onChange={(e) => setLeetcodeUser(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter className="p-5 border-t border-border/40 flex justify-end">
                <Button type="submit" variant="default" size="sm">Save Preferences</Button>
              </CardFooter>
            </Card>
          </form>
        )}

        {/* 2. Appearance Panel */}
        {activeTab === "appearance" && (
          <Card className="border-border/60">
            <CardHeader className="p-5 border-b border-border/40 pb-4">
              <CardTitle className="text-sm font-bold">Console Appearance</CardTitle>
              <CardDescription className="text-[10px]">Customize how DevOS looks and behaves on your system.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 pt-4 select-none">
              {/* Toggle Sidebar Collapse */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-foreground">Collapse Sidebar</p>
                  <p className="text-[10px] text-muted font-medium mt-0.5">Toggle default sidebar width properties.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.appearance.sidebarCollapsed}
                  onChange={() => handleAppearanceToggle("sidebarCollapsed")}
                  className="rounded-sm bg-card border border-border text-accent-blue focus:ring-accent-blue h-4 w-4 cursor-pointer"
                />
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-border/30">
                <div>
                  <p className="font-bold text-foreground">Reduced motion physics</p>
                  <p className="text-[10px] text-muted font-medium mt-0.5">Disables heavy spring transitions and modals layout shifts.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.appearance.reducedMotion}
                  onChange={() => handleAppearanceToggle("reducedMotion")}
                  className="rounded-sm bg-card border border-border text-accent-blue focus:ring-accent-blue h-4 w-4 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* 3. Notifications Panel */}
        {activeTab === "notifications" && (
          <Card className="border-border/60">
            <CardHeader className="p-5 border-b border-border/40 pb-4">
              <CardTitle className="text-sm font-bold">Notifications config</CardTitle>
              <CardDescription className="text-[10px]">Toggle what digests and reports we email or push to browser.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 pt-4 select-none">
              {/* Email Alerts */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-foreground">Email alert schedules</p>
                  <p className="text-[10px] text-muted font-medium mt-0.5">Receive immediate mails when task deadlines approach.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.emailAlerts}
                  onChange={() => handleNotificationToggle("emailAlerts")}
                  className="rounded-sm bg-card border border-border text-accent-blue focus:ring-accent-blue h-4 w-4 cursor-pointer"
                />
              </div>

              {/* Weekly digest */}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-border/30">
                <div>
                  <p className="font-bold text-foreground">Weekly productivity digest</p>
                  <p className="text-[10px] text-muted font-medium mt-0.5">Receive weekly reports comparing solved algorithms and study hours.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.weeklyDigest}
                  onChange={() => handleNotificationToggle("weeklyDigest")}
                  className="rounded-sm bg-card border border-border text-accent-blue focus:ring-accent-blue h-4 w-4 cursor-pointer"
                />
              </div>

              {/* Browser notifications */}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-border/30">
                <div>
                  <p className="font-bold text-foreground">Browser notification flags</p>
                  <p className="text-[10px] text-muted font-medium mt-0.5">Show desktop alert badges when scheduled interviews approach.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.browserNotifications}
                  onChange={() => handleNotificationToggle("browserNotifications")}
                  className="rounded-sm bg-card border border-border text-accent-blue focus:ring-accent-blue h-4 w-4 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* 4. Connections Panel */}
        {activeTab === "connections" && (
          <Card className="border-border/60">
            <CardHeader className="p-5 border-b border-border/40 pb-4">
              <CardTitle className="text-sm font-bold">Connected Integrations</CardTitle>
              <CardDescription className="text-[10px]">Securely link your developer profiles to import dashboard values.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4 pt-4 select-none">
              {/* GitHub */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <Github className="h-5 w-5 text-accent-blue" />
                  <div>
                    <p className="font-bold text-foreground">GitHub Integration</p>
                    <p className="text-[10px] text-muted font-medium mt-0.5">Imports repository lists and commits contribution grids.</p>
                  </div>
                </div>
                <Button
                  variant={settings.connections.githubConnected ? "secondary" : "default"}
                  size="sm"
                  className="h-8 text-[10px] font-bold px-3"
                  onClick={() => handleConnectionToggle("githubConnected", "GitHub")}
                >
                  {settings.connections.githubConnected ? "Disconnect" : "Connect Profile"}
                </Button>
              </div>

              {/* LeetCode */}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-border/30">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-accent-green" />
                  <div>
                    <p className="font-bold text-foreground">LeetCode Tracker</p>
                    <p className="text-[10px] text-muted font-medium mt-0.5">Sync solved algorithm scores and contest rankings daily.</p>
                  </div>
                </div>
                <Button
                  variant={settings.connections.leetcodeConnected ? "secondary" : "default"}
                  size="sm"
                  className="h-8 text-[10px] font-bold px-3"
                  onClick={() => handleConnectionToggle("leetcodeConnected", "LeetCode")}
                >
                  {settings.connections.leetcodeConnected ? "Disconnect" : "Connect Profile"}
                </Button>
              </div>

              {/* Google */}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-border/30">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-accent-purple" />
                  <div>
                    <p className="font-bold text-foreground">Google Calendar Suite</p>
                    <p className="text-[10px] text-muted font-medium mt-0.5">Sync upcoming recruiter interviews directly onto Google schedules.</p>
                  </div>
                </div>
                <Button
                  variant={settings.connections.googleConnected ? "secondary" : "default"}
                  size="sm"
                  className="h-8 text-[10px] font-bold px-3"
                  onClick={() => handleConnectionToggle("googleConnected", "Google")}
                >
                  {settings.connections.googleConnected ? "Disconnect" : "Connect Suite"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 5. Danger Zone Panel */}
        {activeTab === "danger" && (
          <Card className="border-accent-red/50 shadow-md shadow-accent-red/5 bg-accent-red/5">
            <CardHeader className="p-5 border-b border-accent-red/20 pb-4">
              <CardTitle className="text-sm font-bold text-accent-red">Danger Zone</CardTitle>
              <CardDescription className="text-[10px] text-accent-red/70">Irreversible actions relating to your DevOS workspace.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-4 select-none space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold text-foreground/90">
                <div>
                  <p className="font-bold">Delete DevOS Console Workspace</p>
                  <p className="text-[10px] text-muted font-medium mt-0.5 leading-relaxed">
                    Permanently delete all notes folders, tasks boards, resume histories, and logs from client cache.
                  </p>
                </div>
                <Button variant="danger" size="sm" className="font-bold shrink-0" onClick={handleDeleteAccountSimulation}>
                  Delete Workspace
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default SettingsClient;
