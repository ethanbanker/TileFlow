'use client';

import * as React from 'react';

export default function DashboardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 p-4 md:p-6 lg:p-8">
      <div
        className="
          grid gap-4 md:gap-6
          [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]
        "
      >
        {children}
      </div>
    </div>
  );
}
