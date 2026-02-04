interface TitleProps {
  children: React.ReactNode
  className?: string
}

export function Title({ children, className }: TitleProps) {
  return (
    <h2 className={`heading-2 ${className || ''}`}>
      {children}
    </h2>
  )
}
