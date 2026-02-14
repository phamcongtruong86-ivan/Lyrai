import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeProvider';

interface Transaction {
  id: string;
  type: 'spend' | 'earn' | 'purchase';
  amount: number;
  description: string;
  timestamp: Date;
}

interface MiniWalletSheetProps {
  isOpen: boolean;
  onClose: () => void;
  credits: number;
  freeCredits?: number;
  paidCredits?: number;
  onTopUp: () => void;
}

export function MiniWalletSheet({ 
  isOpen, 
  onClose, 
  credits,
  freeCredits = 0,
  paidCredits = 0,
  onTopUp 
}: MiniWalletSheetProps) {
  const { isDark } = useTheme();

  // Mock transactions
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'spend',
      amount: -1,
      description: 'Soi ảnh quán cafe',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'earn',
      amount: 3,
      description: 'Phần thưởng đăng nhập hàng ngày',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'purchase',
      amount: 10,
      description: 'Mua gói 10 credits',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    return 'Vừa xong';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed bottom-0 left-0 right-0 z-[101] rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden ${
              isDark ? 'bg-slate-900' : 'bg-white'
            }`}
          >
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
            </div>

            {/* Content */}
            <div className="px-6 pb-8 overflow-y-auto max-h-[calc(80vh-2rem)]">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Ví của bạn</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Quản lý credits và lịch sử</p>
              </div>

              {/* Balance Card */}
              <div className={`p-6 mb-6 rounded-[2rem] backdrop-blur-xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'
              }`}>
                {/* Total Balance */}
                <div className="text-center mb-4">
                  <div className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Số dư hiện tại</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-amber-400 text-4xl">⚡</span>
                    <span className={`text-5xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{credits}</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className={`grid grid-cols-2 gap-3 pt-4 border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'}`}>
                  {/* Free Credits */}
                  <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
                    <div className="text-emerald-400 text-xs mb-1">Miễn phí</div>
                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{freeCredits}</div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Hết hạn 24h</div>
                  </div>

                  {/* Paid Credits */}
                  <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
                    <div className="text-primary text-xs mb-1">Đã mua</div>
                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{paidCredits}</div>
                    <div className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Không hết hạn</div>
                  </div>
                </div>
              </div>

              {/* Top Up Button */}
              <button
                onClick={onTopUp}
                className="w-full bg-gradient-to-r from-primary to-[#FF8C42] text-white font-bold py-4 rounded-2xl mb-6 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-xl">+</span>
                  <span>Nạp thêm credits</span>
                </span>
              </button>

              {/* Recent Transactions */}
              <div>
                <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Giao dịch gần đây</h3>
                <div className="space-y-2">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className={`p-4 flex items-center justify-between rounded-[2rem] backdrop-blur-xl border ${
                        isDark ? 'bg-slate-900/40 border-slate-800/50' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      {/* Left: Icon + Info */}
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${tx.type === 'spend' ? 'bg-red-500/20' : 'bg-emerald-500/20'}
                          `}
                        >
                          <span className="material-symbols-outlined text-xl">
                            {tx.type === 'spend' ? 'remove' : 'add'}
                          </span>
                        </div>

                        {/* Description */}
                        <div>
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{tx.description}</div>
                          <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{formatTime(tx.timestamp)}</div>
                        </div>
                      </div>

                      {/* Right: Amount */}
                      <div
                        className={`
                          text-lg font-bold font-mono
                          ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}
                        `}
                      >
                        {tx.amount > 0 ? '+' : ''}{tx.amount}⚡
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
