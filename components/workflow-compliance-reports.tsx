"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Target,
  Shield,
} from "lucide-react"

export function WorkflowComplianceReports() {
  // Case Status Distribution Data
  const caseStatusData = [
    { name: "Closed Cases", value: 156, color: "#22c55e", percentage: 52 },
    { name: "Under Investigation", value: 47, color: "#3b82f6", percentage: 16 },
    { name: "Pending Review", value: 23, color: "#f59e0b", percentage: 8 },
    { name: "Escalated", value: 12, color: "#ef4444", percentage: 4 },
    { name: "Awaiting Approval", value: 18, color: "#8b5cf6", percentage: 6 },
    { name: "On Hold", value: 8, color: "#6b7280", percentage: 3 },
    { name: "New Cases", value: 36, color: "#06b6d4", percentage: 12 },
  ]

  // Monthly Case Closure Trends
  const monthlyClosureData = [
    { month: "Jul", closed: 142, target: 150, efficiency: 94.7 },
    { month: "Aug", closed: 158, target: 150, efficiency: 105.3 },
    { month: "Sep", closed: 134, target: 150, efficiency: 89.3 },
    { month: "Oct", closed: 167, target: 150, efficiency: 111.3 },
    { month: "Nov", closed: 145, target: 150, efficiency: 96.7 },
    { month: "Dec", closed: 189, target: 150, efficiency: 126.0 },
    { month: "Jan", closed: 156, target: 160, efficiency: 97.5 },
  ]

  // Workflow Performance Metrics
  const workflowPerformanceData = [
    { workflow: "Money Laundering", avgDays: 5.2, slaTarget: 7, compliance: 94, cases: 45 },
    { workflow: "Account Takeover", avgDays: 0.8, slaTarget: 1, compliance: 98, cases: 32 },
    { workflow: "Card Fraud", avgDays: 2.1, slaTarget: 3, compliance: 96, cases: 78 },
    { workflow: "Wire Fraud", avgDays: 4.8, slaTarget: 5, compliance: 89, cases: 23 },
    { workflow: "Identity Theft", avgDays: 1.9, slaTarget: 2, compliance: 92, cases: 19 },
    { workflow: "Suspicious Activity", avgDays: 0.6, slaTarget: 1, compliance: 99, cases: 156 },
  ]

  // Compliance Metrics Over Time
  const complianceTimeData = [
    { week: "Week 1", slaCompliance: 94, qualityScore: 87, approvalTime: 2.3 },
    { week: "Week 2", slaCompliance: 96, qualityScore: 89, approvalTime: 2.1 },
    { week: "Week 3", slaCompliance: 92, qualityScore: 91, approvalTime: 2.8 },
    { week: "Week 4", slaCompliance: 98, qualityScore: 93, approvalTime: 1.9 },
    { week: "Week 5", slaCompliance: 95, qualityScore: 88, approvalTime: 2.4 },
    { week: "Week 6", slaCompliance: 97, qualityScore: 92, approvalTime: 2.0 },
  ]

  // Key Performance Indicators
  const kpiMetrics = [
    {
      label: "Overall SLA Compliance",
      value: 95.2,
      target: 95,
      trend: "+2.1%",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Average Resolution Time",
      value: 2.8,
      target: 3.0,
      trend: "-0.3 days",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      unit: "days",
    },
    {
      label: "Quality Score",
      value: 91.5,
      target: 90,
      trend: "+1.8%",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Approval Efficiency",
      value: 87.3,
      target: 85,
      trend: "+4.2%",
      icon: CheckCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  // Regulatory Compliance Status
  const regulatoryCompliance = [
    {
      regulation: "Bank Secrecy Act (BSA)",
      status: "compliant",
      score: 98,
      lastAudit: "2024-01-10",
      nextReview: "2024-04-10",
    },
    {
      regulation: "Anti-Money Laundering (AML)",
      status: "compliant",
      score: 96,
      lastAudit: "2024-01-08",
      nextReview: "2024-04-08",
    },
    {
      regulation: "Know Your Customer (KYC)",
      status: "minor_issues",
      score: 89,
      lastAudit: "2024-01-12",
      nextReview: "2024-02-12",
    },
    {
      regulation: "Suspicious Activity Reporting (SAR)",
      status: "compliant",
      score: 94,
      lastAudit: "2024-01-15",
      nextReview: "2024-04-15",
    },
  ]

  const getComplianceStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>
      case "minor_issues":
        return <Badge className="bg-yellow-100 text-yellow-800">Minor Issues</Badge>
      case "non_compliant":
        return <Badge className="bg-red-100 text-red-800">Non-Compliant</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((kpi, index) => {
          const IconComponent = kpi.icon
          const isPositiveTrend = kpi.trend.startsWith("+") || kpi.trend.startsWith("-0")

          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className={`flex items-center justify-between p-3 rounded-lg ${kpi.bgColor}`}>
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-5 w-5 ${kpi.color}`} />
                    <div>
                      <p className="text-xs text-gray-600">{kpi.label}</p>
                      <p className="text-lg font-bold">
                        {kpi.value}
                        {kpi.unit && <span className="text-sm font-normal"> {kpi.unit}</span>}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${isPositiveTrend ? "text-green-600" : "text-red-600"}`}>
                      {isPositiveTrend ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span className="text-xs font-medium">{kpi.trend}</span>
                    </div>
                    <p className="text-xs text-gray-500">vs target: {kpi.target}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Status Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Case Status Distribution</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={caseStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {caseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Cases"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {caseStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Case Closure Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Case Closure Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyClosureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="closed" fill="#3b82f6" name="Cases Closed" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-green-600">156 cases</span> closed this month (
                <span className="font-semibold">97.5%</span> of target)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Workflow SLA Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowPerformanceData.map((workflow, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{workflow.workflow}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {workflow.avgDays}d avg (SLA: {workflow.slaTarget}d)
                      </span>
                      <Badge
                        className={
                          workflow.compliance >= 95
                            ? "bg-green-100 text-green-800"
                            : workflow.compliance >= 90
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {workflow.compliance}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={workflow.compliance} className="h-2" />
                  <p className="text-xs text-gray-500">{workflow.cases} cases processed</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Trends Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Metrics Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={complianceTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="slaCompliance"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="SLA Compliance %"
                  />
                  <Area
                    type="monotone"
                    dataKey="qualityScore"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Quality Score %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regulatory Compliance Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Regulatory Compliance Status
            </CardTitle>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Generate Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regulatoryCompliance.map((reg, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{reg.regulation}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getComplianceStatusBadge(reg.status)}
                      <span className="text-sm text-gray-600">Score: {reg.score}%</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>Last Audit: {formatDate(reg.lastAudit)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Next Review: {formatDate(reg.nextReview)}</span>
                    </div>
                  </div>
                </div>
                <Progress value={reg.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Compliance Report */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Compliance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-700">Strengths</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>98% SLA compliance for Account Takeover workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Suspicious Activity reviews completed 99% within SLA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>BSA compliance score improved to 98%</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Average resolution time reduced by 0.3 days</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-yellow-700">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Wire Fraud investigations at 89% SLA compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>KYC compliance score needs improvement (89%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Approval process averaging 2.4 days</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Quality scores fluctuating week-over-week</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-blue-700">Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span>Implement automated pre-screening for Wire Fraud cases</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span>Enhanced KYC documentation requirements</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span>Streamline approval workflows with parallel processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span>Implement quality assurance checkpoints</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
