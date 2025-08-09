"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  Activity,
  Target,
  CheckCircle,
  Clock,
  BarChart3,
  Upload,
} from "lucide-react"

// Import all components
import { DashboardOverview } from "@/components/dashboard-overview"
import { TransactionMonitoring } from "@/components/transaction-monitoring"
import { FraudAlerts } from "@/components/fraud-alerts"
import { ComplianceReporting } from "@/components/compliance-reporting"
import { RiskAnalytics } from "@/components/risk-analytics"
import { CaseManagement } from "@/components/case-management"
import { WorkflowManagement } from "@/components/workflow-management"
import { WorkflowComplianceReports } from "@/components/workflow-compliance-reports"
import { ExecutiveDashboard } from "@/components/executive-dashboard"
import { ReportImportAnalysis } from "@/components/report-import-analysis"

export default function BankFraudDetection() {
  const [activeTab, setActiveTab] = useState("overview")

  // Key metrics for the header
  const keyMetrics = [
    {
      title: "Active Alerts",
      value: "23",
      change: "+12%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Cases Resolved",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Risk Score",
      value: "7.2/10",
      change: "-0.3",
      trend: "down",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Compliance",
      value: "98.1%",
      change: "+1.2%",
      trend: "up",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">NMB Bank AI Security</h1>
                  <p className="text-sm text-muted-foreground">
                    Fraud Detection & Compliance System - Bulawayo, Zimbabwe
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">System Online</span>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <Activity className="h-3 w-3 mr-1" />
                Live Monitoring
              </Badge>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {keyMetrics.map((metric, index) => {
              const IconComponent = metric.icon
              const isPositiveTrend = metric.trend === "up"

              return (
                <Card key={index} className="card-hover hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                          <IconComponent className={`h-4 w-4 ${metric.color}`} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{metric.title}</p>
                          <p className="text-lg font-bold text-foreground">{metric.value}</p>
                        </div>
                      </div>
                      <div className={`text-xs font-medium ${isPositiveTrend ? "text-green-600" : "text-red-600"}`}>
                        {isPositiveTrend ? (
                          <TrendingUp className="h-3 w-3 inline mr-1" />
                        ) : (
                          <TrendingUp className="h-3 w-3 inline mr-1 rotate-180" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-10 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Cases
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="executive" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Executive
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <TransactionMonitoring />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <FraudAlerts />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <ComplianceReporting />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <RiskAnalytics />
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <CaseManagement />
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <WorkflowManagement />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <WorkflowComplianceReports />
          </TabsContent>

          <TabsContent value="executive" className="space-y-6">
            <ExecutiveDashboard />
          </TabsContent>

          <TabsContent value="import" className="space-y-6">
            <ReportImportAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
