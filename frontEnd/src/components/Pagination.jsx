import { useEffect, useState } from "react";

function Pagination ({Pages, indexSelectedChanged}){

    const [indexSelected, setIndexSelected] = useState(1);

    useEffect(() => {
        indexSelectedChanged(indexSelected);
        console.log(Pages);
    },[indexSelected]);
    return(
        <>
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a onClick={() => {setIndexSelected(indexSelected !== 1 ? indexSelected - 1 : indexSelected)}} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a onClick={() => {setIndexSelected(indexSelected !== Pages ? indexSelected + 1 : indexSelected)}} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                    <a onClick={() => {setIndexSelected(indexSelected !== 1 ? indexSelected - 1 : indexSelected)}} href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                    </svg>
                    </a>
                    {
                        [...Array(Pages)].map((_,index) => 
                            indexSelected === index + 1 ?
                            <a aria-current="page" className="relative z-10 inline-flex items-center bg-[var(--primary-color)] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{index+1}</a>:
                            <a onClick={() => setIndexSelected(index+1)} className="relative hidden items-center px-4 py-2 text-sm font-semibold text-[var(--comp-1-color)] ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{index+1}</a>
                        )
                    }
                    <a onClick={() => {setIndexSelected(indexSelected !== Pages ? indexSelected + 1 : indexSelected)}} href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span onClick={() => {setIndexSelected(indexSelected !== Pages ? indexSelected + 1 : indexSelected)}} className="sr-only">Next</span>
                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                    </a>
                </nav>
            </div>
        </div>
        </>
    )
}
export default Pagination;