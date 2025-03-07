import Header from "../components/Header";
import Footer from "../components/Footer";
import Collection_ELement from "../components/Collection_Element";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button_Style from "../components/Button_Style";

function Collection(){
    return (
        <>
        <Header/>

        <div className="flex flex-row justify-between items-center bg-[var(--secondary-color)]">
            <span className="text-3xl font-semibold m-10">Collection Name</span>
            <div className='bg-[var(--secondary-color)] rounded-t-sm flex'>
                <EditOutlinedIcon className='cursor-pointer text-[var(--background-color)] text-lg opacity-50 m-10'/>
            </div>
        </div>

        <div className="flex flex-wrap justify-center space-x-auto m-5 p-5">
            <Collection_ELement/>
            <Collection_ELement/>
            <Collection_ELement/>
        </div>

        <center><Button_Style className="text-sm m-2 p-3 pt-1 pb-1">Delete Collection</Button_Style></center> 
        
        <Footer/>
        </>
    )
}
export default Collection;