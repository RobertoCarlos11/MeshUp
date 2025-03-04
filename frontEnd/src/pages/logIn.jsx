import { useEffect, useState } from "react";
import {userLogIn } from "../services/userService";
import { useNavigate, Link } from "react-router-dom";
import Button_Style from "../components/Button_Style";
import Swal from "sweetalert2";

function LogIn(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        localStorage.removeItem("user");
    },[]);
    
    const handleLoginButton = async (e) => {
        e.preventDefault();
        if(!user || !password)
            return Swal.fire({
                title: "Missing Information!",
                text: "Please fill out all information",
                icon:"error",
        });

        const userFound = await userLogIn(user,password);
        console.log(userFound);

        Swal.fire({
            title: userFound.status ? "User Found!" : "User not Found",
            text: userFound.status ? `Welcome back ${userFound.data.Username}!` : "User cannot be found",
            icon: userFound.status ? "success" : "error",
        }).then((result) => {
                if (result.isConfirmed && userFound.status) {
                localStorage.setItem("user", JSON.stringify(userFound.data));
                navigate("/Home");
            }
        });
    }
    return(
        <div className="h-screen flex justify-center items-center space-x-auto">
            <div className="bg-secondary px-12 py-16 rounded-md">
                <h1 className="text-comp-1 text-center font-bold text-2xl p-8">Welcome Back!</h1>
                <h2 className="text-comp-1 text-center font-bold text-xl">Log In</h2>
                <form className="flex flex-col space-y-6 p-6">
                    <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" onChange={(e) => setUser(e.target.value)} type="text" placeholder="Username or Email Address"/>
                    <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                    <div className="flex justify-center">
                    <Button_Style className="w-1/2 text-sm" onClick={handleLoginButton}>
                        Log In
                    </Button_Style>
                    </div>
                </form>
                <div className="flex justify-center">
                <Link to="/Register" className="text-comp-1 font-light text-xs text-center underline">No account?. No problem!</Link>
                </div>
            </div>
        </div>
    )
}

export default LogIn;