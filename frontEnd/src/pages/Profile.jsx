import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile_Sections from "../components/Profile_Sections";
import DefaultPfp from "../assets/no-user.png";
import Button_Style from "../components/Button_Style";
import { useState } from "react";
import { Modal } from "@mui/material";

function Profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <Header />
            <div className="bg-[var(--secondary-color)] h-40"></div>

            <div className="flex flex-col justify-center">
                <div className="flex justify-center transform -translate-y-1/2">
                    <img src={DefaultPfp} alt="ProfilePicture" className="border-4 border-solid border-[var(--background-color)] rounded-full w-45 h-45" />
                </div>
                <div className="flex flex-col -mt-18 mb-3">
                    <span className="text-center text-2xl font-semibold">{user.Username}</span>
                    <div className="flex felx-row justify-center">
                        <div className="m-2">
                            <span className="text-base font-semibold mr-2">00</span>Posts
                        </div>
                        <div className="m-2">
                            <span className="text-base font-semibold mr-2">00</span>Collections
                        </div>
                    </div>
                </div>
                <Button_Style className="text-sm m-2 px-3 py-1 w-32 self-center" onClick={handleOpen}>
                    Edit Profile
                </Button_Style>
            </div>
            <Modal open={open} onClose={handleClose} className="flex items-center justify-center">
                <div className="p-4 bg-color rounded shadow-lg">
                    <h2>Edit Profile</h2>
                    <form className="flex justify-between space-x-6">
                        <div className="">
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Username</label>
                                <input type="text" defaultValue={user.Username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Password</label>
                                <input type="text" defaultValue={user.Pass} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4"></div>
                            <label className="block text-sm font-bold mb-2">Birthdate</label>
                            <input type="date" defaultValue={formatDate(user.Birthdate)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4 flex flex-col items-center">
                            <label className="block text-sm font-bold mb-2">Profile Picture</label>
                            <input type="file" hidden />
                            <img src={user.Profile_Picture === null ? user.Profile_Picture : DefaultPfp} className="w-50" />
                        </div>
                        <div className="flex items-center justify-between">
                        </div>
                    </form>
                        <div className="flex justify-evenly">
                            <Button_Style className="text-sm px-3 py-1" onClick={handleClose}>
                                Save
                            </Button_Style>
                            <Button_Style className="text-sm px-3 py-1" onClick={handleClose}>
                                Cancel
                            </Button_Style>
                        </div>
                </div>
            </Modal >
            <Profile_Sections />
            <Footer />
        </>
    )
}
export default Profile;