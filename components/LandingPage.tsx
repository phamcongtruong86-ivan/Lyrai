import { motion } from 'motion/react';
import { ChevronRight, Upload, Sparkles, MapPin, CheckCircle, X, Zap, Monitor, Smartphone, Search, Sun, Moon } from 'lucide-react';
import logoImage from 'figma:asset/d10dac4378c8030eb921c82fde9252a169ca91a1.png';
import { useTheme } from './ThemeProvider';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { isDark, toggleTheme } = useTheme();

  // Theme-aware color tokens (consistent with app design system)
  const t = {
    pageBg: isDark ? 'bg-[#0B0E14]' : 'bg-white',
    navBg: isDark ? 'bg-[#0B0E14]/80' : 'bg-white/80',
    cardBg: isDark ? 'bg-[#131B2E]' : 'bg-white',
    sectionAltBg: isDark ? 'bg-[#020617]' : 'bg-slate-50',
    sectionAlt2Bg: isDark ? 'bg-[#050914]' : 'bg-white',
    sectionAlt3Bg: isDark ? 'bg-[#0B0F19]' : 'bg-slate-50',
    textPrimary: isDark ? 'text-white' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-300' : 'text-slate-600',
    textTertiary: isDark ? 'text-slate-400' : 'text-slate-500',
    textMuted: isDark ? 'text-slate-500' : 'text-slate-400',
    textSubtle: isDark ? 'text-slate-200' : 'text-slate-700',
    borderDefault: isDark ? 'border-white/10' : 'border-slate-200',
    borderSubtle: isDark ? 'border-white/5' : 'border-slate-100',
    borderNav: isDark ? 'border-white/10' : 'border-slate-200/80',
    cardShadow: isDark ? '' : 'shadow-lg shadow-slate-200/60',
    innerBgSoft: isDark ? 'bg-slate-800/50' : 'bg-slate-100',
    innerBgHover: isDark ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50',
    numberColor: isDark ? 'text-white/5' : 'text-slate-900/5',
    toggleBg: isDark ? 'bg-white/10 border-white/20 hover:border-white/40 hover:bg-white/15' : 'bg-slate-900/10 border-slate-300 hover:border-slate-400 hover:bg-slate-900/15',
    gradientVia: isDark ? 'via-white' : 'via-slate-900',
  };

  return (
    <div className={`min-h-screen ${t.pageBg} ${t.textPrimary} overflow-x-hidden transition-colors duration-300`}>
      {/* Fixed Navigation */}
      <nav className={`fixed w-full z-50 top-0 backdrop-blur-2xl ${t.navBg} border-b ${t.borderNav} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <img 
                src={logoImage} 
                alt="Lyrai Logo" 
                className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300" 
              />
              <span className={`text-xl font-bold ${t.textPrimary}`}>
                Lyrai <span className="text-[#00D2FF] text-xs align-top">&#9889;</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex space-x-8 text-sm font-medium ${t.textSecondary}`}>
              <a href="#features" className="hover:text-[#00D2FF] transition-colors">
                T&#237;nh n&#259;ng
              </a>
              <a href="#how-it-works" className="hover:text-[#00D2FF] transition-colors">
                C&#225;ch ho&#7841;t &#273;&#7897;ng
              </a>
              <a href="#pricing" className="hover:text-[#00D2FF] transition-colors">
                B&#7843;ng gi&#225;
              </a>
            </div>

            {/* CTA + Theme Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border backdrop-blur-sm group ${t.toggleBg}`}
                aria-label={isDark ? 'Chuy&#7875;n sang ch&#7871; &#273;&#7897; s&#225;ng' : 'Chuy&#7875;n sang ch&#7871; &#273;&#7897; t&#7889;i'}
                title={isDark ? 'Ch&#7871; &#273;&#7897; s&#225;ng' : 'Ch&#7871; &#273;&#7897; t&#7889;i'}
              >
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 90, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {isDark ? (
                    <Moon className="w-[18px] h-[18px] text-[#00D2FF] group-hover:text-white transition-colors" />
                  ) : (
                    <Sun className="w-[18px] h-[18px] text-amber-500 group-hover:text-slate-900 transition-colors" />
                  )}
                </motion.div>
              </button>

              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,111,76,0.4)] hover:shadow-[0_0_30px_rgba(255,111,76,0.6)] hover:scale-105"
              >
                D&#249;ng ngay
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] -z-10 ${isDark ? 'bg-[radial-gradient(ellipse_at_top,rgba(0,210,255,0.15)_0%,rgba(124,58,237,0.05)_50%,transparent_100%)]' : 'bg-[radial-gradient(ellipse_at_top,rgba(0,210,255,0.08)_0%,rgba(124,58,237,0.03)_50%,transparent_100%)]'}`} />
        <div className={`absolute top-20 left-0 w-96 h-96 rounded-full blur-[120px] -z-10 animate-pulse ${isDark ? 'bg-[#00D2FF]/10' : 'bg-[#00D2FF]/5'}`} />
        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[120px] -z-10 animate-pulse ${isDark ? 'bg-[#7C3AED]/20' : 'bg-[#7C3AED]/8'}`} style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[#00D2FF] text-xs font-bold mb-6 ${isDark ? 'border-[#00D2FF]/50 bg-[#00D2FF]/10 shadow-[0_0_15px_rgba(0,210,255,0.3)]' : 'border-[#00D2FF]/30 bg-[#00D2FF]/8 shadow-sm'}`}
            >
              <Zap className="w-4 h-4" />
              Lightning Speed AI
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 ${t.textPrimary}`}
            >
              L&#432;u qu&#225;n t&#7915; Video v&#224; &#7842;nh.
              <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F4C] ${t.gradientVia} to-[#FF8C42]`}>
                Nhanh nh&#432; ch&#7899;p.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-lg ${t.textSecondary} mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed`}
            >
              T&#7843;i l&#234;n video review ho&#7863;c &#7843;nh ch&#7909;p, <span className="text-[#00D2FF] font-semibold">AI S&#7845;m S&#233;t</span> s&#7869; qu&#233;t v&#224; tr&#237;ch xu&#7845;t &#273;&#7883;a &#273;i&#7875;m ngay l&#7853;p t&#7913;c.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onGetStarted}
              className={`px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 group transform hover:-translate-y-1 hover:scale-105 mx-auto lg:mx-0 ${
                isDark 
                  ? 'bg-white text-[#7C3AED] hover:bg-slate-50 shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:shadow-[0_0_40px_rgba(0,210,255,0.8)]'
                  : 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#7C3AED]/40'
              }`}
            >
              B&#7855;t &#273;&#7847;u si&#234;u t&#7889;c
              <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isDark ? 'text-[#00D2FF]' : 'text-white'}`} />
            </motion.button>
          </div>

          {/* Right Column - Phone Mockup (always dark - device representation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md perspective-1000"
          >
            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-[#00D2FF] rounded-full blur-[80px] animate-pulse ${isDark ? 'opacity-40' : 'opacity-20'}`} />
            <div className={`absolute top-1/2 -left-12 w-48 h-48 bg-[#7C3AED] rounded-full blur-[80px] animate-pulse ${isDark ? 'opacity-40' : 'opacity-20'}`} style={{ animationDelay: '1.5s' }} />

            <div className={`relative rounded-[2.5rem] border-[4px] border-slate-800 bg-slate-900 overflow-hidden transition-shadow duration-700 group ring-4 ring-[#00D2FF]/20 ring-offset-4 ${isDark ? 'shadow-[0_0_50px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(0,210,255,0.5)] ring-offset-[#0B0E14]' : 'shadow-2xl hover:shadow-[0_0_40px_rgba(124,58,237,0.25)] ring-offset-white'}`}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-800 rounded-b-2xl z-20 border-b border-x border-slate-700" />

              <motion.div
                className="absolute w-full h-[4px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent z-10 shadow-[0_0_20px_#00D2FF,0_0_40px_#00D2FF] opacity-80"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div 
                className="relative h-[600px] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzB67HncrGTmFFhE4xpafneJBef3E_1krWE8DC4ZnJnC77-JvcLbtKvlNMQcO1C9WliztAEcAsggRpBiyX7E25AtEn131yhtHyDorqE9vnsiFymf7SLjmPTbx2jAqtb6-SS3hJA0RKjZpkclc0hE_oAQxM4qBu6TlCPOzBPZnWOgHxdkhMvr8lLahEsUfRNaTufFQ1Z7n7rTbmk4jiedm9JdrsIXKGS1VdScidE5NUWg3vfG3eXj9NScvLRCv9nhH45GwUXmBI_TU')" }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute w-full h-full bg-gradient-to-b from-[#00D2FF]/5 to-transparent pointer-events-none mix-blend-overlay" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-1/4 left-8 right-8 p-4 rounded-xl border border-[#00D2FF]/40 bg-slate-900/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,210,255,0.2)]"
                  style={{ animation: 'float 3s ease-in-out infinite' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#7C3AED] flex items-center justify-center animate-pulse shadow-[0_0_15px_#00D2FF]">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="h-2 w-24 bg-[#00D2FF]/50 rounded-full shadow-[0_0_10px_#00D2FF]" />
                    <div className="ml-auto flex gap-1">
                      <div className="h-1.5 w-1.5 bg-[#00D2FF] rounded-full animate-bounce shadow-[0_0_5px_#00D2FF]" />
                      <div className="h-1.5 w-1.5 bg-[#00D2FF] rounded-full animate-bounce shadow-[0_0_5px_#00D2FF]" style={{ animationDelay: '0.1s' }} />
                      <div className="h-1.5 w-1.5 bg-[#00D2FF] rounded-full animate-bounce shadow-[0_0_5px_#00D2FF]" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="absolute bottom-8 left-4 right-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white p-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-3 hover:scale-105 transition-all cursor-default border border-[#34d399]/50"
                >
                  <div className="bg-white/20 rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-90 text-white drop-shadow-md">Ho&#224;n t&#7845;t!</p>
                    <p className="text-xs font-bold text-white drop-shadow-md">&#272;&#227; l&#432;u Lyrai</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <svg className={`absolute top-10 left-0 w-full h-full ${isDark ? 'opacity-20' : 'opacity-10'}`} preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 50 L20 40 L30 60 L50 30 L60 70 L80 40 L100 50" fill="none" stroke="#7C3AED" strokeWidth="0.5" />
            <path d="M0 30 L15 20 L25 40 L45 10 L55 50 L75 20 L100 30" fill="none" stroke="#00D2FF" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold ${t.textPrimary} mb-4`}>
              Quy tr&#236;nh <span className="text-[#00D2FF]">S&#7845;m S&#233;t</span>
            </h2>
            <p className={`${t.textTertiary} text-lg`}>3 b&#432;&#7899;c &#273;&#417;n gi&#7843;n v&#7899;i t&#7889;c &#273;&#7897; &#225;nh s&#225;ng</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`group relative p-8 rounded-2xl ${t.cardBg} border ${t.borderDefault} hover:border-[#00D2FF]/50 transition-all cursor-default overflow-hidden ${t.cardShadow}`}
            >
              <div className={`absolute top-4 right-6 text-6xl font-bold ${t.numberColor} select-none group-hover:text-[#00D2FF]/20 transition-colors`}>01</div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all border ${isDark ? 'bg-[#00D2FF]/10 border-[#00D2FF]/20 shadow-[0_0_20px_rgba(0,210,255,0.2)]' : 'bg-[#00D2FF]/8 border-[#00D2FF]/15'}`}>
                  <Upload className="w-8 h-8 text-[#00D2FF]" />
                </div>
                <h3 className={`text-xl font-bold ${t.textPrimary} mb-3 group-hover:text-[#00D2FF] transition-colors`}>
                  T&#7843;i Video & &#7842;nh
                </h3>
                <p className={`text-sm ${t.textTertiary} leading-relaxed`}>
                  T&#7843;i l&#234;n video TikTok, &#7843;nh Instagram, ho&#7863;c screenshot t&#7915; b&#7845;t k&#7923; &#273;&#226;u.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`group relative p-8 rounded-2xl ${t.cardBg} border ${t.borderDefault} hover:border-[#7C3AED]/50 transition-all cursor-default overflow-hidden ${t.cardShadow}`}
            >
              <div className={`absolute top-4 right-6 text-6xl font-bold ${t.numberColor} select-none group-hover:text-[#7C3AED]/20 transition-colors`}>02</div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all border ${isDark ? 'bg-[#7C3AED]/10 border-[#7C3AED]/20 shadow-[0_0_20px_rgba(124,58,237,0.2)]' : 'bg-[#7C3AED]/8 border-[#7C3AED]/15'}`}>
                  <Sparkles className="w-8 h-8 text-[#7C3AED]" />
                </div>
                <h3 className={`text-xl font-bold ${t.textPrimary} mb-3 group-hover:text-[#7C3AED] transition-colors`}>
                  AI Ph&#226;n T&#237;ch
                </h3>
                <p className={`text-sm ${t.textTertiary} leading-relaxed`}>
                  AI t&#7921; &#273;&#7897;ng tr&#237;ch xu&#7845;t t&#234;n qu&#225;n, &#273;&#7883;a ch&#7881;, v&#224; th&#244;ng tin chi ti&#7871;t.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`group relative p-8 rounded-2xl ${t.cardBg} border ${t.borderDefault} hover:border-emerald-400/50 transition-all cursor-default overflow-hidden ${t.cardShadow}`}
            >
              <div className={`absolute top-4 right-6 text-6xl font-bold ${t.numberColor} select-none group-hover:text-emerald-400/20 transition-colors`}>03</div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all border ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-emerald-500/8 border-emerald-500/15'}`}>
                  <MapPin className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className={`text-xl font-bold ${t.textPrimary} mb-3 group-hover:text-emerald-400 transition-colors`}>
                  L&#234;n &#272;&#432;&#7901;ng
                </h3>
                <p className={`text-sm ${t.textTertiary} leading-relaxed`}>
                  M&#7903; b&#7843;n &#273;&#7891;, t&#236;m qu&#225;n &#273;&#227; l&#432;u, v&#224; th&#432;&#7903;ng th&#7913;c ngay.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fair Use Policy Section */}
      <section className={`py-24 relative ${t.sectionAltBg} overflow-hidden border-y ${t.borderSubtle} transition-colors duration-300`}>
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${isDark ? 'bg-[#7C3AED]/10' : 'bg-[#7C3AED]/5'}`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none ${isDark ? 'bg-[#00D2FF]/5' : 'bg-[#00D2FF]/3'}`} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-orange-400 text-xs font-bold mb-6 ${isDark ? 'border-orange-500/50 bg-orange-500/10' : 'border-orange-400/40 bg-orange-50'}`}>
              <Sparkles className="w-4 h-4" />
              Fair Use Policy
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-bold ${t.textPrimary} mb-6 leading-tight`}>
              Ch&#7881; tr&#7915; credit khi b&#7841;n
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-[#7C3AED]">
                th&#7921;c s&#7921; mu&#7889;n l&#432;u
              </span>
            </h2>
            
            <p className={`${t.textTertiary} mb-8 text-lg leading-relaxed`}>
              T&#236;m ki&#7871;m tho&#7843;i m&#225;i. AI c&#7911;a ch&#250;ng t&#244;i s&#7869; ph&#226;n t&#237;ch d&#7919; li&#7879;u tr&#432;&#7899;c, b&#7841;n ch&#7881; &#8220;tr&#7843; ti&#7873;n&#8221; khi quy&#7871;t &#273;&#7883;nh l&#432;u &#273;&#7883;a &#273;i&#7875;m &#273;&#243; v&#224;o b&#7843;n &#273;&#7891; c&#7911;a m&#236;nh. Kh&#244;ng l&#227;ng ph&#237; credit cho k&#7871;t qu&#7843; sai.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-green-500/20 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-green-50 border border-green-200'}`}>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className={`${t.textSubtle} font-medium`}>Xem tr&#432;&#7899;c k&#7871;t qu&#7843; mi&#7877;n ph&#237;</span>
              </li>
              <li className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-green-500/20 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-green-50 border border-green-200'}`}>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className={`${t.textSubtle} font-medium`}>Ho&#224;n l&#7841;i credit n&#7871;u &#273;&#7883;a ch&#7881; sai</span>
              </li>
            </ul>
          </div>

          {/* Credit Meter Card */}
          <div className="relative group">
            <div className={`absolute inset-0 rounded-3xl blur-2xl transition-all duration-500 group-hover:blur-3xl ${isDark ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20' : 'bg-gradient-to-r from-orange-500/10 to-pink-500/10'}`} />
            
            <div className={`relative ${t.cardBg} border ${t.borderDefault} rounded-3xl p-8 shadow-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300`}>
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <span className={`text-sm font-bold ${t.textTertiary} tracking-wider`}>CREDIT METER</span>
                  <span className={`text-2xl font-bold ${t.textPrimary} tracking-widest font-mono`}>10/10</span>
                </div>
                
                <div className={`relative h-6 rounded-full overflow-hidden shadow-inner border ${isDark ? 'bg-slate-800 border-white/5' : 'bg-slate-200 border-slate-300/50'}`}>
                  <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]">
                    <motion.div
                      className="absolute top-0 bottom-0 right-0 w-20 bg-white/50 blur-md"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>
                
                <div className={`mt-4 flex justify-between text-xs ${t.textMuted}`}>
                  <span>S&#7861;n s&#224;ng t&#236;m ki&#7871;m</span>
                  <span className="text-orange-400 font-bold">Safe Mode: ON</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className={`${t.innerBgSoft} rounded-xl p-4 border ${t.borderSubtle} flex items-center gap-4 transition-all ${t.innerBgHover} cursor-pointer hover:border-[#00D2FF]/30 group/item`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-[#7C3AED] border transition-all ${isDark ? 'bg-[#7C3AED]/20 border-[#7C3AED]/20' : 'bg-[#7C3AED]/10 border-[#7C3AED]/15'} group-hover/item:text-[#00D2FF] group-hover/item:border-[#00D2FF]/30`}>
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`${t.textPrimary} text-sm font-bold group-hover/item:text-[#00D2FF] transition-colors`}>T&#236;m ki&#7871;m &#8220;Qu&#225;n cafe view &#273;&#7865;p&#8221;</div>
                    <div className="text-green-400 text-xs mt-1 font-medium">Kh&#244;ng tr&#7915; credit</div>
                  </div>
                </div>

                <div className={`${t.innerBgSoft} rounded-xl p-4 border ${t.borderSubtle} flex items-center gap-4 border-l-4 border-l-[#7C3AED] transition-all ${t.innerBgHover} cursor-pointer hover:border-l-[#00D2FF] group/save`}>
                  <div className={`w-12 h-12 rounded-lg bg-[#7C3AED] flex items-center justify-center text-white transition-all ${isDark ? 'shadow-[0_0_15px_rgba(124,58,237,0.5)]' : 'shadow-md'} group-hover/save:bg-[#00D2FF]`}>
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`${t.textPrimary} text-sm font-bold`}>L&#432;u &#273;&#7883;a &#273;i&#7875;m</div>
                    <div className="text-orange-400 text-xs mt-1 font-bold">-1 Credit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Platform Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold ${t.textPrimary} mb-4`}>M&#7885;i l&#250;c, M&#7885;i n&#417;i</h2>
            <p className={`${t.textTertiary} max-w-2xl mx-auto text-lg`}>
              Tr&#7843;i nghi&#7879;m &#273;&#7891;ng nh&#7845;t tr&#234;n m&#225;y t&#237;nh v&#224; &#273;i&#7879;n tho&#7841;i. C&#244;ng ngh&#7879; PWA gi&#250;p &#7913;ng d&#7909;ng ch&#7841;y m&#432;&#7907;t m&#224; kh&#244;ng c&#7847;n t&#7843;i v&#7873; t&#7915; Store.
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Desktop Mockup (always dark - device) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative w-full max-w-2xl aspect-[16/10] bg-slate-800 rounded-t-xl border-[4px] border-slate-700 border-b-0 shadow-2xl flex flex-col group transition-shadow duration-500 ${isDark ? 'hover:shadow-[0_0_40px_rgba(0,210,255,0.2)]' : 'hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]'}`}
            >
              <div className="h-8 bg-slate-900 flex items-center gap-2 px-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>

              <div className="flex-1 bg-[#0B0F19] relative overflow-hidden">
                <div className="absolute left-0 top-0 w-16 h-full bg-slate-800/30 border-r border-white/5 flex flex-col items-center py-4 gap-4 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#00D2FF] shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                  <div className="w-8 h-8 rounded-lg bg-white/5" />
                  <div className="w-8 h-8 rounded-lg bg-white/5" />
                </div>

                <div className="absolute left-20 top-4 right-4 h-32 rounded-xl bg-gradient-to-r from-[#7C3AED]/10 to-[#00D2FF]/10 border border-white/5 p-4 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="w-1/3 h-4 bg-white/10 rounded mb-2" />
                  <div className="w-1/2 h-8 bg-white/10 rounded" />
                </div>

                <div className="absolute bottom-10 right-10 pointer-events-none transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Monitor className="w-12 h-12 text-[#00D2FF] drop-shadow-[0_0_15px_#00D2FF]" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-slate-800 rounded-b-xl shadow-xl z-[-1] opacity-50 blur-sm" />
            </motion.div>

            {/* Mobile Mockup (always dark) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`relative md:absolute md:-bottom-12 md:right-0 lg:right-20 w-[280px] h-[550px] bg-slate-900 rounded-[3rem] border-[6px] border-slate-700 z-20 transform hover:-translate-y-4 transition-transform duration-500 ${isDark ? 'shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(124,58,237,0.4)]' : 'shadow-2xl hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]'}`}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-30 border border-slate-700 border-t-0" />
              <div className="w-full h-full bg-[#0B0F19] rounded-[2.5rem] overflow-hidden relative">
                <div className="p-6 pt-12 space-y-4">
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#00D2FF] shadow-[0_0_25px_rgba(124,58,237,0.4)] flex items-center justify-center relative overflow-hidden">
                    <MapPin className="w-12 h-12 text-white animate-pulse drop-shadow-lg z-10" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-xl bg-white/5 p-3 flex gap-3 items-center border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-green-500/20" />
                      <div className="flex-1">
                        <div className="w-20 h-3 bg-white/20 rounded mb-2" />
                        <div className="w-32 h-2 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="w-full h-16 rounded-xl bg-white/5 p-3 flex gap-3 items-center border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20" />
                      <div className="flex-1">
                        <div className="w-24 h-3 bg-white/20 rounded mb-2" />
                        <div className="w-20 h-2 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-bounce z-20">
                  <Smartphone className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Search Section */}
      <section className={`py-24 relative overflow-hidden ${t.sectionAlt2Bg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Map mockup (always dark) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className={`bg-[#131B2E] rounded-2xl p-2 shadow-2xl border border-white/10 relative overflow-hidden group hover:border-[#00D2FF]/40 transition-colors duration-500`}>
              <div className="absolute top-6 left-6 right-6 z-20">
                <div className="bg-slate-900/80 backdrop-blur-md rounded-lg p-3 border border-white/10 flex items-center text-sm text-gray-400">
                  <Search className="w-5 h-5 mr-2 text-[#00D2FF]" />
                  T&#236;m qu&#225;n cafe g&#7847;n &#273;&#226;y...
                </div>
              </div>

              <div className="bg-[#1E293B] aspect-video rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00D2FF 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <motion.div className="absolute top-1/3 left-1/4" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <MapPin className="w-8 h-8 text-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.8)]" strokeWidth={2} fill="#7C3AED" />
                </motion.div>
                <motion.div className="absolute bottom-1/3 right-1/3" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                  <MapPin className="w-8 h-8 text-[#00D2FF] drop-shadow-[0_0_15px_rgba(0,210,255,0.8)]" strokeWidth={2} fill="#00D2FF" />
                </motion.div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-[#00D2FF] shadow-[0_0_20px_#00D2FF] z-10 animate-pulse" />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#00D2FF]/30 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#00D2FF] text-white py-3 rounded-lg text-sm font-bold shadow-lg flex items-center justify-center gap-2">
                  T&#236;m khu v&#7921;c n&#224;y
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className={`text-3xl md:text-5xl font-bold ${t.textPrimary} mb-6 leading-tight`}>
              T&#236;m ki&#7871;m Th&#244;ng minh
              <br />
              <span className={`text-[#00D2FF] ${isDark ? 'drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]' : ''}`}>& An to&#224;n</span>
            </h2>
            <p className={`${t.textTertiary} mb-8 text-lg leading-relaxed`}>
              T&#7921; do kh&#225;m ph&#225; &#273;&#7883;a &#273;i&#7875;m theo nhu c&#7847;u th&#7921;c t&#7871; ho&#7863;c k&#233;o b&#7843;n &#273;&#7891; &#273;&#7871;n b&#7845;t k&#7923; khu v&#7921;c n&#224;o. H&#7879; th&#7889;ng cam k&#7871;t t&#7921; &#273;&#7897;ng ho&#224;n ti&#7873;n n&#7871;u kh&#244;ng t&#236;m th&#7845;y k&#7871;t qu&#7843;.
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm cursor-default transition-colors ${isDark ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100'}`}>
              <CheckCircle className="w-5 h-5" />
              Auto-Refund Guaranteed
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Vibe Check Section */}
      <section id="features" className={`py-24 ${t.sectionAlt3Bg} relative border-t ${t.borderSubtle} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold ${t.textPrimary} mb-4`}>AI Vibe Check</h2>
            <p className={`${t.textTertiary} max-w-2xl mx-auto text-lg`}>
              AI ph&#226;n t&#237;ch h&#224;ng tr&#259;m review &#273;&#7875; &#273;&#432;a ra &#432;u v&#224; nh&#432;&#7907;c &#273;i&#7875;m r&#245; r&#224;ng, gi&#250;p b&#7841;n quy&#7871;t &#273;&#7883;nh nhanh ch&#243;ng.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Pros */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${t.cardBg} border ${t.borderDefault} rounded-2xl p-8 shadow-sm transition-all relative overflow-hidden group ${t.cardShadow} ${isDark ? 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'hover:border-emerald-400/50 hover:shadow-lg'}`}
            >
              <div className="absolute inset-0 bg-emerald-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-emerald-400 font-bold text-lg">
                  <span className="text-3xl">&#128077;</span>
                  Xanh (Pros)
                </div>
                <ul className="space-y-4">
                  {['View &#273;&#7865;p, kh&#244;ng gian tho&#225;ng', 'Gi&#225; c&#7843; h&#7907;p l&#253;', 'Ph&#7909;c v&#7909; nhanh ch&#243;ng', '&#272;&#7891; &#259;n ngon, ch&#7845;t l&#432;&#7907;ng'].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 ${isDark ? 'drop-shadow-[0_0_5px_#34D399]' : ''}`} />
                      <span className={`${t.textSecondary} text-sm`} dangerouslySetInnerHTML={{ __html: text }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Cons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`${t.cardBg} border ${t.borderDefault} rounded-2xl p-8 shadow-sm transition-all relative overflow-hidden group ${t.cardShadow} ${isDark ? 'hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'hover:border-red-400/50 hover:shadow-lg'}`}
            >
              <div className="absolute inset-0 bg-red-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-red-500 font-bold text-lg">
                  <span className="text-3xl">&#128078;</span>
                  &#272;&#7887; (Cons)
                </div>
                <ul className="space-y-4">
                  {['&#272;&#244;ng kh&#225;ch v&#224;o cu&#7889;i tu&#7847;n', 'Wifi y&#7871;u, kh&#244;ng &#7893;n &#273;&#7883;nh', 'Ch&#7895; &#273;&#7853;u xe h&#7841;n ch&#7871;', 'Ti&#7871;ng &#7891;n khi &#273;&#244;ng ng&#432;&#7901;i'].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className={`w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 ${isDark ? 'drop-shadow-[0_0_5px_#EF4444]' : ''}`} />
                      <span className={`${t.textSecondary} text-sm`} dangerouslySetInnerHTML={{ __html: text }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section (decorative gradient card - stays dark) */}
      <section id="pricing" className={`py-24 border-t ${t.borderSubtle} relative transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className={`relative rounded-3xl overflow-hidden p-12 text-center group ring-2 transition-all duration-500 ${isDark ? 'ring-[#00D2FF]/30 hover:ring-[#00D2FF]/70 shadow-[0_0_50px_rgba(124,58,237,0.2)]' : 'ring-[#7C3AED]/20 hover:ring-[#7C3AED]/50 shadow-xl'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#020617]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D2FF]/20 to-[#7C3AED]/20 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-1000 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
            
            <div className="relative z-10">
              <div className="inline-block p-4 rounded-full bg-white/10 mb-6 backdrop-blur-sm shadow-[0_0_25px_rgba(255,255,255,0.2)] border border-white/20">
                <Zap className="w-10 h-10 text-yellow-300 animate-pulse drop-shadow-[0_0_15px_#FDE047]" />
              </div>
              
              <h2 className="text-2xl font-bold text-white/90 mb-2 uppercase tracking-[0.2em] drop-shadow-lg">
                Mi&#7877;n ph&#237; m&#227;i m&#227;i
              </h2>
              
              <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00D2FF] my-6 font-display transform group-hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                3 CREDITS/NG&#192;Y
              </div>
              
              <p className="text-indigo-200 text-xl mb-10 font-medium tracking-wide">
                Kh&#244;ng gi&#7899;i h&#7841;n l&#432;u tr&#7919;. Reset m&#7895;i ng&#224;y v&#224;o 00:00.
              </p>
              
              <button
                onClick={onGetStarted}
                className="bg-white text-indigo-950 px-10 py-4 rounded-full font-bold hover:bg-[#00D2FF] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,210,255,0.6)] transform hover:-translate-y-1 hover:scale-105"
              >
                NH&#7852;N NGAY B&#194;Y GI&#7900;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (always dark) */}
      <footer className={`relative py-32 overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.3)_0%,rgba(11,14,20,1)_50%)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00D2FF]/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight drop-shadow-2xl">
            B&#7855;t &#273;&#7847;u b&#7843;n &#273;&#7891; c&#7911;a ri&#234;ng b&#7841;n
          </h2>
          
          <p className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#A855F7] mb-12 tracking-wider uppercase">
            Si&#234;u t&#7889;c - Ch&#237;nh x&#225;c - Mi&#7877;n ph&#237;
          </p>
          
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00D2FF] via-[#7C3AED] to-[#A855F7] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500" />
            <button
              onClick={onGetStarted}
              className="relative bg-white text-slate-900 hover:text-[#7C3AED] px-12 py-5 rounded-full font-extrabold text-xl transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3 border-2 border-transparent hover:border-[#00D2FF]"
            >
              <Zap className="w-6 h-6" />
              Install App
            </button>
          </div>
          
          <div className="mt-12 text-base text-slate-400 space-y-2 font-medium">
            <p className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ADE80] animate-pulse" />
              Th&#234;m v&#224;o m&#224;n h&#236;nh ch&#237;nh ch&#7881; v&#7899;i 2 click.
            </p>
            <p className="opacity-70 text-sm font-light">
              Lyrai ho&#7841;t &#273;&#7897;ng m&#432;&#7907;t m&#224; tr&#234;n tr&#236;nh duy&#7879;t m&#224; kh&#244;ng t&#7889;n dung l&#432;&#7907;ng m&#225;y.
            </p>
          </div>
          
          <div className="mt-20 border-t border-white/5 pt-8 flex justify-between items-center text-xs text-slate-600 px-4 max-w-2xl mx-auto">
            <span>&#169; 2024 Lyrai AI</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#00D2FF] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#00D2FF] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#00D2FF] transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
