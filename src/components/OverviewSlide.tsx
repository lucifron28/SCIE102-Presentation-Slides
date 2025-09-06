import React from 'react';
import { motion } from 'framer-motion';

const OverviewSlide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="slide-enter"
        >
          <h1 className="text-5xl font-bold text-white text-center mb-8">
            Populations and Communities Overview
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Key Definitions</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-400/20 rounded-xl p-6">
                <h4 className="text-2xl font-bold text-white mb-4">Populations</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  Groups of individuals of the <span className="text-yellow-300 font-semibold">same species</span> that inhabit a <span className="text-yellow-300 font-semibold">shared environment</span>.
                </p>
              </div>
              <div className="bg-blue-400/20 rounded-xl p-6">
                <h4 className="text-2xl font-bold text-white mb-4">Communities</h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  Multiple <span className="text-yellow-300 font-semibold">co-existing, interacting populations</span> of different species in the same habitat.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="text-xl font-bold text-white mb-3">Population Size</h4>
              <p className="text-white/90 text-sm">Number of individuals in a population</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-white mb-3">Population Density</h4>
              <p className="text-white/90 text-sm">Number of individuals per unit area</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h4 className="text-xl font-bold text-white mb-3">Species Richness</h4>
              <p className="text-white/90 text-sm">Number of species in a community</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Why Study These Concepts?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Conservation and biodiversity protection',
                'Understanding ecosystem stability',
                'Disease and pest management',
                'Climate change adaptation strategies'
              ].map((reason, index) => (
                <div key={index} className="flex items-center text-white/90">
                  <span className="mr-3 text-green-300">✓</span>
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewSlide;
