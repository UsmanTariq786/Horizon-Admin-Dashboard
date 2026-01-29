'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    company: 'Horizon Inc',
    email: 'admin@horizon.com',
    webhook: 'https://api.horizon.com/webhook',
    timezone: 'America/New_York',
    currency: 'USD',
    notifications: true,
    autoRefresh: true,
    darkMode: true,
    twoFactor: false
  })

  const [loading, setLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Singapore'
  ]

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD']

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your platform configuration and preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>{saveSuccess ? 'Saved!' : 'Save Changes'}</span>
            </>
          )}
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company Settings */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6">Company Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                <input
                  type="text"
                  value={settings.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Webhook URL</label>
                <input
                  type="url"
                  value={settings.webhook}
                  onChange={(e) => handleChange('webhook', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6">Preferences</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Security */}
        <div className="space-y-6">
          {/* Feature Toggles */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6">Feature Settings</h2>
            
            <div className="space-y-4">
              {[
                { key: 'notifications', label: 'Email Notifications', desc: 'Receive email alerts for important events' },
                { key: 'autoRefresh', label: 'Auto Refresh', desc: 'Automatically refresh dashboard data' },
                { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme interface' },
                { key: 'twoFactor', label: 'Two-Factor Auth', desc: 'Enable additional security layer' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-gray-400">{desc}</div>
                  </div>
                  <button
                    onClick={() => handleChange(key, !settings[key])}
                    className={`w-12 h-6 rounded-full transition-all ${settings[key] ? 'bg-emerald-500' : 'bg-gray-600'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${settings[key] ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6">System Status</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">99.9%</div>
                <div className="text-sm text-blue-300">Uptime</div>
              </div>
              
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-2xl font-bold text-emerald-400">2.1s</div>
                <div className="text-sm text-emerald-300">Avg Response</div>
              </div>
              
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400">0.03%</div>
                <div className="text-sm text-purple-300">Error Rate</div>
              </div>
              
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="text-2xl font-bold text-amber-400">24/7</div>
                <div className="text-sm text-amber-300">Support</div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-rose-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-rose-400">Danger Zone</h2>
            <p className="text-sm text-gray-400 mb-4">Irreversible actions that affect your data</p>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl hover:bg-rose-500/20 transition-all">
                Clear All Data
              </button>
              <button className="w-full px-4 py-3 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl hover:bg-rose-500/30 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Status */}
      {saveSuccess && (
        <div className="fixed bottom-8 right-8 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-xl backdrop-blur-sm animate-fadeIn">
          ✓ Settings saved successfully
        </div>
      )}
    </div>
  )
}