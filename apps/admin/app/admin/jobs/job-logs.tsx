"use client";

import { useEffect, useState, useRef } from "react";

interface JobLogsProps {
  jobId: string;
  queue: string;
  active: boolean;
}

export const JobLogs = ({ jobId, queue, active }: JobLogsProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch(`/api/admin/jobs/${queue}/${jobId}/logs`);
      if (!res.ok) return;
      const data = await res.json();
      setLogs(data.logs ?? []);
    } catch {
      // silently ignore fetch errors for log polling
    }
  };

  useEffect(() => {
    fetchLogs();
    if (active) {
      intervalRef.current = setInterval(fetchLogs, 2000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [jobId, queue, active]);

  if (logs.length === 0) {
    return (
      <div className="px-4 py-2 text-neutral-600 text-xs font-mono">
        {active ? (
          <span className="animate-pulse">waiting for logs...</span>
        ) : (
          "no logs"
        )}
      </div>
    );
  }

  return (
    <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 font-mono text-xs text-neutral-400 space-y-0.5">
      {active && (
        <div className="flex items-center gap-1.5 mb-1 text-emerald-500 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          live
        </div>
      )}
      {logs.map((line, i) => (
        <div key={i} className="flex gap-3">
          <span className="text-neutral-700 shrink-0 select-none w-4 text-right">{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  );
};
