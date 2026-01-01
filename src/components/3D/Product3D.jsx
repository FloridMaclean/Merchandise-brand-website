import { useRef, useMemo, forwardRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
import greenWaterBottleModel from '../../assets/3d_models/green_water_bottle.glb?url'
import redCoffeeMugModel from '../../assets/3d_models/red_coffee_mug.glb?url'
import tumblerModel from '../../assets/3d_models/tumbler.glb?url'
import capModel from '../../assets/3d_models/cap.glb?url'
import hoodieModel from '../../assets/3d_models/hoodie.glb?url'
import tshirtModel from '../../assets/3d_models/black_tshirt.glb?url'
import toteBagModel from '../../assets/3d_models/tote_bag.glb?url'
import backpackModel from '../../assets/3d_models/backpack.glb?url'

// Preload cap model to ensure it's ready on first load
try {
  useGLTF.preload(capModel)
} catch {
  // Preload might fail if model is already loading, that's okay
}


// Bottle component using GLB model
const BottleModel = forwardRef((props, ref) => {
  const { scene } = useGLTF(greenWaterBottleModel)

  const clonedScene = useMemo(() => {
    const cloned = scene.clone()
    
    // Calculate bounding box and scale/center the model immediately
    const box = new Box3()
    box.setFromObject(cloned)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    
    // Target size - increased for better visibility
    const targetSize = 2.5
    const maxDimension = Math.max(size.x, size.y, size.z)
    const scale = maxDimension > 0 ? targetSize / maxDimension : 1
    
    // Apply transformations to center and scale the model
    cloned.position.sub(center)
    cloned.scale.multiplyScalar(scale)
    
    // Lower the bottle on the screen to keep it in view
    cloned.position.y -= 1.2
    
    return cloned
  }, [scene])

  return (
    <group ref={ref} {...props}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
})

BottleModel.displayName = 'BottleModel'

// Mug component using GLB model
const MugModel = forwardRef((props, ref) => {
  const { scene } = useGLTF(redCoffeeMugModel)

  const clonedScene = useMemo(() => {
    const cloned = scene.clone()
    
    // Calculate bounding box to get dimensions and center
    const box = new Box3().setFromObject(cloned)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    
    // Center the model at origin by subtracting its center point
    cloned.position.sub(center)
    
    // Scale to take up approximately 24% of the showcase window width
    // With camera at z=5 and FOV ~50-75, visible width ≈ 4-6 units at origin
    // For 24% width coverage, target visible width should be ~1.2-1.5 units
    // Use the maximum dimension to ensure the mug fits well in all directions
    const maxDimension = Math.max(size.x, size.y, size.z)
    // Increased target size to ensure visibility - mug should be clearly visible
    const targetVisibleSize = 2.0 // Larger target for better visibility
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

  return (
    <group ref={ref} {...props} position={[0, 0, 0]}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
})

MugModel.displayName = 'MugModel'

// Tumbler component using GLB model
const TumblerModel = forwardRef((props, ref) => {
  const { scene } = useGLTF(tumblerModel)

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
    
    // Scale to take up approximately 30% of the showcase window width
    // With camera at z=5 and FOV ~50-75, visible width ≈ 4-6 units at origin
    // For 30% width coverage, target visible width should be ~1.5-1.8 units
    // Use the maximum dimension to ensure the tumbler fits well in all directions
    const maxDimension = Math.max(size.x, size.y, size.z)
    // Target size for 30% width coverage
    const targetVisibleSize = 2.5
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

  if (!clonedScene) {
    return null
  }

  return (
    <group ref={ref} {...props} position={[0, 0, 0]}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
})

TumblerModel.displayName = 'TumblerModel'

// Cap component using GLB model
const CapModel = forwardRef((props, ref) => {
  const { scene } = useGLTF(capModel)
  const [isReady, setIsReady] = useState(false)

  // Check if scene is ready and has valid geometry
  useEffect(() => {
    if (scene && scene.children && scene.children.length > 0) {
      // Verify the scene has actual geometry by checking bounding box
      const testBox = new Box3().setFromObject(scene)
      const testSize = testBox.getSize(new Vector3())
      if (testSize.x > 0 || testSize.y > 0 || testSize.z > 0) {
        setIsReady(true)
      } else {
        // Retry after a short delay if geometry isn't ready yet
        const timer = setTimeout(() => setIsReady(true), 100)
        return () => clearTimeout(timer)
      }
    }
  }, [scene])

  const clonedScene = useMemo(() => {
    if (!scene || !isReady) {
      return null
    }
    
    // Check if scene has children/geometry to ensure it's fully loaded
    if (!scene.children || scene.children.length === 0) {
      return null
    }
    
    const cloned = scene.clone()
    
    // Calculate bounding box to get dimensions and center
    const box = new Box3().setFromObject(cloned)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    
    // Validate that we have valid dimensions
    if (size.x === 0 && size.y === 0 && size.z === 0) {
      return null
    }
    
    // Center the model at origin by subtracting its center point
    cloned.position.sub(center)
    
    // Scale to take up approximately 30% of the showcase window width
    // With camera at z=5 and FOV ~50-75, visible width ≈ 4-6 units at origin
    // For 30% width coverage, target visible width should be ~1.5-1.8 units
    // Use the maximum dimension to ensure the cap fits well in all directions
    const maxDimension = Math.max(size.x, size.y, size.z)
    // Target size for 30% width coverage
    const targetVisibleSize = 2.5
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
  }, [scene, isReady])

  if (!clonedScene) {
    return null
  }

  return (
    <group ref={ref} {...props} position={[0, 0, 0]}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
})

CapModel.displayName = 'CapModel'

// Hoodie component using GLB model
const HoodieModel = forwardRef((props, ref) => {
  const { scene } = useGLTF(hoodieModel)

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
    
    // Scale to take up approximately 25% of the showcase window width
    // With camera at z=5 and FOV ~50-75, visible width ≈ 4-6 units at origin
    // For 25% width coverage, target visible width should be ~1.25-1.5 units
    // Use the maximum dimension to ensure the hoodie fits well in all directions
    const maxDimension = Math.max(size.x, size.y, size.z)
    // Target size for 25% width coverage
    const targetVisibleSize = 2.1
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

  if (!clonedScene) {
    return null
  }

  return (
    <group ref={ref} {...props} position={[0, 0, 0]}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
})

HoodieModel.displayName = 'HoodieModel'

// T-Shirt component using GLB model
const TShirtModel = forwardRef((props, ref) => {
  const { scene } = useGLTF(tshirtModel)

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
    
    // Scale to take up approximately 25% of the showcase window width
    // With camera at z=5 and FOV ~50-75, visible width ≈ 4-6 units at origin
    // For 25% width coverage, target visible width should be ~1.25-1.5 units
    // Use the maximum dimension to ensure the t-shirt fits well in all directions
    const maxDimension = Math.max(size.x, size.y, size.z)
    // Target size for 25% width coverage
    const targetVisibleSize = 2.1
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

  if (!clonedScene) {
    return null
  }

  return (
    <group ref={ref} {...props} position={[0, 0, 0]}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
})

TShirtModel.displayName = 'TShirtModel'

// Tote Bag component using GLB model
const ToteBagModel = forwardRef((props, ref) => {
  const { scene } = useGLTF(toteBagModel)

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
    
    // Scale to appropriate size for display
    const maxDimension = Math.max(size.x, size.y, size.z)
    const targetVisibleSize = 2.2
    const scaleFactor = maxDimension > 0 ? targetVisibleSize / maxDimension : 1
    
    // Apply uniform scaling to maintain aspect ratio
    cloned.scale.set(scaleFactor, scaleFactor, scaleFactor)
    
    // Ensure the model stays centered after scaling
    const finalBox = new Box3().setFromObject(cloned)
    const finalCenter = finalBox.getCenter(new Vector3())
    if (Math.abs(finalCenter.x) > 0.001 || Math.abs(finalCenter.y) > 0.001 || Math.abs(finalCenter.z) > 0.001) {
      cloned.position.sub(finalCenter)
    }
    
    return cloned
  }, [scene])

  if (!clonedScene) {
    return null
  }

  return (
    <group ref={ref} {...props} position={[0, 0, 0]}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
})

ToteBagModel.displayName = 'ToteBagModel'

// Backpack component using GLB model
const BackpackModel = forwardRef((props, ref) => {
  const { scene } = useGLTF(backpackModel)

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
    
    // Scale to appropriate size for display
    const maxDimension = Math.max(size.x, size.y, size.z)
    const targetVisibleSize = 2.2
    const scaleFactor = maxDimension > 0 ? targetVisibleSize / maxDimension : 1
    
    // Apply uniform scaling to maintain aspect ratio
    cloned.scale.set(scaleFactor, scaleFactor, scaleFactor)
    
    // Ensure the model stays centered after scaling
    const finalBox = new Box3().setFromObject(cloned)
    const finalCenter = finalBox.getCenter(new Vector3())
    if (Math.abs(finalCenter.x) > 0.001 || Math.abs(finalCenter.y) > 0.001 || Math.abs(finalCenter.z) > 0.001) {
      cloned.position.sub(finalCenter)
    }
    
    return cloned
  }, [scene])

  if (!clonedScene) {
    return null
  }

  return (
    <group ref={ref} {...props} position={[0, 0, 0]}>
      <primitive 
        object={clonedScene} 
        castShadow 
        receiveShadow 
      />
    </group>
  )
})

BackpackModel.displayName = 'BackpackModel'

const Product3D = ({ category }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const renderProduct = () => {
    switch (category) {
      case 'tshirt':
        return <TShirtModel ref={meshRef} />

      case 'hoodie':
        return <HoodieModel ref={meshRef} />

      case 'cap':
        return <CapModel ref={meshRef} />

      case 'mug':
        return <MugModel ref={meshRef} />

      case 'tumbler':
        return <TumblerModel ref={meshRef} />

      case 'bottle':
        return <BottleModel ref={meshRef} />

      case 'tote':
        return <ToteBagModel ref={meshRef} />

      case 'backpack':
        return <BackpackModel ref={meshRef} />

      default:
        return null
    }
  }

  return renderProduct()
}

export default Product3D

