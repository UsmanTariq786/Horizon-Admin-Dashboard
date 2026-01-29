import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar'
import { SparklesIcon, BellIcon } from './components/Icons'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata = {
  title: 'Horizon Dashboard',
  description: 'Premium admin dashboard with real-time analytics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white min-h-screen">
        <div className="flex h-screen ">
          <Sidebar />

          {/* Main Content Area */}
          <div className=" flex flex-col flex-1 overflow-y-auto">
            {/* Premium Top Navigation */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
              <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                  </div>
                  <div className="text-sm text-gray-400">
                    {/* <span className="font-mono">v3.1.4</span> */}
                    {/* <span className="mx-2">•</span> */}
                    {/* <span className="text-green-500 font-medium">Live</span> */}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search anything..."
                      className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm w-64 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center space-x-2">
                    <SparklesIcon />
                    <span>New Report</span>
                  </button>
                  
                  {/* Notifications */}
                  <button className="relative p-2 hover:bg-white/5 rounded-xl transition-colors">
                    <BellIcon />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  </button>
                </div>
              </div>
              
              {/* Breadcrumb */}
              {/* <div className="px-8 py-3 border-t border-white/5">
                <nav className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-400">Horizon</span>
                  <span className="text-gray-600">/</span>
                  <span className="text-gray-300">Dashboard</span>
                  <span className="text-gray-600">/</span>
                  <span className="text-white font-medium">Overview</span>
                </nav>
              </div> */}
            </header>

            {/* Main Content with Glass Effect */}
            <main className="flex-1 overflow-y-auto">
              <div className="p-8">
                {/* Glass Container for Content */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
                  {children}
                </div>
                
                {/* Footer */}
                <div className="mt-8 flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-6">
                    <span>© 2024 Horizon Platform</span>
                    <span className="text-gray-600">•</span>
                    <span>All rights reserved</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="hover:text-white transition-colors">Privacy</button>
                    <button className="hover:text-white transition-colors">Terms</button>
                    <button className="hover:text-white transition-colors">Help</button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}