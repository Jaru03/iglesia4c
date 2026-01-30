interface TitleProps {
  children: React.ReactNode
  className?: string
}

export function Title({ children, className }: TitleProps) {
  return (
    <h3 className={`text-3xl md:text-4xl font-bold text-primary-3 ${className || ''}`}>
      {children}
    </h3>
  )
}
