import Header from "../components/Header";
import Footer from "../components/Footer";
import Collection_ELement from "../components/Collection_Element";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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

        <div className="flex flex-wrap justify-center space-x-auto m-10 p-10">
            <Collection_ELement/>
            <Collection_ELement/>
            <Collection_ELement/>
        </div>

        <center><button className="justify-center bg-[var(--primary-color)] cursor-pointer rounded-sm m-5 p-3 pb-2 pt-2">Delete Collection</button></center>

        <Footer/>
        </>
    )
}
export default Collection;