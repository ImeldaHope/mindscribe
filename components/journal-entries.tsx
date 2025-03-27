"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Entry } from "@/types";

export function JournalEntries({
  title,
  excerpt,
  createdAt: date,
  category,
  mood,
}: Entry) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <time className="text-sm text-muted-foreground">
            {format(new Date(date), "MMM d, yyyy")}
          </time>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {/* <Badge variant="secondary">{category.name}</Badge> */}
        {category?.name && <Badge variant="secondary">{category.name}</Badge>}
        <Badge variant="outline">{mood}</Badge>
      </CardFooter>
    </Card>
  );
}