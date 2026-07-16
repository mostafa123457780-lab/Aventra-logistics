'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log('Video autoplay blocked, using fallback image')
      })
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* خلفية الفيديو */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
          autoPlay
        >
          <source
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=1f8c0a1e5c6d8e9f0a1b2c3d4e5f6a7b8c9d0e1f&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              AVENTRA
            </span>
            <span className="block text-xl md:text-2xl font-light text-blue-400 mt-1 tracking-widest">
              BEYOND LOGISTICS, WE CONNECT POSSIBILITIES
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mt-4">
            Logistics & Shipping
            <br />
            <span className="text-blue-400">Delivering Excellence,</span>
            <br />
            <span className="text-blue-300">Connecting Markets</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            One Partner. Endless Possibilities. We provide smart logistics solutions 
            with global reach, ensuring your goods arrive safely and on time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* شريط الإحصائيات */}
      <div className="absolute bottom-10 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <StatItem number="50+" label="COUNTRIES" />
          <StatItem number="1,200+" label="VEHICLES" />
          <StatItem number="10,000+" label="BUSINESSES" />
          <StatItem number="2M+" label="DELIVERIES / YEAR" />
          <StatItem number="15+" label="YEARS EXPERIENCE" />
        </div>
      </div>
    </section>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-white">{number}</div>
      <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}
