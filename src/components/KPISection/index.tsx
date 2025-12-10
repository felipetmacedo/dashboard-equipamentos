"use client";

import { TopPriorityCard } from "./TopPriorityCard";
import { AgePercentageChart } from "./AgePercentageChart";

export function KPISection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <TopPriorityCard />
      </div>
      <div className="lg:col-span-2">
        <AgePercentageChart />
      </div>
    </div>
  );
}
