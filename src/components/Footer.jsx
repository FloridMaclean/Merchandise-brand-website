import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-primary-900 to-purple-900 text-white border-t-4 border-primary-500 py-8 sm:py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 mb-8 justify-items-center sm:justify-items-start"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-left w-full"
          >
            <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">
              Caleb Creations
            </h3>
            <p className="text-sm sm:text-base text-gray-300 font-light mb-4">
              Where creativity knows no bounds and every product tells a story. We're not just printers—we're dream weavers, brand builders, and your creative partners in bringing bold visions to life.
            </p>
            <motion.a
              href="mailto:contact@caleb-creations.ca"
              whileHover={{ x: 5, scale: 1.05 }}
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 rounded font-light inline-block break-all"
              aria-label="Contact us via email"
            >
              contact@caleb-creations.ca
            </motion.a>
          </motion.div>
          
          {[
            {
              title: 'Products',
              links: [
                { label: 'T-Shirts', href: '#products-tshirt', aria: 'View T-Shirts', productCategory: 'tshirt' },
                { label: 'Hoodies', href: '#products-hoodie', aria: 'View Hoodies', productCategory: 'hoodie' },
                { label: 'Caps', href: '#products-cap', aria: 'View Caps', productCategory: 'cap' },
                { label: 'Mugs', href: '#products-mug', aria: 'View Mugs', productCategory: 'mug' },
                { label: 'Tumblers', href: '#products-tumbler', aria: 'View Tumblers', productCategory: 'tumbler' },
                { label: 'Bottles', href: '#products-bottle', aria: 'View Bottles', productCategory: 'bottle' },
                { label: 'Tote Bags', href: '#products-tote', aria: 'View Tote Bags', productCategory: 'tote' },
                { label: 'Backpack', href: '#products-backpack', aria: 'View Backpack', productCategory: 'backpack' }
              ],
              rows: 2
            },
            {
              title: 'Company',
              links: [
                { label: 'About Us', href: '#about', aria: 'Navigate to About section' },
                { label: 'Contact', href: '#contact', aria: 'Navigate to Contact section' },
                { label: 'Privacy Policy', href: '#privacy', aria: 'View Privacy Policy' },
                { label: 'Terms of Service', href: '#terms', aria: 'View Terms of Service' }
              ]
            },
            {
              title: 'Connect',
              links: [
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/calebcreations', aria: 'Visit our LinkedIn page (opens in new tab)', external: true },
                { label: 'Instagram', href: 'https://www.instagram.com/calebcreations', aria: 'Visit our Instagram page (opens in new tab)', external: true },
                { label: 'Facebook', href: 'https://www.facebook.com/calebcreations', aria: 'Visit our Facebook page (opens in new tab)', external: true },
                { label: 'Twitter', href: 'https://twitter.com/calebcreations', aria: 'Visit our Twitter page (opens in new tab)', external: true }
              ]
            }
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + sectionIndex * 0.1 }}
              className="text-center sm:text-left w-full"
            >
              <h4 className="text-sm sm:text-base font-medium mb-4 text-white">{section.title}</h4>
              <ul className={`text-sm sm:text-base text-gray-300 ${section.rows ? 'grid grid-cols-2 gap-x-4 gap-y-2' : 'space-y-2'} ${section.rows ? 'justify-items-center sm:justify-items-start' : 'flex flex-col items-center sm:items-start'}`}>
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                    className={section.rows ? '' : 'w-full text-center md:text-left'}
                  >
                    <motion.a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (link.productCategory) {
                          e.preventDefault()
                          window.dispatchEvent(new CustomEvent('selectProduct', { detail: { category: link.productCategory } }))
                        }
                      }}
                      whileHover={{ x: 5, scale: 1.05 }}
                      className="hover:text-white hover:text-primary-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 rounded font-light inline-block"
                      aria-label={link.aria}
                    >
                      {link.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-700 pt-8 text-center text-gray-400 max-w-6xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mb-2"
          >
            &copy; {new Date().getFullYear()} Caleb Creations. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-sm text-gray-500"
          >
            Website made by PORT24 Technologies Inc.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

