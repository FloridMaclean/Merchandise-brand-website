import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

const TermsOfService = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
      <Navbar />
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-blue-400/30"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using CALEB CREATIONS website and services, you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                <p>
                  CALEB CREATIONS provides custom printing and shipping services for t-shirts, hoodies, 
                  caps, mugs, tumblers, and bottles. All orders are subject to our approval and availability of materials.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Orders and Quotes</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>All quotes are estimates and subject to change based on final specifications</li>
                  <li>Quotes are valid for 30 days from the date of issue</li>
                  <li>Orders are confirmed only upon receipt of a signed purchase order or written confirmation</li>
                  <li>Minimum order quantities may apply to certain products</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Pricing and Payment</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>All prices are in USD unless otherwise specified</li>
                  <li>Payment terms will be specified in your order confirmation</li>
                  <li>We reserve the right to change prices at any time without notice</li>
                  <li>Additional charges may apply for rush orders, special requests, or design modifications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Design and Artwork</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>You are responsible for providing artwork in the required format and resolution</li>
                  <li>You warrant that you have the right to use all artwork and designs provided</li>
                  <li>We are not responsible for errors in artwork provided by you</li>
                  <li>Design modifications may incur additional charges</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Production and Shipping</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Production times vary based on order size and complexity</li>
                  <li>Shipping times are estimates and not guaranteed</li>
                  <li>We are not liable for delays caused by shipping carriers or circumstances beyond our control</li>
                  <li>Risk of loss passes to you upon delivery to the carrier</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Returns and Cancellations</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Orders cannot be cancelled once production has begun</li>
                  <li>Returns are accepted only for defective products or errors on our part</li>
                  <li>Custom printed items are non-returnable unless defective</li>
                  <li>All return requests must be made within 7 days of delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, and software, is the property of 
                  CALEB CREATIONS and is protected by copyright and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                <p>
                  CALEB CREATIONS shall not be liable for any indirect, incidental, special, or consequential 
                  damages arising out of or in connection with our services. Our total liability shall not exceed 
                  the amount paid by you for the specific order in question.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless CALEB CREATIONS from any claims, damages, or expenses 
                  arising from your use of our services, violation of these terms, or infringement of any rights of another.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of the jurisdiction in 
                  which CALEB CREATIONS operates, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Your continued use of our services after 
                  any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Email:</strong> contact@caleb-creations.ca</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default TermsOfService

