function Search_Element(){
    return(
        <div className="flex flex-row justify-between border-b-1 border-solid p-2 m-2">
            <span className='flex felx-row'>
                <label class="flex items-center cursor-pointer relative mr-4" for="Search_check">
                    <input type="checkbox" class="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border-2 border-[var(--primary-color)] checked:bg-[var(--primary-color)] checked:border-[var(--primary-color)]" id="Search_check" />
                    <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>
                Search Element
            </span>
            <span>00:00</span>
        </div>
    )
}
export default Search_Element;