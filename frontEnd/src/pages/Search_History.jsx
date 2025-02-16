import Header from "../components/Header";
import Footer from "../components/Footer";
import Day_History from "../components/Day_History";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button_Style from "../components/Button_Style";
import Button_Style2 from "../components/Button_Style2";

function Search_History(){
    return(
        <>
            <Header/>
                <div className="space-x-auto ml-100 mr-100">
                    <div className="flex flex-row justify-between border-b-2 border-solid p-2">
                        <div className="flex items-center m-2">
                            <CloseOutlinedIcon className="cursor-pointer m-2"/>
                            <span className="text-base font-semibold m-2">00</span>
                            <span className="text-base m-2">Selected elements</span>
                        </div>
                        <Button_Style2 name="Delete" className="text-sm m-2 p-3 pb-1 pt-1"/>
                    </div>

                    <Day_History/>
                    <Day_History/>
                    <Day_History/> 

                    <center>
                        <Button_Style name="Delete Search History" className="text-sm m-5 p-3 pb-1 pt-1 w-1/3"/></center>
                </div>
            <Footer/>
        </>
    )
}
export default Search_History;