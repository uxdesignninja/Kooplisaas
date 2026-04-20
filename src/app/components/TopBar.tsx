import { Search, Bell, User, LogOut, HelpCircle, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { Dropdown } from './Dropdown';

export function TopBar() {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 z-20 shadow-sm"
    >
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent tracking-tight"
          >
            FICCO
          </motion.h1>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="relative hidden md:block flex-1 max-w-md"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search accounts..."
              className="w-full pl-11 pr-4 py-2 bg-slate-50/80 rounded-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all border border-slate-200/50 focus:border-blue-300"
            />
          </motion.div>

          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3, type: "spring" }}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all relative"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </motion.button>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
          >
            <Dropdown
              align="right"
              trigger={
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm shadow-lg shadow-blue-500/25 ring-2 ring-white hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                  JD
                </button>
              }
              sections={[
                {
                  items: [
                    {
                      icon: User,
                      title: "Profile Settings",
                      description: "Manage your account",
                      shortcut: "⌘P",
                      onClick: () => console.log('Profile settings')
                    },
                    {
                      icon: Palette,
                      title: "Appearance",
                      description: "Customize interface",
                      onClick: () => console.log('Appearance')
                    },
                    {
                      icon: HelpCircle,
                      title: "Help & Support",
                      description: "Get assistance",
                      shortcut: "⌘H",
                      onClick: () => console.log('Help')
                    }
                  ]
                },
                {
                  items: [
                    {
                      icon: LogOut,
                      title: "Sign Out",
                      description: "Log out of FICCO",
                      shortcut: "⌘Q",
                      danger: true,
                      onClick: () => console.log('Sign out')
                    }
                  ]
                }
              ]}
            />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
