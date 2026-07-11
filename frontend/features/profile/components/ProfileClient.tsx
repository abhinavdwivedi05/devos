"use client";

import React, { useState } from "react";
import { User, ShieldAlert, Award, Globe, Plus, Trash, Sparkles } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/BrandIcons";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { toast } from "@/components/ui/Toast";

export function ProfileClient() {
  const { profile, updateProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [github, setGithub] = useState(profile.socials.github);
  const [linkedin, setLinkedin] = useState(profile.socials.linkedin);
  const [website, setWebsite] = useState(profile.socials.website || "");

  // Skill state addition
  const [newSkill, setNewSkill] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      bio,
      socials: {
        ...profile.socials,
        github,
        linkedin,
        website: website || undefined,
      },
    });
    setIsEditing(false);
    toast("Profile details updated!", "success");
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (profile.skills.includes(newSkill.trim())) {
      toast("Skill already listed!", "warning");
      return;
    }
    updateProfile({
      skills: [...profile.skills, newSkill.trim()],
    });
    setNewSkill("");
    toast("Skill added to profile matrix!", "success");
  };

  const handleRemoveSkill = (skill: string) => {
    updateProfile({
      skills: profile.skills.filter((s) => s !== skill),
    });
    toast("Skill tag removed", "info");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* Profile info & socials - left column */}
      <div className="space-y-6">
        <Card className="border-border/60">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            {/* Avatar display */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-accent-blue shadow-lg shadow-accent-blue/15 select-none"
              />
              <span className="absolute bottom-1 right-1 bg-accent-blue border-2 border-card text-background h-5 w-5 flex items-center justify-center rounded-full text-[10px] font-black">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-foreground">{profile.name}</h2>
              <p className="text-xs text-muted font-medium">@{profile.username}</p>
            </div>

            <p className="text-xs text-muted leading-relaxed font-medium px-2">
              {profile.bio}
            </p>

            {/* Social links */}
            <div className="flex items-center space-x-3 pt-2">
              <a href={`https://${profile.socials.github}`} target="_blank" rel="noreferrer" className="text-muted hover:text-foreground cursor-pointer p-1.5 hover:bg-card border border-border rounded-full" aria-label="GitHub profile">
                <Github className="h-4 w-4" />
              </a>
              <a href={`https://${profile.socials.linkedin}`} target="_blank" rel="noreferrer" className="text-muted hover:text-foreground cursor-pointer p-1.5 hover:bg-card border border-border rounded-full" aria-label="LinkedIn profile">
                <Linkedin className="h-4 w-4" />
              </a>
              {profile.socials.website && (
                <a href={`https://${profile.socials.website}`} target="_blank" rel="noreferrer" className="text-muted hover:text-foreground cursor-pointer p-1.5 hover:bg-card border border-border rounded-full" aria-label="Personal Website">
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="w-full pt-4 border-t border-border/40">
              <Button variant="secondary" size="sm" className="w-full text-xs font-bold py-2" onClick={() => setIsEditing(!isEditing)}>
                <span>{isEditing ? "Close Editor" : "Edit Profile Info"}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {isEditing && (
          <Card className="border-border/60">
            <CardHeader className="p-5 border-b border-border/40 pb-3">
              <CardTitle className="text-xs font-bold text-muted uppercase">Edit details</CardTitle>
            </CardHeader>
            <form onSubmit={handleSaveProfile}>
              <CardContent className="p-5 space-y-4 pt-4">
                <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                <Input label="GitHub URL" value={github} onChange={(e) => setGithub(e.target.value)} />
                <Input label="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                <Input label="Personal Website URL" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </CardContent>
              <CardFooter className="p-5 border-t border-border/40 flex justify-end space-x-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit" variant="default" size="sm">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>

      {/* Skills matrix & achievements - right columns */}
      <div className="lg:col-span-2 space-y-6">
        {/* Skills matrix */}
        <Card className="border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold">Skills Matrix</CardTitle>
              <CardDescription className="text-[10px]">Your active technology skills directory.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-4">
            <div className="flex flex-wrap gap-2 py-1 select-none">
              {profile.skills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center rounded-sm bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-semibold text-xs px-2.5 py-1 select-none"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 hover:text-accent-red cursor-pointer shrink-0 text-accent-blue/70"
                    aria-label={`Remove skill ${skill}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSkillSubmit} className="flex items-center space-x-2 pt-2 border-t border-border/20 select-none">
              <Input
                placeholder="Add new skill (e.g. GraphQL, Docker)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="h-8.5 text-xs py-1"
              />
              <Button type="submit" variant="default" size="sm" className="h-8.5 text-xs px-3 font-semibold shrink-0">
                <Plus className="h-3.5 w-3.5 mr-1" />
                <span>Add</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Credentials Achievements */}
        <Card className="border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-accent-green" />
              <span>Career Credentials & Badges</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-4 select-none">
            {profile.achievements.map((ach) => (
              <div key={ach.id} className="flex items-start space-x-4 border-b border-border/20 pb-3.5 last:border-0 last:pb-0">
                <span className="text-2xl w-10 h-10 rounded-sm bg-border/30 border border-border flex items-center justify-center select-none shrink-0">
                  🏆
                </span>
                <div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-foreground">{ach.title}</span>
                    <Badge variant="outline" className="text-[8px] px-1 py-0">{ach.date}</Badge>
                  </div>
                  <p className="text-[10px] text-muted leading-relaxed font-semibold mt-1">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfileClient;
