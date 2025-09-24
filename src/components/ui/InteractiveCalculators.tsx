import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';

interface ROICalculation {
  currentRevenue: number;
  currentCosts: number;
  projectCost: number;
  expectedGrowth: number;
  timeframe: number;
  roi: number;
  paybackMonths: number;
  totalReturn: number;
}

const InteractiveCalculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState('roi');
  
  // ROI Calculator State
  const [currentRevenue, setCurrentRevenue] = useState(1000000);
  const [currentCosts, setCurrentCosts] = useState(600000);
  const [projectCost, setProjectCost] = useState(150000);
  const [expectedGrowth, setExpectedGrowth] = useState(25);
  const [timeframe, setTimeframe] = useState(24);
  const [roiResult, setRoiResult] = useState<ROICalculation | null>(null);

  // Project Estimator State
  const [projectType, setProjectType] = useState('web-app');
  const [complexity, setComplexity] = useState('standard');
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState(12);
  const [teamSize, setTeamSize] = useState(4);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const calculators = [
    { id: 'roi', name: 'ROI Calculator', icon: TrendingUp },
    { id: 'project', name: 'Project Estimator', icon: Calculator },
    { id: 'savings', name: 'Cost Savings', icon: DollarSign }
  ];

  const projectTypes = {
    'web-app': { name: 'Web Application', basePrice: 25000 },
    'mobile-app': { name: 'Mobile App', basePrice: 35000 },
    'ecommerce': { name: 'E-commerce', basePrice: 30000 },
    'saas': { name: 'SaaS Platform', basePrice: 45000 },
    'enterprise': { name: 'Enterprise System', basePrice: 60000 }
  };

  const complexityMultipliers = {
    simple: 0.7,
    standard: 1.0,
    complex: 1.4,
    enterprise: 1.8
  };

  const availableFeatures = [
    'User Authentication', 'Payment Integration', 'Real-time Chat', 
    'File Upload', 'Advanced Analytics', 'API Integration',
    'Third-party Services', 'Admin Panel', 'Multi-language',
    'Mobile Responsive', 'SEO Optimization', 'Security Features'
  ];

  // Calculate ROI
  useEffect(() => {
    const monthlyRevenue = currentRevenue / 12;
    const monthlyCosts = currentCosts / 12;
    const monthlyProfit = monthlyRevenue - monthlyCosts;
    
    const growthDecimal = expectedGrowth / 100;
    const projectedMonthlyRevenue = monthlyRevenue * (1 + growthDecimal);
    const projectedMonthlyProfit = projectedMonthlyRevenue - monthlyCosts;
    
    const additionalMonthlyProfit = projectedMonthlyProfit - monthlyProfit;
    const totalReturn = additionalMonthlyProfit * timeframe;
    const roi = ((totalReturn - projectCost) / projectCost) * 100;
    const paybackMonths = projectCost / additionalMonthlyProfit;

    setRoiResult({
      currentRevenue,
      currentCosts,
      projectCost,
      expectedGrowth,
      timeframe,
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      totalReturn: Math.round(totalReturn)
    });
  }, [currentRevenue, currentCosts, projectCost, expectedGrowth, timeframe]);

  // Calculate Project Estimate
  useEffect(() => {
    const basePrice = projectTypes[projectType as keyof typeof projectTypes].basePrice;
    const complexityMultiplier = complexityMultipliers[complexity as keyof typeof complexityMultipliers];
    const featuresCost = features.length * 2500;
    const timelineMultiplier = timeline < 8 ? 1.2 : timeline > 16 ? 0.9 : 1;
    const teamMultiplier = teamSize > 5 ? 1.1 : 1;
    
    const total = (basePrice * complexityMultiplier + featuresCost) * timelineMultiplier * teamMultiplier;
    setEstimatedCost(Math.round(total));
  }, [projectType, complexity, features, timeline, teamSize]);

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Interactive Calculators
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Get instant estimates and calculate your potential ROI with our interactive tools
        </motion.p>
      </div>

      {/* Calculator Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                activeCalculator === calc.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {calc.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeCalculator === 'roi' && (
          <motion.div
            key="roi"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* ROI Input Controls */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
                ROI Calculator
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Current Annual Revenue: ${currentRevenue.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={currentRevenue}
                    onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$100K</span>
                    <span>$10M</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Current Annual Costs: ${currentCosts.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="8000000"
                    step="25000"
                    value={currentCosts}
                    onChange={(e) => setCurrentCosts(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Project Investment: ${projectCost.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="25000"
                    max="1000000"
                    step="5000"
                    value={projectCost}
                    onChange={(e) => setProjectCost(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Expected Growth: {expectedGrowth}%
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={expectedGrowth}
                    onChange={(e) => setExpectedGrowth(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Timeframe: {timeframe} months
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="3"
                    value={timeframe}
                    onChange={(e) => setTimeframe(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* ROI Results */}
            <div className="space-y-6">
              {roiResult && (
                <>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">ROI Results</h3>
                    <div className="text-6xl font-bold text-green-600 mb-4">
                      {roiResult.roi}%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Return on Investment over {timeframe} months
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <div className="font-semibold">Payback Period</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {roiResult.paybackMonths} months
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <div className="font-semibold">Total Return</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          ${roiResult.totalReturn.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                    <h4 className="text-lg font-semibold mb-4">Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Initial Investment</span>
                        <span>${projectCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Return</span>
                        <span className="text-green-600">
                          ${roiResult.totalReturn.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Profit</span>
                        <span className="font-bold text-green-600">
                          ${(roiResult.totalReturn - projectCost).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                    <button className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Results
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {activeCalculator === 'project' && (
          <motion.div
            key="project"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Project Estimator Controls */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-blue-600" />
                Project Estimator
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  >
                    {Object.entries(projectTypes).map(([key, type]) => (
                      <option key={key} value={key}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Complexity</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(complexityMultipliers).map((level) => (
                      <button
                        key={level}
                        onClick={() => setComplexity(level)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          complexity === level
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Features ({features.length} selected)
                  </label>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                    {availableFeatures.map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={features.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Timeline: {timeline} weeks
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="52"
                    value={timeline}
                    onChange={(e) => setTimeline(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Team Size: {teamSize} people
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Project Estimate Results */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Estimated Investment</h3>
                <div className="text-6xl font-bold text-blue-600 mb-4">
                  ${estimatedCost.toLocaleString()}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Based on your project requirements
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="font-semibold">Timeline</div>
                    <div className="text-gray-600 dark:text-gray-400">{timeline} weeks</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="font-semibold">Team Size</div>
                    <div className="text-gray-600 dark:text-gray-400">{teamSize} people</div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                <h4 className="text-lg font-semibold mb-4">Cost Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base Development</span>
                    <span>
                      ${(projectTypes[projectType as keyof typeof projectTypes].basePrice * 
                        complexityMultipliers[complexity as keyof typeof complexityMultipliers]).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional Features</span>
                    <span>${(features.length * 2500).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline Adjustment</span>
                    <span>
                      {timeline < 8 ? '+20%' : timeline > 16 ? '-10%' : 'Standard'}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total Estimate</span>
                    <span className="text-blue-600">${estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-3">
                  What's Included
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Complete source code ownership</li>
                  <li>• 6 months post-launch support</li>
                  <li>• Comprehensive documentation</li>
                  <li>• Team training sessions</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Get Detailed Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {activeCalculator === 'savings' && (
          <motion.div
            key="savings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl text-center"
          >
            <h3 className="text-3xl font-bold mb-6">Cost Savings Calculator</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Coming Soon - Calculate potential cost savings from automation and efficiency improvements
            </p>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
              <DollarSign className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <p className="text-amber-800 dark:text-amber-400">
                This calculator is being developed to help you understand potential operational savings 
                from digital transformation initiatives.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benefits Section */}
      <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Use Our Calculators?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Accurate Estimates</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Based on real project data and industry benchmarks
            </p>
          </div>
          <div className="text-center">
            <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">Instant Results</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get immediate calculations as you adjust parameters
            </p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold mb-2">No Commitment</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore options freely before making decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCalculators;