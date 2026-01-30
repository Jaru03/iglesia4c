import React, { forwardRef } from "react";

interface Props {
  type: string;
  placeholder?: string;
  className?: string;
  name?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  options?: { value: string; label: string }[]; // Opcional para select
}

const Input = forwardRef<HTMLInputElement | HTMLSelectElement, Props>(
  ({ type, placeholder, className, name, defaultValue, value, onChange, required }, ref) => {
    const baseStyles = `
      w-full px-4 py-3 text-base transition-all duration-200
      bg-white border-2 border-gray-200 rounded-xl
      focus:border-primary-3 focus:ring-4 focus:ring-primary-3/10 focus:outline-none
      hover:border-gray-300 hover:shadow-sm
      placeholder:text-gray-400 placeholder:font-normal
      disabled:bg-gray-50 disabled:cursor-not-allowed
    `;

    if (type === "select") {
      return (
        <div className="relative">
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            name={name}
            defaultValue={defaultValue}
            className={`${baseStyles} appearance-none pr-12 cursor-pointer bg-linear-to-r from-white to-gray-50 border-gray-300 hover:border-primary-3 hover:shadow-md transition-all duration-200 ${className}`}
            required={required}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px 16px'
            }}
          >
            {name === 'genre' ? (
              <>
                <option value="" disabled>Selecciona tu género</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </>
            ) : (
              <>
                <option value="Ofrenda">Ofrenda</option>
                <option value="Diezmo">Diezmo</option>
              </>
            )}
          </select>
        </div>
      );
    }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          placeholder={placeholder}
          className={`${baseStyles} ${className}`}
          name={name}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          required={required}
        />
      );
  }
);

Input.displayName = "Input";

export default Input;
