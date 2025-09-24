import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Sparkles,
  ArrowRight,
  Package,
  Clock,
  DollarSign
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  packageRecommendation?: PackageRecommendation;
}

interface PackageRecommendation {
  name: string;
  price: string;
  features: string[];
  timeframe: string;
  confidence: number;
}

interface QuestionFlow {
  id: string;
  question: string;
  options?: string[];
  followUp?: string;
}

const AIQuickAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userRequirements, setUserRequirements] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Rule-based question flow
  const questionFlow: QuestionFlow[] = [
    {
      id: 'welcome',
      question: "Hi! I'm Apex, your AI assistant 🤖 I'll help you find the perfect development package. What type of project do you need?",
      options: ['Web Application', 'Mobile App', 'E-commerce Store', 'AI/ML Solution', 'Custom Software']
    },
    {
      id: 'budget',
      question: "What's your budget range for this project?",
      options: ['$5K - $15K', '$15K - $30K', '$30K - $50K', '$50K+', 'Not sure yet']
    },
    {
      id: 'timeline',
      question: "When do you need this completed?",
      options: ['ASAP (Rush)', '1-2 months', '3-4 months', '6+ months', 'Flexible timeline']
    },
    {
      id: 'features',
      question: "Which features are most important to you?",
      options: ['User Authentication', 'Payment Integration', 'Admin Dashboard', 'API Integration', 'Advanced Analytics']
    },
    {
      id: 'experience',
      question: "How would you describe your technical expertise?",
      options: ['Complete Beginner', 'Some Technical Knowledge', 'Experienced', 'Very Technical']
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize conversation
      setTimeout(() => {
        addBotMessage(questionFlow[0].question, questionFlow[0].options);
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (content: string, suggestions?: string[], packageRecommendation?: PackageRecommendation) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        type: 'bot',
        timestamp: new Date(),
        suggestions,
        packageRecommendation
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generatePackageRecommendation = (requirements: Record<string, string>): PackageRecommendation => {
    // Rule-based package recommendation logic
    const projectType = requirements.projectType?.toLowerCase() || '';
    const budget = requirements.budget || '';
    const timeline = requirements.timeline || '';
    
    let packageName = 'Starter Package';
    let price = '$5,000 - $15,000';
    let features = ['Basic Development', 'Responsive Design', '30-day Support'];
    let timeframe = '4-6 weeks';
    let confidence = 85;

    if (projectType.includes('e-commerce')) {
      packageName = 'E-commerce Pro';
      price = '$15,000 - $30,000';
      features = ['Custom E-commerce Platform', 'Payment Gateway', 'Admin Dashboard', 'Mobile Responsive', '90-day Support'];
      timeframe = '6-8 weeks';
      confidence = 92;
    } else if (projectType.includes('mobile')) {
      packageName = 'Mobile App Package';
      price = '$20,000 - $40,000';
      features = ['Native Mobile App', 'Cross-platform Support', 'Backend API', 'Push Notifications', '120-day Support'];
      timeframe = '8-12 weeks';
      confidence = 88;
    } else if (projectType.includes('ai') || projectType.includes('ml')) {
      packageName = 'AI/ML Solutions';
      price = '$30,000 - $60,000';
      features = ['Custom AI Models', 'Data Processing Pipeline', 'ML Training', 'API Integration', '180-day Support'];
      timeframe = '10-16 weeks';
      confidence = 90;
    } else if (budget.includes('30K') || budget.includes('50K')) {
      packageName = 'Enterprise Package';
      price = '$30,000 - $50,000';
      features = ['Full-stack Development', 'Advanced Features', 'Database Design', 'Security Implementation', '180-day Support'];
      timeframe = '8-12 weeks';
      confidence = 89;
    }

    return { name: packageName, price, features, timeframe, confidence };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    
    // Store user response
    const currentQuestion = questionFlow[currentStep];
    if (currentQuestion) {
      setUserRequirements(prev => ({
        ...prev,
        [currentQuestion.id === 'welcome' ? 'projectType' : currentQuestion.id]: inputValue
      }));
    }

    // Process response and move to next step
    setTimeout(() => {
      if (currentStep < questionFlow.length - 1) {
        setCurrentStep(prev => prev + 1);
        addBotMessage(questionFlow[currentStep + 1].question, questionFlow[currentStep + 1].options);
      } else {
        // Generate final recommendation
        const updatedRequirements = {
          ...userRequirements,
          [currentQuestion.id]: inputValue
        };
        
        const recommendation = generatePackageRecommendation(updatedRequirements);
        addBotMessage(
          `Perfect! Based on your requirements, I recommend our ${recommendation.name}. Here's what we suggest:`,
          ['Get Detailed Quote', 'Schedule Consultation', 'View Portfolio', 'Ask More Questions'],
          recommendation
        );
      }
    }, 500);

    setInputValue('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    
    // Handle suggestion responses
    if (suggestion === 'Get Detailed Quote') {
      setTimeout(() => {
        addBotMessage(
          "Great! I'll connect you with our project manager for a detailed quote. Please provide your email and we'll send you a comprehensive proposal within 24 hours.",
          ['Contact Sales', 'View Pricing', 'Schedule Call']
        );
      }, 500);
    } else if (suggestion === 'Schedule Consultation') {
      setTimeout(() => {
        addBotMessage(
          "Excellent choice! A consultation will help us understand your needs better. Would you like to schedule a 30-minute discovery call?",
          ['Book Now', 'Tell me more', 'Different time']
        );
      }, 500);
    } else {
      // Store user response and continue flow
      const currentQuestion = questionFlow[currentStep];
      if (currentQuestion && currentStep < questionFlow.length - 1) {
        setUserRequirements(prev => ({
          ...prev,
          [currentQuestion.id === 'welcome' ? 'projectType' : currentQuestion.id]: suggestion
        }));
        
        setCurrentStep(prev => prev + 1);
        setTimeout(() => {
          addBotMessage(questionFlow[currentStep + 1].question, questionFlow[currentStep + 1].options);
        }, 500);
      }
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'hidden' : 'flex'} items-center gap-2 bg-gradient-to-r from-[#BF1152] to-[#045B59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <img 
            src="/favicon.ico" 
            alt="Apex" 
            className="w-4 h-4 rounded-full" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'block';
            }}
          />
          <Sparkles className="w-3 h-3 text-white" style={{display: 'none'}} />
        </div>
        <span className="font-medium">Apex</span>
        <MessageCircle className="w-5 h-5" />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#BF1152] to-[#045B59] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <img 
                    src="/favicon.ico" 
                    alt="Apex" 
                    className="w-5 h-5 rounded-full" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <Bot className="w-4 h-4 text-white" style={{display: 'none'}} />
                </div>
                <div>
                  <h3 className="font-semibold">Apex AI</h3>
                  <p className="text-xs opacity-80">Here to help you find the perfect package</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-[#BF1152] to-[#045B59] text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  } rounded-2xl px-4 py-2`}>
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && (
                        <div className="w-4 h-4 mt-0.5 flex-shrink-0 relative">
                          <img 
                            src="/favicon.ico" 
                            alt="Apex" 
                            className="w-4 h-4 rounded-full" 
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling.style.display = 'block';
                            }}
                          />
                          <Bot className="w-4 h-4 text-current" style={{display: 'none'}} />
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                    </div>

                    {/* Package Recommendation */}
                    {message.packageRecommendation && (
                      <div className="mt-3 p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-4 h-4" />
                          <span className="font-semibold">{message.packageRecommendation.name}</span>
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                            {message.packageRecommendation.confidence}% match
                          </span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-3 h-3" />
                            <span>{message.packageRecommendation.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{message.packageRecommendation.timeframe}</span>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium mb-1">Includes:</p>
                            <ul className="space-y-0.5">
                              {message.packageRecommendation.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <ArrowRight className="w-2 h-2" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left px-3 py-2 text-xs bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 relative">
                        <img 
                          src="/favicon.ico" 
                          alt="Apex" 
                          className="w-4 h-4 rounded-full" 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'block';
                          }}
                        />
                        <Bot className="w-4 h-4 text-current" style={{display: 'none'}} />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF1152] text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3 py-2 bg-gradient-to-r from-[#BF1152] to-[#045B59] text-white rounded-lg hover:from-[#A10E47] hover:to-[#034A4A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIQuickAssistant;