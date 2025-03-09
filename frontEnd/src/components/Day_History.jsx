import Search_Element from "./Search_Element";

function Day_History({Date,History, HistorySelected, Items}){

    const ElementSelected = (index) => {
        HistorySelected(index);
    }
    return(
        <>
        <div className="bg-[#191F27] rounded-sm p-8 mt-8 mb-8">
            <span className="text-xl font-semibold">{Date}</span>

            <div className="flex flex-col m-5">
                {History.map(item => 
                <Search_Element Search={item} ElementSelected={ElementSelected} Items={Items}/>
                )}
            </div>
        </div>
        </>
    )
}
export default Day_History;