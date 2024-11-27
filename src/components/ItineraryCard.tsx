import { TravelItinerary } from '@/types/itinerary.type'
import { Clock, CoinsIcon, PlaneIcon } from 'lucide-react';
import React from 'react'

interface ItineraryCardProps {
  data: TravelItinerary;
}

export default function ItineraryCard({ data }: ItineraryCardProps) {
  return (
    <div
      className='px-8 py-4 border-purple-950 bg-black/20 border rounded-lg hover:scale-105 transition-all cursor-pointer hover:border-lime-500'
    >
      <div className="flex justify-between items-center gap-8">
        <div className='flex items-center gap-2'>
            <PlaneIcon
              size={24}
              className='text-white'
            />
            {data.city}
        </div>
        <div className='flex items-center gap-2'>
            <CoinsIcon
              size={24}
              className='text-white'
            />
            {
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(data.budget)
            }
        </div>
      </div>
      <div className='flex items-center justify-center gap-2 mt-4'>
        <Clock
          size={24}
          className='text-white'
        />
        {data.days} dias
      </div>
    </div>
  )
}
