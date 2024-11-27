"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function IsAuth() {

  const { data: session} = useSession()
  const router = useRouter()

  function isAuthenticated() {
    if(session){
      router.push('/destinos')
    }else{
      router.push('/')
    }
  }

  useEffect(() => {
    isAuthenticated()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <>

    </>
  )
}
