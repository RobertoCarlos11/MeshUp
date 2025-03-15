import Search_Element from "./Search_Element";

function Day_History({Date,History, HistorySelected, Items, HandleWord}){

    const handleWord = (value) => {
        HandleWord(value);
    }
    const ElementSelected = (index) => {
        HistorySelected(index);
    }
    return(
        <>
        <div className="bg-[var(--transparent-color)] rounded-sm p-8 mt-8 mb-8">
            <span className="text-xl font-semibold">{Date}</span>

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