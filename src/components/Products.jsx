import { useState, useEffect, useCallback, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import Product3D from './3D/Product3D'

const products = [
  {
    id: 1,
    name: 'T-Shirts',
    description: 'Your canvas awaits—soft, premium cotton that makes every design pop with vibrant energy',
    category: 'tshirt',
    features: ['60+ Colors', 'Short Sleeve', 'Tank Tops', 'Sweatshirts']
  },
  {
    id: 2,
    name: 'Hoodies',
    description: 'Cozy comfort meets bold style—wrap your brand in warmth and make a statement',
    category: 'hoodie',
    features: ['Fleece Lined', 'Kangaroo Pocket', 'Drawstring Hood']
  },
  {
    id: 3,
    name: 'Caps',
    description: 'Top off your brand with head-turning style—classic meets contemporary',
    category: 'cap',
    features: ['12+ Colors', 'Baseball Cap', 'Trucker Mesh', 'Canvas Cap', 'Mesh Caps']
  },
  {
    id: 4,
    name: 'Mugs',
    description: 'Start every day with your brand—durable, beautiful, and ready to make mornings memorable',
    category: 'mug',
    features: ['8oz - 15oz', 'Variety of Colors', 'Dishwasher Safe', 'Microwave Safe']
  },
  {
    id: 5,
    name: 'Tumblers',
    description: 'Keep the energy flowing—insulated perfection that stays cool (or hot) while your brand stays bold',
    category: 'tumbler',
    features: ['12oz - 40oz', 'Double Wall', 'Leak Proof']
  },
  {
    id: 6,
    name: 'Bottles',
    description: 'Hydration meets inspiration—eco-friendly vessels that carry your message everywhere',
    category: 'bottle',
    features: ['17oz - 40oz', 'BPA Free', 'Leak Proof']
  },
  {
    id: 7,
    name: 'Tote Bags',
    description: 'Carry your brand with confidence—stylish, sustainable, and ready for any adventure',
    category: 'tote',
    features: ['Canvas Material', 'Multiple Sizes', 'Reinforced Handles', 'Eco-Friendly']
  },
  {
    id: 8,
    name: 'Backpack',
    description: 'Your brand, your journey—functional design that works as hard as you do',
    category: 'backpack',
    features: ['Multiple Compartments', 'Padded Straps', 'Laptop Sleeve', 'Water Resistant']
  }
]

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0])

  // Function to select product by category
  const selectProductByCategory = useCallback((category) => {
    const product = products.find(p => p.category === category)
    if (product) {
      setSelectedProduct(product)
      window.history.replaceState(null, '', `#products-${category}`)
      setTimeout(() => {
        const productElement = document.getElementById(`product-${category}`)
        if (productElement) {
          productElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }, [])

  // Handle hash changes and custom events
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#products-')) {
        const category = hash.replace('#products-', '')
        selectProductByCategory(category)
      }
    }

    checkHash()

    // Listen for hash changes
    const handleHashChange = () => {
      checkHash()
    }
    window.addEventListener('hashchange', handleHashChange)

    // Listen for custom selectProduct event
    const handleSelectProduct = (event) => {
      if (event.detail && event.detail.category) {
        selectProductByCategory(event.detail.category)
      }
    }
    window.addEventListener('selectProduct', handleSelectProduct)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('selectProduct', handleSelectProduct)
    }
  }, [selectProductByCategory])

  return (
    <section id="products" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 text-gray-900 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {['Endless', 'Possibilities'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                className={i === 1 ? "font-normal text-gray-700 inline-block ml-2" : "inline-block"}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light px-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {['Every product is a blank canvas waiting for your story.', 'From tees to tumblers, we transform the ordinary into extraordinary.'].map((phrase, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="block"
                whileHover={{ x: 5 }}
              >
                {phrase}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Mobile: Stack all products vertically with 3D viewer at top */}
        <div className="lg:hidden space-y-6">
          {/* 3D Product Display - Mobile Top */}
          <motion.div
            key={selectedProduct.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="h-[300px] sm:h-[400px] bg-gradient-to-br from-white to-primary-50 rounded-lg overflow-hidden border-2 border-primary-200 shadow-xl"
          >
            <Canvas shadows>
              <PerspectiveCamera 
                makeDefault 
                position={[0, 0, 5]} 
              />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <Suspense fallback={null}>
                <Product3D category={selectedProduct.category} />
              </Suspense>
              <OrbitControls
                enableZoom={true}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.3}
                target={[0, 0, 0]}
                enablePan={false}
              />
              <Environment preset="sunset" />
            </Canvas>
          </motion.div>

          {/* Mobile Product List - All products in a scrollable horizontal list */}
          <div className="flex flex-col gap-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                id={`product-${product.category}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 sm:p-6 rounded-lg cursor-pointer transition-all ${
                  selectedProduct.id === product.id
                    ? 'bg-white border-2 border-primary-500 shadow-lg shadow-primary-200'
                    : 'bg-white border-2 border-transparent hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <motion.h3 
                  className="text-xl sm:text-2xl font-medium mb-2 text-gray-900"
                  animate={selectedProduct.id === product.id ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {product.name}
                </motion.h3>
                <motion.p 
                  className="text-sm sm:text-base text-gray-600 mb-3 font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  {product.description}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + i * 0.03 }}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-primary-100 to-purple-100 rounded-md text-xs sm:text-sm text-primary-700 font-medium"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Original 3-column layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start relative">
          {/* Left Product List - First 4 products */}
          <div className="flex flex-col gap-4 order-2 lg:order-1 lg:col-span-3">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                id={`product-${product.category}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ x: 5, scale: 1.01 }}
                onClick={() => setSelectedProduct(product)}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  selectedProduct.id === product.id
                    ? 'bg-white border-2 border-primary-500 shadow-lg shadow-primary-200'
                    : 'bg-white border-2 border-transparent hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <motion.h3 
                  className="text-2xl font-medium mb-2 text-gray-900"
                  animate={selectedProduct.id === product.id ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ x: 5 }}
                >
                  {product.name.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                      {i < product.name.split(' ').length - 1 && ' '}
                    </motion.span>
                  ))}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-3 font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ x: 3 }}
                >
                  {product.description}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 bg-gradient-to-r from-primary-100 to-purple-100 rounded-md text-sm text-primary-700 font-medium"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3D Product Display - Centered (Desktop) */}
          <motion.div
            key={selectedProduct.id}
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.01 }}
            className="sticky top-0 h-screen bg-gradient-to-br from-white to-primary-50 rounded-lg overflow-hidden border-2 border-primary-200 shadow-xl order-1 lg:order-2 lg:col-span-6"
          >
            <Canvas shadows>
              <PerspectiveCamera 
                makeDefault 
                position={[0, 0, 5]} 
              />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <Suspense fallback={null}>
                <Product3D category={selectedProduct.category} />
              </Suspense>
              <OrbitControls
                enableZoom={true}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.3}
                target={[0, 0, 0]}
                enablePan={false}
              />
              <Environment preset="sunset" />
            </Canvas>
          </motion.div>

          {/* Right Product List - Last 4 products */}
          <div className="flex flex-col gap-4 order-3 lg:col-span-3">
            {products.slice(4, 8).map((product, index) => (
              <motion.div
                key={product.id}
                id={`product-${product.category}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ x: -5, scale: 1.01 }}
                onClick={() => setSelectedProduct(product)}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  selectedProduct.id === product.id
                    ? 'bg-white border-2 border-primary-500 shadow-lg shadow-primary-200'
                    : 'bg-white border-2 border-transparent hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <motion.h3 
                  className="text-2xl font-medium mb-2 text-gray-900"
                  animate={selectedProduct.id === product.id ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ x: -5 }}
                >
                  {product.name.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                      {i < product.name.split(' ').length - 1 && ' '}
                    </motion.span>
                  ))}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-3 font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ x: -3 }}
                >
                  {product.description}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 bg-gradient-to-r from-primary-100 to-purple-100 rounded-md text-sm text-primary-700 font-medium"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-white via-primary-50 to-purple-50 rounded-lg p-6 sm:p-8 md:p-12 border-2 border-primary-200 shadow-lg">
            <motion.h3 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-gray-900 tracking-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {['Your Vision,', 'Our Craft'].map((phrase, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 100 }}
                  className="block"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  {phrase}
                </motion.span>
              ))}
            </motion.h3>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-2 max-w-2xl mx-auto font-light px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {['Your vision. Our passion. Infinite possibilities.', 'We don\'t just manufacture—we create experiences, build connections, and turn ideas into icons.'].map((sentence, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="block"
                  whileHover={{ x: 5 }}
                >
                  {sentence}
                </motion.span>
              ))}
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 mx-auto text-center px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <span className="block sm:inline">No minimum order</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Free quotes</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">3-5 day production</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Canada-wide and US-wide shipping</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Infinite possibilities</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {[
                { text: 'Premium Quality', icon: '✓' },
                { text: 'Best Prices', icon: '✓' },
                { text: 'Fast Delivery', icon: '✓' },
                { text: '100% Satisfaction', icon: '✓' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2"
                >
                  <motion.svg 
                    className="w-5 h-5 text-primary-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 min-h-[44px] sm:min-h-[48px] bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-md font-medium text-base sm:text-lg hover:from-primary-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl touch-manipulation"
            >
              Let's Create Something Amazing
            </motion.button>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 px-4">
              <span className="block sm:inline">Lightning-fast response</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Zero pressure</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Tailored pricing that fits your vision</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Products

