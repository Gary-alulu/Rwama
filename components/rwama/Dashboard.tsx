"use client";

import { motion } from "framer-motion";
import {
    Activity,
    Award,
    Coffee,
    DollarSign,
    MapPin,
    TrendingUp,
    Users
} from "lucide-react";
import { useState } from "react";
import { FlavorRadar } from "./FlavorRadar";

// Mock data for dashboard
const dashboardData = {
  radar: [
    { label: "Acidity", value: 8.5 },
    { label: "Body", value: 7.2 },
    { label: "Sweetness", value: 8.8 },
    { label: "Aroma", value: 9.1 },
    { label: "Aftertaste", value: 8.3 },
    { label: "Balance", value: 8.7 },
  ],
  stats: [
    {
      label: "Total Farmers",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "gold",
    },
    {
      label: "Coffee Processed",
      value: "2,847 MT",
      change: "+8%",
      trend: "up",
      icon: Coffee,
      color: "forest",
    },
    {
      label: "Avg Cup Score",
      value: "86.4",
      change: "+1.2",
      trend: "up",
      icon: Award,
      color: "gold",
    },
    {
      label: "Revenue",
      value: "$1.2M",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "forest",
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "delivery",
      message: "New cherry delivery from Kimatu",
      time: "2 hours ago",
      factory: "Kimatu",
    },
    {
      id: 2,
      type: "cupping",
      message: "AA lot scored 89.5 points",
      time: "4 hours ago",
      factory: "Muthigi-ini",
    },
    {
      id: 3,
      type: "export",
      message: "15 MT shipped to Nordic Approach",
      time: "1 day ago",
      factory: "Muburi",
    },
    {
      id: 4,
      type: "member",
      message: "23 new farmers registered",
      time: "2 days ago",
      factory: "All",
    },
  ],
  factoryPerformance: [
    { name: "Muthigi-ini", processed: 980, cupScore: 87.2, farmers: 430 },
    { name: "Kimatu", processed: 850, cupScore: 86.8, farmers: 390 },
    { name: "Muburi", processed: 720, cupScore: 87.5, farmers: 380 },
  ],
};

export function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedFactory, setSelectedFactory] = useState("all");

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6 md:p-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-[32px] md:text-[40px] text-[var(--color-forest)] leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Cooperative Dashboard
            </h1>
            <p className="text-[14px] text-[rgba(18,53,36,0.6)] mt-1">
              Real-time insights from Rwama Coffee Cooperative
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2.5 bg-white border border-[rgba(18,53,36,0.1)] rounded-full text-[13px] text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-gold)] cursor-pointer"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last quarter</option>
            </select>

            <button className="px-4 py-2.5 bg-[var(--color-forest)] text-white rounded-full text-[13px] hover:bg-[var(--color-gold)] hover:text-[var(--color-forest)] transition-colors duration-300">
              Export Report
            </button>
          </div>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-[24px] p-6 border border-[rgba(18,53,36,0.06)] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${
                  stat.color === "gold"
                    ? "bg-[rgba(200,169,107,0.15)]"
                    : "bg-[rgba(18,53,36,0.08)]"
                }`}
              >
                <stat.icon
                  className={`w-5 h-5 ${stat.color === "gold" ? "text-[var(--color-gold)]" : "text-[var(--color-forest)]"}`}
                />
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium ${
                  stat.trend === "up"
                    ? "bg-[rgba(34,197,94,0.1)] text-green-600"
                    : "bg-[rgba(239,68,68,0.1)] text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingUp className="w-3 h-3 rotate-180" />
                )}
                {stat.change}
              </div>
            </div>

            <div>
              <p className="text-[13px] text-[rgba(18,53,36,0.5)] mb-1">
                {stat.label}
              </p>
              <p
                className="text-[28px] font-light text-[var(--color-forest)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-[24px] p-6 border border-[rgba(18,53,36,0.06)] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-[20px] text-[var(--color-forest)] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Recent Activity
              </h3>
              <p className="text-[13px] text-[rgba(18,53,36,0.5)]">
                Real-time updates from all three washing stations
              </p>
            </div>
            <button className="text-[13px] text-[var(--color-gold)] hover:text-[var(--color-forest)] transition-colors font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="flex items-start gap-4 p-4 rounded-[16px] bg-[rgba(18,53,36,0.02)] hover:bg-[rgba(18,53,36,0.04)] transition-colors cursor-pointer group"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "delivery"
                      ? "bg-[rgba(200,169,107,0.15)]"
                      : activity.type === "cupping"
                        ? "bg-[rgba(34,197,94,0.15)]"
                        : activity.type === "export"
                          ? "bg-[rgba(59,130,246,0.15)]"
                          : "bg-[rgba(168,85,247,0.15)]"
                  }`}
                >
                  <Activity
                    className={`w-4 h-4 ${
                      activity.type === "delivery"
                        ? "text-[var(--color-gold)]"
                        : activity.type === "cupping"
                          ? "text-green-600"
                          : activity.type === "export"
                            ? "text-blue-600"
                            : "text-purple-600"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[var(--color-forest)] font-medium mb-0.5 group-hover:text-[var(--color-gold)] transition-colors">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-3 text-[12px] text-[rgba(18,53,36,0.5)]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {activity.factory}
                    </span>
                    <span>·</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Factory Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-[24px] p-6 border border-[rgba(18,53,36,0.06)] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        >
          <div className="mb-6">
            <h3
              className="text-[20px] text-[var(--color-forest)] mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Factory Performance
            </h3>
            <p className="text-[13px] text-[rgba(18,53,36,0.5)]">
              Current season metrics by washing station
            </p>
          </div>

          <div className="space-y-4">
            {dashboardData.factoryPerformance.map((factory, index) => (
              <motion.div
                key={factory.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="p-4 rounded-[16px] bg-[rgba(18,53,36,0.02)] hover:bg-[rgba(18,53,36,0.04)] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[15px] font-medium text-[var(--color-forest)]">
                    {factory.name}
                  </h4>
                  <span className="text-[13px] font-medium text-[var(--color-gold)]">
                    {factory.cupScore}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[rgba(18,53,36,0.5)]">Processed</span>
                    <span className="text-[var(--color-forest)]">
                      {factory.processed} MT
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[rgba(18,53,36,0.08)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(factory.processed / 1000) * 100}%`,
                      }}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="h-full bg-[var(--color-gold)] rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(18,53,36,0.06)]">
                  <span className="text-[12px] text-[rgba(18,53,36,0.5)]">
                    {factory.farmers} farmers
                  </span>
                  <span className="text-[11px] px-2 py-0.5 bg-[rgba(34,197,94,0.1)] text-green-600 rounded-full">
                    Active
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Flavor Radar */}
          <div className="mt-8 pt-8 border-t border-[rgba(18,53,36,0.08)]">
            <h4 className="text-[14px] font-medium text-[var(--color-forest)] mb-4 text-center">
              Average Cup Profile
            </h4>
            <div className="flex justify-center">
              <FlavorRadar data={dashboardData.radar} size={240} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export { dashboardData };
