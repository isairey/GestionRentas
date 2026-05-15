 import StatCards from './components/StatCards'
import QuickActions from './components/QuickActions'


const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
       <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 space-y-6">
             <QuickActions />
         </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage

