import Header from "../components/Header";
import Footer from "../components/Footer";
import Scene from "../components/Three/Scene";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
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
                <input type="text" placeholder="Add Title..." className="text-comp-1 font-bold text-2xl w-full" />
                <Scene className="h-1/2" modelUrl={model && URL.createObjectURL(model)} textureUrl = {texture && URL.createObjectURL(texture)}/>
                <div className="flex w-full justify-between">
                    <div className="flex w-1/2 justify-between text-primary">
                        <button onClick={handleUploadModel} className="flex p-1 rounded-md items-center hover:bg-[var(--primary-color)] hover:text-[var(--background-color)] transition duration-150 ease-in-out">
                            <ViewInArIcon />
                            <p className="text-xs">{model ? model.name : "Add a model..."}</p>
                            <input type="file" ref={modelRef} onChange={handleModelChange} hidden />
                        </button>
                        <button onClick={handleUploadTexture} className="flex p-1 rounded-md items-center hover:bg-[var(--primary-color)] hover:text-[var(--background-color)] transition duration-150 ease-in-out">
                            <AddPhotoAlternateIcon />
                            <p className="text-xs">{texture ? texture.name : "Add a texture..."}</p>
                            <input type="file" ref={textureRef} onChange={handleTextureChange} hidden />

                        </button>
                    </div>
                    <select className="w-1/3 bg-primary t96ext-comp-1 font-semibold rounded-md text-comp-1">
                        <option value="Animals">Animals</option>
                        <option value="Technology">Technology</option>
                        <option value="Youtube">Youtube</option>
                        <option value="Super Low Poly">Super Low Poly</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <h2 className="text-xl font-bold text-comp-1">Description:</h2>
                    <textarea placeholder="Add a description..." className="w-full h-40 rounded-md border-1 border-[var(--primary-color)] text-comp-1 text-xs"></textarea>
                </div>
                <button className="bg-primary text-comp-1 rounded-md w-1/2 self-center">Upload</button>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Upload;