'use client'

import { useState } from 'react'

export default function LogsPage() {
  const [logs] = useState([
    { id: 1, timestamp: '2024-01-27T10:30:45.123Z', level: 'ERROR', message: 'Database connection failed', source: 'api-server-1' },
    { id: 2, timestamp: '2024-01-27T10:31:22.456Z', level: 'WARN', message: 'High memory usage detected', source: 'worker-3' },
    { id: 3, timestamp: '2024-01-27T10:32:15.789Z', level: 'INFO', message: 'User login successful', source: 'auth-service' },
    { id: 4, timestamp: '2024-01-27T10:33:01.234Z', level: 'ERROR', message: 'Payment processing timeout', source: 'payment-service' },
    { id: 5, timestamp: '2024-01-27T10:34:45.678Z', level: 'DEBUG', message: 'Cache miss for key: user:1234', source: 'cache-service' },
    { id: 6, timestamp: '2024-01-27T10:35:30.901Z', level: 'INFO', message: 'Daily backup completed', source: 'backup-service' },
    { id: 7, timestamp: '2024-01-27T10:36:15.345Z', level: 'ERROR', message: 'External API rate limit exceeded', source: 'integration-service' },
    { id: 8, timestamp: '2024-01-27T10:36:45.678Z', level: 'INFO', message: 'User profile updated', source: 'user-service' },
    { id: 9, timestamp: '2024-01-27T10:37:12.901Z', level: 'CRITICAL', message: 'Disk space below 5%', source: 'storage-1' },
    { id: 10, timestamp: '2024-01-27T10:37:45.123Z', level: 'WARN', message: 'Slow database query detected', source: 'db-primary' },
  ])

  const [autoRefresh, setAutoRefresh] = useState(false)
  const [filterLevel, setFilterLevel] = useState('ALL')

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">System Logs</h1>
      <p className="text-gray-600 mb-8">Real-time system monitoring and log viewer</p>
      
      {/* Bad filter controls - misaligned and inconsistent */}
      <div className="bg-gray-800 text-white p-5 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Filter Logs</h3>
            <p className="text-gray-400 text-sm">View system logs in real-time</p>
          </div>
          <div className="flex items-center space-x-3">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="mr-2"
              />
              <span>Auto-refresh</span>
            </label>
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
              Export Logs
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setFilterLevel('ALL')}
            className={`px-4 py-2 rounded ${filterLevel === 'ALL' ? 'bg-white text-black' : 'bg-gray-700'}`}
          >
            All Logs
          </button>
          <button 
            onClick={() => setFilterLevel('ERROR')}
            className={`px-4 py-2 rounded ${filterLevel === 'ERROR' ? 'bg-red-500' : 'bg-gray-700'}`}
          >
            Errors Only
          </button>
          <button 
            onClick={() => setFilterLevel('WARN')}
            className={`px-4 py-2 rounded ${filterLevel === 'WARN' ? 'bg-yellow-500' : 'bg-gray-700'}`}
          >
            Warnings
          </button>
          <button 
            onClick={() => setFilterLevel('INFO')}
            className={`px-4 py-2 rounded ${filterLevel === 'INFO' ? 'bg-green-500' : 'bg-gray-700'}`}
          >
            Info
          </button>
          <button 
            onClick={() => setFilterLevel('DEBUG')}
            className={`px-4 py-2 rounded ${filterLevel === 'DEBUG' ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            Debug
          </button>
          <button 
            onClick={() => setFilterLevel('CRITICAL')}
            className={`px-4 py-2 rounded ${filterLevel === 'CRITICAL' ? 'bg-purple-500' : 'bg-gray-700'}`}
          >
            Critical
          </button>
        </div>
        
        <div className="mt-4 flex items-center space-x-4">
          <input 
            type="text" 
            placeholder="Search log messages..." 
            className="flex-1 px-3 py-2 rounded text-black" 
          />
          <select className="px-3 py-2 rounded text-black">
            <option>Last hour</option>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Logs table with terrible formatting and overflow */}
      <div className="bg-black text-gray-300 font-mono text-sm rounded-lg overflow-hidden mb-8">
        <div className="p-4 bg-gray-900 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="font-semibold">Live System Logs</span>
            <span className="ml-4 text-gray-400">Streaming real-time...</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-400">{logs.length} entries</span>
            <button className="text-gray-400 hover:text-white">⏸️</button>
            <button className="text-gray-400 hover:text-white">⏹️</button>
            <button className="text-gray-400 hover:text-white">⏏️</button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          <div className="p-4 space-y-1">
            {logs
              .filter(log => filterLevel === 'ALL' || log.level === filterLevel)
              .map(log => (
                <div key={log.id} className={`flex hover:bg-gray-900 p-3 border-l-4 ${
                  log.level === 'ERROR' ? 'border-red-500 text-red-300' : 
                  log.level === 'WARN' ? 'border-yellow-500 text-yellow-300' : 
                  log.level === 'CRITICAL' ? 'border-purple-500 text-purple-300' : 
                  log.level === 'INFO' ? 'border-green-500 text-green-300' : 
                  'border-blue-500 text-blue-300'
                }`}>
                  <div className="w-48 text-gray-500 font-light">{log.timestamp}</div>
                  <div className="w-28">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      log.level === 'ERROR' ? 'bg-red-900' : 
                      log.level === 'WARN' ? 'bg-yellow-900' : 
                      log.level === 'CRITICAL' ? 'bg-purple-900' : 
                      log.level === 'INFO' ? 'bg-green-900' : 
                      'bg-blue-900'
                    }`}>
                      {log.level}
                    </span>
                  </div>
                  <div className="flex-1 font-medium">{log.message}</div>
                  <div className="w-48 text-gray-400 text-right">{log.source}</div>
                </div>
              ))
            }
            
            {/* Fake streaming logs - bad animation */}
            {autoRefresh && Array.from({ length: 5 }).map((_, i) => (
              <div key={`stream-${i}`} className="flex p-3 text-gray-500 animate-pulse">
                <div className="w-48">2024-01-27T10:{37 + i}:00.000Z</div>
                <div className="w-28">
                  <span className="px-3 py-1 rounded bg-gray-800 text-xs">INFO</span>
                </div>
                <div className="flex-1">Heartbeat from service-{i + 1}</div>
                <div className="w-48 text-right">service-{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-gray-900 border-t border-gray-800 flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            Log retention: 30 days • Total size: 245.6 MB
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white text-sm">Previous</button>
            <span className="text-gray-400">Page 1 of 5</span>
            <button className="text-gray-400 hover:text-white text-sm">Next</button>
          </div>
        </div>
      </div>
      
      {/* Stats with bad layout and colors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-5 rounded-xl shadow">
          <div className="text-3xl font-bold mb-2">42</div>
          <div className="text-lg">Errors Today</div>
          <div className="text-sm opacity-80 mt-2">↑ 18% from yesterday</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-5 rounded-xl shadow">
          <div className="text-3xl font-bold mb-2">156</div>
          <div className="text-lg">Warnings</div>
          <div className="text-sm opacity-80 mt-2">↓ 5% from yesterday</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-xl shadow">
          <div className="text-3xl font-bold mb-2">2,345</div>
          <div className="text-lg">Info Logs</div>
          <div className="text-sm opacity-80 mt-2">↔ Stable</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-5 rounded-xl shadow">
          <div className="text-3xl font-bold mb-2">98.7%</div>
          <div className="text-lg">Uptime</div>
          <div className="text-sm opacity-80 mt-2">Last 30 days</div>
        </div>
      </div>
      
      {/* Additional broken controls */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-4">Log Management</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-3">Archive Logs</h4>
            <select className="w-full border rounded px-3 py-2 mb-3">
              <option>Select date range...</option>
              <option>January 2024</option>
              <option>December 2023</option>
              <option>Older logs</option>
            </select>
            <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">
              Archive Selected
            </button>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Log Retention</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="retention" defaultChecked className="mr-2" />
                <span>30 days</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="retention" className="mr-2" />
                <span>90 days</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="retention" className="mr-2" />
                <span>1 year</span>
              </label>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Update Policy
            </button>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Danger Zone</h4>
            <p className="text-sm text-gray-600 mb-4">Permanently delete logs</p>
            <div className="space-y-3">
              <button className="w-full bg-red-100 text-red-700 py-2 rounded border border-red-300 hover:bg-red-200">
                Delete Old Logs
              </button>
              <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Purge All Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}