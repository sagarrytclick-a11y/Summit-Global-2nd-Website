import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    const currentCollege = await College.findOne({ slug, is_active: true })
      .select('country_ref _id')
      .populate('country_ref')
      .lean();

    if (!currentCollege) {
      return NextResponse.json(
        { success: false, message: "College not found" },
        { status: 404 }
      );
    }

    let relatedColleges = await College.find({
      _id: { $ne: currentCollege._id },
      country_ref: currentCollege.country_ref._id,
      is_active: true
    })
    .select('name slug country_ref banner_url overview fees duration ranking college_type')
    .populate('country_ref', 'name slug flag')
    .limit(6)
    .sort({ createdAt: -1 })
    .lean();

    if (relatedColleges.length < 3) {
      const additionalColleges = await College.find({
        _id: { $ne: currentCollege._id },
        country_ref: { $ne: currentCollege.country_ref._id },
        is_active: true
      })
      .select('name slug country_ref banner_url overview fees duration ranking college_type')
      .populate('country_ref', 'name slug flag')
      .limit(6 - relatedColleges.length)
      .sort({ createdAt: -1 })
      .lean();
      
      relatedColleges = [...relatedColleges, ...additionalColleges];
    }

    return NextResponse.json({
      success: true,
      message: "Related colleges fetched successfully",
      data: relatedColleges,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch related colleges", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
