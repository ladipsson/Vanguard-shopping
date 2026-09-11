import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  Download, 
  Calendar,
  Sparkles,
  Award,
  Clock,
  Shirt,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { ANALYTICS_DATA } from '../data/initialData';
import { Order } from '../types';

interface AnalyticsDashboardProps {
  orders: Order[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ orders }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'ytd'>('7d');

  const { overview, salesTrend7D, salesTrend30D, categorySales, customerSegments, inventoryInsights } = ANALYTICS_DATA;

  const currentTrendData = timeRange === '7d' ? salesTrend7D : salesTrend30D;

  const handleExportCSV = () => {
    const headers = 'Order Number,Date,Customer,City,Country,Payment Method,Total Amount ($),Status\n';
    const rows = orders.map((o) => 
      `"${o.orderNumber}","${o.date}","${o.customer.name}","${o.customer.city}","${o.customer.country}","${o.paymentMethod.type}","${o.total}","${o.paymentStatus}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `vanguard-sales-report-${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-600 font-bold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Executive Business Intelligence</span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Sales Performance & Customer Trends
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Real-time telemetry on revenue growth, customer conversion, inventory turnover, and cohort retention.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Time range selector */}
          <div className="flex bg-stone-100 p-1 border border-stone-300 text-xs">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 font-medium transition ${
                timeRange === '7d' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 font-medium transition ${
                timeRange === '30d' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('ytd')}
              className={`px-3 py-1.5 font-medium transition ${
                timeRange === 'ytd' ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              YTD
            </button>
          </div>

          <button
            id="export-sales-csv-btn"
            onClick={handleExportCSV}
            className="px-4 py-2 bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold tracking-wider uppercase transition flex items-center gap-1.5 shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">Gross Sales Revenue</span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> {overview.revenueGrowth}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 font-['Playfair_Display',serif]">
            ${overview.totalRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-stone-600 mt-1 block">Vs preceding benchmark period</span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">Total Orders</span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> {overview.orderGrowth}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 font-['Playfair_Display',serif]">
            {overview.totalOrders}
          </div>
          <span className="text-[10px] text-stone-600 mt-1 block">99.4% fulfillment success rate</span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">Average Order Value (AOV)</span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> {overview.aovGrowth}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 font-['Playfair_Display',serif]">
            ${overview.averageOrderValue}
          </div>
          <span className="text-[10px] text-stone-600 mt-1 block">Driven by suiting & outerwear bundles</span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">Conversion & Return Rate</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-200">
              Turnover {overview.inventoryTurnoverRate}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 font-['Playfair_Display',serif]">
            {overview.conversionRate}%
          </div>
          <span className="text-[10px] text-emerald-700 font-medium mt-1 block">Low Return Rate: {overview.returnRate}% (Industry: 18%)</span>
        </div>
      </div>

      {/* Actionable Insights Panel */}
      <div className="bg-stone-900 text-stone-100 p-6 border border-stone-800 shadow-md">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          <Zap className="w-4 h-4" />
          <span>Strategic Merchant Insights & Recommendations</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-800/80 p-4 border border-stone-700 space-y-1.5">
            <span className="font-bold text-white block">Cashmere Knitwear Velocity Surging</span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Grade-A Mongolian cashmere sweaters have experienced a <strong>+38% demand lift</strong>. Camel Tan sizes M and L are projected to stockout within 5 days.
            </p>
            <span className="text-amber-400 font-semibold text-[10px] block mt-1">Action: Trigger replenishment purchase order for 40 units.</span>
          </div>

          <div className="bg-stone-800/80 p-4 border border-stone-700 space-y-1.5">
            <span className="font-bold text-white block">High Basket Affinity: Blazers + Shirts</span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              <strong>64% of Verona Blazer purchasers</strong> also add an Egyptian Cotton Oxford shirt during the same session, raising basket size to $480.
            </p>
            <span className="text-amber-400 font-semibold text-[10px] block mt-1">Action: Feature automated suiting bundle discount at checkout.</span>
          </div>

          <div className="bg-stone-800/80 p-4 border border-stone-700 space-y-1.5">
            <span className="font-bold text-white block">Exceptional Sizing Accuracy</span>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Return rate is just <strong>2.1%</strong> compared to industry average of 18%. Verified buyer reviews cite accurate shoulder measurements as the main factor.
            </p>
            <span className="text-amber-400 font-semibold text-[10px] block mt-1">Action: Expand custom measurement tables to upcoming trouser line.</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Revenue Trend Chart */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900">
                Revenue Trajectory ($ USD)
              </h3>
              <span className="text-xs text-stone-500">Gross sales performance across selected timeframe</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-stone-600">
              <span className="w-3 h-3 bg-amber-500 inline-block"></span>
              <span>Daily Revenue</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#78716c' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#78716c' }} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#1c1917', color: '#fff', fontSize: '11px', border: 'none' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#b45309" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Donut */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div>
            <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900">
              Sales by Garment Category
            </h3>
            <span className="text-xs text-stone-500">Share of total gross merchandising value</span>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySales}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  contentStyle={{ backgroundColor: '#1c1917', color: '#fff', fontSize: '11px', border: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-stone-900">Top Share</span>
              <span className="text-[11px] text-stone-500 font-medium">Blazers 42%</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
            {categorySales.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span className="text-stone-700 font-medium">{cat.name}</span>
                </div>
                <span className="font-bold text-stone-900">${cat.revenue.toLocaleString()} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Trends & Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Cohorts */}
        <div className="bg-white p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-stone-700" />
            <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900">
              Customer Retention & Purchase Behavior
            </h3>
          </div>

          <div className="space-y-3">
            {customerSegments.map((seg) => (
              <div key={seg.segment} className="p-3 bg-stone-50 border border-stone-200 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-stone-900">{seg.segment}</span>
                  <span className="font-mono text-stone-600 font-semibold">{seg.percentage}% of Volume</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-stone-900 h-full rounded-full" style={{ width: `${seg.percentage}%` }}></div>
                </div>
                <span className="text-[11px] text-stone-500 mt-1.5 block">
                  Cohort Average Order Value: <strong className="text-stone-800">${seg.aov}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Velocity & Supply Days */}
        <div className="bg-white p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900">
              Stock Velocity & Depletion Forecast
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="pb-2">Style Name</th>
                  <th className="pb-2">Units</th>
                  <th className="pb-2">Velocity</th>
                  <th className="pb-2">Days Left</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-[11px]">
                {inventoryInsights.map((item) => (
                  <tr key={item.sku} className="hover:bg-stone-50">
                    <td className="py-2.5 font-medium text-stone-900 truncate max-w-[150px]">{item.name}</td>
                    <td className="py-2.5 text-stone-600 font-mono">{item.stock}</td>
                    <td className="py-2.5 text-stone-700">{item.velocity}</td>
                    <td className="py-2.5 text-stone-700 font-mono">{item.daysOfSupply}d</td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                        item.restockStatus === 'Urgent Restock' ? 'bg-rose-100 text-rose-800' :
                        item.restockStatus === 'Reorder Soon' ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.restockStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
