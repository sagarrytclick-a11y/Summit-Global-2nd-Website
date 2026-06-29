import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";
import College from "@/models/College";
import Blog from "@/models/Blog";
import Exam from "@/models/Exam";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  try {
    await connectDB();
    
    const [countriesCount, collegesCount, blogsCount, examsCount, studyAbroadCount, mbbsAbroadCount, pendingEnquiriesCount] = await Promise.all([
      Country.countDocuments({}),
      College.countDocuments({}),
      Blog.countDocuments({}),
      Exam.countDocuments({}),
      College.countDocuments({ college_type: 'study_abroad' }),
      College.countDocuments({ college_type: 'mbbs_abroad' }),
      Enquiry.countDocuments({ status: 'pending' })
    ]);
    
    const response = NextResponse.json({
      success: true,
      message: "Stats fetched successfully",
      data: {
        countries: countriesCount,
        colleges: collegesCount,
        blogs: blogsCount,
        exams: examsCount,
        study_abroad: studyAbroadCount,
        mbbs_abroad: mbbsAbroadCount,
        pending_enquiries: pendingEnquiriesCount
      },
    });

    response.headers.set('Cache-Control', 'private, max-age=30, stale-while-revalidate=60');

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
