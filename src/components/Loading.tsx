import { LoaderIcon } from 'lucide-react';
import React from 'react'

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  color?: "white" | "black";
}

export default function Loading({ size = "md", color = "white" }: LoadingProps) {
  return (
    <LoaderIcon
      size={size === "sm" ? 24 : size === "md" ? 32 : 48}
      className={`text-${color} animate-spin`}
    />
  )
}
