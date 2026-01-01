import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

const NotFound = () => {

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-blue-400/30"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-9xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4"
            >
              404
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Page Not Found
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const homeElement = document.getElementById('home')
                  if (homeElement) {
                    homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  } else {
                    window.location.href = '/'
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Go to home page"
              >
                Go to Home
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactElement = document.getElementById('contact')
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="px-8 py-4 border-2 border-blue-400 rounded-lg font-semibold text-lg hover:bg-blue-400/10 transition-colors"
                aria-label="Contact us"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default NotFound

