import { motion } from 'motion/react';
import { ChevronRight, Upload, Sparkles, MapPin, CheckCircle, X, Zap, Monitor, Smartphone, Search } from 'lucide-react';
import logoImage from 'figma:asset/d10dac4378c8030eb921c82fde9252a169ca91a1.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white overflow-x-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed w-full z-50 top-0 backdrop-blur-2xl bg-[#0B0E14]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <img 
                src={logoImage} 
                alt="Lyrai Logo" 
                className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300" 
              />
              <span className="text-xl font-bold text-white">
                Lyrai <span className="text-[#00D2FF] text-xs align-top">⚡</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-[#00D2FF] transition-colors">
                Tính năng
              </a>
              <a href="#how-it-works" className="hover:text-[#00D2FF] transition-colors">
                Cách hoạt động
              </a>
              <a href="#pricing" className="hover:text-[#00D2FF] transition-colors">
                Bảng giá
              </a>
            </div>

            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,111,76,0.4)] hover:shadow-[0_0_30px_rgba(255,111,76,0.6)] hover:scale-105"
            >
              Dùng ngay
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(0,210,255,0.15)_0%,rgba(124,58,237,0.05)_50%,transparent_100%)] -z-10" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D2FF]/50 bg-[#00D2FF]/10 text-[#00D2FF] text-xs font-bold mb-6 shadow-[0_0_15px_rgba(0,210,255,0.3)]"
            >
              <Zap className="w-4 h-4" />
              Lightning Speed AI
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
            >
              Lưu quán từ Video và Ảnh.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F4C] via-white to-[#FF8C42]">
                Nhanh như chớp.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Tải lên video review hoặc ảnh chụp, <span className="text-[#00D2FF] font-semibold">AI Sấm Sét</span> sẽ quét và trích xuất địa điểm ngay lập tức.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onGetStarted}
              className="bg-white text-[#7C3AED] hover:bg-slate-50 px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:shadow-[0_0_40px_rgba(0,210,255,0.8)] flex items-center justify-center gap-2 group transform hover:-translate-y-1 hover:scale-105 mx-auto lg:mx-0"
            >
              Bắt đầu siêu tốc
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#00D2FF]" />
            </motion.button>
          </div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md perspective-1000"
          >
            {/* Glow Effects */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00D2FF] rounded-full blur-[80px] opacity-40 animate-pulse" />
            <div className="absolute top-1/2 -left-12 w-48 h-48 bg-[#7C3AED] rounded-full blur-[80px] opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }} />

            {/* Phone Mockup */}
            <div className="relative rounded-[2.5rem] border-[4px] border-slate-800 bg-slate-900 overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(0,210,255,0.5)] transition-shadow duration-700 group ring-4 ring-[#00D2FF]/20 ring-offset-4 ring-offset-slate-900">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-800 rounded-b-2xl z-20 border-b border-x border-slate-700" />

              {/* Scan Line Effect */}
              <motion.div
                className="absolute w-full h-[4px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent z-10 shadow-[0_0_20px_#00D2FF,0_0_40px_#00D2FF] opacity-80"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Screen Content with Background Image */}
              <div 
                className="relative h-[600px] w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzB67HncrGTmFFhE4xpafneJBef3E_1krWE8DC4ZnJnC77-JvcLbtKvlNMQcO1C9WliztAEcAsggRpBiyX7E25AtEn131yhtHyDorqE9vnsiFymf7SLjmPTbx2jAqtb6-SS3hJA0RKjZpkclc0hE_oAQxM4qBu6TlCPOzBPZnWOgHxdkhMvr8lLahEsUfRNaTufFQ1Z7n7rTbmk4jiedm9JdrsIXKGS1VdScidE5NUWg3vfG3eXj9NScvLRCv9nhH45GwUXmBI_TU')" }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Overlay Gradient */}
                <div className="absolute w-full h-full bg-gradient-to-b from-[#00D2FF]/5 to-transparent pointer-events-none mix-blend-overlay" />

                {/* Top Floating Card - AI Processing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-1/4 left-8 right-8 p-4 rounded-xl border border-[#00D2FF]/40 bg-slate-900/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,210,255,0.2)]"
                  style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}
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

                {/* Bottom Success Card */}
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
                    <p className="text-xs font-bold uppercase tracking-wider opacity-90 text-white drop-shadow-md">Hoàn tất!</p>
                    <p className="text-xs font-bold text-white drop-shadow-md">Đã lưu Lyrai</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-10 left-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 50 L20 40 L30 60 L50 30 L60 70 L80 40 L100 50" fill="none" stroke="#7C3AED" strokeWidth="0.5" />
            <path d="M0 30 L15 20 L25 40 L45 10 L55 50 L75 20 L100 30" fill="none" stroke="#00D2FF" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Quy trình <span className="text-[#00D2FF]">Sấm Sét</span>
            </h2>
            <p className="text-slate-400 text-lg">3 bước đơn giản với tốc độ ánh sáng</p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-[#131B2E] border border-white/10 hover:border-[#00D2FF]/50 transition-all cursor-default overflow-hidden"
            >
              <div className="absolute top-4 right-6 text-6xl font-bold text-white/5 select-none group-hover:text-[#00D2FF]/20 transition-colors">01</div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#00D2FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,210,255,0.2)] border border-[#00D2FF]/20">
                  <Upload className="w-8 h-8 text-[#00D2FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D2FF] transition-colors">
                  Tải Video & Ảnh
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Tải lên video TikTok, ảnh Instagram, hoặc screenshot từ bất kỳ đâu.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative p-8 rounded-2xl bg-[#131B2E] border border-white/10 hover:border-[#7C3AED]/50 transition-all cursor-default overflow-hidden"
            >
              <div className="absolute top-4 right-6 text-6xl font-bold text-white/5 select-none group-hover:text-[#7C3AED]/20 transition-colors">02</div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(124,58,237,0.2)] border border-[#7C3AED]/20">
                  <Sparkles className="w-8 h-8 text-[#7C3AED]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#7C3AED] transition-colors">
                  AI Phân Tích
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  AI tự động trích xuất tên quán, địa chỉ, và thông tin chi tiết.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative p-8 rounded-2xl bg-[#131B2E] border border-white/10 hover:border-emerald-400/50 transition-all cursor-default overflow-hidden"
            >
              <div className="absolute top-4 right-6 text-6xl font-bold text-white/5 select-none group-hover:text-emerald-400/20 transition-colors">03</div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] border border-emerald-500/20">
                  <MapPin className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  Lên Đường
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Mở bản đồ, tìm quán đã lưu, và thưởng thức ngay.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fair Use Policy Section */}
      <section className="py-24 relative bg-[#020617] overflow-hidden border-y border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00D2FF]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left - Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-400 text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              Fair Use Policy
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Chỉ trừ credit khi bạn
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-[#7C3AED]">
                thực sự muốn lưu
              </span>
            </h2>
            
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              Tìm kiếm thoải mái. AI của chúng tôi sẽ phân tích dữ liệu trước, bạn chỉ "trả tiền" khi quyết định lưu địa điểm đó vào bản đồ của mình. Không lãng phí credit cho kết quả sai.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-slate-200 font-medium">Xem trước kết quả miễn phí</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-slate-200 font-medium">Hoàn lại credit nếu địa chỉ sai</span>
              </li>
            </ul>
          </div>

          {/* Right - Credit Meter */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-3xl blur-2xl transition-all duration-500 group-hover:blur-3xl" />
            
            <div className="relative bg-[#131B2E] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden backdrop-blur-sm">
              {/* Credit Display */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold text-slate-400 tracking-wider">CREDIT METER</span>
                  <span className="text-2xl font-bold text-white tracking-widest font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">10/10</span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-white/5">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 5px, transparent 5px, transparent 10px)' }} />
                  <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]">
                    <motion.div
                      className="absolute top-0 bottom-0 right-0 w-20 bg-white/50 blur-md"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between text-xs text-slate-500">
                  <span>Sẵn sàng tìm kiếm</span>
                  <span className="text-orange-400 font-bold drop-shadow-sm">Safe Mode: ON</span>
                </div>
              </div>

              {/* Action Items */}
              <div className="space-y-3">
                {/* Search Action (Free) */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex items-center gap-4 transition-all hover:bg-slate-800/80 cursor-pointer hover:border-[#00D2FF]/30 group/item">
                  <div className="w-12 h-12 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] border border-[#7C3AED]/20 group-hover/item:shadow-[0_0_15px_rgba(124,58,237,0.3)] group-hover/item:text-[#00D2FF] group-hover/item:border-[#00D2FF]/30 transition-all">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold group-hover/item:text-[#00D2FF] transition-colors">Tìm kiếm "Quán cafe view đẹp"</div>
                    <div className="text-green-400 text-xs mt-1 font-medium drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">Không trừ credit</div>
                  </div>
                </div>

                {/* Save Action (Costs credit) */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex items-center gap-4 border-l-4 border-l-[#7C3AED] transition-all hover:bg-slate-800/80 cursor-pointer hover:border-l-[#00D2FF] hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] group/save">
                  <div className="w-12 h-12 rounded-lg bg-[#7C3AED] flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover/save:bg-[#00D2FF] group-hover/save:shadow-[0_0_20px_#00D2FF] transition-all">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">Lưu địa điểm</div>
                    <div className="text-orange-400 text-xs mt-1 font-bold">-1 Credit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Platform Section - "Mọi lúc, Mọi nơi" */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Mọi lúc, Mọi nơi</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Trải nghiệm đồng nhất trên máy tính và điện thoại. Công nghệ PWA giúp ứng dụng chạy mượt mà không cần tải về từ Store.
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Desktop Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full max-w-2xl aspect-[16/10] bg-slate-800 rounded-t-xl border-[4px] border-slate-700 border-b-0 shadow-2xl flex flex-col group hover:shadow-[0_0_40px_rgba(0,210,255,0.2)] transition-shadow duration-500"
            >
              {/* Browser Header */}
              <div className="h-8 bg-slate-900 flex items-center gap-2 px-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>

              {/* Desktop Content */}
              <div className="flex-1 bg-[#0B0F19] relative overflow-hidden">
                {/* Sidebar */}
                <div className="absolute left-0 top-0 w-16 h-full bg-slate-800/30 border-r border-white/5 flex flex-col items-center py-4 gap-4 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#00D2FF] shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                  <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                  <div className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                </div>

                {/* Main Content Area */}
                <div className="absolute left-20 top-4 right-4 h-32 rounded-xl bg-gradient-to-r from-[#7C3AED]/10 to-[#00D2FF]/10 border border-white/5 p-4 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="w-1/3 h-4 bg-white/10 rounded mb-2" />
                  <div className="w-1/2 h-8 bg-white/10 rounded" />
                </div>

                {/* Hover Icon */}
                <div className="absolute bottom-10 right-10 pointer-events-none transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Monitor className="w-12 h-12 text-[#00D2FF] drop-shadow-[0_0_15px_#00D2FF]" />
                </div>
              </div>

              {/* Desktop Stand */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-slate-800 rounded-b-xl shadow-xl z-[-1] opacity-50 blur-sm" />
            </motion.div>

            {/* Mobile Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative md:absolute md:-bottom-12 md:right-0 lg:right-20 w-[280px] h-[550px] bg-slate-900 rounded-[3rem] border-[6px] border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 transform hover:-translate-y-4 transition-transform duration-500 hover:shadow-[0_0_50px_rgba(124,58,237,0.4)]"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-30 border border-slate-700 border-t-0" />

              {/* Mobile Content */}
              <div className="w-full h-full bg-[#0B0F19] rounded-[2.5rem] overflow-hidden relative">
                <div className="p-6 pt-12 space-y-4">
                  {/* Map Preview */}
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#00D2FF] shadow-[0_0_25px_rgba(124,58,237,0.4)] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E')" }} />
                    <MapPin className="w-12 h-12 text-white animate-pulse drop-shadow-lg z-10" />
                  </div>

                  {/* Place Cards */}
                  <div className="space-y-2">
                    <div className="w-full h-16 rounded-xl bg-white/5 p-3 flex gap-3 items-center border border-white/5 hover:border-[#00D2FF]/30 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                      <div className="flex-1">
                        <div className="w-20 h-3 bg-white/20 rounded mb-2" />
                        <div className="w-32 h-2 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="w-full h-16 rounded-xl bg-white/5 p-3 flex gap-3 items-center border border-white/5 hover:border-[#00D2FF]/30 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                      <div className="flex-1">
                        <div className="w-24 h-3 bg-white/20 rounded mb-2" />
                        <div className="w-20 h-2 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-bounce z-20">
                  <Smartphone className="w-6 h-6 text-[#7C3AED]" />
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Search Section */}
      <section className="py-24 relative overflow-hidden bg-[#050914]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Map Interface */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="bg-[#131B2E] rounded-2xl p-2 shadow-2xl border border-white/10 relative overflow-hidden group hover:border-[#00D2FF]/40 transition-colors duration-500 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]">
              {/* Search Bar */}
              <div className="absolute top-6 left-6 right-6 z-20">
                <div className="bg-slate-900/80 backdrop-blur-md rounded-lg p-3 border border-white/10 flex items-center text-sm text-gray-400 group-hover:bg-slate-900/90 group-hover:border-[#00D2FF]/30 transition-all">
                  <Search className="w-5 h-5 mr-2 text-[#00D2FF]" />
                  Tìm quán cafe gần đây...
                </div>
              </div>

              {/* Map Preview */}
              <div className="bg-[#1E293B] aspect-video rounded-xl relative overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00D2FF 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                {/* Location Pins */}
                <motion.div
                  className="absolute top-1/3 left-1/4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-8 h-8 text-[#7C3AED] drop-shadow-[0_0_15px_rgba(124,58,237,0.8)]" strokeWidth={2} fill="#7C3AED" />
                </motion.div>
                <motion.div
                  className="absolute bottom-1/3 right-1/3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <MapPin className="w-8 h-8 text-[#00D2FF] drop-shadow-[0_0_15px_rgba(0,210,255,0.8)]" strokeWidth={2} fill="#00D2FF" />
                </motion.div>

                {/* Center Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-[#00D2FF] shadow-[0_0_20px_#00D2FF] z-10 animate-pulse" />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#00D2FF]/30 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Action Button */}
              <div className="absolute bottom-6 left-6 right-6">
                <button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#00D2FF] text-white py-3 rounded-lg text-sm font-bold shadow-lg flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all">
                  Tìm khu vực này
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Tìm kiếm Thông minh
              <br />
              <span className="text-[#00D2FF] drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">& An toàn</span>
            </h2>
            
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              Tự do khám phá địa điểm theo nhu cầu thực tế hoặc kéo bản đồ đến bất kỳ khu vực nào. Hệ thống cam kết tự động hoàn tiền nếu không tìm thấy kết quả.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm hover:bg-emerald-500/20 transition-colors cursor-default shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <CheckCircle className="w-5 h-5" />
              Auto-Refund Guaranteed
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Vibe Check Section */}
      <section id="features" className="py-24 bg-[#0B0F19] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">AI Vibe Check</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              AI phân tích hàng trăm review để đưa ra ưu và nhược điểm rõ ràng, giúp bạn quyết định nhanh chóng.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Pros (Green) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#131B2E] border border-white/10 rounded-2xl p-8 shadow-sm hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] relative overflow-hidden group"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-emerald-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-emerald-400 font-bold text-lg drop-shadow-sm">
                  <span className="text-3xl">👍</span>
                  Xanh (Pros)
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_#34D399]" />
                    <span className="text-slate-300 text-sm">View đẹp, không gian thoáng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_#34D399]" />
                    <span className="text-slate-300 text-sm">Giá cả hợp lý</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_#34D399]" />
                    <span className="text-slate-300 text-sm">Phục vụ nhanh chóng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_#34D399]" />
                    <span className="text-slate-300 text-sm">Đồ ăn ngon, chất lượng</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Cons (Red) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#131B2E] border border-white/10 rounded-2xl p-8 shadow-sm hover:border-red-500/50 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] relative overflow-hidden group"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-red-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-red-500 font-bold text-lg drop-shadow-sm">
                  <span className="text-3xl">👎</span>
                  Đỏ (Cons)
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_#EF4444]" />
                    <span className="text-slate-300 text-sm">Đông khách vào cuối tuần</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_#EF4444]" />
                    <span className="text-slate-300 text-sm">Wifi yếu, không ổn định</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_#EF4444]" />
                    <span className="text-slate-300 text-sm">Chỗ đậu xe hạn chế</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 drop-shadow-[0_0_5px_#EF4444]" />
                    <span className="text-slate-300 text-sm">Tiếng ồn khi đông người</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-white/5 relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden p-12 text-center group ring-2 ring-[#00D2FF]/30 hover:ring-[#00D2FF]/70 transition-all duration-500 shadow-[0_0_50px_rgba(124,58,237,0.2)]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#020617]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D2FF]/20 to-[#7C3AED]/20 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-1000 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
            
            <div className="relative z-10">
              <div className="inline-block p-4 rounded-full bg-white/10 mb-6 backdrop-blur-sm shadow-[0_0_25px_rgba(255,255,255,0.2)] border border-white/20">
                <Zap className="w-10 h-10 text-yellow-300 animate-pulse drop-shadow-[0_0_15px_#FDE047]" />
              </div>
              
              <h2 className="text-2xl font-bold text-white/90 mb-2 uppercase tracking-[0.2em] drop-shadow-lg">
                Miễn phí mãi mãi
              </h2>
              
              <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00D2FF] my-6 drop-shadow-[0_0_35px_rgba(0,210,255,0.6)] font-display transform group-hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                3 CREDITS/NGÀY
              </div>
              
              <p className="text-indigo-200 text-xl mb-10 font-medium tracking-wide">
                Không giới hạn lưu trữ. Reset mỗi ngày vào 00:00.
              </p>
              
              <button
                onClick={onGetStarted}
                className="bg-white text-indigo-950 px-10 py-4 rounded-full font-bold hover:bg-[#00D2FF] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,210,255,0.6)] transform hover:-translate-y-1 hover:scale-105"
              >
                NHẬN NGAY BÂY GIỜ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-32 overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.3)_0%,rgba(11,14,20,1)_50%)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00D2FF]/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight drop-shadow-2xl">
            Bắt đầu bản đồ của riêng bạn
          </h2>
          
          <p className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#A855F7] mb-12 tracking-wider uppercase drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]">
            Siêu tốc - Chính xác - Miễn phí
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
              Thêm vào màn hình chính chỉ với 2 click.
            </p>
            <p className="opacity-70 text-sm font-light">
              Lyrai hoạt động mượt mà trên trình duyệt mà không tốn dung lượng máy.
            </p>
          </div>
          
          <div className="mt-20 border-t border-white/5 pt-8 flex justify-between items-center text-xs text-slate-600 px-4 max-w-2xl mx-auto">
            <span>© 2024 Lyrai AI</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#00D2FF] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#00D2FF] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#00D2FF] transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Inline CSS for float animation */}
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