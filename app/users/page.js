'use client'

import { useState, useEffect } from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })

  // Mock user data - In reality, you'd fetch this from an API
  const mockUsers = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      role: 'Admin',
      status: 'active',
      joined: '2024-01-15',
      lastActive: '2 hours ago',
      avatar: 'AJ',
      avatarColor: 'from-blue-500 to-cyan-500',
      subscription: 'Enterprise'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      email: 'sarah.m@example.com',
      role: 'User',
      status: 'active',
      joined: '2024-01-20',
      lastActive: '5 minutes ago',
      avatar: 'SM',
      avatarColor: 'from-purple-500 to-pink-500',
      subscription: 'Pro'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      role: 'Moderator',
      status: 'pending',
      joined: '2024-02-01',
      lastActive: '1 day ago',
      avatar: 'MC',
      avatarColor: 'from-emerald-500 to-green-500',
      subscription: 'Basic'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      role: 'User',
      status: 'suspended',
      joined: '2023-12-10',
      lastActive: '1 week ago',
      avatar: 'ED',
      avatarColor: 'from-amber-500 to-orange-500',
      subscription: 'Pro'
    },
    {
      id: 5,
      name: 'James Wilson',
      email: 'james.w@example.com',
      role: 'User',
      status: 'active',
      joined: '2024-01-05',
      lastActive: '30 minutes ago',
      avatar: 'JW',
      avatarColor: 'from-rose-500 to-red-500',
      subscription: 'Enterprise'
    },
    {
      id: 6,
      name: 'Olivia Taylor',
      email: 'olivia.t@example.com',
      role: 'User',
      status: 'active',
      joined: '2024-01-25',
      lastActive: '3 hours ago',
      avatar: 'OT',
      avatarColor: 'from-indigo-500 to-blue-500',
      subscription: 'Basic'
    },
    {
      id: 7,
      name: 'Daniel Brown',
      email: 'daniel.b@example.com',
      role: 'Moderator',
      status: 'inactive',
      joined: '2023-11-15',
      lastActive: '2 weeks ago',
      avatar: 'DB',
      avatarColor: 'from-cyan-500 to-blue-500',
      subscription: 'Pro'
    },
    {
      id: 8,
      name: 'Sophia Martinez',
      email: 'sophia.m@example.com',
      role: 'Admin',
      status: 'active',
      joined: '2024-01-10',
      lastActive: 'Just now',
      avatar: 'SM',
      avatarColor: 'from-pink-500 to-rose-500',
      subscription: 'Enterprise'
    },
    {
      id: 9,
      name: 'William Anderson',
      email: 'william.a@example.com',
      role: 'User',
      status: 'pending',
      joined: '2024-02-05',
      lastActive: '2 days ago',
      avatar: 'WA',
      avatarColor: 'from-green-500 to-emerald-500',
      subscription: 'Basic'
    },
    {
      id: 10,
      name: 'Isabella Thomas',
      email: 'isabella.t@example.com',
      role: 'User',
      status: 'active',
      joined: '2024-01-30',
      lastActive: '1 hour ago',
      avatar: 'IT',
      avatarColor: 'from-orange-500 to-amber-500',
      subscription: 'Pro'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers)
      setLoading(false)
    }, 800)
  }, [])

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
      }
    })

  // Pagination
  const usersPerPage = 8
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  const toggleSelectUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    )
  }

  const selectAllUsers = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'Moderator': return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      default: return 'bg-gradient-to-r from-gray-600 to-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading users data...</p>
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
            User Management
          </h1>
          <p className="text-gray-400 mt-2">Manage and monitor all user accounts and permissions</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-xl hover:border-white/20 transition-all flex items-center space-x-2">
            <span>📤</span>
            <span>Export Users</span>
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2">
            <span>👤</span>
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-2">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20">
              <span className="text-sm font-medium text-blue-400">👥</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-3/4"></div>
            </div>
            <p className="text-gray-400 text-xs mt-2">+12 this week</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-300 text-sm mb-2">Active Users</p>
              <p className="text-3xl font-bold">{users.filter(u => u.status === 'active').length}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <span className="text-sm font-medium text-emerald-400">✓</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full w-4/5"></div>
            </div>
            <p className="text-emerald-300 text-xs mt-2">85% active rate</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-300 text-sm mb-2">Pending Verification</p>
              <p className="text-3xl font-bold">{users.filter(u => u.status === 'pending').length}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20">
              <span className="text-sm font-medium text-amber-400">⏳</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-amber-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full w-1/4"></div>
            </div>
            <p className="text-amber-300 text-xs mt-2">Requires attention</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-300 text-sm mb-2">Avg. Session Time</p>
              <p className="text-3xl font-bold">24m</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/20">
              <span className="text-sm font-medium text-purple-400">⏱️</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-purple-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-2/3"></div>
            </div>
            <p className="text-purple-300 text-xs mt-2">+5m from last month</p>
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
                placeholder="Search users..."
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">{selectedUsers.length} selected</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30">
                  Approve
                </button>
                <button className="px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg text-sm hover:bg-amber-500/30">
                  Suspend
                </button>
                <button className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Accounts</h3>
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
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
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={selectAllUsers}
                      className="w-4 h-4 rounded border-white/20 bg-white/5"
                    />
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>User</span>
                    {sortConfig.key === 'name' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="py-4 px-6 text-left text-gray-400">Role</th>
                <th className="py-4 px-6 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Status</span>
                    {sortConfig.key === 'status' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="py-4 px-6 text-left text-gray-400">Subscription</th>
                <th className="py-4 px-6 text-left text-gray-400">Last Active</th>
                <th className="py-4 px-6 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${user.avatarColor} flex items-center justify-center`}>
                        <span className="text-sm font-semibold">{user.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{user.subscription}</span>
                      {user.subscription === 'Enterprise' && (
                        <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded">
                          VIP
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-400">{user.lastActive}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
            <div className="text-2xl font-bold text-blue-400">72%</div>
            <div className="text-sm text-blue-300 mt-1">User Retention Rate</div>
            <div className="h-1.5 bg-blue-500/10 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border border-emerald-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">4.8/5</div>
            <div className="text-sm text-emerald-300 mt-1">Average User Rating</div>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-amber-400">★</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">98.7%</div>
            <div className="text-sm text-purple-300 mt-1">Satisfaction Score</div>
            <div className="h-1.5 bg-purple-500/10 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}