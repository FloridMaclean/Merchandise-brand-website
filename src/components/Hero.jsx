import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import Hoodie3D from './3D/Hoodie3D'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-16 sm:pt-20 md:pt-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 py-4 sm:py-6 md:py-20 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-16 items-center justify-items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 md:space-y-8 w-full text-center md:text-left order-2 md:order-1"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-light leading-tight text-gray-900 tracking-tight break-words"
            >
              {['Infinite', 'Designs,'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 100 }}
                  className="inline-block"
                >
                  {word}
                  {i === 0 && ' '}
                </motion.span>
              ))}
              <motion.span 
                className="block font-normal text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {['One', 'Factory'].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 100 }}
                    className="inline-block"
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    {word}
                    {i === 0 && ' '}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed font-light break-words"
            >
              {['Where imagination becomes reality.', 'We don\'t just print—we craft stories, ignite brands, and bring dreams to life.'].map((sentence, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.2, type: "spring", stiffness: 100 }}
                  className="block"
                  whileHover={{ x: 5 }}
                >
                  {sentence}
                </motion.span>
              ))}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs sm:text-sm md:text-base text-gray-500 mb-4 sm:mb-6 md:mb-8"
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {[
                  { text: 'Boundless creativity', delay: 0.6 },
                  { text: 'Artisan precision', delay: 0.7 },
                  { text: '3-5 day delivery', delay: 0.8 },
                  { text: 'Canada & US', delay: 0.9 }
                ].map((item, i) => (
                  <span key={i} className="flex items-center">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: item.delay, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="inline-block whitespace-nowrap"
                    >
                      {item.text}
                    </motion.span>
                    {i < 3 && <motion.span 
                      className="mx-1 sm:mx-2 text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: item.delay + 0.1 }}
                    >•</motion.span>}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 w-full justify-center md:justify-start items-center"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="w-full sm:w-auto flex-1 sm:flex-none px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 min-h-[44px] sm:min-h-[48px] bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-md font-medium text-xs sm:text-sm md:text-base hover:from-primary-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl touch-manipulation"
                aria-label="Request a quote"
              >
                Start Creating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('products')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="w-full sm:w-auto flex-1 sm:flex-none px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 min-h-[44px] sm:min-h-[48px] border-2 border-primary-500 rounded-md font-medium text-xs sm:text-sm md:text-base hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50 transition-all text-primary-700 bg-white touch-manipulation"
                aria-label="View our products"
              >
                Explore Collection
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3D Model */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
            className="h-[300px] sm:h-[360px] md:h-[480px] lg:h-[600px] xl:h-[720px] w-full max-w-full flex justify-center items-center order-1 md:order-2"
          >
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <Hoodie3D />
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={1}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                enableRotate={false}
              />
              <Environment preset="sunset" />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-primary-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

