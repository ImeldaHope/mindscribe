"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { JournalEntries } from "./journal-entries";
import { Entry } from "@/types";

export function SearchDialog({entries}: {entries: Entry[]}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(entries);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter mock entries based on search query
    const filtered = entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(query.toLowerCase()) ||
        entry.content.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-200/50"
        >
          <Search className="w-4 h-4 text-purple-500" />
          Search Entries
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Journal Entries</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <Input
            placeholder="Search by title or content..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="border-purple-200"
          />
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {results.map((entry, index) => (
              <JournalEntries key={index} {...entry} />
            ))}
            {results.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No entries found matching your search.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
