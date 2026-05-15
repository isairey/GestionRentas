 import Link from 'next/link'
import { Users, MessageSquare,PlusCircle,FileText, Bell, CreditCard} from 'lucide-react'

const QuickActions = () => { 
const actions = [
    {
      title: 'Manage Tenants',
      description: 'View all tenants',
      icon: <Users className="w-5 h-5" />,
      href: '/admin/tenants',
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Post Update',
      description: 'Send announcement',
      icon: <Bell className="w-5 h-5" />,
      href: '/admin/updates',
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: 'Add Room',
      description: 'New vacancy',
      icon: <PlusCircle className="w-5 h-5" />,
      href: '/admin/rooms',
      color: 'from-green-600 to-green-700'
    },
    {
      title: 'View Payments',
      description: 'Rent tracking',
      icon: <CreditCard className="w-5 h-5" />,
      href: '/admin/payments',
      color: 'from-orange-600 to-orange-700'
    },
    {
      title: 'Messages',
      description: 'Tenant inquiries',
      icon: <MessageSquare className="w-5 h-5" />,
      href: '/admin/messages',
      color: 'from-pink-600 to-pink-700'
    },
    {
      title: 'Applications',
      description: 'Review new apps',
      icon: <FileText className="w-5 h-5" />,
      href: '/admin/applications',
      color: 'from-cyan-600 to-cyan-700'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 w-100%">
      <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`bg-gradient-to-br ${action.color} rounded-xl p-4 hover:scale-[1.02] transition-transform group`}
          >
            <div className="flex flex-col items-center text-center text-white">
              <div className="mb-3 p-2 bg-white/20 rounded-lg">
                {action.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
              <p className="text-xs text-white/70">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-400 text-center">
         Titan rental
        </p>
      </div>
    </div>
  )
}

export default QuickActions