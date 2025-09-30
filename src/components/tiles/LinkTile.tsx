'use client';

import Tile from '@/components/ui/Tile';

type Props = {
  title: string;
  href: string;
  note?: string;
};

function faviconFor(href: string) {
  try {
    const u = new URL(href);
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=64`;
  } catch {
    return undefined;
  }
}

export default function LinkTile({ title, href, note }: Props) {
  const iconUrl = faviconFor(href);

  const icon = (
    <div className="size-9 rounded-xl bg-neutral-800/70 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
      {iconUrl ? (
        // Favicon fetch is just an <img>; safe in browser.
        <img src={iconUrl} alt="" className="size-5" />
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" className="text-neutral-300">
          <path fill="currentColor" d="M3.9,12a5,5,0,0,1,5-5h3v2H8.9a3,3,0,0,0,0,6h3v2h-3A5,5,0,0,1,3.9,12Zm6.2,1h3v-2h-3Zm4-6h3a5,5,0,0,1,0,10h-3V15h3a3,3,0,0,0,0-6h-3Z"/>
        </svg>
      )}
    </div>
  );

  return (
    <Tile
      title={title}
      subtitle="Link"
      icon={icon}
      status="idle"
      statusText="Ready"
      href={href}
      footer={<span className="truncate">{href}</span>}
    >
      {note && <span className="text-neutral-400">{note}</span>}
    </Tile>
  );
