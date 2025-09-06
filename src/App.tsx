import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Type definitions
interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  topic: string;
}

interface PromptQuestion {
  question: string;
  context: string;
  slideNumber: number;
}

const promptQuestions: PromptQuestion[] = [
  {
    question: "What do you think is the difference between biotic and abiotic factors?",
    context: "Think about living vs. non-living things that affect organisms...",
    slideNumber: 4
  },
  {
    question: "Can you think of examples where different species compete for the same resources?",
    context: "Consider animals that might need the same food, shelter, or territory...",
    slideNumber: 6
  },
  {
    question: "How do you think scientists count animals that move around a lot?",
    context: "Imagine trying to count birds or fish - what challenges would you face?",
    slideNumber: 8
  },
  {
    question: "What are some advantages of having multiple separate populations of the same species?",
    context: "Think about what happens if one group faces a problem...",
    slideNumber: 5
  }
];

const PromptQuestion: React.FC<{ 
  question: string; 
  context: string; 
  onContinue: () => void;
}> = ({ question, context, onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 border border-white/20">
          <div className="text-6xl mb-6">🤔</div>
          <h2 className="text-4xl font-bold text-white mb-8">Think About This...</h2>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">{question}</h3>
            <p className="text-white/80 text-lg">{context}</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-white/70 text-sm">
              💡 Discuss with your classmates or think quietly for a moment
            </p>
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Ready to Learn More! →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


const quizQuestions: QuizQuestion[] = [
  { 
    question: 'What defines a population in ecological terms?', 
    options: ['All organisms in a geographic area', 'Individuals of the same species in a defined area', 'All species in a community', 'Organisms that interact with each other'], 
    answer: 'Individuals of the same species in a defined area',
    explanation: 'A population consists of individuals of the same species living in the same geographic area at the same time.',
    topic: 'Populations'
  },
  { 
    question: 'What are the two main types of factors that affect population dynamics?', 
    options: ['Internal and external factors', 'Biotic and abiotic factors', 'Genetic and environmental factors', 'Natural and artificial factors'], 
    answer: 'Biotic and abiotic factors',
    explanation: 'Biotic factors are living components (predation, competition, disease) while abiotic factors are non-living (temperature, water, soil).',
    topic: 'Populations'
  },
  { 
    question: 'How do populations change over time?', 
    options: ['They remain constant', 'They only increase', 'They respond to biotic and abiotic factors', 'They only decrease'], 
    answer: 'They respond to biotic and abiotic factors',
    explanation: 'Populations continuously change in response to both living (biotic) and non-living (abiotic) environmental factors.',
    topic: 'Populations'
  },
  
  { 
    question: 'What is an ecological community?', 
    options: ['A single population', 'Multiple populations of different species in the same habitat', 'All organisms in a country', 'A group of the same species'], 
    answer: 'Multiple populations of different species in the same habitat',
    explanation: 'A community includes multiple co-existing and interacting populations of different species in the same habitat.',
    topic: 'Communities'
  },
  { 
    question: 'What is an ecological niche?', 
    options: ['A species\' physical location', 'A species\' complete role and function in its community', 'The number of species in a community', 'A type of competition'], 
    answer: 'A species\' complete role and function in its community',
    explanation: 'A niche is like the "job" a species performs - how it uses environmental resources and interacts with other community members.',
    topic: 'Communities'
  },
  { 
    question: 'What happens when species\' niches overlap?', 
    options: ['They cooperate', 'They avoid each other', 'Competition arises', 'They become the same species'], 
    answer: 'Competition arises',
    explanation: 'When species have similar resource needs or occupy similar roles, they compete for limited resources like food and habitat.',
    topic: 'Communities'
  },
  
  { 
    question: 'What is a metapopulation?', 
    options: ['A very large population', 'Multiple populations of the same species in different areas', 'A community of different species', 'A population that migrates'], 
    answer: 'Multiple populations of the same species in different areas',
    explanation: 'Metapopulations consist of multiple separate populations of the same species that occasionally exchange individuals through migration.',
    topic: 'Metapopulations'
  },
  { 
    question: 'How do metapopulations maintain genetic diversity?', 
    options: ['Through internal breeding only', 'Through immigration and emigration between populations', 'Through environmental adaptation', 'Through competition'], 
    answer: 'Through immigration and emigration between populations',
    explanation: 'Migration between populations introduces new genetic material, increasing overall genetic diversity and helping populations adapt to changing conditions.',
    topic: 'Metapopulations'
  },
  { 
    question: 'What is the main benefit of metapopulation structure?', 
    options: ['Reduced competition', 'Increased genetic diversity and population resilience', 'Lower resource requirements', 'Simpler management'], 
    answer: 'Increased genetic diversity and population resilience',
    explanation: 'Metapopulations provide genetic diversity through migration and can rescue declining populations, making the overall species more resilient.',
    topic: 'Metapopulations'
  },
  
  { 
    question: 'Which method is best for counting plants and stationary organisms?', 
    options: ['Mark-recapture', 'Quadrat sampling', 'Direct counting', 'Radio tracking'], 
    answer: 'Quadrat sampling',
    explanation: 'Quadrat sampling uses square frames placed randomly to count organisms that don\'t move much, like plants, corals, or barnacles.',
    topic: 'Measurement Methods'
  },
  { 
    question: 'Which method is most suitable for mobile animals?', 
    options: ['Quadrat sampling', 'Mark-recapture method', 'Visual counting', 'Habitat mapping'], 
    answer: 'Mark-recapture method',
    explanation: 'Mark-recapture is ideal for mobile animals because it accounts for their movement and provides statistical population estimates.',
    topic: 'Measurement Methods'
  },
  { 
    question: 'What is a critical assumption of the mark-recapture method?', 
    options: ['Animals are easy to catch', 'No births, deaths, or migration occur between samples', 'The population is small', 'Animals don\'t learn to avoid traps'], 
    answer: 'No births, deaths, or migration occur between samples',
    explanation: 'Mark-recapture assumes a "closed population" with no demographic changes during the study period for accurate population estimates.',
    topic: 'Measurement Methods'
  }
];

const FactorSelector: React.FC = () => {
  const [activeFactor, setActiveFactor] = useState<'biotic' | 'abiotic'>('biotic');

  const bioticFactors = [
    { name: '🐺 Predation', description: 'Wolves controlling deer populations through hunting pressure' },
    { name: '🌿 Competition', description: 'Plants competing for sunlight, water, and soil nutrients' },
    { name: '🦠 Disease', description: 'Parasites and pathogens affecting population health' },
    { name: '🍯 Symbiosis', description: 'Bees and flowers benefiting each other mutually' }
  ];

  const abioticFactors = [
    { name: '🌡️ Temperature', description: 'Climate changes affecting species survival ranges' },
    { name: '💧 Water', description: 'Rainfall patterns determining habitat suitability' },
    { name: '☀️ Light', description: 'Sunlight availability controlling plant growth' },
    { name: '🏔️ Physical', description: 'Terrain, soil type, and geographic barriers' }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Interactive Factor Explorer</h3>
      
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveFactor('biotic')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeFactor === 'biotic' 
              ? 'bg-green-500 text-white shadow-lg' 
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Biotic Factors
        </button>
        <button
          onClick={() => setActiveFactor('abiotic')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeFactor === 'abiotic' 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Abiotic Factors
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFactor}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-xl font-semibold text-white mb-4 text-center">
            {activeFactor === 'biotic' ? 'Living Environmental Factors' : 'Non-Living Environmental Factors'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(activeFactor === 'biotic' ? bioticFactors : abioticFactors).map((factor, index) => (
              <motion.div
                key={factor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all hover:scale-105"
              >
                <h5 className="font-bold text-white mb-2">{factor.name}</h5>
                <p className="text-white/80 text-sm">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Component for metapopulation diagram
const MetapopulationDiagram: React.FC = () => {
  const [selectedPatch, setSelectedPatch] = useState<number | null>(null);

  const patches = [
    { id: 1, x: 20, y: 40, size: 'large', info: 'Population A: Healthy population with good breeding success' },
    { id: 2, x: 50, y: 30, size: 'medium', info: 'Population B: Medium-sized population with moderate gene flow' },
    { id: 3, x: 75, y: 60, size: 'small', info: 'Population C: Smaller population that benefits from immigration' }
  ];

  return (
    <div className="bg-purple-100 rounded-xl p-6 border-2 border-purple-300 relative min-h-80 mb-6">
      <h4 className="text-lg font-bold text-purple-800 mb-4 text-center">Metapopulation Structure</h4>
      
      <div className="relative h-60 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg overflow-hidden mb-4">
        {/* Migration arrows */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
             refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
            </marker>
          </defs>
          <path d="M 25 45 Q 40 25 45 35" stroke="#059669" strokeWidth="2" 
                fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 55 35 Q 70 50 70 55" stroke="#059669" strokeWidth="2" 
                fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 70 65 Q 45 75 30 50" stroke="#059669" strokeWidth="2" 
                fill="none" markerEnd="url(#arrowhead)" />
        </svg>

        {/* Population patches */}
        {patches.map((patch) => (
          <motion.div
            key={patch.id}
            className={`absolute bg-green-500 rounded-full flex items-center justify-center font-bold text-white cursor-pointer border-4 border-green-700 ${
              patch.size === 'large' ? 'w-16 h-16' : 
              patch.size === 'medium' ? 'w-12 h-12' : 'w-10 h-10'
            }`}
            style={{ left: `${patch.x}%`, top: `${patch.y}%` }}
            onClick={() => setSelectedPatch(selectedPatch === patch.id ? null : patch.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {patch.id}
          </motion.div>
        ))}
        
        <div className="absolute top-2 right-2 text-sm text-green-800 bg-white/70 px-2 py-1 rounded">
          Gene Flow →
        </div>
      </div>

      <AnimatePresence>
        {selectedPatch && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-purple-300"
          >
            <p className="text-purple-800 text-sm">
              {patches.find(p => p.id === selectedPatch)?.info}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Component for quadrat simulation
const QuadratSimulation: React.FC = () => {
  const [quadratPlaced, setQuadratPlaced] = useState(false);
  const [quadratPosition, setQuadratPosition] = useState({ x: 0, y: 0 });
  const [organismCount, setOrganismCount] = useState<number | null>(null);
  const [showCount, setShowCount] = useState(false);

  // Define organism positions in the habitat (diverse ecosystem)
  const organismPositions = [
    // Plants and vegetation (🌱🌿🍀🌾)
    { x: 10, y: 15, type: '🌱', category: 'Plant' }, { x: 25, y: 20, type: '🌿', category: 'Plant' }, 
    { x: 40, y: 10, type: '🍀', category: 'Plant' }, { x: 15, y: 35, type: '🌾', category: 'Plant' },
    { x: 30, y: 40, type: '🌱', category: 'Plant' }, { x: 45, y: 30, type: '🌿', category: 'Plant' },
    { x: 20, y: 55, type: '🍀', category: 'Plant' }, { x: 35, y: 60, type: '🌾', category: 'Plant' },
    
    // Sessile animals (🐚🪸🦀)
    { x: 5, y: 25, type: '🐚', category: 'Sessile Animal' }, { x: 60, y: 15, type: '🪸', category: 'Sessile Animal' },
    { x: 55, y: 45, type: '🦀', category: 'Sessile Animal' }, { x: 12, y: 45, type: '🐚', category: 'Sessile Animal' },
    { x: 28, y: 25, type: '🪸', category: 'Sessile Animal' }, { x: 42, y: 55, type: '🦀', category: 'Sessile Animal' },
    
    // Slow-moving animals (🐌🐛🦋)
    { x: 8, y: 35, type: '🐌', category: 'Slow Animal' }, { x: 38, y: 20, type: '🐛', category: 'Slow Animal' },
    { x: 48, y: 40, type: '🦋', category: 'Slow Animal' }, { x: 18, y: 10, type: '🐌', category: 'Slow Animal' },
    { x: 32, y: 50, type: '🐛', category: 'Slow Animal' }, { x: 52, y: 25, type: '🦋', category: 'Slow Animal' },
    
    // Fungi and other stationary organisms (🍄🦠)
    { x: 22, y: 30, type: '🍄', category: 'Fungi' }, { x: 35, y: 15, type: '🦠', category: 'Fungi' },
    { x: 45, y: 60, type: '🍄', category: 'Fungi' }, { x: 15, y: 50, type: '🦠', category: 'Fungi' },
    { x: 50, y: 35, type: '🍄', category: 'Fungi' }, { x: 25, y: 65, type: '🦠', category: 'Fungi' },
    
    // Additional organisms for better distribution
    { x: 65, y: 30, type: '🌱', category: 'Plant' }, { x: 70, y: 50, type: '🐚', category: 'Sessile Animal' },
    { x: 75, y: 20, type: '🐌', category: 'Slow Animal' }, { x: 80, y: 40, type: '🍄', category: 'Fungi' },
    { x: 3, y: 60, type: '🌿', category: 'Plant' }, { x: 85, y: 60, type: '🦋', category: 'Slow Animal' }
  ];

  const placeQuadrat = () => {
    setQuadratPosition({
      x: Math.random() * 70,
      y: Math.random() * 60
    });
    setQuadratPlaced(true);
    setOrganismCount(null);
    setShowCount(false);
  };

  const countOrganisms = () => {
    if (!quadratPlaced) return;
    
    // Calculate which organisms are within the quadrat bounds
    const quadratLeft = quadratPosition.x;
    const quadratTop = quadratPosition.y;
    const quadratRight = quadratPosition.x + 20; // 20% width
    const quadratBottom = quadratPosition.y + 20; // 20% height
    
    const organismsInQuadrat = organismPositions.filter(org => 
      org.x >= quadratLeft && org.x <= quadratRight && 
      org.y >= quadratTop && org.y <= quadratBottom
    );
    
    setOrganismCount(organismsInQuadrat.length);
    setShowCount(true);
  };

  // Calculate organism breakdown by category
  const getOrganismBreakdown = () => {
    if (!quadratPlaced || organismCount === null) return {};
    
    const quadratLeft = quadratPosition.x;
    const quadratTop = quadratPosition.y;
    const quadratRight = quadratPosition.x + 20;
    const quadratBottom = quadratPosition.y + 20;
    
    const organismsInQuadrat = organismPositions.filter(org => 
      org.x >= quadratLeft && org.x <= quadratRight && 
      org.y >= quadratTop && org.y <= quadratBottom
    );
    
    const breakdown = organismsInQuadrat.reduce((acc, org) => {
      acc[org.category] = (acc[org.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return breakdown;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h4 className="text-xl font-bold text-white mb-4 text-center">Interactive Quadrat Sampling</h4>
      
      <div className="relative h-64 bg-gradient-to-br from-green-300 to-green-500 rounded-lg mb-4 overflow-hidden">
        {/* Habitat background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 1px, transparent 1px),
                             radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 1px, transparent 1px),
                             radial-gradient(circle at 40% 60%, rgba(255,255,255,0.25) 1px, transparent 1px)`,
            backgroundSize: '20px 20px, 30px 30px, 25px 25px'
          }} />
        </div>
        
        {/* Actual organisms positioned accurately */}
        {organismPositions.map((org, index) => (
          <div
            key={index}
            className="absolute text-lg select-none"
            style={{ 
              left: `${org.x}%`, 
              top: `${org.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {org.type}
          </div>
        ))}
        
        {/* Quadrat frame */}
        {quadratPlaced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute border-4 border-yellow-400 bg-yellow-200/30 pointer-events-none"
            style={{ 
              left: `${quadratPosition.x}%`, 
              top: `${quadratPosition.y}%`,
              width: '20%',
              height: '20%'
            }}
          >
            {/* Highlight organisms within quadrat */}
            {showCount && organismPositions
              .filter(org => {
                const quadratLeft = quadratPosition.x;
                const quadratTop = quadratPosition.y;
                const quadratRight = quadratPosition.x + 20;
                const quadratBottom = quadratPosition.y + 20;
                return org.x >= quadratLeft && org.x <= quadratRight && 
                       org.y >= quadratTop && org.y <= quadratBottom;
              })
              .map((org, index) => (
                <div
                  key={`highlight-${index}`}
                  className="absolute text-lg animate-pulse"
                  style={{ 
                    left: `${org.x - quadratPosition.x}%`, 
                    top: `${org.y - quadratPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 0 4px rgba(255,255,0,0.8))'
                  }}
                >
                  {org.type}
                </div>
              ))}
          </motion.div>
        )}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={placeQuadrat}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Place Random Quadrat
        </button>
        <button
          onClick={countOrganisms}
          disabled={!quadratPlaced}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          Count Organisms
        </button>
        <button
          onClick={() => {
            setQuadratPlaced(false);
            setOrganismCount(null);
            setShowCount(false);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {organismCount !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-6"
        >
          <div className="mb-4">
            <p className="text-white font-semibold text-xl mb-2">
              Organisms counted:
            </p>
            <div className="text-6xl font-bold text-yellow-300 mb-2">
              {organismCount}
            </div>
            <p className="text-white/80 text-lg">
              individuals per quadrat
            </p>
          </div>
          
          {/* Organism breakdown by category */}
          {organismCount > 0 && (
            <div className="mb-4">
              <p className="text-white font-medium text-lg mb-3">Organism Breakdown:</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(getOrganismBreakdown()).map(([category, count]) => (
                  <div key={category} className="bg-white/10 rounded-lg px-3 py-2">
                    <span className="text-white/80">{category}:</span>
                    <span className="text-yellow-300 font-bold text-lg ml-2">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-white/70 text-sm mb-3">
            Quadrat covers {quadratPosition.x.toFixed(1)}% - {(quadratPosition.x + 20).toFixed(1)}% horizontally, 
            {quadratPosition.y.toFixed(1)}% - {(quadratPosition.y + 20).toFixed(1)}% vertically
          </p>
          
          {organismCount === 0 && (
            <p className="text-yellow-300 text-lg mt-3 font-medium">
              💡 Try placing the quadrat in a different area to find organisms!
            </p>
          )}
          
          <div className="mt-4 text-sm text-white/60">
            <p>🌱 Plants • 🐚 Sessile Animals • 🐌 Slow Animals • 🍄 Fungi</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Component for mark-recapture calculator
const MarkRecaptureCalculator: React.FC = () => {
  const [marked, setMarked] = useState<number>(50);
  const [caught, setCaught] = useState<number>(30);
  const [recaptured, setRecaptured] = useState<number>(10);
  const [result, setResult] = useState<number | null>(null);

  const calculatePopulation = () => {
    if (recaptured > 0) {
      const population = Math.round((marked * caught) / recaptured);
      setResult(population);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h4 className="text-xl font-bold text-white mb-4 text-center">Mark-Recapture Calculator</h4>
      
      <div className="mb-6">
        <div className="text-center mb-4">
          <div className="text-2xl font-mono text-yellow-300 bg-black/30 rounded-lg p-4">
            N = (M × C) / R
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2">
              M (Marked): {marked}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={marked}
              onChange={(e) => setMarked(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">
              C (Caught): {caught}
            </label>
            <input
              type="range"
              min="10"
              max="80"
              value={caught}
              onChange={(e) => setCaught(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">
              R (Recaptured): {recaptured}
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={recaptured}
              onChange={(e) => setRecaptured(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={calculatePopulation}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Calculate Population
        </button>
        
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 bg-green-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-400"
          >
            <p className="text-white font-bold text-xl">
              Estimated Population: <span className="text-green-300">{result}</span> individuals
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Topic-based Quiz Component with Letter Choices
const TopicQuiz: React.FC<{ topic: string }> = ({ topic }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const topicQuestions = quizQuestions.filter(q => q.topic === topic);
  const question = topicQuestions[currentQuestion];
  const letters = ['A', 'B', 'C', 'D'];

  const handleAnswerSelect = (answer: string, letter: string) => {
    setSelectedAnswer(answer);
    setSelectedLetter(letter);
    setShowExplanation(true);
    
    if (answer === question.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < topicQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setSelectedLetter('');
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setSelectedLetter('');
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center"
      >
        <h3 className="text-3xl font-bold text-white mb-4">{topic} Quiz Complete! 🎉</h3>
        <div className="text-6xl mb-4">
          {score / topicQuestions.length >= 0.8 ? '🌟' : score / topicQuestions.length >= 0.6 ? '👍' : '📚'}
        </div>
        <p className="text-xl text-white mb-6">
          You scored <span className="text-green-300 font-bold">{score}</span> out of {topicQuestions.length}
        </p>
        <p className="text-white/80 mb-6">
          {score / topicQuestions.length >= 0.8 
            ? `Excellent! You've mastered ${topic.toLowerCase()} concepts!` 
            : score / topicQuestions.length >= 0.6 
              ? `Good work! Keep studying ${topic.toLowerCase()}!`
              : `Keep learning - ${topic.toLowerCase()} is fascinating!`}
        </p>
        <button
          onClick={restartQuiz}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Take Quiz Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
    >
      <div className="mb-4">
        <span className="text-white/60">{topic} - Question {currentQuestion + 1} of {topicQuestions.length}</span>
        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / topicQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-6">{question.question}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const letter = letters[index];
          const isCorrect = option === question.answer;
          const isSelected = option === selectedAnswer;
          
          return (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswerSelect(option, letter)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-lg border transition-all flex items-center gap-4 ${
                showExplanation
                  ? isCorrect
                    ? 'bg-green-500/20 border-green-400 text-green-300'
                    : isSelected && !isCorrect
                      ? 'bg-red-500/20 border-red-400 text-red-300'
                      : 'bg-white/5 border-white/10 text-white/60'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:scale-[1.02]'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                showExplanation
                  ? isCorrect
                    ? 'border-green-400 bg-green-500/30 text-green-300'
                    : isSelected && !isCorrect
                      ? 'border-red-400 bg-red-500/30 text-red-300'
                      : 'border-white/30 bg-white/10 text-white/60'
                  : 'border-white/40 bg-white/20 text-white'
              }`}>
                {letter}
              </div>
              <span className="flex-1">{option}</span>
              {showExplanation && isCorrect && (
                <div className="text-green-400 text-xl">✓</div>
              )}
              {showExplanation && isSelected && !isCorrect && (
                <div className="text-red-400 text-xl">✗</div>
              )}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="mb-4 text-center">
          <p className="text-white/80 text-sm">
            You selected: <span className="font-bold text-white">{selectedLetter}</span>
            {selectedAnswer === question.answer ? (
              <span className="text-green-400 ml-2">✓ Correct!</span>
            ) : (
              <span className="text-red-400 ml-2">✗ Incorrect</span>
            )}
          </p>
          <p className="text-white/80 text-sm mt-1">
            Correct answer: <span className="font-bold text-green-400">
              {letters[question.options.indexOf(question.answer)]}
            </span>
          </p>
        </div>
      )}

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-blue-500/20 border border-blue-400 rounded-lg"
          >
            <p className="text-blue-300 font-semibold mb-2">Explanation:</p>
            <p className="text-white/90">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {showExplanation && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            {currentQuestion < topicQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          </button>
        </div>
      )}

      {!showExplanation && (
        <div className="text-center">
          <p className="text-white/60 text-sm">
            💡 Tip: Students can call out letter choices (A, B, C, D) and you can click the most voted answer!
          </p>
        </div>
      )}
    </motion.div>
  );
};

// Main App component with all slides
const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showPrompt, setShowPrompt] = useState(false);
  const [pendingSlide, setPendingSlide] = useState<number | null>(null);
  const totalSlides = 15; // Updated total slides

  const navigateSlide = useCallback((direction: number) => {
    const newSlide = currentSlide + direction;
    if (newSlide >= 1 && newSlide <= totalSlides) {
      // Check if the target slide has a prompt question
      const hasPrompt = promptQuestions.some(pq => pq.slideNumber === newSlide);
      
      if (hasPrompt && !showPrompt) {
        // Show prompt question first
        setPendingSlide(newSlide);
        setShowPrompt(true);
      } else {
        // Navigate directly to slide
        setCurrentSlide(newSlide);
        setShowPrompt(false);
        setPendingSlide(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentSlide, totalSlides, showPrompt]);

  const continueFromPrompt = () => {
    if (pendingSlide !== null) {
      setCurrentSlide(pendingSlide);
      setShowPrompt(false);
      setPendingSlide(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const cancelPrompt = () => {
    setShowPrompt(false);
    setPendingSlide(null);
    navigateSlide(-1);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showPrompt) {
        if (e.key === 'Enter' || e.key === 'ArrowRight') {
          e.preventDefault();
          continueFromPrompt();
        } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
          e.preventDefault();
          cancelPrompt();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          navigateSlide(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateSlide(1);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          e.preventDefault();
          exitFullscreen();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(1);
          setShowPrompt(false);
          setPendingSlide(null);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(totalSlides);
          setShowPrompt(false);
          setPendingSlide(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigateSlide, totalSlides, showPrompt, continueFromPrompt, cancelPrompt]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        console.log('Fullscreen not supported or denied');
      });
    } else {
      document.exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
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

      case 2:
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

      case 3:
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-600 to-emerald-700 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Populations are Dynamic and Interactive
                </h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Population Definition</h3>
                  <p className="text-xl text-white/90 leading-relaxed mb-4">
                    A population is a group of individuals belonging to the <span className="text-yellow-300 font-semibold">same species</span> and inhabiting the <span className="text-yellow-300 font-semibold">same general area</span>, continuously changing in response to both biotic and abiotic factors.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🟢 Biotic Factors (Living)</h3>
                    
                    {/* Biotic Factors Image */}
                    <img 
                      src="/src/assets/images/biotic-factor.png"
                      alt="Examples of biotic factors: predators, plants, parasites"
                      className="rounded-lg mb-4 w-48 mx-auto"
                    />
                    
                    <p className="text-white/90 text-center">
                      Living components that affect populations through various interactions and relationships.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🔵 Abiotic Factors (Non-living)</h3>
                    
                    {/* Abiotic Factors Image */}
                    <img 
                      src="/src/assets/images/abiotic-factor.png"
                      alt="Examples of abiotic factors: weather, soil, water, temperature"
                      className="rounded-lg mb-4 w-48 mx-auto"
                    />
                    
                    <p className="text-white/90 text-center">
                      Non-living environmental factors that influence population survival and growth.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Ecology: The Study of Interactions</h3>
                  <p className="text-white/90 text-center text-lg">
                    The biological study of how organisms interact with each other and their environment
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-600 to-red-600 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Interactive Factor Explorer
                </h1>
                
                <div className="mb-8">
                  <FactorSelector />
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Key Concepts</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-400/20 rounded-lg p-4">
                      <h4 className="text-lg font-bold text-white mb-2">🟢 Biotic Factors</h4>
                      <p className="text-white/90 text-sm">
                        Living components that affect populations through interactions like competition, 
                        predation, disease, and cooperation.
                      </p>
                    </div>
                    <div className="bg-blue-400/20 rounded-lg p-4">
                      <h4 className="text-lg font-bold text-white mb-2">🔵 Abiotic Factors</h4>
                      <p className="text-white/90 text-sm">
                        Non-living environmental factors like temperature, water, light, and 
                        physical barriers that influence population survival and growth.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-8 pb-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Metapopulations
                </h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Definition</h3>
                  <p className="text-xl text-white/90 leading-relaxed">
                    Metapopulations include multiple populations of the same species that inhabit <span className="text-yellow-300 font-semibold">distinct areas</span>. 
                    They continuously exchange members through <span className="text-yellow-300 font-semibold">immigration and emigration</span>.
                  </p>
                </div>

                <div className="mb-16">
                  <MetapopulationDiagram />
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      title: 'Genetic Diversity',
                      icon: '🧬',
                      description: 'Migration between populations introduces new genes, increasing overall genetic diversity',
                      benefit: 'Helps populations adapt to changing environments'
                    },
                    {
                      title: 'Population Rescue',
                      icon: '🆘',
                      description: 'If one population declines, immigrants from other populations can help it recover',
                      benefit: 'Prevents local extinctions'
                    },
                    {
                      title: 'Colonization',
                      icon: '🌱',
                      description: 'Individuals can establish new populations in previously uninhabited suitable areas',
                      benefit: 'Expands species range and reduces extinction risk'
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.3 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center hover:scale-105 transition-transform"
                    >
                      <div className="text-4xl mb-4">{benefit.icon}</div>
                      <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                      <p className="text-white/90 mb-3">{benefit.description}</p>
                      <div className="bg-purple-400/20 rounded-lg p-2 text-sm text-white/80">
                        <strong>Benefit:</strong> {benefit.benefit}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-700 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Communities are Combinations of Co-existing, Interacting Populations
                </h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Community Definition</h3>
                  
                  {/* Community Interaction Image */}
                  <img 
                    src="/src/assets/images/species-interaction.png"
                    alt="Different species interacting in an ecological community"
                    className="rounded-lg mb-4 mx-auto w-80"
                  />
                  
                  <p className="text-xl text-white/90 leading-relaxed">
                    An ecological community is comprised of multiple <span className="text-yellow-300 font-semibold">co-existing and interacting populations</span> in the same habitat, 
                    and a community's <span className="text-yellow-300 font-semibold">species richness</span> is merely the number of species.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🏠 Ecological Niche</h3>
                    <p className="text-white/90 mb-4">
                      The combination of ways a species uses environmental resources and interacts with other community members reflects the distinct niche the species occupies.
                    </p>
                    <div className="bg-teal-400/20 rounded-lg p-3">
                      <p className="text-white/80 text-sm italic">
                        "A niche is like the 'job' a species performs in its community"
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">⚔️ Competition</h3>
                    <p className="text-white/90 mb-4">
                      Competition arises when species' niches overlap. Bluebirds and woodpeckers both favor insectivorous diets and open areas with sparsely distributed trees.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-white/90">
                        <span className="mr-2 text-red-300">•</span>
                        Interspecific competition (between species)
                      </div>
                      <div className="flex items-center text-white/90">
                        <span className="mr-2 text-red-300">•</span>
                        Intraspecific competition (within species)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-400/20 to-teal-400/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Competition Avoidance</h3>
                  <p className="text-white/90 text-center">
                    Competition can be avoided by partitioning resources or occupying different areas of a shared environment
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-600 to-red-600 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Predator-Prey Relationships
                </h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Evolutionary Arms Race</h3>
                  
                  {/* Predator-Prey Image */}
                  <img 
                    src="/src/assets/images/predator-vs-prey.png"
                    alt="Predator-prey relationship showing evolutionary adaptations"
                    className="rounded-lg mb-4 mx-auto w-80"
                  />
                  
                  <p className="text-xl text-white/90 leading-relaxed">
                    Predator-prey relationships resemble an evolutionary <span className="text-yellow-300 font-semibold">"arms race"</span>. 
                    In prey animals, natural selection strongly favors features that help prevent predation.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🦋 Prey Adaptations</h3>
                    <div className="space-y-4">
                      <div className="bg-orange-400/20 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-white mb-2">Caligo (Owl) Butterflies</h4>
                      <p className="text-white/90 text-sm">
                          Large eyespots on their wings that resemble owl eyes, which deter threatening predators.
                      </p>
                    </div>
                      <div className="bg-orange-400/20 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-white mb-2">Camouflage</h4>
                      <p className="text-white/90 text-sm">
                          Deer use camouflage to avoid detection by predators like leopards.
                      </p>
                    </div>
                  </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🐆 Predator Adaptations</h3>
                    <div className="space-y-4">
                      <div className="bg-red-400/20 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-white mb-2">Co-adaptation</h4>
                        <p className="text-white/90 text-sm">
                          Predators also co-adapt to prey adaptations; both predator and prey species use camouflage.
                        </p>
                      </div>
                      <div className="bg-red-400/20 rounded-lg p-4">
                        <h4 className="text-lg font-bold text-white mb-2">Hunting Strategies</h4>
                        <p className="text-white/90 text-sm">
                          Leopards develop better hunting techniques as deer improve their camouflage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-400/20 to-orange-400/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Key Concept</h3>
                  <p className="text-white/90 text-center text-lg">
                    This continuous adaptation creates a dynamic balance where both predators and prey must constantly evolve to survive.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-600 to-teal-600 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Populations Can Be Measured Using Quadrat and Mark and Recapture Methods
                </h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">Population Characteristics</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-green-400/20 rounded-xl p-6">
                      <h4 className="text-2xl font-bold text-white mb-4">Population Size (N)</h4>
                      <p className="text-white/90 text-lg">
                        Simply the <span className="text-yellow-300 font-semibold">number of individuals</span> in the population.
                      </p>
                    </div>
                    <div className="bg-blue-400/20 rounded-xl p-6">
                      <h4 className="text-2xl font-bold text-white mb-4">Population Density</h4>
                      <p className="text-white/90 text-lg">
                        The number of individuals in a <span className="text-yellow-300 font-semibold">given area</span>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">📏 Direct Counting</h3>
                    <p className="text-white/90 mb-4">
                      Although counting individuals is the most accurate way to measure populations, it can be unfeasible in large habitats or for organisms that frequently move around.
                    </p>
                    <div className="bg-green-400/20 rounded-lg p-3">
                      <p className="text-white/80 text-sm">
                        <strong>Solution:</strong> Researchers often employ sampling methods to infer the total population size.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🔬 Sampling Methods</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-white/90">
                        <span className="mr-3 text-yellow-300">•</span>
                        Quadrat sampling for plants and stationary organisms
                      </div>
                      <div className="flex items-center text-white/90">
                        <span className="mr-3 text-yellow-300">•</span>
                        Mark-recapture for mobile animals
                      </div>
                      <div className="flex items-center text-white/90">
                        <span className="mr-3 text-yellow-300">•</span>
                        Statistical estimation techniques
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-600 to-teal-600 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Quadrat Method
                </h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">What is the Quadrat Method?</h3>
                  
                  <p className="text-lg text-white/90 leading-relaxed">
                    Quadrat samples are adequate for estimating population size and density of <span className="text-yellow-300 font-semibold">plants or very small or slow organisms</span>. 
                    This method involves partitioning several randomly distributed sections of habitat with markers, such as string or stakes, and counting the individuals in each quadrat.
                  </p>
                </div>

                <div className="mb-8">
                  <QuadratSimulation />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Best for:</h3>
                    <div className="space-y-3">
                      {[
                        '🌱 Plants and vegetation (grass, flowers, shrubs)',
                        '🐚 Sessile animals (barnacles, corals, mussels)',
                        '🐌 Slow-moving animals (snails, caterpillars, some insects)',
                        '🍄 Fungi and other stationary organisms (mushrooms, lichens)'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-white/90">
                          <span className="mr-3">{item.split(' ')[0]}</span>
                          <span>{item.substring(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Procedure:</h3>
                    <ol className="space-y-2 text-white/90">
                      <li>1. Define the study area</li>
                      <li>2. Place quadrats randomly</li>
                      <li>3. Count organisms in each quadrat</li>
                      <li>4. Calculate average density</li>
                      <li>5. Estimate total population</li>
                    </ol>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Mark and Recapture Method
                </h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">The Lincoln-Petersen Estimator</h3>
                  
                  <div className="text-4xl font-mono text-yellow-300 bg-black/30 rounded-lg p-4 mb-4">
                    N = (M × C) / R
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white/10 rounded p-2">
                      <strong>N:</strong> Total population
                    </div>
                    <div className="bg-white/10 rounded p-2">
                      <strong>M:</strong> Number marked initially
                    </div>
                    <div className="bg-white/10 rounded p-2">
                      <strong>C:</strong> Total caught in second sample
                    </div>
                    <div className="bg-white/10 rounded p-2">
                      <strong>R:</strong> Number of marked individuals recaptured
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <MarkRecaptureCalculator />
                </div>

                <div className="bg-yellow-400/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30">
                  <h3 className="text-xl font-bold text-white mb-4">⚠️ Important Assumptions:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'No births, deaths, or migration during study',
                      'Marked and unmarked animals mix randomly',
                      'Marks don\'t affect survival or behavior',
                      'Equal probability of capture for all individuals'
                    ].map((assumption, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-3 text-white/90 text-sm">
                        {assumption}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Populations Quiz 🧠
                </h1>
                <TopicQuiz topic="Populations" />
              </motion.div>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-700 p-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Communities Quiz 🧠
                </h1>
                <TopicQuiz topic="Communities" />
              </motion.div>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="min-h-screen bg-gradient-to-br from-pink-600 to-purple-700 p-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Metapopulations Quiz 🧠
                </h1>
                <TopicQuiz topic="Metapopulations" />
              </motion.div>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-700 p-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Measurement Methods Quiz 🧠
                </h1>
                <TopicQuiz topic="Measurement Methods" />
              </motion.div>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 p-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="slide-enter"
              >
                <h1 className="text-5xl font-bold text-white text-center mb-8">
                  Summary & Key Takeaways
                </h1>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🌍 Populations</h3>
                    <ul className="space-y-2 text-white/90">
                      <li>• Groups of same species in shared environment</li>
                      <li>• Continuously change due to biotic/abiotic factors</li>
                      <li>• Characterized by size and density</li>
                      <li>• Measured using quadrat and mark-recapture methods</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🏘️ Communities</h3>
                    <ul className="space-y-2 text-white/90">
                      <li>• Multiple co-existing, interacting populations</li>
                      <li>• Species richness = number of species</li>
                      <li>• Ecological niches define species roles</li>
                      <li>• Competition and predator-prey relationships</li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">🔗 Metapopulations</h3>
                    <ul className="space-y-2 text-white/90">
                      <li>• Multiple populations of same species in different areas</li>
                      <li>• Connected by immigration and emigration</li>
                      <li>• Maintain genetic diversity and resilience</li>
                      <li>• Help prevent local extinctions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">📊 Measurement</h3>
                    <ul className="space-y-2 text-white/90">
                      <li>• Quadrat method for plants and stationary organisms</li>
                      <li>• Mark-recapture for mobile animals</li>
                      <li>• Statistical estimation techniques</li>
                      <li>• Important assumptions must be met</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Thank You! 🌟</h3>
                  <p className="text-white/90 text-lg">
                    Understanding populations and communities helps us protect biodiversity and manage ecosystems effectively.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Slide {currentSlide}</h1>
              <p className="text-xl">Content coming soon...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="presentation-container">
      {/* Slide counter and progress */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold mb-2">
          <span aria-label={`Slide ${currentSlide} of ${totalSlides}`}>
            {showPrompt ? `Getting ready for ${pendingSlide}` : `${currentSlide} / ${totalSlides}`}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
            aria-label={`Progress: ${Math.round((currentSlide / totalSlides) * 100)}% complete`}
          />
        </div>
      </div>

      {/* Main content */}
      {showPrompt && pendingSlide !== null ? (
        <PromptQuestion
          question={promptQuestions.find(pq => pq.slideNumber === pendingSlide)?.question || ''}
          context={promptQuestions.find(pq => pq.slideNumber === pendingSlide)?.context || ''}
          onContinue={continueFromPrompt}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Help text and keyboard shortcuts */}
      {!showPrompt && (
        <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 text-white/60 text-sm z-50 text-center">
          <div>Use arrow keys to navigate</div>
          <div className="text-xs mt-1">Press F for fullscreen • ESC to exit fullscreen • Home/End to jump to first/last slide</div>
        </div>
      )}
    </div>
  );
};

export default App;
