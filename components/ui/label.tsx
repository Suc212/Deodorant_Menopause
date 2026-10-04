import * as React from "react"

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="field-label" {...props} />
}

