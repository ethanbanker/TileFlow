import { NextResponse } from "next/server";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const sh = promisify(exec);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ping = url.searchParams.get("ping");
  if (ping) {
    try {
      await sh(`ping -c 1 -W 1 ${ping}`);
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ ok: false });
    }
  }
  return NextResponse.json({ error: "No handler" }, { status: 400 });
}
