'use client'

import { useState } from 'react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New user registered', message: 'John Doe has created an account', time: '2 minutes ago', read: false, type: 'user' },
    { id: 2, title: 'Payment failed', message: 'Payment of $99.99 failed for user@example.com', time: '15 minutes ago', read: false, type: 'payment' },
    { id: 3, title: 'System warning', message: 'High CPU usage detected on server-1', time: '1 hour ago', read: true, type: 'system' },
    { id: 4, title: 'Subscription upgraded', message: 'User upgraded to Pro plan', time: '2 hours ago', read: true, type: 'subscription' },
    { id: 5, title: 'API limit reached', message: 'API rate limit reached for external-service', time: '5 hours ago', read: true, type: 'api' },
    { id: 6, title: 'Backup completed', message: 'Nightly backup completed successfully', time: 'Yesterday', read: true, type: 'system' },
    { id: 7, title: 'Security alert', message: 'Multiple failed login attempts detected', time: '2 days ago', read: true, type: 'security' },
  ])

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Notifications</h1>
      <p className="text-gray-600 mb-8">System alerts and user notifications</p>
      
      {/* Bad header layout */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Notification Center</h2>
            <p className="opacity-90">Manage system alerts and messages</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{notifications.filter(n => !n.read).length}</div>
            <div className="text-sm">Unread notifications</div>
          </div>
        </div>
      </div>
      
      {/* Confusing controls */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">All</button>
          <button className="px-4 py-2 bg-gray-100 rounded">Unread</button>
          <button className="px-4 py-2 bg-gray-100 rounded">System</button>
          <button className="px-4 py-2 bg-gray-100 rounded">Users</button>
          <button className="px-4 py-2 bg-gray-100 rounded">Payments</button>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Mark all as read
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            Clear all
          </button>
        </div>
      </div>
      
      {/* Messy notifications list */}
      <div className="space-y-4 mb-8">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`p-5 rounded-xl shadow border-l-4 ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            } ${
              notification.type === 'system' ? 'border-blue-500' :
              notification.type === 'payment' ? 'border-green-500' :
              notification.type === 'user' ? 'border-purple-500' :
              notification.type === 'security' ? 'border-red-500' :
              'border-yellow-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  notification.type === 'system' ? 'bg-blue-100 text-blue-600' :
                  notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                  notification.type === 'user' ? 'bg-purple-100 text-purple-600' :
                  notification.type === 'security' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {notification.type === 'system' ? '⚙️' :
                   notification.type === 'payment' ? '💳' :
                   notification.type === 'user' ? '👤' :
                   notification.type === 'security' ? '🔒' : '📊'}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold mr-3">{notification.title}</h3>
                    {!notification.read && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">NEW</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center mt-3 space-x-4">
                    <span className="text-sm text-gray-500">{notification.time}</span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      notification.type === 'system' ? 'bg-blue-100 text-blue-800' :
                      notification.type === 'payment' ? 'bg-green-100 text-green-800' :
                      notification.type === 'user' ? 'bg-purple-100 text-purple-800' :
                      notification.type === 'security' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {notification.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                  >
                    Mark read
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notification.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Broken notification settings */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Email Notifications</h3>
            <div className="space-y-3">
              {['System alerts', 'User registrations', 'Payment failures', 'Security alerts', 'Daily reports'].map((type, i) => (
                <label key={i} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                  <span>{type}</span>
                  <input type="checkbox" defaultChecked={i < 3} className="w-5 h-5" />
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Push Notifications</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Notification Frequency</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Immediate</option>
                  <option>Hourly digest</option>
                  <option>Daily summary</option>
                  <option>Weekly report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Quiet Hours</label>
                <div className="flex space-x-3">
                  <input type="time" defaultValue="22:00" className="border rounded px-3 py-2" />
                  <span className="self-center">to</span>
                  <input type="time" defaultValue="07:00" className="border rounded px-3 py-2" />
                </div>
              </div>
              
              <div className="pt-4">
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}