import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Lazy load below-the-fold components for code splitting
const Products = lazy(() => import('./components/Products'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center bg-white">
    <div className="text-gray-400">Loading...</div>
  </div>
)

function App() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <Products />
          <About />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App

