import { useState } from "react";
import Header from "../components/Header"   
import { getUsers,userLogIn } from "../services/userService";
import { useNavigate } from "react-router-dom";

function logIn(){

    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    
    const handleForm = async (e) => {
        e.preventDefault();
        const userFound = await userLogIn(user, password);
        if(userFound.data)
        {
            alert("GG SI EXISTE");
            navigate("/Home");
        }
        else{
            alert("GG no existe");
        }
    }   

    const handleUserButton = async () => {
        const allUsers = await getUsers("Dobeto", "Dobeto123");
        setUserData(allUsers.data);
    }

    return(
        <>
        <Header />
        <form onSubmit={handleForm} className="">
            <input className="" type="text" onChange={(e) => {setUser(e.currentTarget.value)}} name="username" id="username"/>
            <input type="password" onChange={(e) => {setPassword(e.currentTarget.value)}} name="password" id="password"/>
            <button type="submit">Enviar </button>
        </form>

        <button onClick={handleUserButton}>E dale click we</button>
        
        {userData && (
            userData.map((user,index) => (
            <div key={index}>
                <p>{user.Username}</p>
            </div>
            ))
        )}
        </>
    )
}

export default logIn;