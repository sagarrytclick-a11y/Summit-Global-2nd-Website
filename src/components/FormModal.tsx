'use client'

import React from 'react'
import { useFormModal } from '@/context/FormModalContext'
import { X, Send, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const FormModal: React.FC = () => {
  const { isOpen, closeModal, formData, updateFormData, resetForm } = useFormModal()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Save to database via API
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit enquiry')
      }

      setSubmitStatus('success')
      setTimeout(() => {
        handleClose()
      }, 2500)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    closeModal()
    setTimeout(() => {
      resetForm()
      setSubmitStatus('idle')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative my-auto max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
          >
            <div className="relative border-b border-slate-200 bg-white px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 sm:text-[11px]">
                    Student Enquiry
                  </div>
                  <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">Get in Touch</h2>
                  <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                    We’d love to help you plan your future with Summit Global.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-full border border-slate-200 bg-slate-50 p-1.5 text-slate-500 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 sm:p-2"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {['Quick response', 'Student-first support', 'MBBS & Study Abroad'].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-h-[60vh] space-y-3 overflow-y-auto bg-[#FAFAFA] p-4 sm:space-y-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  label="Full Name"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(v) => updateFormData({ name: v })}
                />
                <FormField
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  placeholder="Enter contact number"
                  value={formData.phone}
                  onChange={(v) => updateFormData({ phone: v })}
                />
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(v) => updateFormData({ email: v })}
                />
                <FormField
                  label="City"
                  id="city"
                  type="text"
                  placeholder="Enter your location"
                  value={formData.city}
                  onChange={(v) => updateFormData({ city: v })}
                />
              </div>

              {/* New Field: Interest Dropdown */}
              <FormField
                label="Interested In"
                id="interest"
                type="select"
                value={formData.interest || ""}
                onChange={(v) => updateFormData({ interest: v })}
                options={[
                  { label: "Select an option", value: "" },
                  { label: "Study Abroad", value: "study-abroad" },
                  { label: "MBBS Abroad", value: "mbbs-abroad" },
                ]}
              />

              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs font-medium text-amber-800 sm:p-4 sm:text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Sent successfully!
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 sm:p-4 sm:text-sm"
                  >
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Failed to send. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 sm:w-auto sm:px-6 sm:py-4 sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="relative w-full overflow-hidden rounded-2xl bg-[var(--surface-navy)] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-6 sm:py-4 sm:text-base"
                >
                  <span className={`flex items-center justify-center gap-1.5 sm:gap-2 transition-transform ${isSubmitting ? 'translate-y-10' : 'translate-y-0'}`}>
                    Submit Request <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

interface FormFieldProps {
  label: string;
  id: string;
  type: 'text' | 'email' | 'tel' | 'select';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options?: { label: string; value: string }[];
}

const FormField: React.FC<FormFieldProps> = ({ label, id, type, placeholder, value, onChange, options }) => (
  <div className="space-y-1 sm:space-y-1.5 flex-1">
    <label htmlFor={id} className="ml-1 text-[9px] font-bold uppercase tracking-widest text-slate-400 sm:text-[10px]">
      {label}
    </label>
    <div className="relative">
      {type === 'select' ? (
        <>
          <select
            id={id}
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-amber-300 focus:ring-4 focus:ring-amber-500/10 sm:px-4 sm:py-3.5 sm:text-sm"
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </>
      ) : (
        <input
          id={id}
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-500/10 sm:px-4 sm:py-3.5 sm:text-sm"
        />
      )}
    </div>
  </div>
)
