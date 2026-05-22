import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const all = await db.select().from(products);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = getDb();
  const result = await db
    .insert(products)
    .values({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      badgeText: body.badgeText || "SAMPLE_OUTPUT",
      referenceCode: body.referenceCode || null,
      status: body.status || "published",
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
    .update(products)
    .set({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      badgeText: body.badgeText,
      referenceCode: body.referenceCode,
      status: body.status,
      sortOrder: body.sortOrder,
    })
    .where(eq(products.id, body.id))
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
  await db.delete(products).where(eq(products.id, id));
  return NextResponse.json({ success: true });
}
