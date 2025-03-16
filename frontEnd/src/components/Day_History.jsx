import Search_Element from "./Search_Element";
import { useState, useEffect } from "react";

function Day_History({SearchDate,History, HistorySelected, Items, HandleWord}){

    const [date, setDate] = useState();

    useEffect(() => {
        const [day, month, year] = SearchDate.split('/'); 
        const dateObj = new Date(year, month - 1, day); 
        const finalDate = new Intl.DateTimeFormat("en-GB", { 
            day: "numeric", 
            month: "long", 
            year: "numeric" 
        }).format(dateObj);

        setDate(finalDate);
    }, [SearchDate]);

    const handleWord = (value) => {
        HandleWord(value);
    }
    const ElementSelected = (index) => {
        HistorySelected(index);
    }

    return(
        <>
        <div className="bg-[var(--transparent-color)] rounded-sm p-8 mt-8 mb-8">
            <span className="text-xl font-semibold">{date}</span>

            <div className="flex flex-col m-5">
                {History.map(item => 
                <Search_Element Search={item} ElementSelected={ElementSelected} Items={Items} HandleWord={handleWord}/>
                )}
            </div>
        </div>
        </>
    )
}
export default Day_History;