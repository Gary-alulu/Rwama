export default function FarmerDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Deliveries</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,250 kg</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Pending Payments</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">KES 45,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Current Earnings</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">KES 120,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Quality Grade</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">A</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery History</h2>
          <p className="text-gray-500">Your recent cherry deliveries will appear here.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Production Analytics</h2>
          <p className="text-gray-500">Seasonal performance and yield tracking.</p>
        </div>
      </div>
    </div>
  )
}
