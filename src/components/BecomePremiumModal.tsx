import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import Button from './Button';
import axios from 'axios';
import Loading from './Loading';

interface BecomePremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export default function BecomePremiumModal({ open, onOpenChange, userId }: BecomePremiumModalProps) {
  const [loading, setLoading] = React.useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    const { data } = await axios.post('/api/subscription/create-session', {
      user_id: userId
    })

    if(data.error) {
      setLoading(false)
      return console.error(data.error)
    }

    setLoading(false)
    window.location.href = data.sessionUrl
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className='main-background border-none'
      >
        <DialogHeader>
          <Image
            src={logo}
            alt="Roadfy"
            width={70}
            height={70}
            className='mb-4'
          />
          <DialogTitle
            className='text-2xl text-white'
          >Venha descobrir o mundo com o Roadfy Plus</DialogTitle>
          <DialogDescription
            className='text-[#ddd]'
          >
              Com o Roadfy Plus você poderá gerar seus roteiros de forma simples e rápida.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className='text-black font-normal mt-4'
            onClick={handleSubscribe}
          >
            {loading ? <Loading color='black' size='sm' /> : 'Assinar R$ 35,00/mês'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
