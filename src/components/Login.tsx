import React from 'react'
import GoogleButton from './GoogleButton'

export default function Login() {
  return (
    <div
      className='flex flex-col items-center'
    >
      <h1 className='text-2xl font-bold'>Descubra o Mundo com a RoadFY</h1>
      <p className='text-base text-center text-[#b9b9b9] mt-2'>Crie roteiros de viagem personalizados em minutos usando inteligência artificial.<br/>
      Explore destinos, personalize seu trajeto e viva novas experiências.</p>
      <GoogleButton/>
    </div>
  )
}
