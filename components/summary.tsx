import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Summary } from '@/types';

export default function JournalSummary({
  totalEntries,
  writingStreak,
  averageWordsPerEntry,
  numberOfCategories,
}: Summary) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEntries}</div>
          <p className="text-xs text-muted-foreground">+2 from last week</p>
        </CardContent>
      </Card>
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Writing Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{writingStreak} days</div>
          <p className="text-xs text-muted-foreground">Keep it up!</p>
        </CardContent>
      </Card>
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Words</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageWordsPerEntry}</div>
          <p className="text-xs text-muted-foreground">Per entry</p>
        </CardContent>
      </Card>
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{numberOfCategories}</div>
          <p className="text-xs text-muted-foreground">Active categories</p>
        </CardContent>
      </Card>
    </div>
  );
}
