"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export function RiskAnalytics() {
  const fraudTrendData = [
    { month: "Jan", cases: 145, amount: 2.3 },
    { month: "Feb", cases: 132, amount: 1.9 },
    { month: "Mar", cases: 158, amount: 2.8 },
    { month: "Apr", cases: 142, amount: 2.1 },
    { month: "May", cases: 167, amount: 3.2 },
    { month: "Jun", cases: 134, amount: 2.0 },
  ]

  const riskScoreDistribution = [
    { range: "0-2", count: 1250, percentage: 62.5 },
    { range: "3-5", count: 450, percentage: 22.5 },
    { range: "6-8", count: 250, percentage: 12.5 },
    { range: "9-10", count: 50, percentage: 2.5 },
  ]

  const fraudTypeData = [
    { name: "Card Fraud", value: 35, color: "#ef4444" },
    { name: "Wire Fraud", value: 25, color: "#f97316" },
    { name: "Account Takeover", value: 20, color: "#eab308" },
    { name: "Money Laundering", value: 15, color: "#22c55e" },
    { name: "Other", value: 5, color: "#6366f1" },
  ]

  const transactionVolumeData = [
    { hour: "00", volume: 1200, risk: 2.1 },
    { hour: "04", volume: 800, risk: 1.8 },
    { hour: "08", volume: 3500, risk: 2.5 },
    { hour: "12", volume: 4200, risk: 3.1 },
    { hour: "16", volume: 3800, risk: 2.8 },
    { hour: "20", volume: 2100, risk: 2.3 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Risk Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fraud Detection Rate</p>
                <p className="text-2xl font-bold">94.7%</p>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+2.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">False Positive Rate</p>
                <p className="text-2xl font-bold">3.2%</p>
              </div>
              <div className="flex items-center text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-0.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Response Time</p>
                <p className="text-2xl font-bold">1.4s</p>
              </div>
              <div className="flex items-center text-blue-600">
                <Activity className="h-4 w-4 mr-1" />
                <span className="text-sm">Real-time</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Fraud Cases & Financial Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fraudTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="cases" fill="#3b82f6" name="Cases" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="amount"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Amount ($M)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskScoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fraud Types */}
        <Card>
          <CardHeader>
            <CardTitle>Fraud Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fraudTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fraudTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Volume vs Risk */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Transaction Volume & Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="volume" fill="#8b5cf6" name="Volume" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="risk"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Avg Risk Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ML Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Machine Learning Model Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Model Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">96.8%</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Precision</p>
              <p className="text-2xl font-bold text-green-600">94.2%</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Recall</p>
              <p className="text-2xl font-bold text-purple-600">92.7%</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">F1 Score</p>
              <p className="text-2xl font-bold text-orange-600">93.4%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
