import { StatCard } from '../components/StatCard';
import { LiquidityChart } from '../components/LiquidityChart';
import { TransactionQueue } from '../components/TransactionQueue';
import { ComplianceCard } from '../components/ComplianceCard';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/Button';
import { TrendingUp, Users, Shield, DollarSign, Download, FileText, FileSpreadsheet, Mail, ChevronDown, Coins, CreditCard, Repeat } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
            Cooperative Summary
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Operational overview for{' '}
            <span className="font-medium text-blue-600">FICCO</span>
          </p>
        </div>
        <div className="flex flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Dropdown
              align="right"
              trigger={
                <Button
                  variant="tertiary"
                  size="lg"
                  icon={Download}
                  iconRight={ChevronDown}
                >
                  Download Report
                </Button>
              }
              sections={[
                {
                  title: "Export Format",
                  items: [
                    {
                      icon: FileText,
                      title: "PDF Report",
                      description: "Formatted executive summary",
                      shortcut: "⌘P",
                      onClick: () => console.log('Export PDF')
                    },
                    {
                      icon: FileSpreadsheet,
                      title: "Excel Spreadsheet",
                      description: "Detailed data export",
                      shortcut: "⌘E",
                      onClick: () => console.log('Export Excel')
                    },
                    {
                      icon: Mail,
                      title: "Email Report",
                      description: "Send to stakeholders",
                      onClick: () => console.log('Email report')
                    }
                  ]
                }
              ]}
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Dropdown
              align="right"
              trigger={
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={ChevronDown}
                >
                  New Disbursement
                </Button>
              }
              sections={[
                {
                  title: "Disbursement Type",
                  items: [
                    {
                      icon: Coins,
                      title: "Dividend Payout",
                      description: "Distribute to members",
                      onClick: () => console.log('Dividend payout')
                    },
                    {
                      icon: CreditCard,
                      title: "Loan Disbursement",
                      description: "Member loan approval",
                      onClick: () => console.log('Loan disbursement')
                    },
                    {
                      icon: Repeat,
                      title: "Capital Return",
                      description: "Return contribution",
                      onClick: () => console.log('Capital return')
                    }
                  ]
                }
              ]}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 lg:mb-12">
        <StatCard
          icon={TrendingUp}
          label="Total Liquidity"
          value="₱685.2M"
          change="+4.2%"
          changeType="positive"
          subtitle="Available funds"
          trend={[60, 65, 55, 70, 75, 85, 100]}
          lastUpdated="2 min ago"
          iconColor="emerald"
          delay={0.1}
        />
        <StatCard
          icon={Users}
          label="Active Members"
          value="8,422"
          change="+2.1%"
          changeType="positive"
          subtitle="Verified accounts"
          trend={[50, 55, 60, 58, 65, 70, 72]}
          lastUpdated="5 min ago"
          iconColor="blue"
          delay={0.2}
        />
        <StatCard
          icon={Shield}
          label="KYC Approvals"
          value="47"
          change="+12"
          changeType="neutral"
          subtitle="Pending review"
          trend={[30, 40, 35, 45, 50, 60, 100]}
          lastUpdated="1 min ago"
          iconColor="amber"
          delay={0.3}
        />
        <StatCard
          icon={DollarSign}
          label="Monthly Volume"
          value="₱105.3M"
          change="+8.3%"
          changeType="positive"
          subtitle="Transaction total"
          trend={[45, 50, 48, 55, 60, 65, 68]}
          lastUpdated="10 min ago"
          iconColor="purple"
          delay={0.4}
        />
      </div>

      {/* Chart and Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 mb-8 lg:mb-12">
        <div className="lg:col-span-2">
          <LiquidityChart />
        </div>
        <div className="lg:col-span-1">
          <TransactionQueue />
        </div>
      </div>

      {/* Compliance Section */}
      <ComplianceCard />
    </div>
  );
}
