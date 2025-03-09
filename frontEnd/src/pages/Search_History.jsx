import Header from "../components/Header";
import Footer from "../components/Footer";
import Day_History from "../components/Day_History";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button_Style from "../components/Button_Style";
import { useEffect, useState } from "react";
import { DeleteHistory, GetSearchHistory } from "../services/historyService";
import Swal from "sweetalert2";

function Search_History() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [history, setHistory] = useState({});
    const [selected, setSelected] = useState([]);
    const groupByDay = (data) => {
        return data.reduce((acc, item) => {
            const date = new Date(item.Search_Date).toLocaleDateString();
    
            if(!acc[date]){
                acc[date] = [];
            }
    
            acc[date].push(item);
            return acc;
        },{});
    };
    
    const FetchHistory = async () => {
        const HistoryFound = await GetSearchHistory(user?.Email);

        setHistory(groupByDay(HistoryFound.data));
    }
    
    useEffect(() => {
        FetchHistory();
    },[]);

    const handleSelected = (index) => 
    {
        setSelected(prev => 
            {
                if(prev.includes(index))
                    return prev.filter(i => i !== index);
                else
                return [...prev, index];
            });
    }

    useEffect(() => {
        console.log(selected);
    },[selected]);

    const handleDeleteSelected = async (e) => {
        const {name} = e.currentTarget;
        if(selected.length == 0 && name == "Selected")
                return Swal.fire({
                    icon: "error",
                    title: "Oops!!",
                    text: "Please select items to delete from your history!",
            });

        console.log(name);

        setSelected(prev => {
            const newSelected = name === "All"
            ? Object.values(history).flat().map(item => item.HistoryId) : prev;

            handleDelete(newSelected);
            return newSelected;
        });
    }

    const handleDelete = async (newSelected) => {

        Swal.fire({
            title: "Deleting...",
            text: "Please wait while the history is being deleted.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        
        const postsdeleted = await DeleteHistory(newSelected);
        if(postsdeleted.status)
        {
        await Swal.fire({
            title: "Deleted!",
            text: "History deleted successfully.",
            icon: "success",
            timer: 2000, // Auto close in 2 seconds
            showConfirmButton: false
        });
        FetchHistory();
        setSelected([]);
        }
    } 

    return (
        <>
            <Header />
            <div className="space-x-auto ml-100 mr-100">
                <div className="flex flex-row justify-between border-b-2 border-solid p-2">
                    <div className="flex items-center m-2">
                        <CloseOutlinedIcon className="cursor-pointer m-2" />
                        <span className="text-base font-semibold m-2">{selected.length}</span>
                        <span className="text-base m-2">Selected elements</span>
                    </div>
                    <Button_Style onClick={handleDeleteSelected} name="Selected" classname="text-sm m-2 px-3 py-1" inverted > Delete</Button_Style>
                </div>
                {Object.entries(history).map(([date,entries]) => (
                    <Day_History Date={date} History={entries} HistorySelected={handleSelected} Items={selected}/>
                ))}

                <Button_Style onClick={handleDeleteSelected} name="All" className="text-sm m-5 p-3 py-1 w-1/3">
                    Delete Search History
                </Button_Style>
            </div>
            <Footer />
        </>
    )
}
export default Search_History;