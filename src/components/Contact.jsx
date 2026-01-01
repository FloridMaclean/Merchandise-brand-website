import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    quantity: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null

  // Common temporary/disposable email domains
  const temporaryEmailDomains = new Set([
    '10minutemail.com', '10minutemail.net', '10minutemail.org',
    '20minutemail.com', '20minutemail.net',
    '33mail.com', '33m.co',
    'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
    'mailinator.com', 'mailinator.net', 'mailinator.org',
    'tempmail.com', 'tempmail.net', 'tempmail.org',
    'temp-mail.org', 'temp-mail.io', 'temp-mail.ru', 'temp-mail.com',
    'throwaway.email',
    'yopmail.com', 'yopmail.fr', 'yopmail.net',
    'getnada.com', 'nada.email',
    'mohmal.com', 'mohmal.im',
    'fakeinbox.com', 'fakeinbox.net',
    'dispostable.com',
    'mintemail.com',
    'mytrashmail.com',
    'sharklasers.com',
    'maildrop.cc',
    'meltmail.com',
    'spamgourmet.com',
    'spamhole.com',
    'tempail.com',
    'tempinbox.com',
    'trashmail.com', 'trashmail.net', 'trashmail.org',
    'mailnesia.com',
    'mailcatch.com'
  ])

  const validateEmail = (email) => {
    // Trim whitespace
    const trimmedEmail = email.trim()
    
    // Check if email is empty
    if (!trimmedEmail) {
      return { valid: false, message: 'Email is required' }
    }

    // More robust email format validation
    // RFC 5322 compliant regex (simplified but comprehensive)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    
    if (!emailRegex.test(trimmedEmail)) {
      return { valid: false, message: 'Please enter a valid email address' }
    }

    // Additional format checks
    if (trimmedEmail.length > 254) {
      return { valid: false, message: 'Email address is too long (maximum 254 characters)' }
    }

    // Check for consecutive dots
    if (trimmedEmail.includes('..')) {
      return { valid: false, message: 'Please enter a valid email address' }
    }

    // Extract domain and check it
    const emailParts = trimmedEmail.split('@')
    if (emailParts.length !== 2) {
      return { valid: false, message: 'Please enter a valid email address' }
    }

    const domain = emailParts[1]?.toLowerCase().trim()
    
    // Check that domain exists and has at least one dot
    if (!domain || !domain.includes('.')) {
      return { valid: false, message: 'Please enter a valid email address' }
    }

    // Check for temporary/disposable email domains
    // Also check base domain (without subdomains) for services that use subdomains
    const baseDomain = domain.split('.').slice(-2).join('.') // Get last two parts (e.g., 'mail.com' from 'subdomain.mail.com')
    const fullDomain = domain
    
    if (temporaryEmailDomains.has(fullDomain) || temporaryEmailDomains.has(baseDomain)) {
      return { valid: false, message: 'Temporary or disposable email addresses are not allowed. Please use a permanent email address.' }
    }

    return { valid: true, message: '' }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailValidation = validateEmail(formData.email.trim())
      if (!emailValidation.valid) {
        newErrors.email = emailValidation.message
      }
    }

    if (!formData.product) {
      newErrors.product = 'Please select a product type'
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required'
    } else if (!/^\d+(\+)?$/.test(formData.quantity.trim())) {
      newErrors.quantity = 'Please enter a valid quantity (e.g., 500, 1000+)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        product: '',
        quantity: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch {
      setSubmitStatus('error')
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-teal-50 via-white to-blue-50">
      <div className="container mx-auto max-w-4xl">
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
            {['Start Your', 'Creative Journey'].map((phrase, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                className={i === 1 ? "font-normal text-gray-700 inline-block ml-2" : "inline-block"}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {phrase}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-2 font-light px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {["Ready to turn your boldest ideas into reality?", 'Share your vision and watch us work our magic—personalized quotes delivered in 24 hours, zero strings attached.'].map((sentence, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="block"
                whileHover={{ x: 5 }}
              >
                {sentence}
              </motion.span>
            ))}
          </motion.p>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-500 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ x: 3 }}
          >
            Every great brand starts with a conversation—let's start yours today
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-white via-primary-50 to-purple-50 rounded-lg p-6 sm:p-8 md:p-12 border-2 border-primary-200 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            {/* Success/Error Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Thank you for your inquiry! We will contact you soon.</span>
                  </div>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Something went wrong. Please try again or contact us directly.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              className="grid sm:grid-cols-2 gap-4 sm:gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.label 
                  htmlFor="name" 
                  className="block text-sm font-semibold mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ x: 3 }}
                >
                  {['Full', 'Name', '*'].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                      {i < 2 && ' '}
                    </motion.span>
                  ))}
                </motion.label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all ${
                    errors.name ? 'border-red-500' : 'border-primary-200'
                  }`}
                  placeholder="John Doe"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      id="name-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600" 
                      role="alert"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.label 
                  htmlFor="email" 
                  className="block text-sm font-semibold mb-2"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ x: 3 }}
                >
                  {['Email', 'Address', '*'].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                      {i < 2 && ' '}
                    </motion.span>
                  ))}
                </motion.label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all ${
                    errors.email ? 'border-red-500' : 'border-primary-200'
                  }`}
                  placeholder="john@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      id="email-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600" 
                      role="alert"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="product" className="block text-sm font-semibold mb-2">
                  Product Type *
                </label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors.product ? 'border-red-500' : 'border-primary-200'
                  }`}
                  aria-invalid={errors.product ? 'true' : 'false'}
                  aria-describedby={errors.product ? 'product-error' : undefined}
                >
                  <option value="">Select a product</option>
                  <option value="tshirt">T-Shirts</option>
                  <option value="hoodie">Hoodies</option>
                  <option value="cap">Caps</option>
                  <option value="mug">Mugs</option>
                  <option value="tumbler">Tumblers</option>
                  <option value="bottle">Bottles</option>
                  <option value="tote">Tote Bags</option>
                  <option value="backpack">Backpack</option>
                  <option value="multiple">Multiple Products</option>
                  <option value="other">Other/Not Listed</option>
                </select>
                {errors.product && (
                  <p id="product-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.product}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold mb-2">
                  Estimated Quantity *
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                    errors.quantity ? 'border-red-500' : 'border-primary-200'
                  }`}
                  placeholder="e.g., 500, 1000, 5000+"
                  aria-invalid={errors.quantity ? 'true' : 'false'}
                  aria-describedby={errors.quantity ? 'quantity-error' : undefined}
                />
                {errors.quantity && (
                  <p id="quantity-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.quantity}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Additional Details
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                placeholder="Share your creative vision, timeline dreams, or wildest ideas—we're all ears..."
                aria-label="Additional details about your order"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className={`w-full px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] sm:min-h-[48px] bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-md font-medium text-base sm:text-lg hover:from-primary-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl touch-manipulation ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              aria-label={isSubmitting ? 'Submitting form' : 'Submit quote request'}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                'Send My Vision'
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-gray-600">
            {[
              { 
                label: 'Email', 
                value: 'contact@caleb-creations.ca',
                href: 'mailto:contact@caleb-creations.ca',
                isLink: true
              },
              { label: 'Business Hours', value: 'Open 7 days a week' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="font-medium text-gray-900 mb-1">{item.label}</div>
                {item.isLink ? (
                  <motion.a
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.value}
                  </motion.a>
                ) : (
                  <div>{item.value}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

