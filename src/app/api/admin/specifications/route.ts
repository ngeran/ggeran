import { getDb } from "@/lib/db";
import { specifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const all = await db.select().from(specifications);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = getDb();
  const result = await db
    .insert(specifications)
    .values({
      title: body.title,
      description: body.description,
      specNumber: body.specNumber,
      icon: body.icon || "wrench",
      serialTag: body.serialTag,
      category: body.category,
      active: body.active ?? true,
      sortOrder: body.sortOrder || 0,
    })
    .returning();

  return NextResponse.json(result[0], { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (!body.id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  const result = await db
    .update(specifications)
    .set({
      title: body.title,
      description: body.description,
      specNumber: body.specNumber,
      icon: body.icon,
      serialTag: body.serialTag,
      category: body.category,
      active: body.active,
      sortOrder: body.sortOrder,
    })
    .where(eq(specifications.id, body.id))
    .returning();

  return NextResponse.json(result[0]);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  await db.delete(specifications).where(eq(specifications.id, id));
  return NextResponse.json({ success: true });
}
