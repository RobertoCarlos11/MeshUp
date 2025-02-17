import Search_Element from "./Search_Element";

function Day_History(){
    return(
        <>
        <div className="bg-[#191F27] rounded-sm p-8 mt-8 mb-8">
            <span className="text-xl font-semibold">Day/Month/Year</span>

            <div className="flex flex-col m-5">
                <Search_Element/>
                <Search_Element/>
                <Search_Element/>
            </div>
        </div>
        </>
    )
}
export default Day_History;