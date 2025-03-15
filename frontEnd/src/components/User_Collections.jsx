import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deleteCollection } from '../services/collectionService';
import Scene from './Three/Scene';
import { useEffect, useState } from 'react';

function User_Collections({Collection}) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [models, setModels] = useState();

    const handleDeleteCollection = () => {
        Swal.fire({
            theme: 'dark',
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

    const deleteUserCollection = async () => {
        const response = await deleteCollection(Collection.CollectionId);
        console.log(response);
        if(response.status == true){
            Swal.fire({
                theme: 'dark',
                icon: "success",
                title: "Sucess!!",
                text: "Sucessfully deleted collection!!"
            }).then(() => {
                window.location.reload();
            });
        }else{
            Swal.fire({
                theme: 'dark',
                icon: "error",
                title: "Oops!!",
                text: "Error at deleting collection!!"
            });
        }
    }

    useEffect(() => {
        const {elements} = Collection;
        const newModels = {};
        
        elements.forEach(element => {
            const {post} = element; 
            const {model} = post;

            const ModelArray = new Uint8Array(model.Model.data);
            const ModelBlob = new Blob([ModelArray]);
            const ModelURL = URL.createObjectURL(ModelBlob);

            
            const TextureArray = new Uint8Array(model.Texture.data);
            const TextureBlob = new Blob([TextureArray]);
            const TextureURL =  URL.createObjectURL(TextureBlob);

            console.log(post);

            newModels[post.PostId] = { model: ModelURL, texture: TextureURL };
        });

        setModels((prev) => ({
            ...prev,
            ...newModels,
        }));

    },[Collection]);

    return (
        <>
            <div className="flex flex-col">
                <div className="relative flex flex-col m-2 -mb-4 bg-white shadow-lg rounded-sm w-145 scale-95 overflow-hidden z-2"> 
                    <div className='flex justify-center items-center h-75'>
                    {models && Object.entries(models).map(([postId, modelData]) => (
                        <div key={postId} className='w-1/4 h-full flex-shrink-0 flex-grow-0'>
                            <Scene model={modelData.model} texture={modelData.texture} className="h-full w-full rounded-sm relative"/>
                        </div>
                    ))}
                    </div>
                    <div className="flex justify-between items-center border-t mx-3 pb-2 pt-2 px-1">
                        <span onClick={() => {navigate(`/Collection/${Collection.Email}/${Collection.Collection_Name}/${Collection.CollectionId}`)}} className="cursor-pointer text-base text-[var(--secondary-color)] m-1">
                            {Collection.Collection_Name}    
                        </span>
                        {user.Email === Collection.Email &&
                            <DeleteOutlineOutlinedIcon onClick={handleDeleteCollection} className='cursor-pointer text-[var(--background-color)] text-lg opacity-50'/>
                        }
                        </div>
                </div>
                <div className="h-4 ml-5 mr-5 mb-4  bg-gray-400 w-140 scale-95 rounded-sm shadow-lg"></div>
            </div>
        </>
    );
}

export default User_Collections;