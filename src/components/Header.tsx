'use client'
import React from 'react'
import Image from 'next/image'
import logo from '@/assets/images/logo.svg'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Header() {
  const router = useRouter()
  const { data } = useSession()

  return (
    <header
      className='flex justify-center items-center pt-20 mb-12 cursor-pointer'
      onClick={() => data ? router.push('/destinos') : router.push('/')}
    >
      <Image src={logo} width={226} height={81} alt="logo" />
    </header>
  )
}
