'use client'

import { motion } from 'framer-motion'
import { Ship, Plane, Truck, Warehouse, Cpu, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Ship,
    title: 'Global SeaFreight',
    description: 'Fast & Reliable ocean freight services connecting major ports worldwide.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Plane,
    title: 'AirFreight',
    description: 'Express air cargo solutions for time-sensitive shipments across the globe.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Truck,
    title: 'Land Transport',
    description: 'Nationwide coverage with modern fleet for efficient road logistics.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Safe & Secure storage solutions with advanced inventory management.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Cpu,
    title: 'Technology',
    description: 'Smart logistics solutions powered by AI, tracking, and real-time data.',
    color: 'from-indigo-500 to-violet-500',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">
            Comprehensive Logistics Solutions
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From sea freight to smart technology, we provide end-to-end logistics services
            tailored to your business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="mr-2">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
