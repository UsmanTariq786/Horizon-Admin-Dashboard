'use client'

import { useState, useEffect } from 'react'

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedPlan, setSelectedPlan] = useState(null)

  const subscriptionPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      period: 'month',
      users: '1-5 users',
      storage: '50GB',
      support: 'Email support',
      features: ['Basic analytics', 'Standard support', 'Community access'],
      popular: false,
      color: 'from-blue-500 to-cyan-500',
      icon: '📊'
    },
    {
      id: 2,
      name: 'Pro',
      price: 99,
      period: 'month',
      users: 'Up to 20 users',
      storage: '200GB',
      support: 'Priority support',
      features: ['Advanced analytics', 'API access', 'Custom reports', '24/7 support'],
      popular: true,
      color: 'from-purple-500 to-pink-500',
      icon: '🚀'
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 299,
      period: 'month',
      users: 'Unlimited users',
      storage: '1TB+',
      support: 'Dedicated support',
      features: ['All Pro features', 'Custom integrations', 'SLA guarantee', 'Dedicated account manager'],
      popular: false,
      color: 'from-emerald-500 to-green-500',
      icon: '🏢'
    }
  ]

  const mockSubscriptions = [
    {
      id: 'SUB-001',
      customer: 'Alex Johnson',
      email: 'alex@example.com',
      plan: 'Pro',
      status: 'active',
      users: 12,
      price: 99,
      renews: '2024-02-27',
      avatar: 'AJ',
      avatarColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'SUB-002',
      customer: 'Sarah Miller',
      email: 'sarah@company.com',
      plan: 'Basic',
      status: 'active',
      users: 3,
      price: 29,
      renews: '2024-03-15',
      avatar: 'SM',
      avatarColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 'SUB-003',
      customer: 'Michael Chen',
      email: 'michael@business.com',
      plan: 'Enterprise',
      status: 'active',
      users: 45,
      price: 299,
      renews: '2024-02-10',
      avatar: 'MC',
      avatarColor: 'from-emerald-500 to-green-500'
    },
    {
      id: 'SUB-004',
      customer: 'Emma Davis',
      email: 'emma@startup.io',
      plan: 'Pro',
      status: 'cancelled',
      users: 8,
      price: 99,
      renews: '2024-01-30',
      avatar: 'ED',
      avatarColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 'SUB-005',
      customer: 'James Wilson',
      email: 'james@enterprise.com',
      plan: 'Basic',
      status: 'pending',
      users: 5,
      price: 29,
      renews: '2024-02-05',
      avatar: 'JW',
      avatarColor: 'from-rose-500 to-red-500'
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setSubscriptions(mockSubscriptions)
      setLoading(false)
    }, 800)
  }, [])

  const filteredSubscriptions = filter === 'all' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.status === filter)

  const stats = {
    total: subscriptions.reduce((sum, sub) => sum + sub.price, 0),
    active: subscriptions.filter(sub => sub.status === 'active').reduce((sum, sub) => sum + sub.price, 0),
    activeCount: subscriptions.filter(sub => sub.status === 'active').length,
    totalUsers: subscriptions.reduce((sum, sub) => sum + sub.users, 0)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400'
      case 'cancelled': return 'bg-rose-500/20 text-rose-400'
      case 'pending': return 'bg-amber-500/20 text-amber-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Basic': return 'from-blue-500 to-cyan-500'
      case 'Pro': return 'from-purple-500 to-pink-500'
      case 'Enterprise': return 'from-emerald-500 to-green-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
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
          <p className="mt-4 text-gray-400">Loading subscriptions...</p>
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
            Subscriptions
          </h1>
          <p className="text-gray-400 mt-2">Manage subscription plans and customer accounts</p>
        </div>
        <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2">
          <span>+</span>
          <span>New Subscription</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm mb-2">Monthly Revenue</p>
              <p className="text-3xl font-bold">${stats.total}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20">
              <span className="text-xl">💰</span>
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
              <p className="text-emerald-300 text-sm mb-2">Active Subscriptions</p>
              <p className="text-3xl font-bold">{stats.activeCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <span className="text-xl">📈</span>
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
              <p className="text-purple-300 text-sm mb-2">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/20">
              <span className="text-xl">👥</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-purple-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-300 text-sm mb-2">Renewals This Week</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20">
              <span className="text-xl">🔄</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 bg-amber-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full w-1/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Available Plans</h2>
          <div className="text-sm text-gray-400">Monthly billing · Cancel anytime</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-gradient-to-br from-gray-900 to-black border rounded-2xl p-6 relative transition-all hover:scale-[1.02] ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' 
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{plan.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">👥</span>
                  <span className="text-sm">{plan.users}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">💾</span>
                  <span className="text-sm">{plan.storage} Storage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">🛟</span>
                  <span className="text-sm">{plan.support}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-xl font-medium transition-all ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
                  : 'bg-white/10 hover:bg-white/20'
              }`}>
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Subscriptions */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Active Subscriptions</h2>
          <div className="flex space-x-2">
            {['all', 'active', 'cancelled', 'pending'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm capitalize ${
                  filter === status
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSubscriptions.map((subscription) => (
            <div 
              key={subscription.id}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subscription.avatarColor} flex items-center justify-center`}>
                    <span className="text-sm font-bold">{subscription.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{subscription.customer}</h3>
                    <p className="text-sm text-gray-400">{subscription.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                  {subscription.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-gray-400 mb-1">Plan</div>
                  <div className="text-sm font-medium">{subscription.plan}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-xs text-gray-400 mb-1">Users</div>
                  <div className="text-sm font-medium">{subscription.users} users</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <div className="text-lg font-bold">${subscription.price}</div>
                  <div className="text-sm text-gray-400">Renews {formatDate(subscription.renews)}</div>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-white/10 rounded-lg" title="Edit">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg" title="Cancel">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg" title="Renew">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-blue-400">98%</div>
          <div className="text-sm text-gray-400 mt-1">Retention Rate</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-emerald-400">4.8/5</div>
          <div className="text-sm text-gray-400 mt-1">Satisfaction</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-purple-400">12</div>
          <div className="text-sm text-gray-400 mt-1">Upgrades This Month</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-amber-400">3.2 days</div>
          <div className="text-sm text-gray-400 mt-1">Avg. Response Time</div>
        </div>
      </div>
    </div>
  )
}