'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        users: { total: 15423, change: 12.5, trend: 'up' },
        revenue: { total: 892456, change: 23.7, trend: 'up' },
        activeSubs: { total: 8923, change: 5.2, trend: 'up' },
        conversion: { value: 3.8, change: 0.5, trend: 'up' },
        performance: 94.7,
        engagement: 78.3
      })
      setLoading(false)
    }, 1000)
  }, [])

  // Chart data for beautiful visualizations
  const revenueData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 90 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 92 },
    { month: 'Jun', value: 98 },
    { month: 'Jul', value: 105 },
  ]

  const trafficData = [
    { source: 'Direct', value: 35, color: 'from-blue-500 to-cyan-500' },
    { source: 'Organic', value: 28, color: 'from-emerald-500 to-green-500' },
    { source: 'Social', value: 22, color: 'from-purple-500 to-pink-500' },
    { source: 'Paid', value: 15, color: 'from-amber-500 to-orange-500' },
  ]

  const recentActivity = [
    { id: 1, user: 'Alex Johnson', action: 'Upgraded to Pro', time: '2 min ago', avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 2, user: 'Sarah Miller', action: 'New subscription', time: '15 min ago', avatarColor: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 3, user: 'Michael Chen', action: 'Payment processed', time: '1 hour ago', avatarColor: 'bg-gradient-to-br from-emerald-500 to-green-500' },
    { id: 4, user: 'Emma Davis', action: 'Account created', time: '2 hours ago', avatarColor: 'bg-gradient-to-br from-amber-500 to-orange-500' },
    { id: 5, user: 'James Wilson', action: 'Support ticket resolved', time: '3 hours ago', avatarColor: 'bg-gradient-to-br from-rose-500 to-red-500' },
  ]

  const performanceData = [
    { metric: 'Response Time', value: '124ms', change: '+12ms', status: 'warning' },
    { metric: 'Uptime', value: '99.98%', change: '+0.02%', status: 'success' },
    { metric: 'Error Rate', value: '0.12%', change: '-0.03%', status: 'success' },
    { metric: 'Load Average', value: '1.24', change: '+0.18', status: 'warning' },
  ]

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading dashboard data...</p>
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
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your platform today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-xl hover:border-white/20 transition-all flex items-center space-x-2">
            <span>📊</span>
            <span>Export Report</span>
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2">
            <span>⚡</span>
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Stats Grid - Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-2">Total Users</p>
              <p className="text-3xl font-bold">{stats.users.total.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-xl ${stats.users.trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <span className={`text-sm font-medium ${stats.users.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stats.users.trend === 'up' ? '↗' : '↘'} {stats.users.change}%
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-gray-400 text-xs mt-2">75% of monthly target</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-300 text-sm mb-2">Monthly Revenue</p>
              <p className="text-3xl font-bold">${(stats.revenue.total / 1000).toFixed(1)}K</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20">
              <span className="text-sm font-medium text-blue-400">
                ↗ {stats.revenue.change}%
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                style={{ width: '85%' }}
              ></div>
            </div>
            <p className="text-blue-300 text-xs mt-2">+15.2K from last month</p>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-300 text-sm mb-2">Active Subscriptions</p>
              <p className="text-3xl font-bold">{stats.activeSubs.total.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <span className="text-sm font-medium text-emerald-400">
                ↗ {stats.activeSubs.change}%
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"
                style={{ width: '68%' }}
              ></div>
            </div>
            <p className="text-emerald-300 text-xs mt-2">92% retention rate</p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-300 text-sm mb-2">Conversion Rate</p>
              <p className="text-3xl font-bold">{stats.conversion.value}%</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/20">
              <span className="text-sm font-medium text-purple-400">
                ↗ {stats.conversion.change}%
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-purple-500/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                style={{ width: '92%' }}
              ></div>
            </div>
            <p className="text-purple-300 text-xs mt-2">Industry avg: 2.8%</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Revenue Trend</h3>
              <p className="text-gray-400 text-sm">Last 7 months performance</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
              <option>Last 7 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          
          {/* Beautiful Chart */}
          <div className="h-64 relative">
            <div className="absolute inset-0">
              {/* Grid Lines */}
              <div className="h-full flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-white/5"></div>
                ))}
              </div>
            </div>
            
            {/* Chart Bars */}
            <div className="relative h-full flex items-end justify-between pt-8">
              {revenueData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1 px-2">
                  <div className="relative w-full flex justify-center">
                    <div 
                      className="w-8 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${item.value}%` }}
                    >
                      <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap">
                        ${(item.value * 1000).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chart Legend */}
          <div className="flex justify-center space-x-6 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded mr-2"></div>
              <span className="text-sm text-gray-400">Monthly Revenue</span>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Traffic Sources</h3>
              <p className="text-gray-400 text-sm">Current month distribution</p>
            </div>
            <div className="text-sm text-gray-400">Total: 100%</div>
          </div>
          
          {/* Pie Chart Visualization */}
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Pie Chart Segments */}
              {trafficData.reduce((acc, item, index) => {
                const previousPercent = acc
                const percent = item.value
                const rotation = previousPercent * 3.6
                const gradientRotation = rotation - 90
                
                return (
                  <div key={index}>
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(from ${gradientRotation}deg, transparent ${previousPercent}%, var(--color) ${previousPercent}% ${previousPercent + percent}%, transparent ${previousPercent + percent}%)`,
                      }}
                    />
                    <style jsx>{`
                      :root {
                        --color: ${index === 0 ? '#3b82f6' : 
                                 index === 1 ? '#10b981' : 
                                 index === 2 ? '#8b5cf6' : 
                                 '#f59e0b'};
                      }
                    `}</style>
                  </div>
                )
              }, 0)}
              
              {/* Center Circle */}
              <div className="absolute inset-0 m-auto w-32 h-32 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-gray-400">Total Traffic</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {trafficData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} mr-3`}></div>
                  <span className="text-sm">{item.source}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <p className="text-gray-400 text-sm">Latest user interactions</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300">
              View All →
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl ${activity.avatarColor} flex items-center justify-center`}>
                    <span className="text-sm font-semibold">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-400">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400">{activity.time}</span>
                  <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs text-blue-400 hover:text-blue-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">System Performance</h3>
            <p className="text-gray-400 text-sm">Real-time metrics</p>
          </div>
          
          <div className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">{item.metric}</span>
                  <span className={`text-sm font-medium ${
                    item.status === 'success' ? 'text-green-400' : 
                    item.status === 'warning' ? 'text-amber-400' : 
                    'text-red-400'
                  }`}>
                    {item.change}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{item.value}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'success' ? 'bg-green-500' : 
                    item.status === 'warning' ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Overall Performance */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.performance}%</div>
              <div className="text-sm text-gray-400 mt-1">Overall Performance Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-green-400">24/7</div>
          <div className="text-sm text-gray-400 mt-1">Uptime</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-cyan-400">1.2s</div>
          <div className="text-sm text-gray-400 mt-1">Avg. Response</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-purple-400">99.9%</div>
          <div className="text-sm text-gray-400 mt-1">SLA Compliance</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-2xl font-bold text-amber-400">0.03%</div>
          <div className="text-sm text-gray-400 mt-1">Error Rate</div>
        </div>
      </div>
    </div>
  )
}