import React from 'react'
import HeroSection from './HeroSection'
import Cake from './Cake'
import PhotoCards from './PhotoCards'
import AutoScrollGallery from './AutoScrollGallery'
import BirthdayLetter from './BirthdayLetter'
import FinalSurprise from './FinalSurprise'
import HerImageSection from './HerImageSection'
import MemoriesSection from './MemoriesSection'
import './BirthdayHome.css'

export default function BirthdayHome() {
  return (
    <div className="birthday-home">
      <HeroSection />
      <Cake />
      <PhotoCards />
      <MemoriesSection />
      <AutoScrollGallery />
      <BirthdayLetter />
      <HerImageSection />
      <FinalSurprise />
    </div>
  )
}
