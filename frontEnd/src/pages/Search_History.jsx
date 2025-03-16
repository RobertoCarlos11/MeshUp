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
    const [word, setWord] = useState("");
    const [selected, setSelected] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const groupByDay = (data) => {
        const groupedData = data.reduce((acc, item) => {
            const date = new Date(item.Search_Date).toLocaleDateString();
    
            if(!acc[date]){
                acc[date] = [];
            }
    
            acc[date].push(item);
            return acc;
        },{});

        return Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a)).reduce((acc, key) => {
            acc[key] = groupedData[key];
            return acc;
        }, {});
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
        selected.length > 0 ? setIsDeleting(true) : setIsDeleting(false); 
    },[selected]);

    useEffect(() => {
        console.log(Object.entries(history).length);
    },[history]);
    const handleDeleteSelected = async (e) => {
        const {name} = e.currentTarget;
        if(selected.length == 0 && name == "Selected")
            return Swal.fire({
                theme: 'dark',
                icon: "error",
                title: "Oops!!",
                text: "Please select items to delete from your history!",
            });

        setSelected(prev => {
            const newSelected = name === "All"
            ? Object.values(history).flat().map(item => item.HistoryId) : prev;

            handleDelete(newSelected);
            return newSelected;
        });
    }

    const handleDelete = async (newSelected) => {

        await Swal.fire({
            theme: 'dark',
            title:"Warning!",
            icon:"warning",
            text: newSelected.length === Object.values(history).flat().length ? 
            `You're about to delete your entire history, are you sure?` :
            `You're about to delete ${newSelected.length} items of your history, are you sure?`,
            showConfirmButton:true,
            showCancelButton: true,
        }).then(async (result) => {
            if(!result.isConfirmed)
                return;
                Swal.fire({
                    theme: 'dark',
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
                    theme: 'dark',
                    title: "Deleted!",
                    text: "History deleted successfully.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                FetchHistory();
                setSelected([]);
            }
        });
    } 

    const handleWord = (value) => 
    {
        setWord(value);
    }
    return (
        <>
            <Header History={word} />
            <div className="space-x-auto ml-100 mr-100">
                {isDeleting && (
                    <div className="flex flex-row justify-between border-b-2 border-solid p-2">
                        <div className="flex items-center m-2">
                            <CloseOutlinedIcon className="cursor-pointer m-2" />
                            <span className="text-base font-semibold m-2">{selected.length}</span>
                            <span className="text-base m-2">Selected elements</span>
                        </div>
                        <Button_Style onClick={handleDeleteSelected} name="Selected" className="text-sm p-2 m-2" inverted >Delete</Button_Style>
                    </div>
                )}
                {Object.entries(history).length !== 0 ? Object.entries(history).map(([date,entries]) => (
                    <Day_History SearchDate={date} History={entries} HistorySelected={handleSelected} Items={selected} HandleWord={handleWord}/>
                )) : (
                    <p className="text-center p-12 opacity-50">No History was found.</p>
                )}

                <div className="text-center">
                    <Button_Style onClick={handleDeleteSelected} name="All" className="text-sm p-3 py-1 w-1/3 mx-8">
                        Delete Search History
                    </Button_Style>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Search_History;