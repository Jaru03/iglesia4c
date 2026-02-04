interface SubtitleProps {
  children: React.ReactNode
  className?: string
}

export function Subtitle({ children, className }: SubtitleProps) {
  return (
    <h3 className={`heading-3 ${className || ''}`}>
      {children}
    </h3>
  )
}
