import * as React from "react"

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`form-card ${className}`.trim()} {...props} />
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`form-card-header ${className}`.trim()} {...props} />
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`form-card-content ${className}`.trim()} {...props} />
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`form-card-title ${className}`.trim()} {...props} />
}

