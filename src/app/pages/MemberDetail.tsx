import { motion } from 'motion/react';
import { ArrowLeft, Edit2, TrendingUp, Download, FileText, CheckCircle, AlertTriangle, Building2, MapPin, DollarSign, Calendar, Shield, Vote, FileCheck } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/Button';

// Mock member data - in real app, this would come from API
const getMemberData = (id: string) => {
  const members: Record<string, any> = {
    '1': {
      name: 'Maria Santos Reyes',
      title: 'Owner • Emerald Rice Milling',
      avatar: 'MS',
      classification: 'VERIFIED MEMBER',
      votingPower: '4.2%',
      memberId: '#FICCO-0261',
      totalValue: '₱6,012,750.00',
      ytdChange: '+48.2% YTD from prior year',
      stakedEquity: 40,
      liquidAssets: 38,
      kycStatus: 'VERIFIED',
      onboardingDate: 'Jan 12, 2019',
      riskScore: 'Low (50/100)',
      taxResidency: 'Mandaluyong, Manila',
      sourceOfWealth: 'Food Manufacturing',
      hasAlert: true,
      alertType: 'ANTI-DILUTION ALERT',
      alertMessage: 'Flagging potential breach: Ongoing Proposal #82 may reduce this member\'s equity stake below their contractual floor.',
      subWallets: [
        { type: 'PRINCIPAL INVESTED', amount: '₱500,000.00', subtitle: 'Primary Liquidity Reserve', progress: 75, icon: DollarSign, color: 'blue' },
        { type: 'LOAN POOL', amount: '₱10,000.00', subtitle: 'Locked until Q3 2024', progress: 20, icon: Building2, color: 'red' },
        { type: 'DIVIDEND UNALLOCATED', amount: '₱154,850.00', subtitle: 'Yield distribution awaits', progress: 50, icon: TrendingUp, color: 'emerald' },
        { type: 'Deposit New Sub-Wallet', amount: '', subtitle: '', progress: 0, icon: null, color: 'add' },
      ],
      governanceActivity: [
        { type: 'voted', title: 'Voted on "Loan Approval: Infrastructure Fund"', subtitle: 'Vote cast in favor of Fund 12 allocation', date: 'Jun 04, 2024', icon: Vote },
        { type: 'coauthored', title: 'Co-authored "Security Protocol 8"', subtitle: 'Proposed a series of refinements to lending protocol v8', date: 'Oct 12, 2023', icon: FileCheck },
        { type: 'abstained', title: 'Abstain on Prop-239', subtitle: 'Electing to wait for Secondary due-diligence report', date: 'Oct 08, 2023', icon: AlertTriangle },
      ]
    },
    '2': {
      name: 'Juan Dela Cruz',
      title: 'Founder • TechStart Ventures',
      avatar: 'JD',
      classification: 'VERIFIED MEMBER',
      votingPower: '2.8%',
      memberId: '#FICCO-1484',
      totalValue: '₱580,000.00',
      ytdChange: '+12.5% YTD from prior year',
      stakedEquity: 25,
      liquidAssets: 15,
      kycStatus: 'PENDING',
      onboardingDate: 'Mar 22, 2023',
      riskScore: 'Medium (65/100)',
      taxResidency: 'Quezon City, Manila',
      sourceOfWealth: 'Technology Services',
      hasAlert: false,
      subWallets: [
        { type: 'PRINCIPAL INVESTED', amount: '₱300,000.00', subtitle: 'Primary Liquidity Reserve', progress: 60, icon: DollarSign, color: 'blue' },
        { type: 'DIVIDEND UNALLOCATED', amount: '₱80,000.00', subtitle: 'Yield distribution awaits', progress: 30, icon: TrendingUp, color: 'emerald' },
      ],
      governanceActivity: [
        { type: 'voted', title: 'Voted on "Capital Injection Proposal"', subtitle: 'Vote cast in favor of expansion', date: 'Apr 15, 2024', icon: Vote },
      ]
    }
  };

  return members[id] || members['1'];
};

export function MemberDetail() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const member = getMemberData(memberId || '1');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getWalletColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      red: 'bg-red-500',
      emerald: 'bg-emerald-500',
      amber: 'bg-amber-500',
      purple: 'bg-purple-500',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
      {/* Back Button */}
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate('/members')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 lg:mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Members</span>
      </motion.button>

      {/* Header Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6 mb-4 sm:mb-6"
      >
        {/* Left - Profile Info */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0 self-center sm:self-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-semibold shadow-lg">
                {member.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                <Edit2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1.5 leading-tight">{member.name}</h1>
              <p className="text-sm text-slate-600 mb-3 sm:mb-4">{member.title}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full text-[10px] font-semibold uppercase tracking-wide">
                  {member.classification}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-semibold uppercase tracking-wide">
                  Voting Power: {member.votingPower}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-semibold uppercase tracking-wide">
                  ID: {member.memberId}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button variant="primary" icon={TrendingUp} className="w-full sm:w-auto justify-center">
                  Execute Transfer
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto justify-center">
                  Freeze Account
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Financial Overview */}
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 sm:p-6 border border-slate-200">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Financial DNA</p>
          <h2 className="text-2xl sm:text-3xl font-normal text-slate-900 mb-1.5">{member.totalValue}</h2>
          <p className="text-sm text-emerald-600 font-medium mb-4 sm:mb-6">{member.ytdChange}</p>

          <div className="space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-700">Staked Equity</span>
                <span className="text-xs font-normal text-slate-900">{member.stakedEquity}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${member.stakedEquity}%` }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-700">Liquid Assets</span>
                <span className="text-xs font-normal text-slate-900">{member.liquidAssets}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${member.liquidAssets}%` }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Allocated Sub-Wallets */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-5 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">Allocated Sub-Wallets</h3>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700 text-left sm:text-right">View Ledger Detail</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {member.subWallets.map((wallet: any, index: number) => (
                wallet.color === 'add' ? (
                  <button
                    key={index}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-5 hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-400 hover:text-blue-600 flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="text-xl font-medium">+</span>
                    </div>
                    <span className="text-xs font-medium text-center">Deposit New Sub-Wallet</span>
                  </button>
                ) : (
                  <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg ${getWalletColor(wallet.color)} flex items-center justify-center flex-shrink-0`}>
                        {wallet.icon && <wallet.icon className="w-4 h-4 text-white" />}
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{wallet.type}</p>
                    {wallet.amount && <p className="text-xl font-normal text-slate-900 mb-1">{wallet.amount}</p>}
                    <p className="text-xs text-slate-600 mb-3">{wallet.subtitle}</p>
                    {wallet.progress > 0 && (
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${getWalletColor(wallet.color)} rounded-full`} style={{ width: `${wallet.progress}%` }} />
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </motion.div>

          {/* Recent Governance Activity */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200"
          >
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4 sm:mb-5">Recent Governance Activity</h3>

            <div className="space-y-3">
              {member.governanceActivity.map((activity: any, index: number) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      activity.type === 'voted' ? 'bg-blue-100' :
                      activity.type === 'coauthored' ? 'bg-emerald-100' :
                      'bg-amber-100'
                    }`}>
                      <activity.icon className={`w-4 h-4 ${
                        activity.type === 'voted' ? 'text-blue-600' :
                        activity.type === 'coauthored' ? 'text-emerald-600' :
                        'text-amber-600'
                      }`} />
                    </div>
                    {index < member.governanceActivity.length - 1 && (
                      <div className="w-0.5 flex-1 bg-slate-200 mt-2 min-h-[20px]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <h4 className="text-sm font-medium text-slate-900 flex-1">{activity.title}</h4>
                      <span className="text-xs text-slate-500 font-normal flex-shrink-0">{activity.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{activity.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Compliance Dossier */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Compliance Dossier</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">KYC/AML STATUS</p>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide border ${getStatusColor(member.kycStatus)}`}>
                  <CheckCircle className="w-3 h-3" />
                  {member.kycStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Onboarding Date</p>
                  <p className="text-xs font-medium text-slate-900">{member.onboardingDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Risk Score</p>
                  <p className="text-xs font-medium text-slate-900">{member.riskScore}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Tax Residency</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-xs font-medium text-slate-900">{member.taxResidency}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Source of Wealth</p>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-xs font-medium text-slate-900">{member.sourceOfWealth}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium text-slate-900">Annual Tax Cert</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FileCheck className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-medium text-slate-900">Bank Attestation</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Alert Box */}
          {member.hasAlert && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="bg-gradient-to-br from-red-600 to-red-500 rounded-2xl p-5 text-white"
            >
              <div className="flex items-start gap-2.5 mb-3">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold uppercase tracking-wide mb-2">{member.alertType}</h4>
                  <p className="text-xs leading-relaxed opacity-95">{member.alertMessage}</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-3">
                Review Dossier
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
