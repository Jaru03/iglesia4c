interface SubtitleProps {
  children: React.ReactNode
  className?: string
}

export function Subtitle({ children, className }: SubtitleProps) {
  return (
    <h4 className={`text-xl md:text-2xl font-semibold text-primary-2 ${className || ''}`}>
      {children}
    </h4>
  )
}
