import React from "react";

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    label?: string;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({onClick, label = "Log in", className = ""}) => {
    return (
        <div className={"flex justify-center w-full"}>
            <a
                onClick={onClick}
                className={`
                border border-green-500 text-green-500 text-center px-6 py-3 rounded-lg
                hover:bg-green-500 hover:text-black transition-all duration-300 cursor-pointer
                flex justify-center items-center w-full max-w-[12rem]
                ${className}
            `.trim()}
            >
                {label}
            </a>
        </div>
    );
};
