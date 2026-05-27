import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Placeholder */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-amber-900 mb-8">RWAMA</h2>
        <nav className="space-y-4">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Menu</p>
          <a href="/" className="block text-gray-700 hover:text-amber-700">Home</a>
          {/* We would render links dynamically based on role here */}
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
