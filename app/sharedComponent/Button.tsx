import React from "react";

interface ButtonProps {
    as?: "button" | "a";
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    label?: string;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                  as = "button",
                                                  href,
                                                  onClick,
                                                  label = "Select",
                                                  className = "",
                                              }) => {
    const commonClasses = `
        border border-green-500 text-green-500 text-center px-6 py-3 rounded-lg
        hover:bg-green-500 hover:text-black transition-all duration-300 cursor-pointer
        flex justify-center items-center
        ${className}
    `.trim();

    return as === "a" && href ? (
        <a href={href} className={commonClasses} onClick={onClick}>
            {label}
        </a>
    ) : (
        <button onClick={onClick} className={commonClasses}>
            {label}
        </button>
    );
};
