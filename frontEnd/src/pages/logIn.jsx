import { useState } from "react";
import { getUsers,userLogIn } from "../services/userService";
import { useNavigate, Link } from "react-router-dom";

function LogIn(){

    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginButton = async (e) => {
        e.preventDefault();
        const userFound = await userLogIn(user,password);
        console.log(userFound);

        alert(userFound.status ? `Usuario Encontrado: ${userFound.data.Username}` : "No existe o t equivocaste pendejo");

    }
    return(
        <div className="h-screen w-screen flex justify-center items-center space-x-auto">
            <div className="bg-secondary px-12 py-16 rounded-md">
                <h1 className="text-comp-1 text-center font-bold text-2xl p-8">Welcome Back!</h1>
                <h2 className="text-comp-1 text-center font-bold text-xl">Log In</h2>
                <form className="flex flex-col space-y-6 p-6">
                    <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" onChange={(e) => setUser(e.target.value)} type="text" placeholder="Username or Email Address"/>
                    <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                    <div className="flex justify-center">
                    <button onClick={handleLoginButton} className="w-1/2 text-xs bg-primary text-comp-1 font-semibold rounded-sm p-1">Log In</button>
                    </div>
                </form>
                <div className="flex justify-center">
                <Link className="text-comp-1 font-light text-xs text-center">No account?. No problem!</Link>
                </div>
            </div>
        </div>
    )
}

export default LogIn;