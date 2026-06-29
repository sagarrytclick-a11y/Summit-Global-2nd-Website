import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Enquiry from '@/models/Enquiry'
import { sendEmail, emailTemplates } from '@/lib/email'

async function sendEnquiryEmails(payload: {
  name: string
  email: string
  phone: string
  city: string
  interest: string
  message: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL

  if (!adminEmail) {
    return
  }

  const adminTemplate = emailTemplates.enquiryNotification(payload)
  const studentTemplate = emailTemplates.enquiryConfirmation({
    name: payload.name,
    interest: payload.interest,
  })

  await Promise.allSettled([
    sendEmail({
      to: adminEmail,
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      text: adminTemplate.text,
    }),
    sendEmail({
      to: payload.email,
      subject: studentTemplate.subject,
      html: studentTemplate.html,
      text: studentTemplate.text,
    }),
  ])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, city, interest } = body

    if (!name || !email || !phone || !city || !interest) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, city, interest are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Create new enquiry
    const enquiry = new Enquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city.trim(),
      interest: interest,
      message: body.message?.trim() || '',
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    })

    // Save to database
    await enquiry.save()

    void sendEnquiryEmails({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city.trim(),
      interest,
      message: body.message?.trim() || '',
    }).catch((emailError) => {
      console.error('Email sending error:', emailError)
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully',
        enquiryId: enquiry._id
      },
      { status: 201 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const interest = searchParams.get('interest')
    const search = searchParams.get('search')

    // Build query
    const query: any = {}

    if (status && status !== 'all') {
      query.status = status
    }

    if (interest && interest !== 'all') {
      query.interest = interest
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ]
    }

    // Connect to database
    await connectDB()

    // Get enquiries with pagination
    const skip = (page - 1) * limit
    const enquiries = await Enquiry
      .find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count for pagination
    const total = await Enquiry.countDocuments(query)

    // Map database fields to frontend interface
    const mappedEnquiries = enquiries.map(enquiry => ({
      ...enquiry,
      createdAt: enquiry.created_at,
      updatedAt: enquiry.updated_at,
      _id: enquiry._id?.toString() || enquiry.id?.toString()
    }))

    return NextResponse.json({
      success: true,
      data: {
        enquiries: mappedEnquiries,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: enquiries.length === limit
      }
    })

  } catch (error) {
    console.error('Error fetching enquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    )
  }
}
