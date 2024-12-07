interface Props {
  type: string
  placeholder?: string
  className?: string
  name?: string,
  defaultValue?: string
}

const Input = ({ type, placeholder, className, name, defaultValue }: Props) => {
  return (

    <>
      {
        type === 'select' ?
          <select  name={name} defaultValue={defaultValue} className="rounded-[20px] text-base md:text-base-desktop px-4 py-2 w-full innerShadowDonationCard" id="">
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select> : type === 'date'
          ?<input defaultValue={defaultValue} name={name} type={type} className={`rounded-[20px] text-base md:text-base-desktop px-4 py-2 w-full innerShadowDonationCard ${className}`} />
          :<input defaultValue={defaultValue} name={name} type={type} placeholder={placeholder} className={`rounded-[20px] text-base md:text-base-desktop px-4 py-2 w-full innerShadowDonationCard ${className}`} />
      }
    </>
  )
}

export default Input