"use client";

import { DateFilterDialog } from "@/components/date-filter";
import { JournalEntries } from "@/components/journal-entries";
import NewEntryDialog from "@/components/new-entry-form";
import { SearchDialog } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenLine, Search, Plus, ListFilter, Calendar } from "lucide-react";

const entries = [
  {
    id: 1,
    title: "Morning Reflections",
    content:
      "Today started with a beautiful sunrise. The sky was painted in hues of orange and pink, reminding me of the simple beauty in everyday moments. I spent some time meditating and setting intentions for the day ahead.",
    date: "2024-03-26",
    category: "Personal",
    mood: "Peaceful",
  },
  {
    id: 2,
    title: "Project Breakthrough",
    content:
      "Finally solved that challenging bug that's been haunting our team for weeks. The solution was surprisingly simple once we approached the problem from a different angle. It's amazing how a fresh perspective can make all the difference.",
    date: "2024-03-25",
    category: "Work",
    mood: "Accomplished",
  },
  {
    id: 3,
    title: "Travel Plans",
    content:
      "Started planning for the summer vacation. Looking at destinations in Europe, particularly interested in visiting the Mediterranean coast. The idea of exploring ancient ruins and enjoying local cuisine is incredibly exciting.",
    date: "2024-03-24",
    category: "Travel",
    mood: "Excited",
  },
];

export default function Journal() {
  return (
    <div className="hidden flex-col md:flex min-h-screen gradient-bg">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Journal Entries</h2>
          <div className="flex items-center space-x-2">
            <SearchDialog />
            <DateFilterDialog />
            <NewEntryDialog />
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger value="all" className="cursor-pointer">
              All Entries
            </TabsTrigger>
            <TabsTrigger value="favorites" className="cursor-pointer">
              Favorites
            </TabsTrigger>
            <TabsTrigger value="categories" className="cursor-pointer">
              Categories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {entries.map((entry,idx) => (
                <div key={idx} className="grid gap-4">
                  <JournalEntries
                    title={entry.title}
                    excerpt={entry.content}
                    created_at={new Date(entry.date)}
                    category={entry.category}
                    mood={entry.mood}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="favorites" className="space-y-4">
            <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardContent className="py-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-muted p-3">
                    <PenLine className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    No Favorite Entries
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Start marking entries as favorites to see them here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {["Personal", "Work", "Travel", "Health", "Ideas"].map(
                (category) => (
                  <Card
                    key={category}
                    className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                  >
                    <CardHeader>
                      <CardTitle>{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        View all entries in {category.toLowerCase()} category
                      </p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
