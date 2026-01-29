'use client'

import { useState, useEffect } from 'react'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedInvoices, setSelectedInvoices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Mock invoice data
  const mockInvoices = [
    {
      id: 'INV-2024-001',
      client: 'Acme Corporation',
      clientEmail: 'billing@acme.com',
      amount: 2499.99,
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-01-30',
      items: 12,
      currency: 'USD',
      avatar: 'AC',
      avatarColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'INV-2024-002',
      client: 'Globex Inc',
      clientEmail: 'finance@globex.com',
      amount: 4999.99,
      status: 'pending',
      date: '2024-01-20',
      dueDate: '2024-02-05',
      items: 8,
      currency: 'USD',
      avatar: 'GI',
      avatarColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 'INV-2024-003',
      client: 'Stark Industries',
      clientEmail: 'accounting@stark.com',
      amount: 12499.99,
      status: 'overdue',
      date: '2023-12-15',
      dueDate: '2024-01-01',
      items: 24,
      currency: 'USD',
      avatar: 'SI',
      avatarColor: 'from-emerald-500 to-green-500'
    },
    {
      id: 'INV-2024-004',
      client: 'Wayne Enterprises',
      clientEmail: 'billing@wayne.com',
      amount: 2999.99,
      status: 'paid',
      date: '2024-01-10',
      dueDate: '2024-01-25',
      items: 6,
      currency: 'USD',
      avatar: 'WE',
      avatarColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 'INV-2024-005',
      client: 'Umbrella Corporation',
      clientEmail: 'payments@umbrella.com',
      amount: 7999.99,
      status: 'pending',
      date: '2024-01-25',
      dueDate: '2024-02-10',
      items: 15,
      currency: 'USD',
      avatar: 'UC',
      avatarColor: 'from-rose-500 to-red-500'
    },
    {
      id: 'INV-2024-006',
      client: 'Oscorp Industries',
      clientEmail: 'accounts@oscorp.com',
      amount: 3499.99,
      status: 'paid',
      date: '2024-01-18',
      dueDate: '2024-02-02',
      items: 10,
      currency: 'USD',
      avatar: 'OI',
      avatarColor: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'INV-2024-007',
      client: 'Cyberdyne Systems',
      clientEmail: 'finance@cyberdyne.com',
      amount: 8999.99,
      status: 'draft',
      date: '2024-01-28',
      dueDate: '2024-02-12',
      items: 18,
      currency: 'USD',
      avatar: 'CS',
      avatarColor: 'from-cyan-500 to-blue-500'
    },
    {
      id: 8,
      id: 'INV-2024-008',
      client: 'Tyrell Corporation',
      clientEmail: 'billing@tyrell.com',
      amount: 15999.99,
      status: 'paid',
      date: '2024-01-05',
      dueDate: '2024-01-20',
      items: 32,
      currency: 'USD',
      avatar: 'TC',
      avatarColor: 'from-pink-500 to-rose-500'
    },
    {
      id: 'INV-2024-009',
      client: 'Weyland-Yutani',
      clientEmail: 'accounts@weyland.com',
      amount: 21999.99,
      status: 'overdue',
      date: '2023-12-20',
      dueDate: '2024-01-05',
      items: 28,
      currency: 'USD',
      avatar: 'WY',
      avatarColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 'INV-2024-010',
      client: 'InGen Corporation',
      clientEmail: 'payments@ingen.com',
      amount: 5499.99,
      status: 'pending',
      date: '2024-01-30',
      dueDate: '2024-02-14',
      items: 9,
      currency: 'USD',
      avatar: 'IC',
      avatarColor: 'from-orange-500 to-amber-500'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInvoices(mockInvoices)
      setLoading(false)
    }, 800)
  }, [])

  // Calculate statistics
  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pending: invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdue: invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0),
    totalCount: invoices.length,
    paidCount: invoices.filter(inv => inv.status === 'paid').length,
    pendingCount: invoices.filter(inv => inv.status === 'pending').length,
    overdueCount: invoices.filter(inv => inv.status === 'overdue').length
  }

  // Filter and sort invoices
  const filteredInvoices = invoices
    .filter(invoice => {
      const matchesSearch = 
        invoice.id.toLowerCase().includes(search.toLowerCase()) ||
        invoice.client.toLowerCase().includes(search.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || invoice.status === filter
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortConfig.key === 'date' || sortConfig.key === 'dueDate') {
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
  const invoicesPerPage = 8
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage)
  const startIndex = (currentPage - 1) * invoicesPerPage
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + invoicesPerPage)

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  const toggleSelectInvoice = (id) => {
    setSelectedInvoices(prev =>
      prev.includes(id) ? prev.filter(invoiceId => invoiceId !== id) : [...prev, id]
    )
  }

  const selectAllInvoices = () => {
    if (selectedInvoices.length === paginatedInvoices.length) {
      setSelectedInvoices([])
    } else {
      setSelectedInvoices(paginatedInvoices.map(invoice => invoice.id))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'overdue': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return '✓'
      case 'pending': return '⏳'
      case 'overdue': return '⚠️'
      case 'draft': return '📝'
      default: return '📄'
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
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading invoices data...</p>
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
            Invoices
          </h1>
          <p className="text-gray-400 mt-2">Manage and track all client invoices and payments</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-xl hover:border-white/20 transition-all flex items-center space-x-2">
            <span>📤</span>
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2"
          >
            <span>+</span>
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-300 text-sm mb-2">Total Revenue</p>
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
            <p className="text-blue-300 text-xs mt-2">From {stats.totalCount} invoices</p>
          </div>
        </div>

        {/* Paid Invoices */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-300 text-sm mb-2">Paid Invoices</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.paid)}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <span className="text-sm font-medium text-emerald-400">✓</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full w-3/4"></div>
            </div>
            <p className="text-emerald-300 text-xs mt-2">{stats.paidCount} invoices · {stats.paidCount > 0 ? `${Math.round((stats.paidCount / stats.totalCount) * 100)}%` : '0%'} paid</p>
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
            <p className="text-amber-300 text-xs mt-2">{stats.pendingCount} invoices awaiting payment</p>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-gradient-to-br from-rose-900/30 to-rose-950/30 border border-rose-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-300 text-sm mb-2">Overdue</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.overdue)}</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/20">
              <span className="text-sm font-medium text-rose-400">⚠️</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-rose-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-400 to-red-400 rounded-full w-1/4"></div>
            </div>
            <p className="text-rose-300 text-xs mt-2">{stats.overdueCount} invoices past due</p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search invoices, clients..."
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
                onClick={() => setFilter('paid')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'paid'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Paid
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
                onClick={() => setFilter('overdue')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'overdue'
                    ? 'bg-gradient-to-r from-rose-500 to-red-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Overdue
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filter === 'draft'
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                Draft
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedInvoices.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">{selectedInvoices.length} selected</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30">
                  Send Reminders
                </button>
                <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/30">
                  Mark as Paid
                </button>
                <button className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Invoices</h3>
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1}-{Math.min(startIndex + invoicesPerPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.length === paginatedInvoices.length && paginatedInvoices.length > 0}
                      onChange={selectAllInvoices}
                      className="w-4 h-4 rounded border-white/20 bg-white/5"
                    />
                  </div>
                </th>
                {/* <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('id')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Invoice ID</span>
                    {sortConfig.key === 'id' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th> */}
                <th className="py-4 px-6 text-left text-gray-400">Client</th>
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
                <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Issued</span>
                    {sortConfig.key === 'date' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('dueDate')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Due Date</span>
                    {sortConfig.key === 'dueDate' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="py-4 px-6 text-left text-gray-400">Status</th>
                <th className="py-4 px-6 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => toggleSelectInvoice(invoice.id)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5"
                    />
                  </td>
                  {/* <td className="py-4 px-6">
                    <div className="font-mono font-bold">{invoice.id}</div>
                    <div className="text-sm text-gray-400 mt-1">{invoice.items} items</div>
                  </td> */}
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${invoice.avatarColor} flex items-center justify-center`}>
                        <span className="text-sm font-semibold">{invoice.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium">{invoice.client}</p>
                        <p className="text-sm text-gray-400">{invoice.clientEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-lg">{formatCurrency(invoice.amount)}</div>
                    <div className="text-sm text-gray-400">{invoice.currency}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">{formatDate(invoice.date)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`text-sm ${isOverdue(invoice.dueDate) ? 'text-red-400 font-medium' : ''}`}>
                      {formatDate(invoice.dueDate)}
                      {isOverdue(invoice.dueDate) && (
                        <div className="text-xs text-red-400 mt-1">Past due</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                        <span className="mr-1">{getStatusIcon(invoice.status)}</span>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                      {invoice.status === 'overdue' && (
                        <span className="text-xs text-red-400 animate-pulse">!</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg" title="Preview">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg" title="Download">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg" title="Send">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg" title="Edit">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">18.2 days</div>
            <div className="text-sm text-blue-300 mt-1">Avg. Payment Time</div>
            <div className="h-1.5 bg-blue-500/10 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border border-emerald-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">94.7%</div>
            <div className="text-sm text-emerald-300 mt-1">On-time Payments</div>
            <div className="flex justify-center mt-2">
              <span className="text-emerald-400 text-sm">★★★★★</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">$24.5K</div>
            <div className="text-sm text-purple-300 mt-1">Expected This Month</div>
            <div className="h-1.5 bg-purple-500/10 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Create New Invoice</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
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
                  <label className="block text-sm text-gray-400 mb-2">Client</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    placeholder="Select client..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Amount</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                      placeholder="$0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    rows="3"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    placeholder="Enter invoice description..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 border border-white/10 rounded-xl hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all">
                  Create Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}