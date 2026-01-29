'use client'

import { useState, useEffect } from 'react'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)
  const [activeMetric, setActiveMetric] = useState('overview')

  // Mock analytics data
  const [analyticsData, setAnalyticsData] = useState(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalyticsData({
        overview: {
          visits: 25487,
          uniqueVisitors: 19823,
          pageViews: 89234,
          avgSession: '2m 34s',
          bounceRate: 32.5,
          conversionRate: 3.8
        },
        traffic: {
          direct: 35,
          organic: 28,
          social: 22,
          referral: 12,
          paid: 3
        },
        performance: {
          loadTime: 1.24,
          apiResponse: 124,
          uptime: 99.98,
          errors: 0.12
        },
        engagement: {
          pagesPerVisit: 4.8,
          avgDuration: '3m 12s',
          returningRate: 42.3,
          newVisitors: 57.7
        },
        charts: {
          visits: [65, 78, 90, 85, 92, 98, 105],
          revenue: [45, 52, 61, 58, 67, 72, 79],
          conversions: [2.3, 2.8, 3.2, 2.9, 3.5, 3.8, 4.2],
          timeLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        topPages: [
          { page: '/dashboard', views: 12457, change: 12.5 },
          { page: '/pricing', views: 8567, change: 8.2 },
          { page: '/features', views: 6543, change: -3.4 },
          { page: '/blog', views: 5234, change: 15.8 },
          { page: '/contact', views: 3123, change: 5.6 }
        ],
        devices: [
          { device: 'Desktop', percentage: 58, color: 'from-blue-500 to-cyan-500' },
          { device: 'Mobile', percentage: 32, color: 'from-purple-500 to-pink-500' },
          { device: 'Tablet', percentage: 10, color: 'from-emerald-500 to-green-500' }
        ],
        locations: [
          { country: 'United States', visitors: 12457, change: 12.5 },
          { country: 'United Kingdom', visitors: 8567, change: 8.2 },
          { country: 'Germany', visitors: 6543, change: -3.4 },
          { country: 'Canada', visitors: 5234, change: 15.8 },
          { country: 'Australia', visitors: 3123, change: 5.6 }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [timeRange])

  const getTrendColor = (value) => {
    if (value > 0) return 'text-green-400 bg-green-500/20'
    if (value < 0) return 'text-red-400 bg-red-500/20'
    return 'text-gray-400 bg-gray-500/20'
  }

  const getTrendIcon = (value) => {
    if (value > 0) return '↗'
    if (value < 0) return '↘'
    return '→'
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400">Loading analytics data...</p>
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
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Deep insights into your platform performance and user behavior</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'hover:bg-white/5'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2">
            <span>📊</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Navigation */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: '📈' },
          { id: 'traffic', label: 'Traffic', icon: '🚦' },
          { id: 'performance', label: 'Performance', icon: '⚡' },
          { id: 'engagement', label: 'Engagement', icon: '🎯' },
          { id: 'conversion', label: 'Conversion', icon: '💰' },
          { id: 'retention', label: 'Retention', icon: '🔄' }
        ].map((metric) => (
          <button
            key={metric.id}
            onClick={() => setActiveMetric(metric.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${
              activeMetric === metric.id
                ? 'border-blue-500/50 bg-blue-500/20 text-blue-400'
                : 'border-white/10 text-gray-400 hover:bg-white/5'
            }`}
          >
            <span>{metric.icon}</span>
            <span>{metric.label}</span>
          </button>
        ))}
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Visits */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-300 text-sm mb-2">Total Visits</p>
              <p className="text-3xl font-bold">{analyticsData.overview.visits.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20">
              <span className="text-sm font-medium text-blue-400">↗ 12.5%</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-4/5"></div>
            </div>
            <p className="text-blue-300 text-xs mt-2">+2,456 from last period</p>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-300 text-sm mb-2">Unique Visitors</p>
              <p className="text-3xl font-bold">{analyticsData.overview.uniqueVisitors.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/20">
              <span className="text-sm font-medium text-purple-400">↗ 8.2%</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-purple-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-3/4"></div>
            </div>
            <p className="text-purple-300 text-xs mt-2">78% of total visits</p>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-300 text-sm mb-2">Page Views</p>
              <p className="text-3xl font-bold">{analyticsData.overview.pageViews.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <span className="text-sm font-medium text-emerald-400">↗ 15.8%</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 rounded-full w-5/6"></div>
            </div>
            <p className="text-emerald-300 text-xs mt-2">3.5 pages per visit</p>
          </div>
        </div>

        {/* Avg Session Duration */}
        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-300 text-sm mb-2">Avg Session</p>
              <p className="text-3xl font-bold">{analyticsData.overview.avgSession}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20">
              <span className="text-sm font-medium text-amber-400">↗ 5.6%</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-amber-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full w-2/3"></div>
            </div>
            <p className="text-amber-300 text-xs mt-2">+45s from last month</p>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="bg-gradient-to-br from-rose-900/30 to-rose-950/30 border border-rose-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-300 text-sm mb-2">Bounce Rate</p>
              <p className="text-3xl font-bold">{analyticsData.overview.bounceRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/20">
              <span className="text-sm font-medium text-rose-400">↘ 2.4%</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-rose-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-400 to-red-400 rounded-full w-1/3"></div>
            </div>
            <p className="text-rose-300 text-xs mt-2">Lower is better</p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-950/30 border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-300 text-sm mb-2">Conversion Rate</p>
              <p className="text-3xl font-bold">{analyticsData.overview.conversionRate}%</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/20">
              <span className="text-sm font-medium text-cyan-400">↗ 0.8%</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-1.5 bg-cyan-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full w-4/5"></div>
            </div>
            <p className="text-cyan-300 text-xs mt-2">Industry avg: 2.8%</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits Trend Chart */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Visits Trend</h3>
              <p className="text-gray-400 text-sm">Weekly performance overview</p>
            </div>
            <div className="text-sm text-gray-400">
              Last 7 days
            </div>
          </div>
          
          <div className="h-64 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0">
              <div className="h-full flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-white/5"></div>
                ))}
              </div>
            </div>
            
            {/* Chart Lines */}
            <div className="relative h-full flex items-end justify-between pt-8">
              {analyticsData.charts.visits.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1 px-2 group">
                  <div className="relative w-full flex justify-center">
                    <div 
                      className="w-8 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${value}%` }}
                    >
                      <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap">
                        {value}K visits
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs mt-2">{analyticsData.charts.timeLabels[index]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded mr-2"></div>
              <span className="text-sm text-gray-400">Visits</span>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Traffic Sources</h3>
              <p className="text-gray-400 text-sm">Where your visitors come from</p>
            </div>
            <div className="text-sm text-gray-400">Total: 100%</div>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Direct', value: analyticsData.traffic.direct, color: 'from-blue-500 to-cyan-500', icon: '🔗' },
              { label: 'Organic Search', value: analyticsData.traffic.organic, color: 'from-emerald-500 to-green-500', icon: '🔍' },
              { label: 'Social Media', value: analyticsData.traffic.social, color: 'from-purple-500 to-pink-500', icon: '👥' },
              { label: 'Referral', value: analyticsData.traffic.referral, color: 'from-amber-500 to-orange-500', icon: '↪️' },
              { label: 'Paid Ads', value: analyticsData.traffic.paid, color: 'from-rose-500 to-red-500', icon: '💰' }
            ].map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{source.icon}</span>
                    <span className="text-sm">{source.label}</span>
                  </div>
                  <span className="font-medium">{source.value}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${source.color}`}
                    style={{ width: `${source.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Top Performing Source</div>
              <div className="text-xl font-bold text-blue-400">Direct Traffic</div>
              <div className="text-xs text-gray-400 mt-1">35% of total traffic</div>
            </div>
          </div>
        </div>
      </div>

      {/* Devices and Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Devices */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Devices</h3>
              <p className="text-gray-400 text-sm">Visitor device breakdown</p>
            </div>
            <div className="text-sm text-gray-400">Total: 100%</div>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Pie Chart */}
              {analyticsData.devices.reduce((acc, device, index) => {
                const previousPercent = acc
                const percent = device.percentage
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
                                 index === 1 ? '#8b5cf6' : 
                                 '#10b981'};
                      }
                    `}</style>
                  </div>
                )
              }, 0)}
              
              {/* Center Circle */}
              <div className="absolute inset-0 m-auto w-32 h-32 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-gray-400">Total</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            {analyticsData.devices.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${device.color} mr-3`}></div>
                  <span className="text-sm">{device.device}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{device.percentage}%</span>
                  <div className="text-xs text-gray-400">
                    {device.device === 'Desktop' ? '↑ 5.2%' : 
                     device.device === 'Mobile' ? '↑ 8.7%' : '↓ 2.1%'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Top Locations</h3>
              <p className="text-gray-400 text-sm">Visitor geographic distribution</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300">
              View All →
            </button>
          </div>
          
          <div className="space-y-4">
            {analyticsData.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                    <span className="text-lg">
                      {location.country === 'United States' ? '🇺🇸' :
                       location.country === 'United Kingdom' ? '🇬🇧' :
                       location.country === 'Germany' ? '🇩🇪' :
                       location.country === 'Canada' ? '🇨🇦' : '🇦🇺'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{location.country}</p>
                    <p className="text-sm text-gray-400">{location.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTrendColor(location.change)}`}>
                    {getTrendIcon(location.change)} {Math.abs(location.change)}%
                  </span>
                  <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs text-blue-400 hover:text-blue-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-emerald-300">Fastest Growing</div>
                <div className="text-lg font-bold text-emerald-400">Canada</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-400">↗ 15.8%</div>
                <div className="text-xs text-emerald-300">Growth rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{analyticsData.performance.loadTime}s</div>
            <div className="text-sm text-blue-300 mt-1">Load Time</div>
            <div className={`text-xs mt-2 ${analyticsData.performance.loadTime < 1.5 ? 'text-green-400' : 'text-amber-400'}`}>
              {analyticsData.performance.loadTime < 1.5 ? 'Excellent' : 'Needs improvement'}
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border border-emerald-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{analyticsData.performance.apiResponse}ms</div>
            <div className="text-sm text-emerald-300 mt-1">API Response</div>
            <div className="text-green-400 text-xs mt-2">Optimal</div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{analyticsData.performance.uptime}%</div>
            <div className="text-sm text-purple-300 mt-1">Uptime</div>
            <div className="text-green-400 text-xs mt-2">Perfect</div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-900/20 to-rose-950/20 border border-rose-500/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-400">{analyticsData.performance.errors}%</div>
            <div className="text-sm text-rose-300 mt-1">Error Rate</div>
            <div className="text-green-400 text-xs mt-2">Very Low</div>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Top Performing Pages</h3>
            <p className="text-gray-400 text-sm">Most viewed pages this period</p>
          </div>
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
            <option>By Page Views</option>
            <option>By Time on Page</option>
            <option>By Conversion Rate</option>
          </select>
        </div>
        
        <div className="space-y-4">
          {analyticsData.topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <span className="text-lg">📄</span>
                </div>
                <div>
                  <p className="font-medium font-mono text-sm">{page.page}</p>
                  <p className="text-sm text-gray-400">{page.views.toLocaleString()} views</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className={`text-sm font-medium ${getTrendColor(page.change).split(' ')[0]}`}>
                    {getTrendIcon(page.change)} {Math.abs(page.change)}%
                  </div>
                  <div className="text-xs text-gray-400">Change</div>
                </div>
                <div className="w-32">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `${(page.views / analyticsData.topPages[0].views) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}