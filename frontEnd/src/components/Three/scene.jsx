import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./model";

const Scene = (props) => 
{
    return(
        <div className="w-full h-full">
            <Canvas camera={[5,1,25]} style={{width:"100%" , height:"500px" }}>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[2,5,3]}/>
                <OrbitControls/>
                {props.modelUrl && props.textureUrl && <Model modelUrl={props.modelUrl} textureUrl={props.textureUrl}/>}
            </Canvas>
        </div>
    )
}

export default Scene