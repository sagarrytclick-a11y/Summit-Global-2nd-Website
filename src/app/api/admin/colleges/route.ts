import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';
    const status = searchParams.get('status') || '';

    await connectDB();
    
    let query: any = {};
    
    if (status && status !== 'all') {
      query.is_active = status === 'active';
    }
    
    if (country && country !== 'all') {
      query.country_ref = country;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await College.countDocuments(query);
    
    const colleges = await College.find(query)
      .populate('country_ref')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: {
        colleges,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: colleges.length === limit
      },
    });
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

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { 
      name, 
      slug, 
      college_type,
      country_ref, 
      exams,
      overview,
      key_highlights,
      why_choose_us,
      ranking,
      admission_process,
      documents_required,
      fees_structure,
      campus_highlights,
      fees, 
      duration, 
      establishment_year,
      banner_url, 
      about_content, 
      is_active 
    } = body;

    if (!name || !slug || !college_type || !country_ref) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, slug, college_type, country_ref" },
        { status: 400 }
      );
    }

    if (!overview?.description) {
      return NextResponse.json(
        { success: false, message: "Overview description is required" },
        { status: 400 }
      );
    }

    const country = await Country.findOne({ slug: country_ref });
    if (!country) {
      return NextResponse.json(
        { success: false, message: `Country with slug '${country_ref}' not found` },
        { status: 400 }
      );
    }

    const existingCollege = await College.findOne({ slug });
    if (existingCollege) {
      return NextResponse.json(
        { success: false, message: "College with this slug already exists" },
        { status: 409 }
      );
    }

    const college = new College({
      name,
      slug,
      college_type: college_type || 'study_abroad',
      country_ref: country._id,
      exams: exams || [],
      
      overview: overview || {
        title: "Overview",
        description: about_content || ""
      },
      key_highlights: key_highlights || {
        title: "Key Highlights",
        description: "",
        features: []
      },
      why_choose_us: why_choose_us || {
        title: "Why Choose Us",
        description: "",
        features: []
      },
      ranking: ranking || {
        title: "Ranking & Recognition",
        description: "",
        country_ranking: "",
        world_ranking: "",
        accreditation: []
      },
      admission_process: admission_process || {
        title: "Admission Process",
        description: "",
        steps: []
      },
      documents_required: documents_required || {
        title: "Documents Required",
        description: "",
        documents: []
      },
      fees_structure: fees_structure || {
        title: "Fees Structure",
        description: "",
        courses: [{
          course_name: "Program",
          duration: duration || "N/A",
          annual_tuition_fee: fees ? `$${fees.toLocaleString()}` : "N/A"
        }]
      },
      campus_highlights: campus_highlights || {
        title: "Campus Highlights",
        description: "",
        highlights: []
      },

      fees: fees ? Number(fees) : undefined,
      duration,
      establishment_year,
      banner_url: banner_url || "",
      about_content,
      
      is_active: is_active !== undefined ? is_active : true,
    });

    const savedCollege = await college.save();

    return NextResponse.json(
      { success: true, message: "College created successfully", data: savedCollege },
      { status: 201 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create college", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
