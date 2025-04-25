import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState} from "react";
import Model from "./Model";

const Scene = ({model, texture, className,children}) => {

    const [cameraPosition, setCameraPosition] = useState([0, 0, 50]);
    return (
        <div className={className}>
            <Canvas className="rounded-t-sm" style={{ width: "100%" }} camera={{ position: cameraPosition }}>
                <color attach="background" args={["lightgray"]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 3]} />
                <OrbitControls />
                {model && <Model modelUrl={model} textureUrl={texture} setCameraPosition={setCameraPosition} />}
            </Canvas>
            {children}
        </div>
    )
}


Scene.defaultProps = {
    width: " ",
    height: " ",
}


export default Scene