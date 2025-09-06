import React from 'react';
import { motion } from 'framer-motion';

const TitleSlide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
      <div className="text-center text-white px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-6 drop-shadow-lg"
        >
          Populations and Communities
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl mb-8 opacity-90"
        >
          Understanding Ecological Interactions
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20"
        >
          <h3 className="text-xl font-semibold mb-4">What We'll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Population dynamics and factors',
              'Community interactions', 
              'Metapopulation structure',
              'Population measurement methods'
            ].map((topic, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-3">
                <p className="font-medium">{topic}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-lg opacity-80"
        >
          Interactive Learning Experience
        </motion.p>
      </div>
    </div>
  );
};

export default TitleSlide;
