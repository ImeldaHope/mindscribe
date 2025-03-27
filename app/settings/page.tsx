"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  timezone: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Preference form schema
const preferencesFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  dailyReminders: z.boolean().default(false),
  reminderTime: z.string().optional(),
  weeklyDigest: z.boolean().default(true),
  milestoneNotifications: z.boolean().default(true),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

export default function Settings() {
  
  const [isSaving, setIsSaving] = useState(false);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Demo User",
      email: "demo@example.com",
      timezone: "America/Los_Angeles",
    },
  });

  // Preferences form
  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      theme: "light",
      dailyReminders: false,
      reminderTime: "20:00",
      weeklyDigest: true,
      milestoneNotifications: true,
    },
  });

  // Handle profile form submission
  const onProfileSubmit = (data: ProfileFormValues) => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
      });
    }, 800);
  };

  // Handle preferences form submission
  const onPreferencesSubmit = (data: PreferencesFormValues) => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast(
        "Your preferences have been saved."
      );
    }, 800);
  };
  const user = { username: "Demo User" };
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold  mb-6">Settings</h1>

        {/* Profile Information */}
                <Card className="mb-6">
          <CardHeader className="border-b border-neutral-200">
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                  <div className="md:w-1/4">
                    <Label className="text-sm font-medium">
                      Profile Photo
                    </Label>
                  </div>
                  <div className="mt-2 md:mt-0 md:w-3/4 flex items-center">
                    <div className="h-16 w-16 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-600">
                      <span className="text-xl font-medium">
                        {user?.username
                          ? user.username.charAt(0).toUpperCase()
                          : "D"}
                      </span>
                    </div>
                    <div className="ml-5">
                      <Button variant="outline" size="sm" className="mr-2">
                        Change
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-neutral-500"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <div className="md:hidden">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2 md:mt-0 md:w-3/4 hidden md:block">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <div className="md:hidden">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2 md:mt-0 md:w-3/4 hidden md:block">
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <FormField
                      control={profileForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timezone</FormLabel>
                          <div className="md:hidden">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="America/Los_Angeles">
                                  Pacific Time (US & Canada)
                                </SelectItem>
                                <SelectItem value="America/New_York">
                                  Eastern Time (US & Canada)
                                </SelectItem>
                                <SelectItem value="Europe/London">
                                  Central European Time
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2 md:mt-0 md:w-3/4 hidden md:block">
                    <FormField
                      control={profileForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="America/Los_Angeles">
                                Pacific Time (US & Canada)
                              </SelectItem>
                              <SelectItem value="America/New_York">
                                Eastern Time (US & Canada)
                              </SelectItem>
                              <SelectItem value="Europe/London">
                                Central European Time
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="mb-6 ">
          <CardHeader className="border-b border-purple-200/20">
            <CardTitle className="text-lg ">
              Preferences
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <Form {...preferencesForm}>
              <form
                onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <FormField
                      control={preferencesForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Theme</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="light" id="light" />
                                <Label htmlFor="light">Light</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dark" id="dark" />
                                <Label htmlFor="dark">Dark</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="system" id="system" />
                                <Label htmlFor="system">System</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <FormField
                      control={preferencesForm.control}
                      name="dailyReminders"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Journal Reminders</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <Label>Enable daily reminders</Label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2 md:mt-0 md:w-3/4">
                    {preferencesForm.watch("dailyReminders") && (
                      <div className="mt-3">
                        <FormField
                          control={preferencesForm.control}
                          name="reminderTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-full md:w-[180px] border-purple-200/50">
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="20:00">
                                      8:00 PM
                                    </SelectItem>
                                    <SelectItem value="21:00">
                                      9:00 PM
                                    </SelectItem>
                                    <SelectItem value="22:00">
                                      10:00 PM
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <FormLabel>Email Notifications</FormLabel>
                  </div>
                  <div className="mt-2 md:mt-0 md:w-3/4 space-y-4">
                    <FormField
                      control={preferencesForm.control}
                      name="weeklyDigest"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border  p-3 ">
                          <div className="space-y-0.5">
                            <FormLabel>Weekly Digest</FormLabel>
                            <FormDescription>
                              Receive a summary of your journal activity every
                              week
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={preferencesForm.control}
                      name="milestoneNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border  p-3 ">
                          <div className="space-y-0.5">
                            <FormLabel>Milestone Achievements</FormLabel>
                            <FormDescription>
                              Get notified when you reach journaling milestones
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className=""
                  >
                    {isSaving ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-6  ">
          <CardHeader className="border-b ">
            <CardTitle className="text-lg">
              Privacy & Security
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <Label>Journal Privacy</Label>
                </div>
                <div className="mt-2 md:mt-0 md:w-3/4">
                  <div className="flex items-center space-x-2">
                    <Switch id="journal-privacy" defaultChecked />
                    <Label htmlFor="journal-privacy">
                      Enable password protection
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <Label>Data Export</Label>
                </div>
                <div className="mt-2 md:mt-0 md:w-3/4">
                  <Button variant="outline" className="border-purple-200/50">
                    Export All Data
                  </Button>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Download all your journal entries and settings as a ZIP file
                  </p>
                </div>
              </div>

              <Separator className="bg-purple-200/20" />

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <Label className="text-red-600">Danger Zone</Label>
                </div>
                <div className="mt-2 md:mt-0 md:w-3/4">
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                  >
                    Delete Account
                  </Button>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
