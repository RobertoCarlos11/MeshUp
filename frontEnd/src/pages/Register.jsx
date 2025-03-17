import LogoName from '../assets/LogoName.png';
import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userRegister } from "../services/userService";
import Button_Style from "../components/Button_Style";
import Swal from "sweetalert2";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthdate, setBirthdate] = useState(null);
    const [password, setPassword] = useState(null);
    
    const [validEmail, setValidEmail] = useState(null);
    const [validDate, setValidDate] = useState(null);
    const [validPassword, setValidPassword] = useState(null);

    useEffect(() => {
        localStorage.removeItem("user");
    },[]);

    const validateEmail = (value) => {
        setEmail(value);
        const emailRegExp = new RegExp('^[\\w.-]+@([\\w-]+\\.)+[\\w]{2,4}$');
        setValidEmail(emailRegExp.test(value));
    }

    const validateDate = (value) => {
        setBirthdate(value);
        const today = new Date();
        const selectedDate = new Date(value);
        setValidDate(selectedDate < today);
    }
    
    const validatePassword = (value) => {
        setPassword(value);
        const passRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{8,}$');
        setValidPassword(passRegExp.test(value));
    }

    const handleSignInButton = async (e) => {
        e.preventDefault();

        if (!user || !email || !birthdate || !password) {
            Swal.fire({
                theme: "dark",
                icon: "error",
                title: "Oops!!",
                text: "Please fill all fields."
            });
            return;
        }
    
        if (validEmail && validDate && validPassword) {
            const response = await userRegister(user, password, birthdate, email);
            console.log(response);
    
            if (response.status === true) {
                Swal.fire({
                    theme: "dark",
                    icon: "success",
                    title: "You're all set!",
                    text: "User registered successfully!!"
                });
                navigate("/");
            } else {
                Swal.fire({
                    theme: "dark",
                    icon: "error",
                    title: "Oops!!",
                    text: response.message
                });
            }
        } else {
            let emailMessage;
            let birthdateMessage;
            let passwordMessage;
    
            if (!validEmail) emailMessage = "Invalid email address!";
            if (!validDate) birthdateMessage = "Invalid birthdate!";
            if (!validPassword) passwordMessage = "Password must contain upper & lowercase letters, numbers, and special characters!";
    
            const messages = [emailMessage, birthdateMessage, passwordMessage].filter(Boolean);
    
            Swal.fire({
                theme: "dark",
                icon: "error",
                title: "Oops!!",
                html: messages.join("<br>")
            });
        }
    }

    return (
        <>
            <Link to={"/Home"}><img src={LogoName} alt="LogoName" className='w-30 mx-10 my-5 -mb-15'/></Link>
            <div className="h-screen flex justify-center items-center space-x-auto">
                <div className="bg-secondary p-12 rounded-md">
                    <div className='flex flex-col items-center'>
                        <img src={LogoName} alt="LogoName" className='w-20' />
                        <h1 className="text-comp-1 text-center font-bold text-2xl p-8">Welcome To MeshUp!</h1>
                    </div>
                    <h2 className="text-comp-1 text-center font-bold text-xl">Sign In</h2>
                    <form className="flex flex-col space-y-6 p-6">
                        <div className='flex justify-between'>
                            <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)] w-full" value={email} onChange={e => validateEmail(e.target.value)} type="text" placeholder="Email Address" />
                            {validEmail === null ? null : validEmail ? (
                                <CheckOutlinedIcon className='text-[#87E86F]'/>
                            ):(
                                <CloseOutlinedIcon className='text-[#E86F91]'/>
                            )}
                        </div>

                        <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" onChange={e => setUser(e.target.value)} type="text" placeholder="Username" />
                        
                        <div className='flex flex-col'>
                            <label htmlFor="Birthdate" className="text-xs mb-2">Birthdate</label>
                            <div className='flex justify-between'>
                                <input id="Birthdate" value={birthdate} onChange={e => validateDate(e.target.value)} className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)] w-full" type="date" placeholder="Birthdate" />
                                {validDate === null ? null : validDate ? (
                                    <CheckOutlinedIcon className='text-[#87E86F]'/>
                                ):(
                                    <CloseOutlinedIcon className='text-[#E86F91]'/>
                                )}
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)] w-full" value={password} onChange = {e => validatePassword(e.target.value)}type="password" placeholder="Password" />
                            {validPassword === null ? null : validPassword ? (
                                <CheckOutlinedIcon className='text-[#87E86F]' />
                            ) : (
                                <CloseOutlinedIcon className='text-[#E86F91]' />
                            )}
                        </div>

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