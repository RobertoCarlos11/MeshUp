import { useState } from "react";
import Header from "../components/header"
import Scene from "../components/Three/scene"
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
        <>
        <Header />
        <h1>Hola bienvenido a la pagina principal MESH UP!!!</h1>
        <div className="flex flex-col space-y-5 items-center">
            <input type="file" onChange={handleFileChange} id="modelFile" />
            <input type="file" onChange={handleTextureFile} id="textureFile" />
        </div>
        <Scene modelUrl = {modelUrl} textureUrl={textureUrl}/>
        </>
    )
}

export default Home