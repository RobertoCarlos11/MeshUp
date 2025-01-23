import { useState } from "react";



function logIn(){

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const handleForm = (e) => {
        e.preventDefault();
        alert(user);
        alert(password);
    }

    return(
        <form onSubmit={handleForm} className="">
            <input className="" type="text" onChange={(e) => {setUser(e.currentTarget.value)}} name="username" id="username"/>
            <input type="password" onChange={(e) => {setPassword(e.currentTarget.value)}} name="password" id="password"/>
            <button type="submit">Enviar </button>
        </form>
    )
}

export default logIn;