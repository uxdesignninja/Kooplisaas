import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

export function FloatingActionButton() {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.4, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full shadow-2xl shadow-blue-500/40 flex items-center justify-center text-white hover:shadow-3xl hover:shadow-blue-500/50 transition-all z-50 focus:outline-none focus:ring-4 focus:ring-blue-500/40"
    >
      <Plus className="w-6 h-6" strokeWidth={2.5} />
    </motion.button>
  );
}
