import { useLoader } from "@react-three/fiber";
import { FBXLoader, OBJLoader } from "three/examples/jsm/Addons.js"
import * as THREE from "three";
import { useEffect, useRef } from "react";

const Model = ({modelUrl, textureUrl,onModelLoaded}) => {

    const obj = useLoader(FBXLoader, modelUrl);
    const texture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl) : null;

    obj.traverse(child => {
        if(child.isMesh)
        {
            child.castShadow = true;
            child.receiveShadow = true;
            if(child.material && child.material.map) 
            {
                child.material = new THREE.MeshToonMaterial({map: texture});
            }
            else{
                child.material = new THREE.MeshStandardMaterial({color: "gray"});
            }
        }
    })


    return <primitive object={obj} scale={1}/>
}

export default Model;