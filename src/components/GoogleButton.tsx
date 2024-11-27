"use client"

import React from 'react'
import Image from 'next/image'
import GoogleIcon from '@/assets/images/google-icon.svg'
import { signIn } from 'next-auth/react'

export default function GoogleButton() {
  return (
    <button
      className='bg-[#1E1325] text-white px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-[#1E1325]/60 mt-[101px]'
      onClick={() => signIn('google')}
    >
      Entre com o Google <Image src={GoogleIcon} width={20} height={20} alt='Google Logo'/>
    </button>
  )
}
