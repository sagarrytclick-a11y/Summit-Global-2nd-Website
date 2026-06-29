import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') || '12') : null;
    const search = searchParams.get('search')?.trim();
    const countrySlug = searchParams.get('country');
    const exam = searchParams.get('exam');
    const collegeType = searchParams.get('college_type');
    
    const skip = limit ? (page - 1) * limit : 0;
    
    const query: Record<string, unknown> = { is_active: true };
    
    if (search && search.length >= 2) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (countrySlug && countrySlug !== 'all') {
      const country = await Country.findOne({ slug: countrySlug, is_active: true }).select('_id').lean();
      if (country) {
        query.country_ref = country._id;
      } else {
        return NextResponse.json({
          success: true,
          message: "Colleges fetched successfully",
          data: { colleges: [], total: 0 },
        });
      }
    }
    
    if (exam && exam !== 'all') {
      query.exams = { $in: [exam] };
    }
    
    if (collegeType && collegeType !== 'all') {
      query.college_type = collegeType;
    }
    
    let selectFields = 'name slug country_ref fees duration establishment_year ranking banner_url college_type overview fees_structure key_highlights';
    if (limit && limit > 50) {
      selectFields = 'name slug country_ref college_type';
    }

    const collegesQuery = College.find(query)
      .select(selectFields)
      .populate('country_ref', 'name slug flag')
      .sort({ ranking: 1, name: 1 })
      .skip(skip)
      .lean();

    if (limit) {
      collegesQuery.limit(limit);
    }

    const [total, colleges] = await Promise.all([
      College.countDocuments(query),
      collegesQuery,
    ]);
    
    const response = NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: {
        colleges,
        total,
        page,
        limit: limit || total,
        totalPages: limit ? Math.ceil(total / limit) : 1,
        hasNext: limit ? skip + limit < total : false
      },
    });
    
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=180, stale-while-revalidate=300'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=300');
    
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch colleges",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
