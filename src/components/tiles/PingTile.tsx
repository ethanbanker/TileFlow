'use client';

import useSWR from 'swr';
import Tile from '@/components/ui/Tile';

type Props = { title: string; url: string };

const fetcher = (input: string) => fetch(input).then(r => r.json());

function toStatus(d: any, err: any): {
  status: 'ok'|'warn'|'error'|'loading'|'idle',
  statusText: string,
  ms?: number
} {
  if (err) return { status: 'error', statusText: 'Error' };
  if (!d) return { status: 'loading', statusText: 'Checking...' };
  if (d.ok) return { status: 'ok', statusText: `${d.status} ${d.statusText}`, ms: d.ms };
  if (d.status >= 500 || d.status === 0) return { status: 'error', statusText: `${d.status} ${d.statusText}` };
  return { status: 'warn', statusText: `${d.status} ${d.statusText}` };
}

export default function PingTile({ title, url }: Props) {
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/ping-check?url=${encodeURIComponent(url)}`,
    fetcher,
    { refreshInterval: 30_000, revalidateOnFocus: false }
  );

  const { status, statusText, ms } = toStatus(isLoading ? null : data, error);
  const shownUrl = data?.finalUrl ?? url;

  return (
    <Tile
      title={title}
      subtitle="Ping"
      status={status}
      statusText={statusText + (isValidating ? ' • Refreshing' : '')}
      footer={
        <div className="flex items-center justify-between">
          <span className="truncate">{shownUrl}</span>
          {typeof ms === 'number' && (
            <span className="text-neutral-300">{ms} ms</span>
          )}
        </div>
      }
    >
      {/* Body can hold extra details; keep clean by default */}
    </Tile>
  );
}
