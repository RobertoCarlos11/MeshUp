import Header from "../components/Header";
import Footer from "../components/Footer";
import Day_History from "../components/Day_History";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Search_History(){
    return(
        <>
            <Header/>
                <div className="space-x-auto ml-100 mr-100">
                    <div className="flex flex-row justify-between border-b-2 border-solid p-2">
                        <div className="flex items-center m-2">
                            <CloseOutlinedIcon className="cursor-pointer ml-2 mr-2"/>
                            <span className="text-base font-semibold ml-2 mr-2">00</span>
                            <span className="text-base ml-2 mr-2">Selected elements</span>
                        </div>
                        <button className="border-2 border-solid border-[var(--primary-color)] cursor-pointer rounded-sm p-3 pb-1 pt-1">Delete</button>
                    </div>

                    <Day_History/>
                    <Day_History/>
                    <Day_History/> 

                </div>
            <Footer/>
        </>
    )
}
export default Search_History;