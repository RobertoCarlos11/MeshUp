import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile_Sections from "../components/Profile_Sections";
import DefaultPfp from "../assets/no-user.png";
import Button_Style from "../components/Button_Style";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { updateUser, getUser } from "../services/userService";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllPostsOfUser } from "../services/postService";
import Pagination from "../components/Pagination";

function Profile() {

    const postsPerPage = 6;
    const navigate = useNavigate();
    const { ProfileId } = useParams();
    const userLoggedIn = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState();
    const [iconHidden, setIconHidden] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedPosts, setDisplayedPosts] = useState();
    const [photoUrl, setPhotoUrl] = useState(null);
    const [open, setOpen] = useState(false);
    const [userUpdated, setUserUpdated] = useState(false);
    const [photoArray, setPhotoArray] = useState([]);
    const PhotoInputRef = useRef();
    const PhotoRef = useRef();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const handleIndexChanged = (index) => {
        setCurrentPage(index);
    }

    useEffect(() => {
    const startIndex = (currentPage -1) * postsPerPage;
    setDisplayedPosts(posts?.slice(startIndex,startIndex + postsPerPage))
    },[currentPage,posts, ProfileId]);

    useEffect(() => {
        const FetchUserInfo = async () => {
            const UserFound = await getUser(ProfileId);
            if(UserFound.data === null)
                return navigate("/Home");
            
            setUser(UserFound.data);
        }
        FetchUserInfo();

        const FetchPostsOfUser = async () => {
            const PostsFound = await GetAllPostsOfUser(ProfileId);
        const Posts = PostsFound.data.filter(post => userLoggedIn?.Email === ProfileId || post.Post_Status === true);
            
            setPosts(Posts);
        }

        FetchPostsOfUser();
    }, [ProfileId]);


    useEffect(() => {
        if (!user.Profile_Picture)
            return;

        const PhotoArray = new Uint8Array(photoArray.length > 0 ? photoArray : user.Profile_Picture.data);
        const PhotoBlob = new Blob([PhotoArray], { type: "image/png" });
        const PhotoUrl = URL.createObjectURL(PhotoBlob);
        setPhotoUrl(PhotoUrl);
    }, [user.Profile_Picture]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const openPhotoFile = () => {
        PhotoInputRef.current.click();
    }

    const handlePhotoChange = (e) => {
        const photoSelected = e.currentTarget.files[0];

        setUser((prev) => ({
            ...prev,
            Profile_Picture: photoSelected,
        }));
        if (photoSelected) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(photoSelected);

            reader.onload = () => {
                const uint8Array = new Uint8Array(reader.result);
                setPhotoArray([...uint8Array]);
                PhotoRef.current.src = URL.createObjectURL(new Blob([reader.result], { type: photoSelected.type }));
            };
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in user) {
            if (user.hasOwnProperty(key))
                formData.append(key, user[key]);
        }
        const response = await updateUser(formData);

        if (response.status) {
            handleClose();
            Swal.fire({
                title: "Successfully updated!",
                text: "Your information was successfully updated",
                icon: "success",
                timer: 2000,
            });
        }
        setUser((prev) => ({
            ...prev,
            Profile_Picture: { data: photoArray.length === 0 ? prev.Profile_Picture.data : photoArray, type: "buffer", },
        }));
        setUserUpdated(true);
    }

    useEffect(() => {
        if(!userUpdated)
            return;

        localStorage.setItem("user", JSON.stringify(user));
        setUserUpdated(false);
    },[userUpdated]);
    const handleUpdateUser = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <>
            <Header />
            <div className="bg-[var(--secondary-color)] h-40"></div>

            <div className="flex flex-col justify-center">
                <div className="flex justify-center transform -translate-y-1/2">
                    <img src={photoUrl !== null ? photoUrl : DefaultPfp} alt="ProfilePicture" className="border-4 border-solid border-[var(--background-color)] rounded-full w-45 h-45" />
                </div>
                <div className="flex flex-col -mt-18 mb-3">
                    <span className="text-center text-2xl font-semibold">{user.Username}</span>
                    <div className="flex felx-row justify-center">
                        <div className="m-2">
                            <span className="text-base font-semibold mr-2">{posts?.length}</span>Posts
                        </div>
                        <div className="m-2">
                            <span className="text-base font-semibold mr-2">00</span>Collections
                        </div>
                    </div>
                </div>
                {userLoggedIn?.Email === user.Email &&
                    <Button_Style className="text-sm m-2 px-3 py-1 w-32 self-center" onClick={handleOpen}>
                        Edit Profile
                    </Button_Style>}    
            </div>
            <Modal open={open} onClose={handleClose} className="flex items-center justify-center">
                <div className="p-4 bg-color rounded shadow-lg">
                    <h2>Edit Profile</h2>
                    <form className="flex justify-between space-x-6">
                        <div className="">
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Username</label>
                                <input type="text" name="Username" onChange={handleUpdateUser} defaultValue={user.Username} className="shadow appearance-none border rounded w-full py-2 px-3 text-comp-1 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Password</label>
                                <input type="text" name="Pass" onChange={handleUpdateUser} defaultValue={user.Pass} className="shadow appearance-none border rounded w-full py-2 px-3 text-comp-1 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4"></div>
                            <label className="block text-sm font-bold mb-2">Birthdate</label>
                            <input type="date" name="Birthdate" onChange={handleUpdateUser} defaultValue={formatDate(user.Birthdate)} className="shadow appearance-none border rounded w-full py-2 px-3 text-comp-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4 flex flex-col items-center">
                            <label className="block text-sm font-bold mb-2">Profile Picture</label>
                            <input type="file" hidden ref={PhotoInputRef} onChange={(e) => handlePhotoChange(e)} />
                            <div onMouseEnter={() => setIconHidden(false)} onMouseLeave={() => setIconHidden(true)} className="relative w-50">
                                <div onClick={() => openPhotoFile()} hidden={iconHidden} className="absolute inset-0 bg-black/50"></div>
                                <img ref={PhotoRef} src={photoUrl !== null ? photoUrl : DefaultPfp} className="z-0 w-50" />
                                <AddAPhotoIcon className="absolute inset-0 m-auto w-12 h-12 text-white" hidden={iconHidden} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                        </div>
                    </form>
                    <div className="flex justify-evenly">
                        <Button_Style className="text-sm px-3 py-1" onClick={handleSave}>
                            Save
                        </Button_Style>
                        <Button_Style className="text-sm px-3 py-1" onClick={handleClose}>
                            Cancel
                        </Button_Style>
                    </div>
                </div>
            </Modal >
            {displayedPosts ? <Profile_Sections Posts={displayedPosts} UserLoggedIn = {userLoggedIn.Email} UserProfile= {ProfileId}/> : <p> Loading...</p>}
            {posts && <Pagination Pages={Math.ceil(posts?.length / postsPerPage)} indexSelectedChanged={handleIndexChanged} />}
            <Footer />
        </>
    )
}
export default Profile;