import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const search = searchParams.get('search')?.trim() || '';
    const category = searchParams.get('category') || '';

    let query: any = { is_active: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search.length >= 2) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const blogsQuery = Blog.find(query)
      .select('title slug excerpt category tags banner_url author createdAt updatedAt published_at read_time views content image')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const [total, blogs] = await Promise.all([
      Blog.countDocuments(query),
      blogsQuery,
    ]);
    
    const response = NextResponse.json({
      success: true,
      message: "Blogs fetched successfully",
      data: {
        blogs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: blogs.length === limit
      },
    });
    
    response.headers.set(
      'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=600');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=600');
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
