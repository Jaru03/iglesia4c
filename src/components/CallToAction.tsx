import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Button {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  icon?: LucideIcon
}

interface CallToActionProps {
  title: string
  description: string
  icon?: LucideIcon
  iconLabel?: string
  buttons: Button[]
  quote?: {
    text: string
    reference: string
  }
  className?: string
}

export function CallToAction({
  title,
  description,
  icon: Icon,
  iconLabel,
  buttons,
  quote,
  className,
}: CallToActionProps) {
  return (
    <section className={`py-16 bg-linear-to-r from-primary-3 to-primary-2 ${className}`}>
      <div className="max-w-4xl mx-auto text-center px-6">
        {Icon && (
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-white" aria-label={iconLabel} />
          </div>
        )}
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        
        <p className="text-white/90 text-lg mb-8 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => {
            const ButtonIcon = button.icon
            return (
              <Button 
                key={index} 
                asChild 
                variant={button.variant === "primary" ? "default" : "outline"} 
                size="default"
                className={button.variant === "secondary" ? "text-white border-white/50 hover:bg-white/20" : ""}
              >
                <Link href={button.href}>
                  {ButtonIcon && <ButtonIcon className="w-5 h-5 mr-2" />}
                  {button.label}
                </Link>
              </Button>
            )
          })}
        </div>
        
        {quote && (
          <div className="mt-8 text-white/80">
            <p className="text-sm">"{quote.text}"</p>
            <p className="text-xs mt-1 opacity-75">{quote.reference}</p>
          </div>
        )}
      </div>
    </section>
  )
}
