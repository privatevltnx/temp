"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  max: number
  min: number
  step: number
  className?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, max, min, step, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange([parseInt(e.target.value)])}
        className={cn(
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
          "slider::-webkit-slider-thumb:appearance-none slider::-webkit-slider-thumb:h-5 slider::-webkit-slider-thumb:w-5 slider::-webkit-slider-thumb:rounded-full slider::-webkit-slider-thumb:bg-blue-600",
          className
        )}
        {...props}
      />
    )
  }
)
Slider.displayName = "Slider"

export { Slider }