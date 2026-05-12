import { NextResponse } from "next/server";
import { notices } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, data: notices });
}
