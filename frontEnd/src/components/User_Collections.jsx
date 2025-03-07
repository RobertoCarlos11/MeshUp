import Swal from 'sweetalert2';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deleteCollection } from '../services/collectionService';

function User_Collections({Collection}) {
       
    const handleDeleteCollection = () => {
        Swal.fire({
            icon: "warning",
            title: "Hold On!!",
            text: "Are you sure you want to delete this collection? This action will be permanent!!",
            showConfirmButton: false,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Cancel",
            denyButtonText: "Delete Collection"
        }).then((result) => {
            if(result.isDenied){
                deleteUserCollection();
            }
        })
    }

    const deleteUserCollection = async (e) => {
        const response = await deleteCollection(Collection.CollectionId);
        console.log(response);
        if(response.status == true){
            Swal.fire({
                icon: "success",
                title: "Sucess!!",
                text: "Sucessfully deleted collection!!"
            }).then((result) => {
                location.reload();
            });
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops!!",
                text: "Error at deleting collection!!"
            });
        }
    }
    
    return (
        <>
            <div className="flex flex-col">
                <div className="relative flex flex-col m-2 -mb-4 bg-white shadow-lg rounded-sm w-145 scale-95 overflow-hidden z-2">      
                    <div className='h-75 bg-[var(--secondary-color)] rounded-t-sm flex justify-end'>
                        <DeleteOutlineOutlinedIcon onClick={handleDeleteCollection} className='cursor-pointer text-[var(--background-color)] text-lg opacity-50 m-3'/>
                    </div>
                    <div className="mx-3 flex justify-between border-t pb-2 pt-2 px-1">
                        <span className="cursor-pointer text-base text-[var(--secondary-color)] m-1">
                            {Collection.Collection_Name}    
                        </span>
                    </div>
                </div>
                <div className="h-4 ml-5 mr-5 mb-4  bg-gray-400 w-140 scale-95 rounded-sm shadow-lg"></div>
            </div>
        </>
    );
}

export default User_Collections;