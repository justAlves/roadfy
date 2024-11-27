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
  subId: string;
}

export default function CancelSubscriptionModal({ open, onOpenChange, subId }: BecomePremiumModalProps) {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const handleCancel = async () => {
    setLoading(true)
    const { data } = await axios.post('/api/subscription/cancel', {
      subscriptionId: subId
    })

    if(data.error) {
      setLoading(false)
      return console.error(data.error)
    }

    setLoading(false)
    setSuccess(true)
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
          >{success ? "Assinatura cancelada" : "Cancelar assinatura"}
          </DialogTitle>
          <DialogDescription
            className='text-[#ddd]'
          >
            {success ? "Sua assinatura foi cancelada com sucesso." : "Tem certeza que deseja cancelar sua assinatura?"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className={`text-black font-normal mt-4 ${!success ? "bg-transparent border border-transparent hover:bg-rose-500/10 hover:border-rose-500 text-rose-500" : "bg-white"}`}
            onClick={() => {
              if(success) {
                onOpenChange(false)
              } else {
                handleCancel()
              }
            }}
          >
            {loading && <Loading color='white' size='sm' />}
            {!loading ?
              success ? "Fechar" : "Cancelar assinatura" : null
            }
          </Button>
          {!success && (
            <Button
              className='text-black font-normal mt-4 bg-white'
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
