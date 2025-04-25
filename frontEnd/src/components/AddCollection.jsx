import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useState } from "react";
import { Modal } from "@mui/material";
import Button_Style from "./Button_Style";
import { InsertCollection, InsertCollectionElement, getCollections } from '../services/collectionService';
import Swal from 'sweetalert2';


function AddCollection({ children, userLoggedIn = null,Post, className='flex items-center my-2' }) {

    const [openCollection, setOpenCollection] = useState(false);
    const [collectionName, setCollectionName] = useState();
    const [collectionId, setCollectionId] = useState();
    const [userCollections, setUserCollections] = useState([]);

    const handleOpenCollection = () => userLoggedIn === null ? handleNoSession() : setOpenCollection(true);
    const handleCloseCollection = () => setOpenCollection(false);


    const createCollection = async (e) => {
        e.preventDefault();

        if (!collectionName) {
            handleCloseCollection();
            Swal.fire({
                theme: 'dark',
                icon: "error",
                title: "Oops!!",
                text: "Name your collection!!"
            }).then((result) => {
                result.isConfirmed ? handleOpen() : '';
            });
        } else {
            handleCloseCollection();
            const response = await InsertCollection(collectionName, userLoggedIn.Email, Post.PostId);
            console.log(response);

            if (response.status == true) {
                Swal.fire({
                    theme: 'dark',
                    icon: "success",
                    title: "Sucess!!",
                    text: "Collection created sucessfully!!"
                });
            } else {
                Swal.fire({
                    theme: 'dark',
                    icon: "error",
                    title: "Oops!!",
                    text: "Error at creating collection"
                })
            }
        }

    }


    const handleNoSession = () => {
        Swal.fire({
            theme: 'dark',
            icon: "error",
            title: "Oops!!",
            text: "You need to Log in to get access to this function!",
        })
    }
    const addToCollection = async (collectionId) => {

        const response = await InsertCollectionElement(collectionId, Post.PostId);
        console.log(collectionId, Post.PostId);
        console.log(response);

        if (response.status == true) {
            Swal.fire({
                theme: 'dark',
                icon: "success",
                title: "Sucess",
                text: "Sucessfully added to collection!!"
            });
        } else {
            Swal.fire({
                theme: 'dark',
                icon: "warning",
                title: "Hold On!!",
                text: "This post is already in the collection!!"
            });
        }

    }

    const getUserCollections = async () => {
        if (userLoggedIn === null) {
            handleNoSession();
        } else {
            const collectionsFound = await getCollections(userLoggedIn.Email);
            setUserCollections(collectionsFound.data);
        }
    }


    return (
        <Popover className="relative">
            <PopoverButton className={className}>
                {children}
            </PopoverButton>

            <PopoverPanel className='absolute left-0 w-50 h-auto bg-[var(--background-color)] shadow-sm border-2 border-solid border-[var(--primary-color)] rounded-sm p-2 z-50 text-xs text-comp-1 flex flex-col space-y-2'>
                <div className='border-b-1 border-solid border-[var(--primary-color)]'>
                    <AddOutlinedIcon />
                    <button className='cursor-pointer' onClick={handleOpenCollection}>Add to New Collection</button>
                </div>

                <Modal open={openCollection} onClose={handleCloseCollection} className='flex items-center justify-center'>
                    <div className="flex items-center justify-center w-1/3 h-1/2">
                        <div className="p-8 bg-color rounded shadow-lg">
                            <header className='border-b-2 border-colid border-[var(--primary-color)] p-2'>
                                <h2 className='text-center text-lg font-bold'>New Collection</h2>
                            </header>
                            <form className='flex flex-col space-x-6 py-8 mx-4 text-center'>
                                <span className='text-sm font-bold mb-4'>Name your new collection!</span>
                                <input onChange={e => setCollectionName(e.currentTarget.value)} type="text" name="NewCollectionName" placeholder="New Collection Name" className='text-comp-1 w-full p-2 py-1 border-b-1 border-solid border-[var(--primary-color)]' />
                            </form>
                            <footer className='text-center border-t-2 border-colid border-[var(--primary-color)] p-2'>
                                <Button_Style className='text-sm m-2 p-3 py-1' onClick={createCollection}>Save</Button_Style>
                                <Button_Style className='text-sm m-2 p-3 py-1' onClick={handleCloseCollection}>Cancel</Button_Style>
                            </footer>
                        </div>
                    </div>
                </Modal>

                {userLoggedIn ? (
                    <Popover className='relative'>
                        <PopoverButton className='flex items-center my-2'>
                            <div className='border-b-1 border-solid border-[var(--primary-color)]'>
                                <BookmarkBorderIcon />
                                <button className='cursor-pointer' onClick={getUserCollections}>Add to Existing Collection</button>
                            </div>
                        </PopoverButton>
                        <PopoverPanel className='absolute left-50 w-50 h-auto bg-[var(--background-color)] shadow-sm border-2 border-solid border-[var(--primary-color)] rounded-sm p-2 z-50 text-xs text-comp-1 flex flex-col space-y-2'>
                            {userCollections?.length > 0 ? (userCollections.map(collection => (
                                <button
                                    key={collection.CollectionId}
                                    onClick={() => {
                                        setCollectionId(collection.CollectionId);
                                        addToCollection(collection.CollectionId);
                                    }}
                                    className="flex justify-start border-b-1 border-solid border-[var(--primary-color)] cursor-pointer">
                                    {collection.Collection_Name}
                                </button>
                            ))) : (<span className='flex justify-start border-b-1 border-solid border-[var(--primary-color)] cursor-default'>No Collections yet</span>)}
                        </PopoverPanel>
                    </Popover>
                ) : (
                    <div className='border-b-1 border-solid border-[var(--primary-color)]'>
                        <BookmarkBorderIcon />
                        <button className='cursor-pointer' onClick={handleNoSession}>Add to Existing Collection</button>
                    </div>
                )}
            </PopoverPanel>
        </Popover>
    );
}

export default AddCollection;