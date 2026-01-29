'use client'

import { useState, useEffect } from 'react'

export default function ReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedReport, setSelectedReport] = useState(null)

  const reportCategories = [
    { id: 'all', name: 'All Reports', icon: '📊', color: 'from-blue-500 to-cyan-500' },
    { id: 'financial', name: 'Financial', icon: '💰', color: 'from-emerald-500 to-green-500' },
    { id: 'analytics', name: 'Analytics', icon: '📈', color: 'from-purple-500 to-pink-500' },
    { id: 'system', name: 'System', icon: '⚙️', color: 'from-amber-500 to-orange-500' },
    { id: 'user', name: 'User', icon: '👥', color: 'from-rose-500 to-red-500' }
  ]

  // Mock reports data
  const mockReports = [
    {
      id: 1,
      title: 'Monthly Financial Summary',
      description: 'Comprehensive overview of revenue, expenses, and profitability for January 2024',
      category: 'financial',
      format: 'PDF',
      size: '4.2 MB',
      created: '2024-02-01',
      status: 'ready',
      downloads: 24,
      avatar: 'MFS',
      avatarColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'User Activity Report',
      description: 'Detailed analysis of user engagement, retention, and behavior patterns',
      category: 'user',
      format: 'Excel',
      size: '8.7 MB',
      created: '2024-01-28',
      status: 'ready',
      downloads: 18,
      avatar: 'UAR',
      avatarColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'System Performance Audit',
      description: 'Infrastructure metrics, uptime analysis, and performance optimization insights',
      category: 'system',
      format: 'PDF',
      size: '12.3 MB',
      created: '2024-01-25',
      status: 'processing',
      downloads: 0,
      avatar: 'SPA',
      avatarColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 4,
      title: 'Sales Analytics Q4 2023',
      description: 'Quarterly sales performance with regional breakdown and trend analysis',
      category: 'analytics',
      format: 'Excel',
      size: '6.5 MB',
      created: '2024-01-20',
      status: 'ready',
      downloads: 32,
      avatar: 'SAQ',
      avatarColor: 'from-emerald-500 to-green-500'
    },
    {
      id: 5,
      title: 'Security Compliance Report',
      description: 'Security audit results, compliance status, and vulnerability assessment',
      category: 'system',
      format: 'PDF',
      size: '3.1 MB',
      created: '2024-01-18',
      status: 'ready',
      downloads: 12,
      avatar: 'SCR',
      avatarColor: 'from-rose-500 to-red-500'
    },
    {
      id: 6,
      title: 'Marketing Campaign ROI',
      description: 'Return on investment analysis for all marketing campaigns in Q4',
      category: 'financial',
      format: 'PDF',
      size: '5.8 MB',
      created: '2024-01-15',
      status: 'ready',
      downloads: 21,
      avatar: 'MCR',
      avatarColor: 'from-indigo-500 to-blue-500'
    },
    {
      id: 7,
      title: 'Customer Satisfaction Survey',
      description: 'Quarterly customer feedback analysis and satisfaction metrics',
      category: 'user',
      format: 'Excel',
      size: '2.4 MB',
      created: '2024-01-12',
      status: 'ready',
      downloads: 15,
      avatar: 'CSS',
      avatarColor: 'from-cyan-500 to-blue-500'
    },
    {
      id: 8,
      title: 'Website Traffic Analysis',
      description: 'Visitor demographics, traffic sources, and engagement metrics',
      category: 'analytics',
      format: 'PDF',
      size: '7.2 MB',
      created: '2024-01-10',
      status: 'failed',
      downloads: 0,
      avatar: 'WTA',
      avatarColor: 'from-pink-500 to-rose-500'
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setReports(mockReports)
      setLoading(false)
    }, 800)
  }, [])

  const filteredReports = activeTab === 'all' 
    ? reports 
    : reports.filter(report => report.category === activeTab)

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'processing': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'failed': return 'bg-rose-500/20 text-rose-400 border-rose-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready': return '✓'
      case 'processing': return '⏳'
      case 'failed': return '✗'
      default: return '📄'
    }
  }

  const getFormatColor = (format) => {
    switch (format) {
      case 'PDF': return 'from-red-500 to-rose-500'
      case 'Excel': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const generateReport = () => {
    alert('Starting report generation... This may take a few moments.')
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Reports Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Generate and access all your business intelligence reports</p>
        </div>
        <button
          onClick={generateReport}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2"
        >
          <span>📊</span>
          <span>Generate Report</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm mb-2">Total Reports</p>
              <p className="text-3xl font-bold">{reports.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20">
              <span className="text-xl">📊</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-300 text-sm mb-2">Ready to Download</p>
              <p className="text-3xl font-bold">{reports.filter(r => r.status === 'ready').length}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <span className="text-xl">📥</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full w-5/6"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm mb-2">Total Downloads</p>
              <p className="text-3xl font-bold">{reports.reduce((sum, r) => sum + r.downloads, 0)}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/20">
              <span className="text-xl">⬇️</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-purple-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {reportCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`flex items-center space-x-3 px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${
              activeTab === category.id
                ? `border-white/30 bg-gradient-to-r ${category.color}`
                : 'border-white/10 text-gray-400 hover:bg-white/5'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Reports Grid - Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className={`bg-gradient-to-br from-gray-900 to-black border ${
              selectedReport === report.id
                ? 'border-blue-500/50'
                : 'border-white/10'
            } rounded-2xl p-6 hover:border-white/20 transition-all group`}
            onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.avatarColor} flex items-center justify-center`}>
                <span className="text-sm font-bold">{report.avatar}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                {getStatusIcon(report.status)} {report.status}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
              {report.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {report.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getFormatColor(report.format)} text-white text-xs font-medium`}>
                  {report.format}
                </div>
                <div className="text-sm text-gray-400">
                  {report.size}
                </div>
              </div>
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <span>⬇️</span>
                <span>{report.downloads}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="text-sm text-gray-400">
                Created: {formatDate(report.created)}
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-white/10 rounded-lg" title="Download">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg" title="Share">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg" title="Schedule">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedReport === report.id && (
              <div className="mt-6 pt-6 border-t border-white/10 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-gray-400 mb-1">Category</div>
                    <div className="text-sm font-medium">
                      {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-gray-400 mb-1">Downloads This Month</div>
                    <div className="text-sm font-medium">{report.downloads}</div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-sm hover:opacity-90 transition-opacity">
                    Download Now
                  </button>
                  <button className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-all">
                    View Preview
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Report Types */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-6">Report Types Available</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: 'Financial', icon: '💰', desc: 'Revenue, expenses, profit' },
            { type: 'Analytics', icon: '📈', desc: 'Data insights & trends' },
            { type: 'User', icon: '👥', desc: 'Behavior & engagement' },
            { type: 'System', icon: '⚙️', desc: 'Performance & logs' }
          ].map((item, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="font-medium mb-1">{item.type}</div>
              <div className="text-sm text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-sm text-gray-400">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-xl hover:border-white/20 transition-all">
            Export All
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-white/10 rounded-xl hover:border-white/20 transition-all">
            Schedule Reports
          </button>
        </div>
      </div>
    </div>
  )
}