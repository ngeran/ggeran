import { getDb } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const allSettings = await db.select().from(settings);
  return NextResponse.json(allSettings);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key, value } = await req.json();
  if (!key || value === undefined)
    return NextResponse.json({ error: "Key and value required" }, { status: 400 });

  const db = getDb();
  await db.update(settings).set({ value }).where(eq(settings.key, key));
  return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key, value } = await req.json();
  if (!key || value === undefined)
    return NextResponse.json({ error: "Key and value required" }, { status: 400 });

  const db = getDb();
  await db.insert(settings).values({ key, value });
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await req.json();
  if (!key)
    return NextResponse.json({ error: "Key required" }, { status: 400 });

  const db = getDb();
  await db.delete(settings).where(eq(settings.key, key));
  return NextResponse.json({ success: true });
}
