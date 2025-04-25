import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/Addons.js"
import * as THREE from "three";
import { useEffect, useRef } from "react";

const Model = ({modelUrl, textureUrl, setCameraPosition}) => {

    const obj = useLoader(FBXLoader, modelUrl);
    const texture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl) : null;
    const modelRef = useRef();

    useEffect(() => 
    {
        let boundingBox = new THREE.Box3().setFromObject(obj);
        let center = new THREE.Vector3();
        boundingBox.getCenter(center);
        
        obj.position.sub(center);
        let size = new THREE.Vector3();
        boundingBox.getSize(size);

        let maxDim = Math.max(size.x, size.y, size.z);
        let distance = maxDim * 1000;
        if(setCameraPosition)
        {
            setCameraPosition([center.x, center.y, center.z + distance]);
        }
    },[obj, setCameraPosition]);

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


    return <primitive object={obj} scale={1} ref= {modelRef}/>
}

export default Model;