"use client";

import { DateFilterDialog } from "@/components/date-filter";
import { JournalEntries } from "@/components/journal-entries";
import NewEntryDialog from "@/components/new-entry-form";
import { SearchDialog } from "@/components/search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserEntryCategory } from "@/hooks/user";
import { useUserEntries } from "@/hooks/user-entries";
import { PenLine} from "lucide-react";


export default function Journal() {
  const { userId } = useUserEntryCategory();
    const { data: entries } = useUserEntries(userId);
  return (
    <div className="hidden flex-col md:flex min-h-screen gradient-bg">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Journal Entries</h2>
          <div className="flex items-center space-x-2">
            <SearchDialog entries={entries || []} />
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
              {entries?.map((entry, idx) => (
                <div key={idx} className="grid gap-4">
                  <JournalEntries
                    id={entry.id}
                    title={entry.title}
                    content={entry.content}
                    createdAt={
                      entry.createdAt ? new Date(entry.createdAt) : new Date()
                    }
                    updatedAt={
                      entry.updatedAt ? new Date(entry.updatedAt) : new Date()}
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
