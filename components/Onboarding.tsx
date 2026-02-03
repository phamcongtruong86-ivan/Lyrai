import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

// Import onboarding images
import slide1Image from 'figma:asset/907cc11fa7497ccb0069f55901f289f37cc84917.png'; // AI Intelligence
import slide2Image from 'figma:asset/d6010f60d2fd84da724071bfc3c28aab66b2e556.png'; // Smart Map
import slide3Image from 'figma:asset/f69047440530a954fcb400c98b1ad52e2d4539d7.png'; // +3 Credits

interface OnboardingSlide {
  id: number;
  image: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    image: slide1Image,
  },
  {
    id: 2,
    image: slide2Image,
  },
  {
    id: 3,
    image: slide3Image,
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const currentSlideData = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 bg-[#0B0E14] z-50 flex flex-col items-center justify-between overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
      </div>

      {/* Main Content - Responsive height */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-4 md:px-6 relative z-10 pt-8 md:pt-0">
        {/* Slide Content - Responsive container */}
        <div className="relative w-full max-h-[65vh] md:max-h-[600px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full flex flex-col items-center"
            >
              {/* Image Container - Responsive sizing */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative w-full max-w-[280px] sm:max-w-sm aspect-[9/16] flex items-center justify-center"
              >
                {/* Glassmorphism Card */}
                <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src={currentSlideData.image}
                    alt={`Onboarding slide ${currentSlide + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/20 via-transparent to-[#7C3AED]/20 rounded-2xl md:rounded-3xl blur-2xl -z-10" />
              </motion.div>

              {/* CTA Button for Last Slide - Responsive */}
              {isLastSlide && (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  onClick={handleNext}
                  className="mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] text-white font-bold text-base md:text-lg rounded-full shadow-2xl hover:shadow-[#FF6F4C]/50 active:scale-95 transition-all"
                  style={{
                    boxShadow: '0 0 40px rgba(255, 111, 76, 0.6)',
                  }}
                >
                  Bắt đầu khám phá
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation - Safe area padding */}
      <div className="w-full max-w-md px-4 md:px-6 pb-safe space-y-4 md:space-y-6 relative z-10 mb-6 md:mb-8">
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="transition-all duration-300"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                animate={{
                  width: currentSlide === index ? 32 : 8,
                  backgroundColor: currentSlide === index ? '#2DD4BF' : '#475569',
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Next Button (only for first 2 slides) */}
        {!isLastSlide && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full py-3.5 md:py-4 bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] text-white font-bold text-base md:text-lg rounded-2xl shadow-lg hover:shadow-[#FF6F4C]/50 transition-all flex items-center justify-center gap-2"
          >
            Tiếp theo
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}

        {/* Skip Button (only for first 2 slides) */}
        {!isLastSlide && (
          <button
            onClick={onComplete}
            className="w-full py-2.5 md:py-3 text-slate-400 hover:text-white font-semibold transition-colors"
          >
            Bỏ qua
          </button>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-3 h-3 bg-white/20 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-32 left-10 w-2 h-2 bg-[#8B5CF6]/30 rounded-full blur-sm animate-pulse delay-1000" />
      <div className="absolute top-1/3 left-5 w-1 h-1 bg-white/10 rounded-full animate-pulse delay-500" />
    </div>
  );
}