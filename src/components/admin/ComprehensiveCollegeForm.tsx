'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, X, GraduationCap, Globe, Award, FileText, Users, Building, DollarSign, Calendar, CheckCircle, Asterisk } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
}

interface ComprehensiveCollegeFormData {
  // Basic Info
  name: string
  slug: string
  college_type: 'study_abroad' | 'mbbs_abroad'
  country_ref: string
  exams: string[]
  banner_url?: string
  is_active: boolean
  establishment_year?: string

  // Overview
  overview_title: string
  overview_description: string

  // Key Highlights
  key_highlights_title: string
  key_highlights_description: string
  key_highlights_features: string[]

  // Why Choose Us
  why_choose_us_title: string
  why_choose_us_description: string
  why_choose_us_features: { title: string; description: string }[]

  // Ranking & Recognition
  ranking_title: string
  ranking_description: string
  country_ranking: string
  world_ranking: string
  accreditation: string[]

  // Admission Process
  admission_process_title: string
  admission_process_description: string
  admission_process_steps: string[]

  // Documents Required
  documents_required_title: string
  documents_required_description: string
  documents_required_documents: string[]

  // Fees Structure
  fees_structure_title: string
  fees_structure_description: string
  fees_structure_courses: { course_name: string; duration: string; annual_tuition_fee: string }[]

  // Campus Highlights
  campus_highlights_title: string
  campus_highlights_description: string
  campus_highlights_highlights: string[]
}

interface ComprehensiveCollegeFormProps {
  data: Partial<ComprehensiveCollegeFormData>
  countries: Country[]
  onChange: (field: keyof ComprehensiveCollegeFormData | (string & {}), value: unknown) => void
  loading?: boolean
}

// Required field indicator component
const RequiredField = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1">
    <span>{label}</span>
    <Asterisk className="h-3 w-3 text-red-500" />
  </div>
)

export function ComprehensiveCollegeForm({ data, countries, onChange, loading = false }: ComprehensiveCollegeFormProps) {
  const [newExam, setNewExam] = useState('')
  const [newFeature, setNewFeature] = useState('')
  const [newWhyChooseFeature, setNewWhyChooseFeature] = useState({ title: '', description: '' })
  const [newAccreditation, setNewAccreditation] = useState('')
  const [newAdmissionStep, setNewAdmissionStep] = useState('')
  const [newDocument, setNewDocument] = useState('')
  const [newCampusHighlight, setNewCampusHighlight] = useState('')
  const [newCourse, setNewCourse] = useState({ course_name: '', duration: '', annual_tuition_fee: '' })
  const darkCardClass = 'border-white/10 bg-zinc-950 text-white'
  const darkItemClass = 'border-white/10 bg-zinc-900 text-white'
  const labelClass = 'text-zinc-200'
  const inputClass = 'border-white/10 bg-black text-white placeholder:text-zinc-500 focus-visible:border-white focus-visible:ring-white/10'
  const textareaClass = 'border-white/10 bg-black text-white placeholder:text-zinc-500 focus-visible:ring-white/10 focus-visible:ring-offset-0'
  const selectTriggerClass = 'w-full border-white/10 bg-black text-white data-[placeholder]:text-zinc-500 focus:border-white focus:ring-white/10'
  const selectContentClass = 'border-white/10 bg-zinc-950 text-white'
  const selectItemClass = 'text-white focus:bg-zinc-900 focus:text-white'
  const buttonClass = 'border border-white/10 bg-white text-black hover:bg-zinc-200'
  const chipClass = 'flex items-center gap-1 rounded-2xl border border-white/10 bg-zinc-900 px-2 py-1 text-white'



  const removeCourse = (index: number, array: { course_name: string; duration: string; annual_tuition_fee: string }[], fieldName: keyof ComprehensiveCollegeFormData | (string & {})) => {
    onChange(fieldName, array.filter((_, i) => i !== index))
  }

  const addTag = (tag: string, array: string[], fieldName: keyof ComprehensiveCollegeFormData | (string & {}), setter: (value: string) => void) => {
    if (tag.trim()) {
      onChange(fieldName, [...array, tag.trim()])
      setter('')
    }
  }

  const removeTag = (index: number, array: string[], fieldName: keyof ComprehensiveCollegeFormData | (string & {})) => {
    onChange(fieldName, array.filter((_, i) => i !== index))
  }

  const addFeatureObject = (feature: { title: string; description: string }, array: unknown[], fieldName: keyof ComprehensiveCollegeFormData | (string & {}), setter: (value: { title: string; description: string }) => void) => {
    if (feature.title.trim() && feature.description.trim()) {
      onChange(fieldName, [...array, { title: feature.title.trim(), description: feature.description.trim() }])
      setter({ title: '', description: '' })
    }
  }

  const removeFeatureObject = (index: number, array: unknown[], fieldName: keyof ComprehensiveCollegeFormData | (string & {})) => {
    onChange(fieldName, array.filter((_, i) => i !== index))
  }

  const addCourse = (course: { course_name: string; duration: string; annual_tuition_fee: string }, array: unknown[], fieldName: keyof ComprehensiveCollegeFormData | (string & {}), setter: (value: { course_name: string; duration: string; annual_tuition_fee: string }) => void) => {
    if (course.course_name.trim() && course.duration.trim() && course.annual_tuition_fee.trim()) {
      onChange(fieldName, [...array, {
        course_name: course.course_name.trim(),
        duration: course.duration.trim(),
        annual_tuition_fee: course.annual_tuition_fee.trim()
      }])
      setter({ course_name: '', duration: '', annual_tuition_fee: '' })
    }
  }

  return (
    <div className="space-y-6 text-white">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-5 rounded-xl border border-white/10 bg-zinc-900 p-1 text-zinc-400">
          <TabsTrigger value="basic" className="text-zinc-400 data-[state=active]:border-white/10 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Basic Info</TabsTrigger>
          <TabsTrigger value="overview" className="text-zinc-400 data-[state=active]:border-white/10 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="highlights" className="text-zinc-400 data-[state=active]:border-white/10 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Highlights</TabsTrigger>
          <TabsTrigger value="admission" className="text-zinc-400 data-[state=active]:border-white/10 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Admission</TabsTrigger>
          <TabsTrigger value="campus" className="text-zinc-400 data-[state=active]:border-white/10 data-[state=active]:bg-zinc-950 data-[state=active]:text-white">Campus</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-4">
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className={`mb-3 block ${labelClass}`}>
                    <RequiredField label="College Name" />
                  </Label>
                  <Input
                    id="name"
                    className={inputClass}
                    value={data.name || ''}
                    onChange={(e) => onChange('name', e.target.value)}
                    placeholder="Enter college name"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug" className={`mb-3 block ${labelClass}`}>
                    <RequiredField label="Slug" />
                  </Label>
                  <Input
                    id="slug"
                    className={inputClass}
                    value={data.slug || ''}
                    onChange={(e) => onChange('slug', e.target.value)}
                    placeholder="college-slug"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="college_type" className={`mb-3 block ${labelClass}`}>
                  <RequiredField label="College Type" />
                </Label>
                <Select value={data.college_type || 'study_abroad'} onValueChange={(value) => {
                  console.log('🔍 [FORM] College type changed:', value);
                  console.log('🔍 [FORM] Previous college_type:', data.college_type);
                  onChange('college_type', value);
                }}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select college type" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem className={selectItemClass} value="study_abroad">Study Abroad</SelectItem>
                    <SelectItem className={selectItemClass} value="mbbs_abroad">MBBS Abroad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="country" className={`mb-3 block ${labelClass}`}>
                  <RequiredField label="Country" />
                </Label>
                <Select value={data.country_ref || ''} onValueChange={(value) => onChange('country_ref', value)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {countries.map((country, index) => (
                      <SelectItem className={selectItemClass} key={country._id || `country-${index}`} value={country.slug}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="banner_url" className={`mb-3 block ${labelClass}`}>
                  <RequiredField label="Banner URL" />
                </Label>
                <Input
                  id="banner_url"
                  className={inputClass}
                  value={data.banner_url || ''}
                  onChange={(e) => onChange('banner_url', e.target.value)}
                  placeholder="https://example.com/banner.jpg"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <Label htmlFor="establishment_year" className={`mb-3 block ${labelClass}`}>
                  <RequiredField label="Establishment Year" />
                </Label>
                <Input
                  id="establishment_year"
                  className={inputClass}
                  value={data.establishment_year || ''}
                  onChange={(e) => onChange('establishment_year', e.target.value)}
                  placeholder="e.g., 1850"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <Label className={`mb-3 block ${labelClass}`}>Required Exams *</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    className={inputClass}
                    value={newExam}
                    onChange={(e) => setNewExam(e.target.value)}
                    placeholder="Add exam (e.g., SAT, TOEFL)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newExam, data.exams || [], 'exams', setNewExam))}
                    disabled={loading}
                  />
                  <Button
                    className={buttonClass}
                    type="button"
                    onClick={() => addTag(newExam, data.exams || [], 'exams', setNewExam)}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.exams || []).map((exam) => (
                    <div className={chipClass} key={`exam-${exam}`}>

                      <p>{exam}</p>

                      <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeTag(data.exams?.indexOf(exam) || 0, data.exams || [], 'exams'); }} />
                    </div>
                  ))}
                </div>
                {(!data.exams || data.exams.length === 0) && (
                  <p className="text-sm text-red-500">At least one exam is required</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Overview Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="overview_title" className={`mb-3 block ${labelClass}`}>
                  <RequiredField label="Overview Title" />
                </Label>
                <Input
                  id="overview_title"
                  className={inputClass}
                  value={data.overview_title || 'Overview'}
                  onChange={(e) => onChange('overview_title', e.target.value)}
                  placeholder="Overview"
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <Label htmlFor="overview_description" className={`mb-3 block ${labelClass}`}>
                  <RequiredField label="Overview Description" />
                </Label>
                <Textarea
                  id="overview_description"
                  className={textareaClass}
                  value={data.overview_description || ''}
                  onChange={(e) => onChange('overview_description', e.target.value)}
                  placeholder="Our institution is a globally recognized center for academic excellence..."
                  rows={4}
                  disabled={loading}
                  required
                />
                {!data.overview_description?.trim() && (
                  <p className="text-sm text-red-500 mt-1">Overview description is required</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Highlights */}
        <TabsContent value="highlights" className="space-y-4">
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="key_highlights_title" className={`mb-3 block ${labelClass}`}>Key Highlights Title</Label>
                <Input
                  id="key_highlights_title"
                  className={inputClass}
                  value={data.key_highlights_title || 'Key Highlights'}
                  onChange={(e) => onChange('key_highlights_title', e.target.value)}
                  placeholder="Key Highlights"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="key_highlights_description" className={`mb-3 block ${labelClass}`}>Key Highlights Description</Label>
                <Textarea
                  id="key_highlights_description"
                  className={textareaClass}
                  value={data.key_highlights_description || ''}
                  onChange={(e) => onChange('key_highlights_description', e.target.value)}
                  placeholder="The institution stands out for its academic quality..."
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div>
                <Label className={`mb-3 block ${labelClass}`}>Key Features</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    className={inputClass}
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add key feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newFeature, data.key_highlights_features || [], 'key_highlights_features', setNewFeature))}
                    disabled={loading}
                  />
                  <Button
                    className={buttonClass}
                    type="button"
                    onClick={() => addTag(newFeature, data.key_highlights_features || [], 'key_highlights_features', setNewFeature)}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.key_highlights_features || []).map((feature) => (
                    <div className={chipClass} key={`feature-${feature}`}>
                      <p>{feature}</p>
                      <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeTag(data.key_highlights_features?.indexOf(feature) || 0, data.key_highlights_features || [], 'key_highlights_features'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Why Choose Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="why_choose_us_title" className={`mb-3 block ${labelClass}`}>Why Choose Us Title</Label>
                <Input
                  id="why_choose_us_title"
                  className={inputClass}
                  value={data.why_choose_us_title || 'Why Choose Us'}
                  onChange={(e) => onChange('why_choose_us_title', e.target.value)}
                  placeholder="Why Choose Us"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="why_choose_us_description" className={`mb-3 block ${labelClass}`}>Why Choose Us Description</Label>
                <Textarea
                  id="why_choose_us_description"
                  className={textareaClass}
                  value={data.why_choose_us_description || ''}
                  onChange={(e) => onChange('why_choose_us_description', e.target.value)}
                  placeholder="Choosing the right institution is a crucial decision..."
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div>
                <Label className={`mb-3 block ${labelClass}`}>Features (Title - Description)</Label>
                <div className="space-y-3 mb-3">
                  <Input
                    className={inputClass}
                    placeholder="Feature title"
                    value={newWhyChooseFeature.title}
                    onChange={(e) => setNewWhyChooseFeature({ ...newWhyChooseFeature, title: e.target.value })}
                    disabled={loading}
                  />
                  <Input
                    className={inputClass}
                    placeholder="Feature description"
                    value={newWhyChooseFeature.description}
                    onChange={(e) => setNewWhyChooseFeature({ ...newWhyChooseFeature, description: e.target.value })}
                    disabled={loading}
                  />
                  <Button
                    className={`${buttonClass} w-full`}
                    type="button"
                    onClick={() => addFeatureObject(newWhyChooseFeature, data.why_choose_us_features || [], 'why_choose_us_features', setNewWhyChooseFeature)}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {(data.why_choose_us_features || []).map((feature, index) => (
                    <div key={index} className={`flex items-center justify-between rounded-lg border p-3 ${darkItemClass}`}>
                      <div>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-sm text-zinc-400">{feature.description}</div>
                      </div>
                      <X className="h-4 w-4 cursor-pointer text-red-500" onClick={(e) => { e.stopPropagation(); removeFeatureObject(index, data.why_choose_us_features || [], 'why_choose_us_features'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admission */}
        <TabsContent value="admission" className="space-y-4">
          {/* Ranking & Recognition */}
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Ranking & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ranking_title">Ranking Title</Label>
                <Input
                  id="ranking_title"
                  className={inputClass}
                  value={data.ranking_title || 'Ranking & Recognition'}
                  onChange={(e) => onChange('ranking_title', e.target.value)}
                  placeholder="Ranking & Recognition"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="ranking_description">Ranking Description</Label>
                <Textarea
                  id="ranking_description"
                  className={textareaClass}
                  value={data.ranking_description || ''}
                  onChange={(e) => onChange('ranking_description', e.target.value)}
                  placeholder="The institution is consistently ranked among the top educational institutions..."
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country_ranking">Country Ranking</Label>
                  <Input
                    id="country_ranking"
                    className={inputClass}
                    value={data.country_ranking || ''}
                    onChange={(e) => onChange('country_ranking', e.target.value)}
                    placeholder="e.g., Top 10 nationally"
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="world_ranking">World Ranking</Label>
                  <Input
                    id="world_ranking"
                    className={inputClass}
                    value={data.world_ranking || ''}
                    onChange={(e) => onChange('world_ranking', e.target.value)}
                    placeholder="e.g., Top 500 globally"
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <Label>Accreditation</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    className={inputClass}
                    value={newAccreditation}
                    onChange={(e) => setNewAccreditation(e.target.value)}
                    placeholder="Add accreditation body"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newAccreditation, data.accreditation || [], 'accreditation', setNewAccreditation))}
                    disabled={loading}
                  />
                  <Button
                    className={buttonClass}
                    type="button"
                    onClick={() => addTag(newAccreditation, data.accreditation || [], 'accreditation', setNewAccreditation)}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.accreditation || []).map((acc) => (
                    <div className={chipClass} key={`acc-${acc}`}>
                      <p>{acc}</p>
                      <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeTag(data.accreditation?.indexOf(acc) || 0, data.accreditation || [], 'accreditation'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admission Process */}
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Admission Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="admission_process_title" className={`mb-3 block ${labelClass}`}>Admission Process Title</Label>
                <Input
                  id="admission_process_title"
                  className={inputClass}
                  value={data.admission_process_title || 'Admission Process'}
                  onChange={(e) => onChange('admission_process_title', e.target.value)}
                  placeholder="Admission Process"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="admission_process_description" className={`mb-3 block ${labelClass}`}>Admission Process Description</Label>
                <Textarea
                  id="admission_process_description"
                  className={textareaClass}
                  value={data.admission_process_description || ''}
                  onChange={(e) => onChange('admission_process_description', e.target.value)}
                  placeholder="Our admission process is designed to be transparent and straightforward..."
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div>
                <Label className={`mb-3 block ${labelClass}`}>Admission Steps</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    className={inputClass}
                    value={newAdmissionStep}
                    onChange={(e) => setNewAdmissionStep(e.target.value)}
                    placeholder="Add admission step"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newAdmissionStep, data.admission_process_steps || [], 'admission_process_steps', setNewAdmissionStep))}
                    disabled={loading}
                  />
                  <Button
                    className={buttonClass}
                    type="button"
                    onClick={() => addTag(newAdmissionStep, data.admission_process_steps || [], 'admission_process_steps', setNewAdmissionStep)}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.admission_process_steps || []).map((step) => (
                    <div className={chipClass} key={`step-${step}`}>
                      <p>{step}</p>
                      <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeTag(data.admission_process_steps?.indexOf(step) || 0, data.admission_process_steps || [], 'admission_process_steps'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Required */}
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="documents_required_title">Documents Required Title</Label>
                <Input
                  id="documents_required_title"
                  className={inputClass}
                  value={data.documents_required_title || 'Documents Required'}
                  onChange={(e) => onChange('documents_required_title', e.target.value)}
                  placeholder="Documents Required"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="documents_required_description">Documents Required Description</Label>
                <Textarea
                  id="documents_required_description"
                  className={textareaClass}
                  value={data.documents_required_description || ''}
                  onChange={(e) => onChange('documents_required_description', e.target.value)}
                  placeholder="Applicants must submit the following documents..."
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div>
                <Label>Required Documents</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    className={inputClass}
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Add required document"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newDocument, data.documents_required_documents || [], 'documents_required_documents', setNewDocument))}
                    disabled={loading}
                  />
                  <Button
                    className={buttonClass}
                    type="button"
                    onClick={() => addTag(newDocument, data.documents_required_documents || [], 'documents_required_documents', setNewDocument)}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.documents_required_documents || []).map((doc) => (
                    <div className={chipClass} key={`doc-${doc}`}>
                      <p>{doc}</p>
                      <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeTag(data.documents_required_documents?.indexOf(doc) || 0, data.documents_required_documents || [], 'documents_required_documents'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fees Structure */}
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Fees Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fees_structure_title">Fees Structure Title</Label>
                <Input
                  id="fees_structure_title"
                  className={inputClass}
                  value={data.fees_structure_title || 'Fees Structure'}
                  onChange={(e) => onChange('fees_structure_title', e.target.value)}
                  placeholder="Fees Structure"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="fees_structure_description">Fees Structure Description</Label>
                <Textarea
                  id="fees_structure_description"
                  className={textareaClass}
                  value={data.fees_structure_description || ''}
                  onChange={(e) => onChange('fees_structure_description', e.target.value)}
                  placeholder="The fee structure is designed to be transparent and competitive..."
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div>
                <Label>Courses</Label>
                <div className="space-y-2 mb-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input
                      className={inputClass}
                      placeholder="Course name"
                      value={newCourse.course_name}
                      onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
                      disabled={loading}
                    />
                    <Input
                      className={inputClass}
                      placeholder="Duration"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      disabled={loading}
                    />
                    <Input
                      className={inputClass}
                      placeholder="Annual fee"
                      value={newCourse.annual_tuition_fee}
                      onChange={(e) => setNewCourse({ ...newCourse, annual_tuition_fee: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <Button
                    className={`${buttonClass} w-full`}
                    type="button"
                    onClick={() => addCourse(newCourse, data.fees_structure_courses || [], 'fees_structure_courses', setNewCourse)}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
                <div className="space-y-2">
                  {(data.fees_structure_courses || []).map((course, index) => (
                    <div key={index} className={`flex items-center justify-between rounded-lg border p-3 ${darkItemClass}`}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1">
                        <div className="font-medium">{course.course_name}</div>
                        <div className="text-sm text-zinc-400">{course.duration}</div>
                        <div className="text-sm font-medium">{course.annual_tuition_fee}</div>
                      </div>
                      <X className="h-4 w-4 cursor-pointer text-red-500 ml-2" onClick={(e) => { e.stopPropagation(); removeCourse(index, data.fees_structure_courses || [], 'fees_structure_courses'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campus */}
        <TabsContent value="campus" className="space-y-4">
          <Card className={darkCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Campus Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="campus_highlights_title" className={`mb-3 block ${labelClass}`}>Campus Highlights Title</Label>
                <Input
                  id="campus_highlights_title"
                  className={inputClass}
                  value={data.campus_highlights_title || 'Campus Highlights'}
                  onChange={(e) => onChange('campus_highlights_title', e.target.value)}
                  placeholder="Campus Highlights"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="campus_highlights_description" className={`mb-3 block ${labelClass}`}>Campus Highlights Description</Label>
                <Textarea
                  id="campus_highlights_description"
                  className={textareaClass}
                  value={data.campus_highlights_description || ''}
                  onChange={(e) => onChange('campus_highlights_description', e.target.value)}
                  placeholder="Our campus provides an ideal environment for learning and personal growth..."
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div>
                <Label className={`mb-3 block ${labelClass}`}>Campus Highlights</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    className={inputClass}
                    value={newCampusHighlight}
                    onChange={(e) => setNewCampusHighlight(e.target.value)}
                    placeholder="Add campus highlight"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newCampusHighlight, data.campus_highlights_highlights || [], 'campus_highlights_highlights', setNewCampusHighlight))}
                    disabled={loading}
                  />
                  <Button
                    className={buttonClass}
                    type="button"
                    onClick={() => addTag(newCampusHighlight, data.campus_highlights_highlights || [], 'campus_highlights_highlights', setNewCampusHighlight)}
                    disabled={loading}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(data.campus_highlights_highlights || []).map((highlight) => (
                    <div className={chipClass} key={`highlight-${highlight}`}>
                      <p>{highlight}</p>
                      <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeTag(data.campus_highlights_highlights?.indexOf(highlight) || 0, data.campus_highlights_highlights || [], 'campus_highlights_highlights'); }} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
