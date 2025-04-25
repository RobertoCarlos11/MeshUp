import { useEffect, useState } from "react";

function Search_Element({ Search, ElementSelected, Items,HandleWord }) {
    const [checked, setChecked] = useState(false);
    const ItemSelected = (index) => {
        ElementSelected(index);
    }

    const handleSearch= () => {
        HandleWord(Search.Search);
    }
    useEffect(() => {
        if (Items.includes(Search.HistoryId))
            setChecked(true);
        else
            setChecked(false);

    }, [Items]);

    const Hour = new Date(Search.Search_Date).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
    return (
        <div className="flex flex-row justify-between border-b-1 border-solid p-2 m-2">
            <span className='flex'>
                <label class="flex items-center cursor-pointer relative mr-4" for="Search_check">
                    <input checked={checked} type="checkbox" class="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border-2 border-[var(--primary-color)] checked:bg-[var(--primary-color)] checked:border-[var(--primary-color)]" />
                    <span onClick={() => ItemSelected(Search.HistoryId)} class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </label>
                <div  onClick={handleSearch} className="cursor-pointer rounded-md px-3">
                {Search?.Search}
                </div>
            </span>
            <span>{Hour}</span>
        </div>
    )
}
export default Search_Element;