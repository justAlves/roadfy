"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Menu() {
  const {data: session} = useSession()

  if(!session) {
    return null
  }

  return (
    <nav
      className='flex justify-center items-center'
    >
      <div className='flex gap-2 items-center'>
        <Image
          src={session?.user?.image as string}
          alt={session?.user?.name as string}
          width={50}
          height={50}
          className='rounded-full'
        />
        <div className='flex flex-col gap-2'>
          <span>
            Para onde vamos, {session?.user?.name}?
          </span>
          <Link href='/perfil' className='hover:underline'>
            Perfil
          </Link>
        </div>
      </div>
    </nav>
  )
}
