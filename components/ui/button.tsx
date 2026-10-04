import * as React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "fill" | "line"
}

export function Button({ className = "", variant = "fill", ...props }: ButtonProps) {
  return <button className={`btn ${variant} ${className}`.trim()} {...props} />
}

