"use client";

import React, { useEffect, useState } from 'react'
import CalendarHeatmap, { ReactCalendarHeatmapValue } from 'react-calendar-heatmap'
import { subDays, format } from "date-fns";



export default function Heatmap() {
  const today = new Date();
  const [heatmapData, setHeatmapData] = useState<
    ReactCalendarHeatmapValue<string>[]
    >([]);
  
  useEffect(() => {
    const data = Array.from({ length: 365 }, (_, i) => {
      const date = subDays(today, 364 - i);
      return {
        date: format(date, "yyyy-MM-dd"),
        count: Math.floor(Math.random() * 5), // Ensures random values are only set on client
      };
    });
    setHeatmapData(data);
  }, []);
  
  return (
    <CalendarHeatmap
      startDate={subDays(today, 365)}
      endDate={today}
      values={heatmapData}
      classForValue={(value: ReactCalendarHeatmapValue<string> | undefined) => {        
        if (!value || typeof value.count !== "number") {
          return "color-empty";
        }
        return `color-scale-${Math.min(value.count, 4)}`;
      }}
      titleForValue={(value: ReactCalendarHeatmapValue<string> | undefined) => {
        if (!value || !("count" in value) || !("date" in value)) {
          return "No entries";
        }
        return `${value.count} entries on ${value.date}`;
      }}      
    />
  );
}
