import { NextResponse } from "next/server";
import { doctors } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, data: doctors });
}
