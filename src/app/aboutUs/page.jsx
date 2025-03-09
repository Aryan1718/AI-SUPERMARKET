'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'About Us', href: '/aboutUs' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">AI Supermarket</span>
              <img
                alt="AI Supermarket Logo"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            About Us
          </h1>
          <p className="mt-6 text-lg text-gray-600 sm:text-xl">
            Welcome to AI Supermarket – a cutting-edge, AI-powered shopping experience designed to revolutionize the way you buy groceries. Based in Fullerton, AI Supermarket leverages the latest advancements in artificial intelligence to provide seamless, personalized, and efficient shopping for everyone.
          </p>
          <p className="mt-6 text-lg text-gray-600 sm:text-xl">
            Our mission is to make grocery shopping smarter, faster, and more convenient than ever before. With AI-driven recommendations, automated checkout, and real-time inventory updates, we are transforming traditional supermarkets into intelligent shopping hubs.
          </p>
          <p className="mt-6 text-lg text-gray-600 sm:text-xl">
            Founded by Dhrit Patel, Aryan Pandit, and Varun Patel, AI Supermarket is built on a vision of innovation, efficiency, and customer-centricity. We believe in harnessing the power of AI to enhance everyday experiences, making shopping not just easier but also more enjoyable.
          </p>
          <p className="mt-6 text-lg text-gray-600 sm:text-xl">
            Join us as we redefine the future of grocery shopping. AI Supermarket – where technology meets convenience.
          </p>
        </div>
      </div>
    </div>
  )
}
