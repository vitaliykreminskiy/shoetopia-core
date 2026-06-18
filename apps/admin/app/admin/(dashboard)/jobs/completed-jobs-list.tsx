"use client";

import { useState } from "react";
import type { CompletedJob } from "./types";
import { JobLogs } from "./job-logs";

interface Props {
  jobs: CompletedJob[];
}

const jobLabel = (job: CompletedJob): string =>
  job.data?.feedName ?? job.data?.programName ?? job.name;

const formatTime = (ts: number | null): string => {
  if (!ts) return "—";
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const importedCount = (job: CompletedJob): string => {
  const rv = job.returnvalue;
  if (!rv) return "";
  if (typeof rv.imported === "number") return `${rv.imported} imported`;
  return "";
};

export const CompletedJobsList = ({ jobs }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (jobs.length === 0) return null;

  return (
    <div>
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
        Completed (last {jobs.length})
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {jobs.map((job, i) => (
          <div key={job.id} className={i > 0 ? "border-t border-neutral-800" : ""}>
            <div className="px-4 py-3 flex items-center gap-3 text-sm">
              <span className="text-neutral-500 text-xs">✓</span>
              <span className="text-neutral-400">{jobLabel(job)}</span>
              <span className="text-neutral-600 text-xs ml-auto">{importedCount(job)}</span>
              <span className="text-neutral-600 text-xs">{formatTime(job.finishedOn)}</span>
              <button
                onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                className="text-neutral-700 hover:text-neutral-400 text-xs transition-colors"
              >
                {expandedId === job.id ? "▲" : "▼"}
              </button>
            </div>
            {expandedId === job.id && (
              <JobLogs jobId={job.id} queue={job.queue} active={false} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
