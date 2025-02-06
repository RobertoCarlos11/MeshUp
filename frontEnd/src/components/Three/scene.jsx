import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

const Scene = (props) => 
{
    return(
        <div className={props.className}>
            <Canvas className="rounded-md" style={{width:"100%" }}>
                <color attach="background" args={["lightgray"]} />  
                <ambientLight intensity={0.5}/>
                <directionalLight position={[2,5,3]}/>
                <OrbitControls/>
                {props.modelUrl && props.textureUrl && <Model modelUrl={props.modelUrl} textureUrl={props.textureUrl}/>}
            </Canvas>
        </div>
    )
}


Scene.defaultProps = {
    width: " ",
    height: " ",
}
export default Scene