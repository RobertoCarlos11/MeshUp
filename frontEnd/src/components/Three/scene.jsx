import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

const Scene = (props) => 
{
    return(
        <div className="w-full h-full">
            <Canvas style={{width:"100%" , height:"500px" }}>
                <color attach="background" args={["lightgray"]} />  
                <ambientLight intensity={0.5}/>
                <directionalLight position={[2,5,3]}/>
                <OrbitControls/>
                {props.modelUrl && props.textureUrl && <Model modelUrl={props.modelUrl} textureUrl={props.textureUrl}/>}
            </Canvas>
        </div>
    )
}

export default Scene