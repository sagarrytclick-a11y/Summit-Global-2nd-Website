'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HomeBlogCardData } from '@/lib/server/public-data';

interface BlogCardProps {
  title: string;
  slug: string;
  category: string;
  content: string;
  tags?: string[];
  createdAt: string;
  image?: string;
}

const BlogCard = ({ title, slug, category, content, tags, createdAt, image }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/blogs/${slug}`} className="group block">
      <div className="premium-card-light flex h-full cursor-pointer flex-col overflow-hidden rounded-[2.5rem] border-2 border-slate-200 transition-all duration-500 hover:border-amber-300">
        
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={image || "/next.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-[var(--surface-navy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-lg backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* Date Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Calendar size={14} className="text-amber-500" />
              <span className="text-xs font-bold text-slate-700">
                {formatDate(createdAt).split(' ')[1]} {formatDate(createdAt).split(' ')[2]}
              </span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="mb-3 line-clamp-2 text-xl font-black leading-tight text-slate-900 transition-colors group-hover:text-amber-500">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
            {content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              {/* <Clock size={14} className="text-green-500" />
              <span>{calculateReadTime(content)}</span> */}
            </div>
            
            <button className="group/btn flex items-center gap-2 text-sm font-bold text-amber-500 transition-all hover:text-amber-600">
              Read Article
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function LatestBlogs({ initialBlogs }: { initialBlogs: HomeBlogCardData[] }) {
  const [displayedBlogs, setDisplayedBlogs] = React.useState<BlogCardProps[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const blogsPerPage = 6;

  React.useEffect(() => {
    const nextBlogs = initialBlogs.slice(0, blogsPerPage);
    setDisplayedBlogs(nextBlogs);
    setHasMore(initialBlogs.length > blogsPerPage);
  }, [initialBlogs, blogsPerPage]);

  const loadMoreBlogs = () => {
    const currentLength = displayedBlogs.length;
    const nextBlogs = initialBlogs.slice(currentLength, currentLength + blogsPerPage);
    const newDisplayedBlogs = [...displayedBlogs, ...nextBlogs];
    
    setDisplayedBlogs(newDisplayedBlogs);
    setHasMore(initialBlogs.length > newDisplayedBlogs.length);
  };

  return (
    <section className="section-home mx-auto max-w-7xl px-4 py-20">
      <div className="text-left mb-16 max-w-3xl">
        <h2 className="mb-4 text-4xl font-black tracking-tighter text-[var(--surface-navy)] md:text-6xl">
          LATEST <span className="heading-gold">BLOGS</span>
        </h2>
        <p className="text-lg font-medium text-slate-500">
          Educational insights, study tips, and success stories from our experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayedBlogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center flex items-center justify-center mt-12">
          <Button 
            onClick={loadMoreBlogs}
            disabled={false}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <>
              <p className='text-center'>Load More Blogs</p>
              <ArrowRight size={20} />
            </>
          </Button>
        </div>
      )}

      {/* View All Blogs Button - Only show when no more blogs to load */}
      {!hasMore && displayedBlogs.length > 0 && (
        <div className="text-left mt-12">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-navy)] px-8 py-4 font-bold text-[var(--surface-navy)] transition-all duration-200 hover:bg-slate-50"
          >
            View All Blogs
            <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </section>
  );
}
