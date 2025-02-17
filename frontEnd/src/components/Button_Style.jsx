function Button_Style({ children = "", className = "", inverted = false }) {
    
    return inverted ? 
        (<button className={`border-2 border-solid border-[var(--primary-color)] cursor-pointer rounded-sm hover:bg-[var(--primary-color)] active:bg-[var(--secondary-color)] active:border-[var(--secondary-color)] transition duration-150 ease-in-out ${className}`}>
        {children}
        </button>)
        :
        (<button className={`bg-[var(--primary-color)] border-2 border-solid border-[var(--primary-color)] cursor-pointer rounded-sm hover:bg-transparent active:bg-[var(--secondary-color)] active:border-[var(--secondary-color)] transition duration-150 ease-in-out ${className}`}>
        {children}
        </button>)
}

export default Button_Style;