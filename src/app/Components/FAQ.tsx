"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Award, 
  Users, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { openModal } = useFormModal();

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "admissions", name: "Admissions", icon: Globe },
    { id: "process", name: "Process", icon: Clock },
    { id: "support", name: "Support", icon: Users },
    { id: "benefits", name: "Benefits", icon: Award }
  ];

  const faqs = [
    {
      question: "What services does Summit Global provide?",
      answer: "Summit Global provides comprehensive study abroad services including university admissions, visa assistance, scholarship guidance, pre-departure orientation, and ongoing support throughout your educational journey.",
      category: "support"
    },
    {
      question: "How do I apply to universities through Summit Global?",
      answer: "Our streamlined application process: 1) Schedule free consultation → 2) Select course & country → 3) Submit documents → 4) We handle applications → 5) Receive offers → 6) Visa & departure support.",
      category: "process"
    },
    {
      question: "Which countries do you help students study in?",
      answer: "We specialize in USA, UK, Canada, Australia, New Zealand, Germany, Ireland, and top European destinations. Each offers unique advantages from world-class education to post-study work opportunities.",
      category: "admissions"
    },
    {
      question: "What are the eligibility requirements for studying abroad?",
      answer: "Requirements vary but typically include academic qualifications, English proficiency (IELTS/TOEFL), statement of purpose, recommendation letters, and financial proof. We evaluate your profile and match you with suitable programs.",
      category: "admissions"
    },
    {
      question: "Do you help with scholarships and financial aid?",
      answer: "Absolutely! We provide comprehensive scholarship support - identifying opportunities, application assistance, and financial planning. Many universities offer exclusive scholarships for our students.",
      category: "benefits"
    },
    {
      question: "How long does the application process take?",
      answer: "Timeline: 4-12 weeks depending on destination. We recommend starting 6-8 months early to ensure smooth processing of applications, visas, and preparations.",
      category: "process"
    }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="section-home relative overflow-hidden py-24">
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
        <HelpCircle size={400} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">
              <Sparkles size={14} />
              Information Hub
            </div>
            <h2 className="text-5xl font-black leading-none tracking-tighter text-slate-950 lg:text-7xl">
              Answers for Your <br />
              <span className="heading-gold">FAQ.</span>
            </h2>
          </div>
          <p className="mb-2 max-w-sm border-l-2 border-amber-300/30 pl-6 text-lg font-medium text-slate-600">
            Everything you need to know about the admission process, costs, and student support.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-2 rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-sm">
              <p className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Select Category</p>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                    activeCategory === category.id
                      ? "bg-amber-500 text-slate-900 shadow-sm"
                      : "text-slate-700 hover:bg-amber-50"
                  }`}
                >
                  <category.icon size={20} />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Support Mini-Card */}
            <div className="group relative mt-8 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 text-slate-900 shadow-sm">
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-amber-300/20 blur-3xl opacity-50 transition-transform duration-500 group-hover:scale-150" />
              <h4 className="text-xl font-bold mb-2">Still confused?</h4>
              <p className="mb-6 text-sm text-slate-500">Talk to our experts for a personalized roadmap.</p>
              <Button
                onClick={openModal}
                className="btn-primary w-full rounded-xl py-6 font-black"
              >
                Chat with Us
              </Button>
            </div>
          </aside>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`group rounded-[2rem] border transition-all duration-300 ${
                      openIndex === index 
                        ? "border-amber-200 bg-amber-50 shadow-sm" 
                        : "border-slate-100 bg-white hover:border-amber-200 shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-8 py-7 text-left flex items-center justify-between"
                    >
                      <span className={`text-lg font-black transition-colors ${
                        openIndex === index ? "text-amber-700" : "text-slate-900"
                      }`}>
                        {faq.question}
                      </span>
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                        openIndex === index ? "rotate-180 bg-amber-500 text-slate-900" : "bg-slate-50 text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500"
                      }`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-8 pb-8">
                        <div className="mb-6 h-px bg-slate-100" />
                        <p className="text-lg font-medium leading-relaxed text-slate-600">
                          {faq.answer}
                        </p>
                        <div className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-bold text-amber-500 hover:underline">
                          Learn more about this <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Contact Strip */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-8 rounded-full border border-slate-100 bg-white px-12 py-8 shadow-sm"
        >
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-slate-900">1</div>
             <span className="text-sm font-bold text-slate-700">Quick Support</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-slate-900">2</div>
             <span className="text-sm font-bold text-slate-700">Expert Advice</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-slate-900">3</div>
             <span className="text-sm font-bold text-slate-700">Zero Charges</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
