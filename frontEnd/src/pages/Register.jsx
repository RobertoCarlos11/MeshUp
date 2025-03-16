import LogoName from '../assets/LogoName.png';
import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userRegister } from "../services/userService";
import Button_Style from "../components/Button_Style";
import Swal from "sweetalert2";

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthdate, setBirthdate] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        localStorage.removeItem("user");
    },[]);

    const handleSignInButton = async (e) => {
        e.preventDefault();
        if(!user || !email || !birthdate || !password){
            Swal.fire({
                theme: 'dark',
                icon: "error",
                title: "Oops!!",
                text: "Please fill all fields."
            })
        }

        const emailValid = validateEmail(email);
        const dateValid = validateDate(birthdate);
        const passwordValid = validatePassword(password);

        function validateEmail(email) {
            const emailRegExp = new RegExp('^.+@.+\..+$');
            if(!emailRegExp.test(email)){
                return "Invalid e-mail adress!";
            }else{ return true; }
        }

        function validateDate(date){
            const today = new Date();
            const birthDate = new Date(date);

            if(birthDate > today){
                return "Invalid Birthdate!";
            }else{ return true; }
        }
        
        function validatePassword(password){
            const passRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{8,}$');
            if(!passRegExp.test(password)){
                return "Password must contain Upper and Lower case letters, numbers and special characters!";
            }else{ return true; }
        }

        if (emailValid == true && dateValid == true && passwordValid == true){
            const response = await userRegister(user, password, birthdate, email);
            console.log(response);

            if (response.status ==  true){
                Swal.fire({
                    theme: 'dark',
                    icon: "success",
                    title:"You're all set!",
                    text: "User registrated sucessfullly!!"
                })
                navigate("/");
            }else{
                Swal.fire({
                    theme: 'dark',
                    icon: "error",
                    title: "Oops!!",
                    text: response.message 
                })
            }

        }else{
            const messages = [emailValid, dateValid, passwordValid];
            const errorMsg =  messages.filter(message => message !== true).join("<br>");

            Swal.fire({
                theme: 'dark',
                icon: "error",
                title: "Oops!!",
                html: errorMsg
            })
        }
        
    }

    return (
        <>
            <Link to={"/Home"}><img src={LogoName} alt="LogoName" className='w-30 m-10 -mb-10'/></Link>
            <div className="h-screen flex justify-center items-center space-x-auto">
                <div className="bg-secondary p-12 rounded-md">
                    <div className='flex flex-col items-center'>
                        <img src={LogoName} alt="LogoName" className='w-20' />
                        <h1 className="text-comp-1 text-center font-bold text-2xl p-8">Welcome To MeshUp!</h1>
                    </div>
                    <h2 className="text-comp-1 text-center font-bold text-xl">Sign In</h2>
                    <form className="flex flex-col space-y-6 p-6">
                        <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" onChange={e => setEmail(e.currentTarget.value)} type="text" placeholder="Email Address" />
                        <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" onChange={e => setUser(e.currentTarget.value)} type="text" placeholder="Username" />
                        <label htmlFor="Birthdate" className="text-xs mb-2">Birthdate</label>
                        <input id="Birthdate" onChange={e => setBirthdate(e.currentTarget.value)} className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" type="date" placeholder="Birthdate" />
                        <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" onChange = {e => setPassword(e.currentTarget.value)}type="password" placeholder="Password" />
                        <div className="flex justify-center">
                            <Button_Style className="w-1/2 text-sm" onClick={handleSignInButton}>Sign In</Button_Style>
                        </div>
                    </form>
                    <div className="flex justify-center">
                        <Link to="/" className="text-comp-1 font-light text-xs text-center underline">Already have an account?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;