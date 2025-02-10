import Logo from "../assets/Logo.png";
function Footer(){
    return(
        <div className="ml-5 mr-5">
            <footer className="bg-color: flex flex-row justify-center items-center space-x-auto p-5 m-5 border-t-2 border-solid">
                <img src={Logo} alt="Logo" id="MeshUp_Logo" className="h-10 w-10 object-contain"/>
                <label htmlFor="MeshUp_Logo" className="m-2">MeshUp 2025. | Roberto Carlos Dominguez Espinosa - Ana Sofía Hernández Salazar.</label> 
            </footer>
        </div>
    )
}
export default Footer;