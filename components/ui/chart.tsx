"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Chart configuration context
const ChartContext = React.createContext<{ config: Record<string, any> } | null>(null)

interface ChartConfig {
  [key: string]: {
    label?: string
    color?: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

function ChartContainer({ config, children, className, ...props }: ChartContainerProps) {
  const contextValue = React.useMemo(() => ({ config }), [config])

  return (
    <ChartContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          className
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `:root {
              ${Object.entries(config)
                .map(([key, value]) => `--color-${key}: ${value.color};`)
                .join('\n')}
            }`,
          }}
        />
        {children}
      </div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
  className?: string
  labelFormatter?: (label: string) => string
  formatter?: (value: any, name: string) => React.ReactNode
}

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  labelFormatter,
  formatter,
}: ChartTooltipContentProps) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-2 shadow-md",
        className
      )}
    >
      {label && (
        <div className="mb-1 font-medium">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      )}
      <div className="grid gap-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">
              {formatter ? formatter(entry.value, entry.name) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltipContent }
