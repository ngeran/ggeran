import { getDb } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

const inquirySchema = z.object({
  subject: z.string().min(1),
  message: z.string().min(10),
  senderName: z.string().optional(),
  senderEmail: z.string().email().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = inquirySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 400 }
    );
  }

  const db = getDb();
  await db.insert(inquiries).values({
    subject: result.data.subject,
    message: result.data.message,
    senderName: result.data.senderName || null,
    senderEmail: result.data.senderEmail || null,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
