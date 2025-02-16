import Header from "../components/Header";
import Footer from "../components/Footer";
import Scene from "../components/Three/Scene";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Button_Style from "../components/Button_Style";
import { useRef, useState } from "react";

function Upload() {

    const [model, setModel] = useState(null);
    const [texture, setTexture] = useState(null);
    const modelRef = useRef();
    const textureRef = useRef();

    const handleUploadModel = () => {
        modelRef.current.click();
    }

    const handleUploadTexture = () => {
        textureRef.current.click();
    }

    const handleModelChange = (e) => {
        setModel(e.target.files[0]);
    }

    const handleTextureChange = (e) => {
        setTexture(e.target.files[0]);
    }

    return (
        <>
        <Header/>
        <div className="space-x-auto h-screen flex justify-center">
            <div className="w-1/2 flex flex-col space-y-4">
                <input type="text" placeholder="Add Title..." className="text-comp-1 font-bold text-2xl w-full border-b-2 border-solid border-[var(--primary-color)]" />
                <Scene className="h-1/2" modelUrl={model && URL.createObjectURL(model)} textureUrl = {texture && URL.createObjectURL(texture)}/>
                <div className="flex w-full justify-between">
                    <div className="flex flex-row">
                        <button onClick={handleUploadModel} className="cursor-pointer rounded-md items-center border-1 border-solid border-[var(--primary-color)] hover:bg-[var(--primary-color)] active:bg-[var(--secondary-color)] active:border-[var(--secondary-color)] m-1 p-3 pt-1 pb-1 transition duration-150 ease-in-out">
                            <ViewInArIcon />
                            <span className="text-xs">{model ? model.name : "Add a model..."}</span>
                            <input type="file" ref={modelRef} onChange={handleModelChange} hidden />
                        </button>
                        <button onClick={handleUploadTexture} className="cursor-pointer rounded-md items-center border-1 border-solid border-[var(--primary-color)] hover:bg-[var(--primary-color)] active:bg-[var(--secondary-color)] active:border-[var(--secondary-color)] m-1 p-3 pt-1 pb-1 transition duration-150 ease-in-out">
                            <AddPhotoAlternateIcon />
                            <span className="text-xs">{texture ? texture.name : "Add a texture..."}</span>
                            <input type="file" ref={textureRef} onChange={handleTextureChange} hidden />

                        </button>
                    </div>
                    <select className="w-1/3 text-sm bg-[var(--background-color)] border-1 border-solid border-[var(--primary-color)] rounded-sm p-1 m-1">
                        <option value="Animals">Animals</option>
                        <option value="Technology">Technology</option>
                        <option value="Youtube">Youtube</option>
                        <option value="Super Low Poly">Super Low Poly</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <h2 className="text-xl font-bold text-comp-1">Description:</h2>
                    <textarea placeholder="Add a description..." className="w-full h-40 rounded-sm border-2 border-[var(--primary-color)] text-xs p-2"></textarea>
                </div>
                
                <center><Button_Style name="Upload" className="text-sm m-2 p-3 pt-1 pb-1 w-1/3"/></center>
                
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Upload;