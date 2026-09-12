"use client";

import { useId, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const activity = {
  "7 Days": [45, 58, 51, 67, 61, 69, 71],
  "30 Days": [
    37, 30, 40, 34, 47, 41, 52, 45, 57, 50, 61, 54, 64, 57, 68, 61, 69, 71,
  ],
  "90 Days": [
    20, 28, 24, 37, 31, 44, 38, 49, 43, 55, 48, 60, 54, 65, 59, 70, 66, 75,
  ],
};
type Period = keyof typeof activity;

export default function PlatformActivity() {
  const [period, setPeriod] = useState<Period>("30 Days");
  const gradientId = useId().replace(/:/g, "");
  const data = activity[period].map((value, index, values) => ({
    day: `Day ${Math.round((index * (parseInt(period) - 1)) / (values.length - 1)) + 1}`,
    activity: value,
  }));

  return (
    <Card className="gap-2 rounded-md border-0 bg-white px-3 pb-3 pt-4 shadow-[0px_4px_6px_0px_#0000001A]">
      <div className="flex items-center justify-between gap-3 px-1">
        <h2 className="text-lg font-semibold text-[#171c1b]">
          Platform Activity
        </h2>
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Activity time range"
        >
          {(Object.keys(activity) as Period[]).map((range) => (
            <Button
              key={range}
              variant="ghost"
              size="sm"
              aria-pressed={period === range}
              onClick={() => setPeriod(range)}
              className={cn(
                "h-6 rounded-sm px-2.5 text-[10px] font-normal text-[#7e9094] hover:bg-[#e8eeee] cursor-pointer",
                period === range &&
                  "bg-[#003b37] text-white hover:bg-[#003b37] hover:text-white cursor-pointer",
              )}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      <ChartContainer
        config={{ activity: { label: "Activity", color: "#0dce69" } }}
        className="h-[300px] w-full aspect-auto"
        aria-label={`Platform activity over ${period.toLowerCase()}`}
      >
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{ top: 4, right: 3, bottom: 0, left: -22 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0dce69" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#0dce69" stopOpacity={0.015} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e8eeee" strokeDasharray="2 4" />
          <XAxis
            dataKey="day"
            tick={false}
            axisLine={false}
            tickLine={false}
            height={0}
            interval={Math.ceil(data.length / 5) - 1}
          />
          <YAxis
            domain={[0, 80]}
            ticks={[0, 20, 40, 60, 80]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#b9c2c0" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="linear"
            dataKey="activity"
            stroke="var(--color-activity)"
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
