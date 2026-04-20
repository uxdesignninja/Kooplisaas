import { motion } from 'motion/react';
import { Shield, CheckCircle, AlertTriangle, Clock, FileText, Calendar, MapPin, Phone, Mail, Building2, CreditCard, Download, X, GraduationCap, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';

const members = [
  {
    id: 1,
    name: 'Juan Dela Cruz',
    status: 'pending',
    riskLevel: 'Low',
    daysAgo: '2d ago',
    lmsStatus: 'ongoing',
  },
  {
    id: 2,
    name: 'Maria Lourdes Santos',
    status: 'verified',
    riskLevel: 'Low',
    daysAgo: '3d ago',
    lmsStatus: 'completed',
  },
  {
    id: 3,
    name: 'Jose Rizal Mercado',
    status: 'pending',
    riskLevel: 'Medium',
    daysAgo: '5d ago',
    lmsStatus: 'not-started',
  },
  {
    id: 4,
    name: 'Ana Marie Gonzales',
    status: 'flagged',
    riskLevel: 'High',
    daysAgo: '1d ago',
    lmsStatus: 'ongoing',
  },
  {
    id: 5,
    name: 'Roberto Garcia Reyes',
    status: 'verified',
    riskLevel: 'Low',
    daysAgo: '7d ago',
    lmsStatus: 'completed',
  },
];

export function Compliance() {
  const [selectedMember, setSelectedMember] = useState(members[0]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return { icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50', label: 'Verified' };
      case 'pending':
        return { icon: Clock, color: 'text-amber-600 bg-amber-50', label: 'Pending' };
      case 'flagged':
        return { icon: AlertTriangle, color: 'text-red-600 bg-red-50', label: 'Flagged' };
      default:
        return { icon: Clock, color: 'text-slate-600 bg-slate-50', label: 'Unknown' };
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 sm:mb-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Pending Actions</h1>
              <p className="text-sm text-slate-500">5 members require review</p>
            </div>
          </div>
          <Button variant="secondary" icon={Download}>
            Export Report
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 sm:gap-6">
        {/* Left Sidebar - Member List */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="p-4 border-b border-slate-200">
            <input
              type="text"
              placeholder="Search members..."
              className="w-full px-4 py-2 bg-slate-50 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all border border-slate-200/50 focus:border-blue-300"
            />
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
            {members.map((member, index) => {
              const badge = getStatusBadge(member.status);
              const isSelected = selectedMember.id === member.id;

              return (
                <motion.button
                  key={member.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                  onClick={() => setSelectedMember(member)}
                  className={`w-full px-4 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left ${
                    isSelected ? 'bg-blue-50 hover:bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className={`font-semibold text-sm ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                      {member.name}
                    </p>
                    <span className="text-xs text-slate-500">{member.daysAgo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <badge.icon className={`w-3.5 h-3.5 ${badge.color.split(' ')[0]}`} />
                    <span className={`text-xs font-medium ${badge.color.split(' ')[0]}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-600">{member.riskLevel} Risk</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Right Panel - Member Details */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="space-y-6"
        >
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{selectedMember.name}</h2>
                    <p className="text-sm text-slate-500">Member ID: #FICCO-{selectedMember.id}891</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Joined Dec 24, 2019</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Last login: Today</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(() => {
                  const badge = getStatusBadge(selectedMember.status);
                  return (
                    <>
                      <badge.icon className={`w-5 h-5 ${badge.color.split(' ')[0]}`} />
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide ${badge.color}`}>
                        {badge.label}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Risk Level</p>
                <p className="text-lg font-normal text-slate-900">{selectedMember.riskLevel}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">KYC Score</p>
                <p className="text-lg font-normal text-emerald-600">94.2%</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Documents</p>
                <p className="text-lg font-normal text-slate-900">8/8</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Information */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Account Information
              </h3>
              <div className="space-y-0 divide-y divide-slate-100">
                <div className="py-3 first:pt-0">
                  <p className="text-xs text-slate-500 mb-1.5">Full Name</p>
                  <p className="text-sm font-semibold text-slate-900">{selectedMember.name}</p>
                </div>
                <div className="py-3">
                  <p className="text-xs text-slate-500 mb-1.5">Email Address</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-sm text-slate-700">juan.delacruz@email.ph</p>
                  </div>
                </div>
                <div className="py-3">
                  <p className="text-xs text-slate-500 mb-1.5">Phone Number</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-sm text-slate-700">+63 917 234 5678</p>
                  </div>
                </div>
                <div className="py-3 last:pb-0">
                  <p className="text-xs text-slate-500 mb-1.5">Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                    <p className="text-sm text-slate-700">456 Rizal Avenue, Barangay San Miguel, Makati City, Metro Manila 1200</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - KYC Documents and LMS Status */}
            <div className="space-y-6">
              {/* KYC Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  KYC Documents
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Valid ID (UMID/SSS)', status: 'verified', date: 'Dec 24, 2019' },
                    { name: 'Selfie Verification', status: 'verified', date: 'Jan 15, 2020' },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          doc.status === 'verified' ? 'bg-emerald-100' : 'bg-amber-100'
                        }`}>
                          {doc.status === 'verified' ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{doc.name}</p>
                          <p className="text-xs text-slate-500">{doc.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LMS Status */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  LMS Status
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Pre-Membership Learning</p>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const lmsStatus = selectedMember.lmsStatus || 'not-started';
                        const statusConfig: Record<string, {
                          icon: typeof CheckCircle;
                          color: string;
                          label: string;
                          description: string;
                        }> = {
                          'completed': {
                            icon: CheckCircle,
                            color: 'bg-emerald-100 text-emerald-700',
                            label: 'Completed',
                            description: 'All modules finished'
                          },
                          'ongoing': {
                            icon: PlayCircle,
                            color: 'bg-blue-100 text-blue-700',
                            label: 'Ongoing',
                            description: '3 of 5 modules completed'
                          },
                          'not-started': {
                            icon: Clock,
                            color: 'bg-slate-100 text-slate-700',
                            label: 'Not Started',
                            description: 'Enrollment pending'
                          }
                        };
                        const config = statusConfig[lmsStatus] || statusConfig['not-started'];
                        const IconComponent = config.icon;

                        return (
                          <div className="flex-1">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.color.split(' ')[0]}`}>
                                <IconComponent className={`w-4 h-4 ${config.color.split(' ')[1]}`} />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900">{config.label}</p>
                                <p className="text-xs text-slate-500">{config.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Financial Information
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-500 mb-2">Account Balance</p>
                <p className="text-3xl font-normal text-slate-900">₱144,900.00</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">Available for withdrawal</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-2">Total Deposits</p>
                <p className="text-2xl font-normal text-slate-900">₱744,786.00</p>
                <p className="text-xs text-slate-500 mt-1">Since Dec 2019</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-2">Total Withdrawals</p>
                <p className="text-2xl font-normal text-slate-900">₱599,886.00</p>
                <p className="text-xs text-slate-500 mt-1">Last: 2 days ago</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="primary" icon={CheckCircle} className="flex-1 justify-center">
              Approve Member
            </Button>
            <Button variant="secondary">
              Request Info
            </Button>
            <Button variant="danger-subtle" icon={X}>
              Reject
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
