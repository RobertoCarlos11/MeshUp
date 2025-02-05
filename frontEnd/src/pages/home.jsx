import { useState } from "react";
import Header from "../components/Header"
import Scene from "../components/Three/Scene"

function Home()
{
    const [modelUrl, setModelUrl] = useState(null);
    const [textureUrl, setTextureUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file)
        {
            const objecturl = URL.createObjectURL(file);
            setModelUrl(objecturl);
        }
    }

    const handleTextureFile = (e) => {
        const file = e.target.files[0];
        if(file)
        {
            const objecturl = URL.createObjectURL(file);
            setTextureUrl(objecturl);
        }
    }
    
    return (
        <div className="bg-color">
        <Header />
        <h1>Hola bienvenido a la pagina principal MESH UP!!!</h1>
        <div className="text-secondary flex justify-center space-x-auto space-y-5">
            <input type="file" onChange={handleFileChange} id="modelFile" />
            <input type="file" onChange={handleTextureFile} id="textureFile" />
            {modelUrl && (<div>
                <p>cargaste un modelo</p>
                <p>{modelUrl}</p>
            </div>)}
        </div>

        <Scene modelUrl = {modelUrl} textureUrl={textureUrl}/>

        </div>
    )
}

export default Home