"use client"

import Button from '@/components/Button'
import Menu from '@/components/Menu'
import { User } from '@/types/user.type'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loading from '@/components/Loading'
import ItineraryList from '@/components/ItineraryList'
import BecomePremiumModal from '@/components/BecomePremiumModal'

export default function Destinos() {
  const { data } = useSession()

  const [user, setUser] = useState<User | null>(null)
  const [destinos, setDestinos] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const getUser = async () => {
    setLoading(true)
    const response = await fetch(`/api/user/get?email=${data?.user?.email}`).then(res => res.json())

    if(response.error) {
      const createUser = await axios.post(`/api/user/create`, {
        email: data?.user?.email,
        name: data?.user?.name,
      }).then(res => res.data)

      if(createUser.error) {
        return console.error(createUser.error)
      }

      return setUser(createUser)
    }

    setUser(response)

    if(!response?.is_subscriber){
      setOpen(true)
    }

    getDestinos(response.id)
  }

  const getDestinos = async (userId: string) => {
    const response = await fetch(`/api/itinerary/all?user_id=${userId}`).then(res => res.json())

    if(response.error) {
      return console.error(response.error)
    }

    setDestinos(response)
    setLoading(false)
  }

  const load = async () => {
    try {
      await getUser()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(data) {
      load()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BecomePremiumModal
        open={open}
        onOpenChange={open => setOpen(open)}
        userId={user?.id as string}
      />
      <div
        className='flex flex-col items-center justify-center px-16 pb-32'
      >
        {user && (
          <Menu/>
        )}
        <Button
          className='mt-8'
          onClick={() => {
            if(!user?.is_subscriber){
              return setOpen(true)
            }
          }}
        >
          Novo roteiro
        </Button>
        {loading && (
          <div className='mt-32'>
            <Loading/>
          </div>
        )}
        {!loading && (
          destinos && destinos.length > 0 ? (
            <div className='mt-16'>
              <ItineraryList
                data={destinos}
              />
            </div>
          ) : (
            <div className='mt-32'>
              <p className='text-[#ddd]'>
                Você ainda não possui nenhum roteiro cadastrado.
              </p>
            </div>
          )
        )}
      </div>
    
    </>
  )
}
