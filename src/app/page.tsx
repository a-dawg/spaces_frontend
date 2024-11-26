'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Hero from '../components/home/Hero'
import WhatIsSharedSpace from '../components/home/WhatIsSharedSpace'
import HowItWorks from '../components/home/HowItWorks'
import TopSpaces from '../components/home/TopSpaces'

export default function Home() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    router.push(`/spaces?search=${encodeURIComponent(term)}`)
  }

  return (
    <>
      <Hero onSearch={handleSearch} />
      <WhatIsSharedSpace />
      <HowItWorks />
      <TopSpaces />
    </>
  )
}