"use client";
import React from "react";
import { PieChart, Grid3x3 } from "lucide-react";
import { JournalEntries } from "./journal-entries";
import JournalSummary from "./summary";
import NewEntryDialog from "./new-entry-form";
import { SearchDialog } from "./search";
import Heatmap from "./heatmap";
import { InteractivePieChart } from "./activity-chart";
import { useUserEntries } from "@/hooks/user-entries";
import { useUserEntryCategory } from "@/hooks/user";
import useJournalStats from "@/hooks/analysis";
import { Summary} from "@/types";

export default function Dashboard() {
  const { userId } = useUserEntryCategory();
  const { data: entries } = useUserEntries(userId);

    const {
      totalEntries,
      writingStreak,
      averageWordsPerEntry,
      numberOfCategories,
    }: Summary = useJournalStats(entries || []);
  
 
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <div className="flex items-center space-x-2">
          <SearchDialog entries={entries || []} />
          <NewEntryDialog />
        </div>
      </div>
      <JournalSummary  totalEntries = {totalEntries} writingStreak={writingStreak} averageWordsPerEntry={averageWordsPerEntry} numberOfCategories={numberOfCategories}/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Entries */}
        <div className="lg:col-span-2 space-y-6 my-8">
          <h2 className="text-xl font-semibold">Recent Entries</h2>
          <div className="grid gap-4">
            {entries?.slice(0,5).map((entry) => (
              <JournalEntries
                key={entry.id}
                id={entry.id}
                title={entry.title}
                content={entry.content}
                createdAt={entry.createdAt ? new Date(entry.createdAt) : new Date()}
                updatedAt={entry.updatedAt ? new Date(entry.updatedAt) : new Date()}
                category={entry.category}
                mood={entry.mood} />
            ))}
          </div>
        </div>
        <div className="space-y-6 my-20">
          <div className="p-6 rounded-lg border bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-200/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              <PieChart className="w-5 h-5 text-purple-500" />
              Writing Activity
            </h2>
            <InteractivePieChart />
          </div>

          <div className="p-6 rounded-lg border bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-200/20 ">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
              <Grid3x3 className="w-5 h-5 text-blue-500" />
              Journal Activity Heatmap
            </h2>
            <Heatmap />
          </div>
        </div>
      </div>
    </div>
  );
}
