'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search, Filter, Mail, Phone, Calendar, User, MessageSquare, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAdmin, Enquiry } from '@/contexts/AdminContext'
import { toast } from 'sonner'

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [interestFilter, setInterestFilter] = useState('all')
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<Enquiry | null>(null)
  
  const {
    enquiries: {
      isModalOpen,
      setIsModalOpen,
      selectedEnquiry,
      setSelectedEnquiry,
      enquiryToDelete,
      setEnquiryToDelete,
      deleteModalOpen,
      setDeleteModalOpen,
      searchTerm,
      setSearchTerm,
      selectedStatus,
      setSelectedStatus,
      selectedInterest,
      setSelectedInterest,
      currentPage,
      setCurrentPage,
      debouncedSearchTerm,
      setDebouncedSearchTerm
    }
  } = useAdmin()

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, statusFilter, interestFilter])

  // Fetch enquiries from API
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '10',
          ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
          ...(statusFilter && statusFilter !== 'all' && { status: statusFilter }),
          ...(interestFilter && interestFilter !== 'all' && { interest: interestFilter })
        })

        const response = await fetch(`/api/enquiries?${params}`)
        const data = await response.json()
        
        if (data.success) {
          setEnquiries(data.data.enquiries || [])
          setTotalCount(data.data.total || 0)
          setTotalPages(data.data.totalPages || 1)
        } else {
          setError(data.error || 'Failed to fetch enquiries')
        }
      } catch (err) {
        setError('Failed to fetch enquiries')
        console.error('Error fetching enquiries:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [currentPage, debouncedSearchTerm, statusFilter, interestFilter])

  // Remove client-side filtering since we're doing server-side filtering

  const handleViewEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setIsModalOpen(true)
  }

  const handleStatusChange = async (enquiryId: string, newStatus: Enquiry['status']) => {
    if (!enquiryId) return
    
    try {
      // Call API to update status
      const response = await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // Update local state after successful API call
      setEnquiries(prev => prev.map(enquiry => 
        (enquiry._id || enquiry.id) === enquiryId 
          ? { ...enquiry, status: newStatus, updatedAt: new Date().toISOString() }
          : enquiry
      ))
      toast.success('Enquiry status updated successfully!')
    } catch (error) {
      console.error('Error updating enquiry status:', error)
      toast.error('Failed to update enquiry status')
      // Revert the status change by refetching
      window.location.reload()
    }
  }

  const handleDeleteEnquiry = (enquiry: Enquiry) => {
    setDeleteConfirmOpen(enquiry)
  }

  const confirmDelete = async () => {
    if (!deleteConfirmOpen) return
    
    try {
      const enquiryId = deleteConfirmOpen._id || deleteConfirmOpen.id
      console.log('Deleting enquiry with ID:', enquiryId)
      console.log('Full enquiry object:', deleteConfirmOpen)
      
      if (!enquiryId) {
        toast.error('No enquiry ID found')
        return
      }
      
      // Call API to delete
      const response = await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'DELETE'
      })

      console.log('Delete response status:', response.status)
      const responseData = await response.json()
      console.log('Delete response data:', responseData)

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to delete enquiry')
      }

      setEnquiries(prev => prev.filter(e => (e._id || e.id) !== enquiryId))
      toast.success('Enquiry deleted successfully!')
      setDeleteConfirmOpen(null)
    } catch (error) {
      console.error('Error deleting enquiry:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete enquiry')
    }
  }

  const getStatusColor = (status: Enquiry['status']) => {
    switch (status) {
      case 'pending': return 'bg-zinc-100 text-zinc-800 border-zinc-200'
      case 'contacted': return 'bg-zinc-100 text-zinc-800 border-zinc-200'
      case 'resolved': return 'bg-black text-white border-black'
      case 'closed': return 'bg-zinc-200 text-zinc-800 border-zinc-300'
      default: return 'bg-zinc-100 text-zinc-800 border-zinc-200'
    }
  }

  const getInterestColor = (interest: string) => {
    switch (interest) {
      case 'study-abroad': return 'bg-black text-white'
      case 'mbbs-abroad': return 'bg-zinc-700 text-white'
      default: return 'bg-zinc-600 text-white'
    }
  }

  const columns: Array<{
    key: keyof Enquiry | string;
    title: string;
    render?: (value: unknown, record: Enquiry, index: number) => React.ReactNode;
    width?: string;
  }> = [
    {
      key: 'name',
      title: 'Student Name',
      render: (value: unknown, record: Enquiry) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-zinc-700" />
          </div>
          <div>
            <div className="font-medium text-white">{value as string}</div>
            <div className="text-sm text-zinc-500">{record.city}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      title: 'Contact',
      render: (value: unknown, record: Enquiry) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Mail className="w-3 h-3 text-gray-400" />
            <span className="truncate">{value as string}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Phone className="w-3 h-3 text-gray-400" />
            <span>{record.phone}</span>
          </div>
        </div>
      )
    },
    {
      key: 'interest',
      title: 'Interest',
      render: (value: unknown) => (
        <div className={`flex px-2 py-1 rounded-lg text-xs font-medium ${getInterestColor(value as string)}`}>
          {(value as string) === 'study-abroad' ? 'Study Abroad' : 'MBBS Abroad'}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: unknown, record: Enquiry) => {
        const status = value as Enquiry['status'];
        return (
          <Select
            value={status}
            onValueChange={(newValue) => {
              const enquiryId = record._id || record.id
              if (enquiryId) {
                handleStatusChange(enquiryId, newValue as Enquiry['status'])
              }
            }}
          >
            <SelectTrigger className={`w-32 ${getStatusColor(status)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        );
      }
    },
    {
      key: 'createdAt',
      title: 'Date',
      render: (value: unknown) => {
        const dateStr = value as string;
        const date = new Date(dateStr)
        return (
          <div className="text-sm">
            <div className="flex items-center gap-1 text-zinc-500">
              <Calendar className="w-3 h-3" />
              {date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="text-xs text-gray-400">
              {date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        )
      }
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: unknown, record: Enquiry) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewEnquiry(record)}
            className="border-white/10 bg-zinc-900 text-white !hover:bg-zinc-800"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteEnquiry(record)}
            className="border-white/10 bg-zinc-900 text-white !hover:bg-zinc-800"
          >
            Delete
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Student Enquiries</h2>
          <p className="text-sm text-zinc-500">
            Manage student enquiries and contact requests
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <Input
              placeholder="Search by name, email, phone, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-white/10 bg-zinc-950 pl-10 text-white placeholder:text-zinc-500"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 border-white/10 bg-zinc-950 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={interestFilter} onValueChange={setInterestFilter}>
          <SelectTrigger className="w-40 border-white/10 bg-zinc-950 text-white">
            <SelectValue placeholder="Filter by interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Interests</SelectItem>
            <SelectItem value="study-abroad">Study Abroad</SelectItem>
            <SelectItem value="mbbs-abroad">MBBS Abroad</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-white/10 bg-zinc-950 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-zinc-800" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{enquiries.length}</div>
              <div className="text-sm text-zinc-500">Total Enquiries</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-zinc-950 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-zinc-800" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {enquiries.filter(e => e.status === 'pending').length}
              </div>
              <div className="text-sm text-zinc-500">Pending</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-zinc-950 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-zinc-800" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {enquiries.filter(e => e.status === 'resolved').length}
              </div>
              <div className="text-sm text-zinc-500">Resolved</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-zinc-950 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-zinc-800" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {enquiries.filter(e => e.interest === 'mbbs-abroad').length}
              </div>
              <div className="text-sm text-zinc-500">MBBS Enquiries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        data={enquiries}
        columns={columns}
        loading={loading}
      />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-white/10 bg-zinc-950 p-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">
              Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalCount)} of {totalCount} enquiries
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* View Modal */}
      <AdminModal
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        title="Enquiry Details"
        size="lg"
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-400">Name</label>
                <p className="mt-1 font-medium text-white">{selectedEnquiry.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400">Email</label>
                <p className="mt-1 text-white">{selectedEnquiry.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400">Phone</label>
                <p className="mt-1 text-white">{selectedEnquiry.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400">City</label>
                <p className="mt-1 text-white">{selectedEnquiry.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400">Interest</label>
                <div className="mt-1">
                  <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getInterestColor(selectedEnquiry.interest)}`}>
                    {selectedEnquiry.interest === 'study-abroad' ? 'Study Abroad' : 'MBBS Abroad'}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400">Status</label>
                <div className="mt-1">
                  <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(selectedEnquiry.status)}`}>
                    {selectedEnquiry.status.charAt(0).toUpperCase() + selectedEnquiry.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
            
            {selectedEnquiry.message && (
              <div>
                <label className="text-sm font-medium text-zinc-400">Message</label>
                <div className="mt-1 rounded-lg bg-zinc-900 p-4">
                  <p className="whitespace-pre-wrap text-white">{selectedEnquiry.message}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 text-sm text-zinc-500 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-zinc-400">Created</label>
                <p className="mt-1">
                  {new Date(selectedEnquiry.createdAt!).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-400">Last Updated</label>
                <p className="mt-1">
                  {new Date(selectedEnquiry.updatedAt!).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
      
      {/* Delete Confirmation Modal */}
      <AdminModal
        open={!!deleteConfirmOpen}
        onOpenChange={() => setDeleteConfirmOpen(null)}
        title="Confirm Delete"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-zinc-900 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Are you sure?
              </h3>
              <p className="mb-4 text-sm text-zinc-400">
                This action cannot be undone. This will permanently delete the enquiry from 
                <span className="font-medium">{deleteConfirmOpen?.name}</span>.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(null)}
              className="border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-white text-black hover:bg-zinc-200"
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}
