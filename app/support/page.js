'use client'

import { useState } from 'react'

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('tickets')
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  })

  const tickets = [
    { id: 1254, subject: 'Payment not processing', status: 'open', priority: 'high', created: '2 hours ago', replies: 2 },
    { id: 1253, subject: 'Account login issue', status: 'in-progress', priority: 'medium', created: '1 day ago', replies: 3 },
    { id: 1252, subject: 'Feature request', status: 'open', priority: 'low', created: '2 days ago', replies: 1 },
    { id: 1251, subject: 'Bug report', status: 'resolved', priority: 'high', created: '3 days ago', replies: 5 },
    { id: 1250, subject: 'Billing question', status: 'open', priority: 'medium', created: '4 days ago', replies: 1 }
  ]

  const knowledgeBase = [
    { title: 'Getting Started Guide', category: 'Getting Started', views: 1245 },
    { title: 'API Documentation', category: 'Development', views: 892 },
    { title: 'Billing & Payments FAQ', category: 'Billing', views: 567 },
    { title: 'Security Best Practices', category: 'Security', views: 423 },
    { title: 'Troubleshooting Common Issues', category: 'Troubleshooting', views: 789 }
  ]

  const stats = {
    open: 3,
    inProgress: 1,
    resolved: 1,
    avgResponse: '2.4 hours',
    satisfaction: '94%'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-400'
      case 'in-progress': return 'bg-amber-500/20 text-amber-400'
      case 'resolved': return 'bg-emerald-500/20 text-emerald-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-rose-500/20 text-rose-400'
      case 'medium': return 'bg-amber-500/20 text-amber-400'
      case 'low': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Ticket submitted! Our team will get back to you soon.')
    setNewTicket({ subject: '', category: 'technical', priority: 'medium', description: '' })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-gray-400 mt-2">Get help with your questions and issues</p>
        </div>
        <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all flex items-center space-x-2">
          <span>🆘</span>
          <span>Emergency Support</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">{stats.open}</div>
          <div className="text-sm text-blue-300">Open Tickets</div>
        </div>
        <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 rounded-xl p-4">
          <div className="text-2xl font-bold text-amber-400">{stats.inProgress}</div>
          <div className="text-sm text-amber-300">In Progress</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 border border-emerald-500/20 rounded-xl p-4">
          <div className="text-2xl font-bold text-emerald-400">{stats.resolved}</div>
          <div className="text-sm text-emerald-300">Resolved</div>
        </div>
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-500/20 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-400">{stats.avgResponse}</div>
          <div className="text-sm text-purple-300">Avg Response</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-950/30 border border-cyan-500/20 rounded-xl p-4">
          <div className="text-2xl font-bold text-cyan-400">{stats.satisfaction}</div>
          <div className="text-sm text-cyan-300">Satisfaction</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-white/10">
        {['tickets', 'knowledge', 'contact'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 border-b-2 transition-all capitalize ${activeTab === tab ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            {tab === 'tickets' ? 'My Tickets' : tab === 'knowledge' ? 'Knowledge Base' : 'Contact Support'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket List */}
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium mb-1">#{ticket.id} - {ticket.subject}</h3>
                      <p className="text-sm text-gray-400">{ticket.created} • {ticket.replies} replies</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      View Conversation
                    </button>
                    <button className="text-sm text-gray-400 hover:text-white">
                      ↻ Update
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* New Ticket Form */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Create New Ticket</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    >
                      <option value="technical">Technical</option>
                      <option value="billing">Billing</option>
                      <option value="account">Account</option>
                      <option value="feature">Feature Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20"
                    placeholder="Please provide detailed information about your issue..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Knowledge Base</h3>
              <input
                type="text"
                placeholder="Search articles..."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-64"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeBase.map((article, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">{article.title}</h4>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{article.views} views</span>
                    <button className="text-blue-400 hover:text-blue-300">
                      Read Article →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-blue-300">Support Availability</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border border-emerald-500/20">
              <div className="text-2xl font-bold text-emerald-400 mb-2">98%</div>
              <div className="text-sm text-emerald-300">First Contact Resolution</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400 mb-2">4.9/5</div>
              <div className="text-sm text-purple-300">Support Rating</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-gray-400 mb-4">For detailed inquiries and documentation</p>
              <div className="text-blue-400 font-mono">support@horizon.com</div>
              <p className="text-xs text-gray-400 mt-2">Response time: 4-6 hours</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-400 mb-4">For quick questions and immediate assistance</p>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:opacity-90 transition-all">
                Start Chat
              </button>
              <p className="text-xs text-gray-400 mt-2">Available 9AM-6PM EST</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-gray-400 mb-4">For urgent matters requiring direct conversation</p>
              <div className="text-blue-400 font-mono">+1 (800) 123-4567</div>
              <p className="text-xs text-gray-400 mt-2">24/7 emergency line available</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Community Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🌐</span>
                  <div>
                    <div className="font-medium">Community Forum</div>
                    <div className="text-sm text-gray-400">Connect with other users</div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📚</span>
                  <div>
                    <div className="font-medium">Documentation</div>
                    <div className="text-sm text-gray-400">Comprehensive guides</div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🎥</span>
                  <div>
                    <div className="font-medium">Video Tutorials</div>
                    <div className="text-sm text-gray-400">Step-by-step videos</div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📢</span>
                  <div>
                    <div className="font-medium">Status Updates</div>
                    <div className="text-sm text-gray-400">System status & announcements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}