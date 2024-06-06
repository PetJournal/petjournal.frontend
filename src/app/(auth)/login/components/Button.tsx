import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isButtonDisabled: boolean;
    loading: boolean;
    as: "button" | "reset" | "submit";
    text?: string;
}

export function Button({ className, isButtonDisabled, loading, as, text, ...props }: Props) {

    const baseButton = "flex self-center font-medium items-center justify-center  rounded-[45px] px-11 py-3"

    return (
        text ?
            <button
                className={twMerge(`${baseButton} mt-16 ${isButtonDisabled
                    ? 'bg-transparent border-2 border-[#B2B2B2] text-[#B2B2B2]'
                    : 'bg-custom-purple text-white'
                    }`, className)}
                type={as}
                disabled={isButtonDisabled}
                {...props}
            >
                {text}
            </button >

            :

            <button
                className={`${baseButton} mt-16 ${isButtonDisabled
                    ? 'bg-transparent border-2 border-[#B2B2B2] text-[#B2B2B2]'
                    : 'bg-custom-purple text-white'
                    }`}
                type={as}
                disabled={isButtonDisabled}
            >
                {loading ? 'Enviando...' : 'Continuar'}
            </button>

    )
}


