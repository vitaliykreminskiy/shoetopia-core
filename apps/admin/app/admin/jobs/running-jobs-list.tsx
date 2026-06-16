"use client";

import { useState } from "react";
import type { ActiveJob } from "./types";
import { JobLogs } from "./job-logs";

interface Props {
  jobs: ActiveJob[];
  queueName: string;
  onPause: (queue: string) => Promise<void>;
  onCancel: (jobId: string, queue: string) => Promise<void>;
}

const formatAge = (processedOn: number | null): string => {
  if (!processedOn) return "just now";
  const secs = Math.floor((Date.now() - processedOn) / 1000);
  if (secs < 60) return `${secs}s ago`;
  return `${Math.floor(secs / 60)}m ago`;
};

const jobLabel = (job: ActiveJob): string =>
  job.data?.feedName ?? job.data?.programName ?? job.name;

export const RunningJobsList = ({ jobs, queueName, onPause, onCancel }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (jobs.length === 0) return null;

  return (
    <div>
      <div className="text-neutral-400 text-xs uppercase tracking-widest mb-2">
        Running · {queueName}
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        {jobs.map((job, i) => (
          <div key={job.id} className={i > 0 ? "border-t border-neutral-800" : ""}>
            <div className="px-4 py-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399] animate-pulse shrink-0" />
                <span className="text-white font-medium">{jobLabel(job)}</span>
                <span className="text-emerald-400 text-sm ml-auto">{job.progress}%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-neutral-700 rounded-full h-1">
                  <div
                    className="bg-emerald-400 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
                <button
                  onClick={() => onPause(queueName)}
                  className="bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white px-3 py-1 rounded text-xs transition-colors"
                >
                  ⏸ Pause queue
                </button>
                <button
                  onClick={() => onCancel(job.id, queueName)}
                  className="bg-neutral-800 border border-neutral-700 hover:border-red-800 text-red-400 hover:text-red-300 px-3 py-1 rounded text-xs transition-colors"
                >
                  ✕ Cancel
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-neutral-500 text-xs">Started {formatAge(job.processedOn)}</span>
                <button
                  onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                  className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors"
                >
                  {expandedId === job.id ? "▲ hide logs" : "▼ logs"}
                </button>
              </div>
            </div>
            {expandedId === job.id && (
              <JobLogs jobId={job.id} queue={job.queue} active={true} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
