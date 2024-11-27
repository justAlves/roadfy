import { ItineraryResponse } from '@/types/itinerary.type'
import React from 'react'
import ItineraryCard from './ItineraryCard';

interface ItineraryListProps {
  data: ItineraryResponse[];
}

export default function ItineraryList({ data }: ItineraryListProps) {
  return (
    <div
      className='flex flex-col gap-4'
    >
      {data.map((itinerary, index) => (
        <ItineraryCard
          key={index}
          data={JSON.parse(itinerary.data)}
        />
      ))}
    </div>
  )
}
