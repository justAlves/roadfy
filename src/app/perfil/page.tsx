'use client'

import BecomePremiumModal from '@/components/BecomePremiumModal'
import Button from '@/components/Button'
import CancelSubscriptionModal from '@/components/CancelSubscriptionModal'
import Loading from '@/components/Loading'
import Menu from '@/components/Menu'
import { User } from '@/types/user.type'
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'


export default function Perfil() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const { data } = useSession()

  const getUser = async () => {
    setLoading(true)
    const response = await fetch(`/api/user/get?email=${data?.user?.email}`).then(res => res.json())

    if(response.error) {
      setLoading(false)
      return
    }

    setUser(response)
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelOpen])


  if(loading) {
    return (
      <div
        className='flex justify-center items-center justify-center mt-32'
      >
        <Loading/>
      </div>
    )
  }


  return (
    <>
      <BecomePremiumModal
        open={open}
        onOpenChange={setOpen}
        userId={user?.id as string}
      />
      <CancelSubscriptionModal
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        subId={user?.subscription_id as string}
      />
      <div
        className='flex flex-col items-center justify-center px-16 pb-32'
      >
        <Menu/>
        <div
          className='flex flex-col w-full mt-16 items-center'
        >
          <h1 className='text-2xl font-black'>Perfil</h1>
          <div
            className='flex mt-8 gap-4'
          >
            <span className='text-lg text-bold'>Plano:</span>
            <span className={`text-lg ${user?.is_subscriber ? "text-lime-500" : "text-yellow-600"}`}>{user?.is_subscriber ? "Roadfy Plus" : "Nenhuma assinatura"}</span>
          </div>
          <Button
            className={`mt-8 ${user?.is_subscriber ? "bg-transparent border border-transparent font-normal hover:bg-rose-500/10 hover:border-rose-500 text-rose-500" : "bg-white"}`}
            onClick={() => {
              if(user?.is_subscriber) {
                return setCancelOpen(true)
              }else{
                return setOpen(true)
              }
            }}
          >
            {user?.is_subscriber ? "Cancelar assinatura" : "Assinar Roadfy Plus"}
          </Button>
          <Button
            className='mt-4 bg-transparent border border-transparent font-normal hover:bg-rose-500/10 hover:border-rose-500 text-rose-500'
            onClick={() => {
              signOut()
            }}
          >
            Sair
          </Button>
        </div>
      </div>
    </>
  )
}
