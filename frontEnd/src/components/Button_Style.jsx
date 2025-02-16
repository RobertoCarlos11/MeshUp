function Button_Style({ name, className }) {
    return (
        <button className={`bg-[var(--primary-color)] border-2 border-solid border-[var(--primary-color)] cursor-pointer rounded-sm hover:bg-transparent active:bg-[var(--secondary-color)] active:border-[var(--secondary-color)] transition duration-150 ease-in-out ${className}`}>
            {name}
        </button>
    );
}
export default Button_Style;