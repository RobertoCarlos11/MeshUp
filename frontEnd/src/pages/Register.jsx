import { Link } from "react-router-dom";
import Button_Style from "../components/Button_Style";

function Register()
{
    return(
        <div>
            <div className="h-screen flex justify-center items-center space-x-auto">
            <div className="bg-secondary px-12 py-16 rounded-md">
                <h1 className="text-comp-1 text-center font-bold text-2xl p-8">Welcome To MeshUp!</h1>
                <h2 className="text-comp-1 text-center font-bold text-xl">Sign In</h2>
                <form className="flex flex-col space-y-6 p-6">
                    <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" type="text" placeholder="Email Address"/>
                    <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" type="text" placeholder="Username"/>
                    <label htmlFor="Birthdate" className="text-xs mb-2">Birthdate</label>
                    <input id="Birthdate" className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" type="date" placeholder="Birthdate"/>
                    <input className="text-xs text-comp-1 border-b-1 border-[var(--primary-color)]" type="password" placeholder="Password"/>
                    <div className="flex justify-center">
                    <Button_Style className="w-1/2">Sign In</Button_Style>
                    </div>
                </form>
                <div className="flex justify-center">
                <Link to="/" className="text-comp-1 font-light text-xs text-center">Already have an account?</Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Register;