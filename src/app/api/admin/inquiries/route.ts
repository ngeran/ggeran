import { getDb } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const all = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt));
  return NextResponse.json(all);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  if (!id || !status)
    return NextResponse.json({ error: "ID and status required" }, { status: 400 });

  const db = getDb();
  await db
    .update(inquiries)
    .set({ status })
    .where(eq(inquiries.id, id));

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  await db.delete(inquiries).where(eq(inquiries.id, id));
  return NextResponse.json({ success: true });
}
