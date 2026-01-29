'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  UsersIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  ReceiptRefundIcon, 
  CogIcon, 
  LifebuoyIcon, 
  DocumentReportIcon, 
  ArchiveIcon, 
  ArrowRightOnRectangleIcon, 
  SparklesIcon 
} from './Icons'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Invoices', href: '/invoices', icon: DocumentTextIcon },
  { name: 'Payments', href: '/payments', icon: CreditCardIcon },
  { name: 'Refunds', href: '/refunds', icon: ReceiptRefundIcon },
  { name: 'Reports', href: '/reports', icon: DocumentReportIcon },
  { name: 'Subscriptions', href: '/subscriptions', icon: ArchiveIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
  { name: 'Support', href: '/support', icon: LifebuoyIcon },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-full bg-black/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Fixed Header */}
      <div className="p-6 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Horizon
          </span>
        </div>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Main Menu
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white border border-white/5' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
              )}
            </Link>
          )
        })}
      </div>

      {/* Fixed Footer */}
      <div className="p-4 border-t border-white/5 flex-shrink-0">
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-3 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
            <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
              <span className="font-bold text-sm">JD</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate">Admin</p>
          </div>
          <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  )
}
