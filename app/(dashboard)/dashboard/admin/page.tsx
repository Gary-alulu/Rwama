export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Platform Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Production</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">124,500 kg</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Farmers</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">3,450</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Marketplace Lots</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">45</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Pending Payouts</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">KES 2.4M</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
          <p className="text-gray-500">Manage farmers, buyers, factory staff, and cooperative staff.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Marketplace Management</h2>
          <p className="text-gray-500">Approve listings, manage featured coffees, control visibility.</p>
        </div>
      </div>
    </div>
  )
}
