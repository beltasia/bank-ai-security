"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkflowTemplates } from "@/components/workflow-templates"
import { ActiveWorkflows } from "@/components/active-workflows"
import { ApprovalQueue } from "@/components/approval-queue"
import { WorkflowDesigner } from "@/components/workflow-designer"
import { WorkflowComplianceReports } from "@/components/workflow-compliance-reports"
import { Settings, Play, Users, FileText } from "lucide-react"

export function WorkflowManagement() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [newWorkflows, setNewWorkflows] = useState<
    Array<{
      id: string
      templateId: string
      caseId: string
      assignee: string
      priority: string
    }>
  >([])

  const workflowStats = [
    { label: "Active Workflows", value: 23 + newWorkflows.length, color: "bg-blue-500", icon: Play },
    { label: "Pending Approvals", value: 8, color: "bg-orange-500", icon: Users },
    { label: "Completed Today", value: 15, color: "bg-green-500", icon: FileText },
    { label: "Templates Available", value: 12, color: "bg-purple-500", icon: Settings },
  ]

  const handleWorkflowStarted = (workflowId: string, templateId: string) => {
    // This would typically come from the workflow creation form
    // For now, we'll create a mock entry
    const newWorkflow = {
      id: workflowId,
      templateId: templateId,
      caseId: `CASE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      assignee: "tendai-mukamuri", // Updated to use Zimbabwean name
      priority: "high", // This would come from the form
    }

    setNewWorkflows((prev) => [newWorkflow, ...prev])
  }

  return (
    <div className="space-y-6">
      {/* Workflow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {workflowStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Workflow Management Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Investigation Workflow Management</CardTitle>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="active">Active Workflows</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="approvals">Approval Queue</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
              <TabsTrigger value="designer">Workflow Designer</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <ActiveWorkflows onWorkflowSelect={setSelectedWorkflow} newWorkflows={newWorkflows} />
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <WorkflowTemplates onWorkflowStarted={handleWorkflowStarted} />
            </TabsContent>

            <TabsContent value="approvals" className="mt-6">
              <ApprovalQueue />
            </TabsContent>

            <TabsContent value="compliance" className="mt-6">
              <WorkflowComplianceReports />
            </TabsContent>

            <TabsContent value="designer" className="mt-6">
              <WorkflowDesigner />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
