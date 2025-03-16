import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import Logo from "../assets/Logo.png";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button_Style from "../components/Button_Style";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { deleteCollection, updateCollection, getCollectionElements } from '../services/collectionService';

function Collection(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [elements, setElements] = useState();
    const { ProfileId, collection_name, collectionId } = useParams();
    const [collectionName, setCollectionName] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState();

    const handleEditCollection = () => { setIsEditing(true); };

    window.onload = () => { alert("INNN")}

    useEffect(() => {
        user === null ? setUserId("Guest") : setUserId(userId);
    });

    useEffect(() => {
        setCollectionName(collection_name);

        const FetchCollectionELements = async () => {
            const elementsFound = await getCollectionElements(collectionId);
            if(elementsFound?.data && elementsFound.data !== null){
                console.log('Elementos:' , elementsFound.data);
                setElements(elementsFound.data);
            }else{
                console.log('No elements');
            }
        }
        FetchCollectionELements();

    }, [collection_name, collectionId]);
    
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
        const response = await deleteCollection(collectionId);
        console.log(response);
        if(response.status == true){
            Swal.fire({
                theme: 'dark',
                icon: "success",
                title: "Sucess!!",
                text: "Sucessfully deleted collection!!"
            }).then((result) => {
                navigate(`/Profile/${userId}`);
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

    const updateCollectionName = async () =>{
        const response = await updateCollection(collectionName.trim(), collectionId);
        console.log(response);

        if (response.status == true){
            Swal.fire({
                theme: 'dark',
                icon: "success",
                title: "Success!!",
                text: "Sucessfully re-named collection!!"
            }).then((result) => {
                navigate(`/Collection/${collectionName}/${collectionId}`, { replace: true });
            });
        }else{
            Swal.fire({
                theme: 'dark',
                icon: "error",
                title: "Oops!!",
                text: "Error at re-naming collection!!"
            });
        }
        setIsEditing(false);
    }

    return (
        <>
        <Header/>

        <div className="flex flex-row justify-between items-center bg-[var(--secondary-color)]">
            <input type="text" id="Collection_Name" value={collectionName} 
            className={`text-3xl font-semibold m-10 ${isEditing ? "w-full p-2 border-b-2 border-[var(--primary-color)]" : ""}`} 
            disabled={!isEditing} 
            onChange={(e) => setCollectionName(e.target.value)}/>

            { userId === ProfileId && (
                !isEditing ? (
                    <EditOutlinedIcon 
                        onClick={handleEditCollection} 
                        className="cursor-pointer text-[var(--background-color)] text-lg opacity-50 m-10"
                    />
                ):(
                    <Button_Style 
                        onClick={updateCollectionName}
                        className="text-sm m-2 p-3 pt-1 pb-1">Save</Button_Style>
                )
            )}
        </div>

        <div className="flex flex-wrap justify-center space-x-auto m-5 p-5">
        {elements && elements.length > 0 ? (
            elements.map((element) => (
                <PostCard key={element.PostId} Post={element} />
            ))
        ) : elements && elements.length === 0 ? (
            <div>The Collection is empty :( . <Link to="/Home" className="underline">Find Posts.</Link></div>
        ) : (
            <div className="text-sm animate-bounce flex items-center justify-center">
                <img src={Logo} className="w-10" alt="LogoName" />
                <p>Loading...</p>
            </div>
        )}
        </div>
        { userId === ProfileId && (
            <center><Button_Style onClick={handleDeleteCollection} className="text-sm m-2 p-3 pt-1 pb-1">Delete Collection</Button_Style></center> 
        )}
        
        <Footer/>
        </>
    )
}
export default Collection;