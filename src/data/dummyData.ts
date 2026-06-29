export interface Country {
  id?: string
  _id?: string
  name: string
  slug: string
  flag: string
  description: string
  metaTitle?: string
  meta_title?: string
  metaDescription?: string
  meta_description?: string
  status?: 'active' | 'inactive'
  is_active?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface College {
  id: string
  name: string
  country: string
  exams: string[]
  fees: number
  duration: string
  logo: string
  banner: string
  about: string
  status: 'active' | 'inactive'
  college_type: 'study_abroad' | 'mbbs_abroad'
  createdAt: string
  updatedAt: string
}

export interface Blog {
  id?: string
  _id?: string
  title: string
  category: string
  tags?: string[]
  featuredImage?: string
  image?: string
  content: string
  status?: 'published' | 'draft'
  is_active?: boolean
  createdAt?: string
  updatedAt?: string
}

// Dummy data
export const dummyCountries: Country[] = [
  {
    id: '1',
    _id: '1',
    name: 'United States',
    slug: 'united-states',
    flag: '🇺🇸',
    description: 'The United States offers world-class education with diverse programs and research opportunities.',
    metaTitle: 'Study in United States | Alpha World Education',
    meta_title: 'Study in United States | Summit Global',
    metaDescription: 'Explore top universities and colleges in the United States for international students.',
    meta_description: 'Explore top universities and colleges in the United States for international students.',
    status: 'active',
    is_active: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    _id: '2',
    name: 'United Kingdom',
    slug: 'united-kingdom',
    flag: '🇬🇧',
    description: 'The UK is home to some of the world\'s oldest and most prestigious universities.',
    metaTitle: 'Study in United Kingdom | Alpha World Education',
    meta_title: 'Study in United Kingdom | Summit Global',
    metaDescription: 'Discover excellent educational opportunities in the United Kingdom.',
    meta_description: 'Discover excellent educational opportunities in the United Kingdom.',
    status: 'active',
    is_active: true,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    _id: '3',
    name: 'Canada',
    slug: 'canada',
    flag: '🇨🇦',
    description: 'Canada provides high-quality education with affordable tuition and post-graduation work opportunities.',
    metaTitle: 'Study in Canada | Alpha World Education',
    meta_title: 'Study in Canada | Summit Global',
    metaDescription: 'Find the best colleges and universities in Canada for international students.',
    meta_description: 'Find the best colleges and universities in Canada for international students.',
    status: 'active',
    is_active: true,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    _id: '4',
    name: 'Australia',
    slug: 'australia',
    flag: '🇦🇺',
    description: 'Australia offers excellent education with beautiful campuses and great lifestyle.',
    metaTitle: 'Study in Australia | Alpha World Education',
    meta_title: 'Study in Australia | Summit Global',
    metaDescription: 'Explore top Australian universities and student life opportunities.',
    meta_description: 'Explore top Australian universities and student life opportunities.',
    status: 'inactive',
    is_active: false,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  }
]

export const dummyColleges: College[] = [
  {
    id: '1',
    name: 'Harvard University',
    country: 'united-states',
    exams: ['SAT', 'TOEFL', 'IELTS'],
    fees: 55000,
    duration: '4 years',
    logo: '/logos/harvard.png',
    banner: '/banners/harvard.jpg',
    about: 'Harvard University is one of the most prestigious universities in the world, offering exceptional undergraduate and graduate programs.',
    status: 'active',
    college_type: 'study_abroad',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'University of Oxford',
    country: 'united-kingdom',
    exams: ['IELTS', 'TOEFL'],
    fees: 38000,
    duration: '3 years',
    logo: '/logos/oxford.png',
    banner: '/banners/oxford.jpg',
    about: 'The University of Oxford is the oldest university in the English-speaking world and one of the most prestigious.',
    status: 'active',
    college_type: 'study_abroad',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    name: 'University of Toronto',
    country: 'canada',
    exams: ['IELTS', 'TOEFL'],
    fees: 42000,
    duration: '4 years',
    logo: '/logos/uoft.png',
    banner: '/banners/uoft.jpg',
    about: 'The University of Toronto is a public research university and a world leader in higher education and research.',
    status: 'active',
    college_type: 'mbbs_abroad',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    name: 'University of Melbourne',
    country: 'australia',
    exams: ['IELTS', 'TOEFL', 'PTE'],
    fees: 35000,
    duration: '3 years',
    logo: '/logos/melbourne.png',
    banner: '/banners/melbourne.jpg',
    about: 'The University of Melbourne is a public research university and one of Australia\'s oldest universities.',
    status: 'inactive',
    college_type: 'mbbs_abroad',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  }
]

export const dummyBlogs: Blog[] = [
  {
    id: '1',
    _id: '1',
    title: 'Top 10 Universities for International Students in 2024',
    category: 'University Rankings',
    tags: ['universities', 'international students', '2024'],
    featuredImage: '/blogs/top-universities.jpg',
    image: '/blogs/top-universities.jpg',
    content: 'Discover the best universities around the world that welcome international students with open arms...',
    status: 'published',
    is_active: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    _id: '2',
    title: 'How to Prepare for TOEFL Exam: Complete Guide',
    category: 'Exam Preparation',
    tags: ['TOEFL', 'exam tips', 'preparation'],
    featuredImage: '/blogs/toefl-guide.jpg',
    image: '/blogs/toefl-guide.jpg',
    content: 'A comprehensive guide to help you prepare for the TOEFL exam and achieve your target score...',
    status: 'published',
    is_active: true,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    _id: '3',
    title: 'Scholarship Opportunities for Canadian Students',
    category: 'Scholarships',
    tags: ['scholarships', 'canada', 'funding'],
    featuredImage: '/blogs/canada-scholarships.jpg',
    image: '/blogs/canada-scholarships.jpg',
    content: 'Explore various scholarship opportunities available for international students in Canada...',
    status: 'draft',
    is_active: false,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  }
]
