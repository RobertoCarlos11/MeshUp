import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { useState } from "react";

const Scene = (props) => 
{
    const [cameraPosition, setCameraPosition] = useState([0,0,50]);

    return(
        <div className={props.className}>
            <Canvas className="rounded-t-sm" style={{width:"100%" }} camera={{position: cameraPosition}}>
                <color attach="background" args={["lightgray"]} />  
                <ambientLight intensity={0.5}/>
                <directionalLight position={[2,5,3]}/>
                <OrbitControls/>
                {props.modelUrl && <Model modelUrl={props.modelUrl} textureUrl={props.textureUrl} setCameraPosition={setCameraPosition}/>}
            </Canvas>
            {props.children}
        </div>
    )
}


Scene.defaultProps = {
    width: " ",
    height: " ",
}


export default Scene