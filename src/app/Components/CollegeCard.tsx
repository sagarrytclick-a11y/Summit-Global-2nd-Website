import Link from "next/link";
import {
  MapPin,
  Award,
  CircleDollarSign,
  Star,
  Users,
  ChevronRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

type CollegeCardProps = {
  data: {
    _id: string;
    name: string;
    slug?: string;
    banner_url?: string;
    location?: string;
    rank?: string;
    tuition?: string;
    acceptance?: string;
    rating?: string;
    employability?: string;
    tags?: string[];
    fees?: number;
    duration?: string;
    country_ref?: any;
  };
};

export default function CollegeCard({ data }: CollegeCardProps) {
  const { openModal } = useFormModal();
  
  const getImageSrc = (image?: string) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return image;
    return `/uploads/colleges/${image}`;
  };

  const imageUrl = getImageSrc(data.banner_url) || 
    "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600";

  const slug = data.slug || data._id;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
      
      {/* Top Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={data.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {data.rank && (
            <span className="rounded-lg border border-white bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--surface-navy)] shadow-sm backdrop-blur-md">
              {data.rank}
            </span>
          )}
        </div>

        {data.tags?.includes("Scholarship") && (
          <div className="absolute top-4 right-4 rounded-lg bg-amber-500/95 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-slate-950 shadow-lg backdrop-blur-md">
            ✨ Scholarship Available
          </div>
        )}

        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5 text-white/90">
            <MapPin size={14} className="text-amber-300" />
            <span className="text-xs font-medium drop-shadow-md">{data.location}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="mb-3 line-clamp-1 text-lg font-extrabold text-slate-800 transition-colors group-hover:text-[var(--surface-navy)]">
          {data.name}
        </h3>

        {/* Stats Grid - Using a cleaner layout */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
          <StatItem 
            icon={<CircleDollarSign size={16} />} 
            label="Tuition" 
            value={data.fees ? `$${data.fees.toLocaleString()}/year` : data.tuition || 'N/A'} 
          />
          <StatItem 
            icon={<Clock size={16} />} 
            label="Duration" 
            value={data.duration ? `${data.duration} years` : 'N/A'} 
          />
          <StatItem 
            icon={<Award size={16} />} 
            label="Acceptance" 
            value={data.acceptance} 
          />
          <StatItem 
            icon={<Star size={16} className="fill-amber-400 text-amber-400" />} 
            label="Rating" 
            value={data.rating} 
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/colleges/${slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-bold text-[var(--surface-navy)] transition-colors hover:bg-amber-50"
          >
            Details
          </Link>

          <button
            onClick={() => openModal()}
            className="inline-flex flex-[1.5] items-center justify-center gap-2 rounded-xl bg-[var(--surface-navy)] py-3 text-sm font-bold text-white shadow-[0_10px_20px_-5px_rgba(15,23,42,0.35)] transition-all hover:bg-slate-800 hover:shadow-none"
          >
            Apply Now
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-component for cleaner code
function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 rounded-lg bg-slate-50 p-1.5 text-amber-600 transition-colors group-hover:bg-amber-50">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
