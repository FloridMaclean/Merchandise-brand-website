import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
import hoodieModel from '../../assets/3d_models/main_urban_streetwear_hoodie.glb?url'

// Hoodie component using GLB model
const Hoodie3D = () => {
  const { scene } = useGLTF(hoodieModel)
  const meshRef = useRef()

  const clonedScene = useMemo(() => {
    if (!scene) {
      return null
    }
    
    const cloned = scene.clone()
    
    // Calculate bounding box to get dimensions and center
    const box = new Box3().setFromObject(cloned)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    
    // Center the model at origin by subtracting its center point
    cloned.position.sub(center)
    
    // Scale to appropriate size for hero section
    // Use the maximum dimension to ensure the hoodie fits well in all directions
    const maxDimension = Math.max(size.x, size.y, size.z)
    // Target size for hero section visibility (increased by 50%)
    const targetVisibleSize = 3.75
    const scaleFactor = maxDimension > 0 ? targetVisibleSize / maxDimension : 1
    
    // Apply uniform scaling to maintain aspect ratio
    cloned.scale.set(scaleFactor, scaleFactor, scaleFactor)
    
    // Ensure the model stays centered after scaling
    // Re-center by checking and adjusting if needed
    const finalBox = new Box3().setFromObject(cloned)
    const finalCenter = finalBox.getCenter(new Vector3())
    if (Math.abs(finalCenter.x) > 0.001 || Math.abs(finalCenter.y) > 0.001 || Math.abs(finalCenter.z) > 0.001) {
      cloned.position.sub(finalCenter)
    }
    
    return cloned
  }, [scene])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  if (!clonedScene) {
    return null
  }

  return (
    <group ref={meshRef}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
}

export default Hoodie3D

