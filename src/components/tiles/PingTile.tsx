"use client";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function PingTile({ title, target }: { title: string; target: string }) {
  const { data, error, isLoading } = useSWR(`/api/status?ping=${encodeURIComponent(target)}`, fetcher, { refreshInterval: 30000 });

  let status = "Checking…", color = "text-neutral-300";
  if (error) { status = "Error"; color = "text-red-400"; }
  else if (!isLoading && data) {
    if (data.ok === true) { status = "Online"; color = "text-green-400"; }
    else if (data.ok === false) { status = "Offline"; color = "text-red-400"; }
    else { status = "Unknown"; color = "text-yellow-400"; }
  }

  return (
    <div className="rounded-lg p-4 bg-neutral-800">
      <div className="text-sm uppercase tracking-wide text-neutral-400">Ping</div>
      <div className="mt-1 text-lg font-semibold">{title}</div>
      <div className={`mt-2 text-sm ${color}`}>{status}</div>
      <div className="mt-1 text-xs text-neutral-400 break-all">{target}</div>
    </div>
  );
}
