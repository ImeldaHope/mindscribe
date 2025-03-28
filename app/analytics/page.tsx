"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, Calendar } from "lucide-react";
const data = [
  { name: "Mon", entries: 4 },
  { name: "Tue", entries: 3 },
  { name: "Wed", entries: 5 },
  { name: "Thu", entries: 2 },
  { name: "Fri", entries: 4 },
  { name: "Sat", entries: 6 },
  { name: "Sun", entries: 4 },
];

const monthlyData = [
  { name: "Jan", entries: 15, words: 4500 },
  { name: "Feb", entries: 20, words: 6000 },
  { name: "Mar", entries: 28, words: 8400 },
];

const timeData = [
  { hour: "6AM", entries: 2 },
  { hour: "9AM", entries: 5 },
  { hour: "12PM", entries: 3 },
  { hour: "3PM", entries: 4 },
  { hour: "6PM", entries: 6 },
  { hour: "9PM", entries: 8 },
];

interface DashboardChartsProps {
  data: any[];
  monthlyData: any[];
  timeData: any[];
}

export default function Analytics() {
  return (
    <>
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="entries"
                  stroke="#8884d8"
                  name="Entries"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="words"
                  stroke="#82ca9d"
                  name="Words"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Writing Time Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="entries"
                  stroke="#88a4d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Yearly Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="entries"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                  name="Total Entries"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
