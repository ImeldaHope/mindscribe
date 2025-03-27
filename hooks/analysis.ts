"use client";
import { useMemo } from "react";



const useJournalStats = (entries) => {
  return useMemo(() => {
    if (!entries || entries.length === 0) {
      return {
        totalEntries: 0,
        writingStreak: 0,
        averageWordsPerEntry: "0.00",
        numberOfCategories: 0,
      };
    }

    const totalEntries = entries.length;
    const wordCounts = entries.map((entry) => entry.content.split(" ").length);
    const averageWordsPerEntry =
      wordCounts.reduce((a, b) => a + b, 0) / totalEntries;

    const categories = new Set(entries.map((entry) => entry.category));
    const numberOfCategories = categories.size;

    let writingStreak = 1;
    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    for (let i = 1; i < sortedEntries.length; i++) {
      const prevDate = new Date(sortedEntries[i - 1].date);
      const currDate = new Date(sortedEntries[i].date);
      const diff = (prevDate - currDate) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        writingStreak++;
      } else {
        break;
      }
    }

    return {
      totalEntries,
      writingStreak,
      averageWordsPerEntry: averageWordsPerEntry.toFixed(2),
      numberOfCategories,
    };
  }, [entries]);
};

export default useJournalStats;
