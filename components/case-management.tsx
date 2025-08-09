"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CaseList } from "@/components/case-list"
import { CaseDetails } from "@/components/case-details"
import { CaseCreationForm } from "@/components/case-creation-form"
import { CustomerRiskProfile } from "@/components/customer-risk-profile"
import { RealTimeAlerts } from "@/components/real-time-alerts"
import { RegulatoryCompliance } from "@/components/regulatory-compliance"
import { AuditTrail } from "@/components/audit-trail"
import { Search, Plus, Filter, CheckCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react"
import { WorkflowManagement } from "@/components/workflow-management"
import { TransactionMonitoring } from "@/components/transaction-monitoring"
import { FraudAlerts } from "@/components/fraud-alerts"
import { RiskAnalytics } from "@/components/risk-analytics"

export function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCaseCreation, setShowCaseCreation] = useState(false)
  const [cases, setCases] = useState<any[]>([])

  const caseStats = [
    {
      label: "Open Cases",
      value: 47 + cases.filter((c) => ["active", "investigating", "pending_review"].includes(c.status)).length,
      color: "bg-blue-500",
      icon: Clock,
    },
    {
      label: "Under Investigation",
      value: 23 + cases.filter((c) => c.status === "investigating").length,
      color: "bg-yellow-500",
      icon: AlertTriangle,
    },
    {
      label: "Pending Review",
      value: 12 + cases.filter((c) => c.status === "pending_review").length,
      color: "bg-orange-500",
      icon: TrendingUp,
    },
    {
      label: "Closed This Month",
      value: 89 + cases.filter((c) => c.status === "closed").length,
      color: "bg-green-500",
      icon: CheckCircle,
    },
  ]

  const handleCaseCreated = (newCase: any) => {
    setCases((prev) => [newCase, ...prev])
    setShowCaseCreation(false)

    // Show success message (in real app, this would be a toast notification)
    console.log("Case created successfully:", newCase.id)
  }

  if (selectedCase) {
    return <CaseDetails caseId={selectedCase} onBack={() => setSelectedCase(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Case Statistics - Fixed alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {caseStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Tabs Component */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
          <TabsTrigger value="monitoring">Transaction Monitoring</TabsTrigger>
          <TabsTrigger value="fraud-alerts">Fraud Alerts</TabsTrigger>
          <TabsTrigger value="cases">Case Management</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="compliance">Regulatory Compliance</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="analytics">Risk Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="mt-6">
          <RealTimeAlerts />
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <TransactionMonitoring />
        </TabsContent>

        <TabsContent value="fraud-alerts" className="mt-6">
          <FraudAlerts />
        </TabsContent>

        <TabsContent value="cases" className="mt-6">
          {/* Search and Filters */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Case Management Dashboard
                </CardTitle>
                <Button onClick={() => setShowCaseCreation(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Case
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search cases by ID, account, customer name, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Active Cases</TabsTrigger>
              <TabsTrigger value="assigned">My Cases</TabsTrigger>
              <TabsTrigger value="closed">Closed Cases</TabsTrigger>
              <TabsTrigger value="escalated">Escalated</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <CaseList filter="active" searchTerm={searchTerm} onCaseSelect={setSelectedCase} cases={cases} />
            </TabsContent>

            <TabsContent value="assigned" className="mt-4">
              <CaseList filter="assigned" searchTerm={searchTerm} onCaseSelect={setSelectedCase} cases={cases} />
            </TabsContent>

            <TabsContent value="closed" className="mt-4">
              <CaseList filter="closed" searchTerm={searchTerm} onCaseSelect={setSelectedCase} cases={cases} />
            </TabsContent>

            <TabsContent value="escalated" className="mt-4">
              <CaseList filter="escalated" searchTerm={searchTerm} onCaseSelect={setSelectedCase} cases={cases} />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="workflows" className="mt-6">
          <WorkflowManagement />
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <RegulatoryCompliance />
        </TabsContent>

        <TabsContent value="audit" className="mt-6">
          <AuditTrail />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <RiskAnalytics />
        </TabsContent>
      </Tabs>

      {/* Customer Risk Profile Modal/Section */}
      <div className="mt-8">
        <CustomerRiskProfile customerId="CUST-ZW-4521" />
      </div>

      {/* Case Creation Modal */}
      {showCaseCreation && (
        <CaseCreationForm onClose={() => setShowCaseCreation(false)} onCaseCreated={handleCaseCreated} />
      )}
    </div>
  )
}
