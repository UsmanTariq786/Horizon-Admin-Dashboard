'use client'

import { useState, useEffect } from 'react'

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })

  // Mock payments data
  const mockPayments = [
    {
      id: 'PAY-001',
      customer: 'Alex Johnson',
      email: 'alex@example.com',
      amount: 249.99,
      status: 'completed',
      date: '2024-01-27T10:30:00Z',
      method: 'credit_card',
      subscription: 'Pro Annual',
      avatar: 'AJ',
      avatarColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'PAY-002',
      customer: 'Sarah Miller',
      email: 'sarah@company.com',
      amount: 99.99,
      status: 'failed',
      date: '2024-01-27T09:45:00Z',
      method: 'paypal',
      subscription: 'Basic Monthly',
      avatar: 'SM',
      avatarColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 'PAY-003',
      customer: 'Michael Chen',
      email: 'michael@business.com',
      amount: 499.99,
      status: 'completed',
      date: '2024-01-26T14:20:00Z',
      method: 'bank_transfer',
      subscription: 'Enterprise',
      avatar: 'MC',
      avatarColor: 'from-emerald-500 to-green-500'
    },
    {
      id: 'PAY-004',
      customer: 'Emma Davis',
      email: 'emma@startup.io',
      amount: 29.99,
      status: 'pending',
      date: '2024-01-26T11:15:00Z',
      method: 'credit_card',
      subscription: 'Basic Monthly',
      avatar: 'ED',
      avatarColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 'PAY-005',
      customer: 'James Wilson',
      email: 'james@enterprise.com',
      amount: 149.99,
      status: 'completed',
      date: '2024-01-25T16:45:00Z',
      method: 'stripe',
      subscription: 'Pro Monthly',
      avatar: 'JW',
      avatarColor: 'from-rose-500 to-red-500'
    },
    {
      id: 'PAY-006',
      customer: 'Olivia Taylor',
      email: 'olivia@agency.com',
      amount: 199.99,
      status: 'refunded',
      date: '2024-01-25T13:30:00Z',
      method: 'credit_card',
      subscription: 'Pro Annual',
      avatar: 'OT',
      avatarColor: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'PAY-007',
      customer: 'Daniel Brown',
      email: 'daniel@corp.com',
      amount: 999.99,
      status: 'completed',
      date: '2024-01-24T10:00:00Z',
      method: 'bank_transfer',
      subscription: 'Enterprise',
      avatar: 'DB',
      avatarColor: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'PAY-008',
      customer: 'Sophia Martinez',
      email: 'sophia@tech.com',
      amount: 49.99,
      status: 'completed',
      date: '2024-01-24T09:15:00Z',
      method: 'paypal',
      subscription: 'Basic Monthly',
      avatar: 'SM',
      avatarColor: 'from-pink-500 to-rose-500'
    },
    {
      id: 'PAY-009',
      customer: 'William Anderson',
      email: 'william@digital.com',
      amount: 299.99,
      status: 'failed',
      date: '2024-01-23T15:30:00Z',
      method: 'credit_card',
      subscription: 'Pro Monthly',
      avatar: 'WA',
      avatarColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 'PAY-010',
      customer: 'Isabella Thomas',
      email: 'isabella@creative.com',
      amount: 79.99,
      status: 'completed',
      date: '2024-01-23T11:45:00Z',
      method: 'stripe',
      subscription: 'Basic Monthly',
      avatar: 'IT',
      avatarColor: 'from-orange-500 to-amber-500'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPayments(mockPayments)
      setLoading(false)
    }, 800)
  }, [])

  // Calculate statistics
  const stats = {
    total: payments.reduce((sum, payment) => sum + payment.amount, 0),
    completed: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    failed: payments.filter(p => p.status === 'failed').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalCount: payments.length,
    completedCount: payments.filter(p => p.status === 'completed').length,
    failedCount: payments.filter(p => p.status === 'failed').length,
    pendingCount: payments.filter(p => p.status === 'pending').length,
    refundedCount: payments.filter(p => p.status === 'refunded').length
  }

  // Filter and sort payments
  const filteredPayments = payments
    .filter(payment => {
      const matchesSearch = 
        payment.id.toLowerCase().includes(search.toLowerCase()) ||
        payment.customer.toLowerCase().includes(search.toLowerCase()) ||
        payment.email.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || payment.status === filter
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a[sortConfig.key])
        const dateB = new Date(b[sortConfig.key])
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA
      }
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount
      }
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
      }
    })

  // Pagination
  const paymentsPerPage = 8
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage)
  const startIndex = (currentPage - 1) * paymentsPerPage
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + paymentsPerPage)

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'refunded': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✓'
      case 'pending': return '⏳'
      case 'failed': return '✗'
      case 'refunded': return '↩️'
      default: return '💳'
    }
  }

  const getMethodIcon = (method) => {
    switch (method) {
      case 'credit_card': return '💳'
      case 'paypal': return '🔵'
      case 'bank_transfer': return '🏦'
      case 'stripe': return '🟣'
      default: return '💳'
    }
  }

  const getMethodColor = (method) => {
    switch (method) {
      case 'credit_card': return 'from-blue-500 to-cyan-500'
      case 'paypal': return 'from-blue-600 to-blue-700'
      case 'bank_transfer': return 'from-green-500 to-emerald-500'
      case 'stripe': return 'from-purple-500 to-pink-500'
      default: return 'from-gray-600 to-gray-700'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading payments data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Payment Transactions
          </h1>
          <p className="text-gray-400 mt-2">Monitor and manage all payment transactions</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-xl hover:border-white/20 transition-all flex items-center space-x-2">
            <span>📤</span>
            <span>Export</span>
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2">
            <span>💳</span>
            <span>Process Payment</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Processed */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-300 text-sm mb-2">Total Processed</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.total)}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20">
              <span className="text-sm font-medium text-blue-400">💰</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-4/5"></div>
            </div>
            <p className="text-blue-300 text-xs mt-2">From {stats.totalCount} transactions</p>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-300 text-sm mb-2">Completed</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.completed)}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <span className="text-sm font-medium text-emerald-400">✓</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full w-3/4"></div>
            </div>
            <p className="text-emerald-300 text-xs mt-2">{stats.completedCount} successful payments</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-300 text-sm mb-2">Pending</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.pending)}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20">
              <span className="text-sm font-medium text-amber-400">⏳</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-amber-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full w-1/3"></div>
            </div>
            <p className="text-amber-300 text-xs mt-2">{stats.pendingCount} awaiting clearance</p>
          </div>
        </div>

        {/* Failed */}
        <div className="bg-gradient-to-br from-rose-900/30 to-rose-950/30 border border-rose-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-300 text-sm mb-2">Failed</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.failed)}</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/20">
              <span className="text-sm font-medium text-rose-400">✗</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-rose-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-400 to-red-400 rounded-full w-1/4"></div>
            </div>
            <p className="text-rose-300 text-xs mt-2">{stats.failedCount} declined transactions</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search payments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'completed'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'pending'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('failed')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'failed'
                    ? 'bg-gradient-to-r from-rose-500 to-red-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Failed
              </button>
              <button
                onClick={() => setFilter('refunded')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'refunded'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Refunded
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Payments</h3>
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1}-{Math.min(startIndex + paymentsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('id')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Payment ID</span>
                    {sortConfig.key === 'id' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="py-4 px-6 text-left text-gray-400">Customer</th>
                <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('amount')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Amount</span>
                    {sortConfig.key === 'amount' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="py-4 px-6 text-left text-gray-400">Method</th>
                <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Date</span>
                    {sortConfig.key === 'date' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="py-4 px-6 text-left text-gray-400">Status</th>
                <th className="py-4 px-6 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-mono font-bold">{payment.id}</div>
                    <div className="text-sm text-gray-400 mt-1">{payment.subscription}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${payment.avatarColor} flex items-center justify-center`}>
                        <span className="text-sm font-semibold">{payment.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium">{payment.customer}</p>
                        <p className="text-sm text-gray-400">{payment.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-lg">{formatCurrency(payment.amount)}</div>
                    <div className="text-sm text-gray-400">USD</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getMethodIcon(payment.method)}</span>
                      <span className="text-sm capitalize">{payment.method.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">{formatDate(payment.date)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                      <span className="mr-1">{getStatusIcon(payment.status)}</span>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg" title="View Details">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg" title="Refund">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg" title="Resend">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-xl border ${
                  currentPage === 1 
                    ? 'border-white/10 text-gray-500 cursor-not-allowed' 
                    : 'border-white/20 text-gray-300 hover:bg-white/5'
                }`}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl border ${
                      currentPage === pageNum
                        ? 'border-blue-500/50 bg-blue-500/20 text-blue-400'
                        : 'border-white/10 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-xl border ${
                  currentPage === totalPages 
                    ? 'border-white/10 text-gray-500 cursor-not-allowed' 
                    : 'border-white/20 text-gray-300 hover:bg-white/5'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Distribution */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <p className="text-gray-400 text-sm">Distribution across payment methods</p>
          </div>
          <div className="text-sm text-gray-400">Last 30 days</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { method: 'Credit Card', percentage: 58, amount: 15420, color: 'from-blue-500 to-cyan-500', icon: '💳' },
            { method: 'PayPal', percentage: 24, amount: 6380, color: 'from-blue-600 to-blue-700', icon: '🔵' },
            { method: 'Bank Transfer', percentage: 12, amount: 3190, color: 'from-green-500 to-emerald-500', icon: '🏦' },
            { method: 'Stripe', percentage: 6, amount: 1595, color: 'from-purple-500 to-pink-500', icon: '🟣' }
          ].map((method, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-medium">{method.method}</span>
                </div>
                <span className="text-lg font-bold">{method.percentage}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${method.color}`}
                  style={{ width: `${method.percentage}%` }}
                ></div>
              </div>
              <div className="mt-3 text-sm text-gray-400">
                {formatCurrency(method.amount)} processed
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">98.2%</div>
            <div className="text-sm text-blue-300 mt-1">Success Rate</div>
            <div className="h-1.5 bg-blue-500/10 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-full"></div>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border border-emerald-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">1.8s</div>
            <div className="text-sm text-emerald-300 mt-1">Avg. Processing Time</div>
            <div className="flex justify-center mt-2">
              <span className="text-emerald-400 text-sm">⚡</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">0.4%</div>
            <div className="text-sm text-purple-300 mt-1">Dispute Rate</div>
            <div className="h-1.5 bg-purple-500/10 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}