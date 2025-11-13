import React, { forwardRef } from "react";

interface Props {
  type: string;
  placeholder?: string;
  className?: string;
  name?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[]; // Opcional para select
}

const Input = forwardRef<HTMLInputElement | HTMLSelectElement, Props>(
  ({ type, placeholder, className, name, defaultValue }, ref) => {
    if (type === "select") {
      return (
        <select
          ref={ref as React.Ref<HTMLSelectElement>}
          name={name}
          defaultValue={defaultValue}
          className={`rounded-[5px] text-base md:text-base-desktop px-4 py-2 w-full innerShadowDonationCard ${className}`}
        >
              {name === 'genre' ?
              <>
              <option value="Hombre">Homre</option>
              <option value="Mujer">Mujer</option>:
              </>:
              <>
              <option value="Ofrenda">Ofrenda</option>
              <option value="Diezmo">Diezmo</option>
              </>
              }
            
            
        </select>
      );
    }

    return (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type={type}
        placeholder={placeholder}
        className={`rounded-[5px] text-base md:text-base-desktop px-4 py-2 w-full innerShadowDonationCard ${className}`}
        name={name}
        defaultValue={defaultValue}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
