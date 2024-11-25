interface Props {
  type: string
  placeholder?: string
  className?: string
}

const Input = ({ type, placeholder, className }: Props) => {
  return (

    <>
      {
        type === 'select' ?
          <select className="rounded-[20px] text-base px-4 py-2 w-full innerShadowDonationCard" name="" id="">
            <option value="" selected>Masculino</option>
            <option value="">Femenino</option>
          </select> :
          <input type={type} placeholder={placeholder} className={`rounded-[20px] text-base px-4 py-2 w-full innerShadowDonationCard ${className}`} />
      }
    </>
  )
}

export default Input