import { motion } from 'framer-motion'

const features = [
  {
    icon: '🚀',
    title: 'Lightning Speed',
    description: 'From concept to creation in record time—we move fast so your brand can too'
  },
  {
    icon: '✨',
    title: 'Artisan Excellence',
    description: 'Every stitch, every print, every detail crafted with obsessive attention to perfection'
  },
  {
    icon: '💰',
    title: 'Smart Investment',
    description: 'Premium quality that doesn\'t break the bank—value that amplifies your brand'
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    description: 'Your brand, everywhere—seamless shipping that connects you to your audience'
  },
  {
    icon: '🎨',
    title: 'Unlimited Imagination',
    description: 'No design too bold, no vision too wild—we bring your creative dreams to life'
  },
  {
    icon: '📦',
    title: 'Scale Masters',
    description: 'From intimate runs to epic campaigns—we handle it all with finesse and flair'
  }
]

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-purple-50 via-white to-teal-50">
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
            {['Why Choose', 'Caleb Creations'].map((phrase, i) => (
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
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {['Where artistry meets innovation, and passion fuels precision.', 'We\'re not just printers—we\'re dream weavers, brand builders, and creative partners.'].map((sentence, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.2 }}
                className="block"
                whileHover={{ x: 5 }}
              >
                {sentence}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-white to-primary-50 p-6 sm:p-8 rounded-lg border-2 border-primary-200 hover:border-primary-400 hover:shadow-lg transition-all cursor-pointer"
            >
              <motion.div 
                className="text-3xl sm:text-4xl mb-4 filter drop-shadow-lg"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3 
                className="text-lg sm:text-xl font-medium mb-2 text-gray-900"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {feature.title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="inline-block"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {word}
                    {i < feature.title.split(' ').length - 1 && ' '}
                  </motion.span>
                ))}
              </motion.h3>
              <motion.p 
                className="text-gray-600 font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ x: 3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-primary-100 via-purple-100 to-teal-100 rounded-lg p-6 sm:p-8 md:p-12 border-2 border-primary-300 shadow-lg">
            <motion.h3 
              className="text-2xl sm:text-3xl font-light mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {['Our', 'Mission'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 100 }}
                  className="inline-block"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {word}
                  {i === 0 && ' '}
                </motion.span>
              ))}
            </motion.h3>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {[
                "We breathe life into your boldest visions, transforming sparks of inspiration into tangible masterpieces.",
                "Whether you're launching a startup or scaling a movement, we craft with the same passion—from intimate runs of 10 to epic campaigns of 10,000+.",
                "We're your creative co-pilots, your quality guardians, and your brand's biggest cheerleaders. Together, we don't just make products—we make magic."
              ].map((sentence, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="block mb-2"
                  whileHover={{ x: 5 }}
                >
                  {sentence}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

