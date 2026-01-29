'use client'

import { useState, useEffect } from 'react'

export default function RefundsPage() {
  const [refunds, setRefunds] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [showProcessModal, setShowProcessModal] = useState(false)

  // Mock refunds data
  const mockRefunds = [
    {
      id: 'REF-001',
      orderId: 'ORD-456',
      customer: 'Alex Johnson',
      email: 'alex@example.com',
      amount: 249.99,
      reason: 'Product defective',
      status: 'approved',
      date: '2024-01-27T10:30:00Z',
      processedDate: '2024-01-27T11:45:00Z',
      method: 'credit_card',
      avatar: 'AJ',
      avatarColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'REF-002',
      orderId: 'ORD-457',
      customer: 'Sarah Miller',
      email: 'sarah@company.com',
      amount: 99.99,
      reason: 'Customer request',
      status: 'pending',
      date: '2024-01-27T09:45:00Z',
      processedDate: null,
      method: 'paypal',
      avatar: 'SM',
      avatarColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 'REF-003',
      orderId: 'ORD-458',
      customer: 'Michael Chen',
      email: 'michael@business.com',
      amount: 499.99,
      reason: 'Late delivery',
      status: 'rejected',
      date: '2024-01-26T14:20:00Z',
      processedDate: '2024-01-26T15:30:00Z',
      method: 'bank_transfer',
      avatar: 'MC',
      avatarColor: 'from-emerald-500 to-green-500'
    },
    {
      id: 'REF-004',
      orderId: 'ORD-459',
      customer: 'Emma Davis',
      email: 'emma@startup.io',
      amount: 29.99,
      reason: 'Wrong item shipped',
      status: 'approved',
      date: '2024-01-26T11:15:00Z',
      processedDate: '2024-01-26T12:30:00Z',
      method: 'credit_card',
      avatar: 'ED',
      avatarColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 'REF-005',
      orderId: 'ORD-460',
      customer: 'James Wilson',
      email: 'james@enterprise.com',
      amount: 149.99,
      reason: 'Subscription cancellation',
      status: 'processing',
      date: '2024-01-25T16:45:00Z',
      processedDate: '2024-01-25T17:15:00Z',
      method: 'stripe',
      avatar: 'JW',
      avatarColor: 'from-rose-500 to-red-500'
    },
    {
      id: 'REF-006',
      orderId: 'ORD-461',
      customer: 'Olivia Taylor',
      email: 'olivia@agency.com',
      amount: 199.99,
      reason: 'Service not as described',
      status: 'approved',
      date: '2024-01-25T13:30:00Z',
      processedDate: '2024-01-25T14:45:00Z',
      method: 'credit_card',
      avatar: 'OT',
      avatarColor: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'REF-007',
      orderId: 'ORD-462',
      customer: 'Daniel Brown',
      email: 'daniel@corp.com',
      amount: 999.99,
      reason: 'Billing error',
      status: 'pending',
      date: '2024-01-24T10:00:00Z',
      processedDate: null,
      method: 'bank_transfer',
      avatar: 'DB',
      avatarColor: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'REF-008',
      orderId: 'ORD-463',
      customer: 'Sophia Martinez',
      email: 'sophia@tech.com',
      amount: 49.99,
      reason: 'Duplicate charge',
      status: 'approved',
      date: '2024-01-24T09:15:00Z',
      processedDate: '2024-01-24T10:30:00Z',
      method: 'paypal',
      avatar: 'SM',
      avatarColor: 'from-pink-500 to-rose-500'
    },
    {
      id: 'REF-009',
      orderId: 'ORD-464',
      customer: 'William Anderson',
      email: 'william@digital.com',
      amount: 299.99,
      reason: 'Change of mind',
      status: 'rejected',
      date: '2024-01-23T15:30:00Z',
      processedDate: '2024-01-23T16:45:00Z',
      method: 'credit_card',
      avatar: 'WA',
      avatarColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 'REF-010',
      orderId: 'ORD-465',
      customer: 'Isabella Thomas',
      email: 'isabella@creative.com',
      amount: 79.99,
      reason: 'Technical issues',
      status: 'processing',
      date: '2024-01-23T11:45:00Z',
      processedDate: '2024-01-23T12:15:00Z',
      method: 'stripe',
      avatar: 'IT',
      avatarColor: 'from-orange-500 to-amber-500'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRefunds(mockRefunds)
      setLoading(false)
    }, 800)
  }, [])

  // Calculate statistics
  const stats = {
    total: refunds.reduce((sum, refund) => sum + refund.amount, 0),
    approved: refunds.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0),
    pending: refunds.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.amount, 0),
    rejected: refunds.filter(r => r.status === 'rejected').reduce((sum, r) => sum + r.amount, 0),
    processing: refunds.filter(r => r.status === 'processing').reduce((sum, r) => sum + r.amount, 0),
    totalCount: refunds.length,
    approvedCount: refunds.filter(r => r.status === 'approved').length,
    pendingCount: refunds.filter(r => r.status === 'pending').length,
    rejectedCount: refunds.filter(r => r.status === 'rejected').length,
    processingCount: refunds.filter(r => r.status === 'processing').length
  }

  // Filter and sort refunds
  const filteredRefunds = refunds
    .filter(refund => {
      const matchesSearch = 
        refund.id.toLowerCase().includes(search.toLowerCase()) ||
        refund.orderId.toLowerCase().includes(search.toLowerCase()) ||
        refund.customer.toLowerCase().includes(search.toLowerCase()) ||
        refund.email.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || refund.status === filter
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortConfig.key === 'date' || sortConfig.key === 'processedDate') {
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
  const refundsPerPage = 8
  const totalPages = Math.ceil(filteredRefunds.length / refundsPerPage)
  const startIndex = (currentPage - 1) * refundsPerPage
  const paginatedRefunds = filteredRefunds.slice(startIndex, startIndex + refundsPerPage)

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✓'
      case 'pending': return '⏳'
      case 'rejected': return '✗'
      case 'processing': return '🔄'
      default: return '📄'
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateReason = (reason) => {
    return reason.length > 30 ? reason.substring(0, 30) + '...' : reason
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading refunds data...</p>
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
            Refund Management
          </h1>
          <p className="text-gray-400 mt-2">Process and track all customer refund requests</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-xl hover:border-white/20 transition-all flex items-center space-x-2">
            <span>📤</span>
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowProcessModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2"
          >
            <span>↩️</span>
            <span>Process Refund</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Refunds */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-300 text-sm mb-2">Total Refunds</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.total)}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20">
              <span className="text-sm font-medium text-blue-400">↩️</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-4/5"></div>
            </div>
            <p className="text-blue-300 text-xs mt-2">From {stats.totalCount} requests</p>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-300 text-sm mb-2">Approved</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.approved)}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <span className="text-sm font-medium text-emerald-400">✓</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full w-2/3"></div>
            </div>
            <p className="text-emerald-300 text-xs mt-2">{stats.approvedCount} approved requests</p>
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
            <p className="text-amber-300 text-xs mt-2">{stats.pendingCount} awaiting review</p>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-gradient-to-br from-rose-900/30 to-rose-950/30 border border-rose-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-300 text-sm mb-2">Rejected</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.rejected)}</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/20">
              <span className="text-sm font-medium text-rose-400">✗</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-rose-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-400 to-red-400 rounded-full w-1/4"></div>
            </div>
            <p className="text-rose-300 text-xs mt-2">{stats.rejectedCount} not approved</p>
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
                placeholder="Search refunds..."
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
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'approved'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('processing')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'processing'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Processing
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'rejected'
                    ? 'bg-gradient-to-r from-rose-500 to-red-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Refunds Table */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Refund Requests</h3>
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1}-{Math.min(startIndex + refundsPerPage, filteredRefunds.length)} of {filteredRefunds.length} refunds
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
                    <span>Refund ID</span>
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
                <th className="py-4 px-6 text-left text-gray-400">Reason</th>
                <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Requested</span>
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
              {paginatedRefunds.map((refund) => (
                <tr key={refund.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-mono font-bold">{refund.id}</div>
                    <div className="text-sm text-gray-400 mt-1">Order: {refund.orderId}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${refund.avatarColor} flex items-center justify-center`}>
                        <span className="text-sm font-semibold">{refund.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium">{refund.customer}</p>
                        <p className="text-sm text-gray-400">{refund.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-lg">{formatCurrency(refund.amount)}</div>
                    <div className="text-sm text-gray-400 flex items-center space-x-1">
                      <span>{getMethodIcon(refund.method)}</span>
                      <span className="capitalize">{refund.method.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm" title={refund.reason}>
                      {truncateReason(refund.reason)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm">{formatDate(refund.date)}</div>
                      {refund.processedDate && (
                        <div className="text-xs text-gray-400 mt-1">
                          Processed: {formatDate(refund.processedDate)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(refund.status)}`}>
                      <span className="mr-1">{getStatusIcon(refund.status)}</span>
                      {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {refund.status === 'pending' && (
                        <>
                          <button className="p-2 hover:bg-white/10 rounded-lg bg-emerald-500/20 text-emerald-400" title="Approve">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg bg-red-500/20 text-red-400" title="Reject">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      )}
                      <button className="p-2 hover:bg-white/10 rounded-lg" title="View Details">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Refund Reasons */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Refund Reasons</h3>
            <p className="text-gray-400 text-sm">Common reasons for refund requests</p>
          </div>
          
          <div className="space-y-4">
            {[
              { reason: 'Product Issues', count: 8, percentage: 40, color: 'from-blue-500 to-cyan-500' },
              { reason: 'Service Quality', count: 5, percentage: 25, color: 'from-purple-500 to-pink-500' },
              { reason: 'Billing Errors', count: 4, percentage: 20, color: 'from-emerald-500 to-green-500' },
              { reason: 'Customer Request', count: 3, percentage: 15, color: 'from-amber-500 to-orange-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{item.reason}</span>
                  <span className="text-sm font-medium">{item.count} requests</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Time */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Processing Time</h3>
            <p className="text-gray-400 text-sm">Average time to process refunds</p>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">4.2 hours</div>
              <div className="text-sm text-gray-400 mt-1">Average processing time</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pending</span>
                <span className="text-amber-400">{stats.pendingCount} requests</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Approved Today</span>
                <span className="text-emerald-400">3 requests</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Rejected Today</span>
                <span className="text-red-400">1 request</span>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Rate */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Refund Rate</h3>
            <p className="text-gray-400 text-sm">Refunds as percentage of revenue</p>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <div className="w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2.4 * 100} ${2.4 * 400}`}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">2.4%</div>
                    <div className="text-xs text-gray-400">Refund Rate</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-400">
              Industry average: 3.2%
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-emerald-400">78%</div>
          <div className="text-sm text-gray-400 mt-1">Approval Rate</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-cyan-400">2.1 days</div>
          <div className="text-sm text-gray-400 mt-1">Avg. Resolution</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-purple-400">4.8/5</div>
          <div className="text-sm text-gray-400 mt-1">Satisfaction</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-amber-400">92%</div>
          <div className="text-sm text-gray-400 mt-1">Repeat Customers</div>
        </div>
      </div>

      {/* Process Refund Modal */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Process New Refund</h3>
                <button
                  onClick={() => setShowProcessModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Order ID</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    placeholder="Enter order ID..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    placeholder="$0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Reason</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20">
                    <option>Select reason...</option>
                    <option>Product defective</option>
                    <option>Wrong item shipped</option>
                    <option>Late delivery</option>
                    <option>Billing error</option>
                    <option>Customer request</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowProcessModal(false)}
                  className="px-4 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all">
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}