import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

export async function GET() {
  try {
    await connectDB();
    const exams = await Exam.find({ is_active: true })
      .select('name short_name slug exam_type conducting_body exam_mode frequency description display_order')
      .sort({ display_order: 1, createdAt: -1 })
      .lean()
    
    const response = NextResponse.json({
      success: true,
      message: "Exams fetched successfully",
      data: exams,
    });
    
    response.headers.set(
      'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600'
    );
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch exams", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
