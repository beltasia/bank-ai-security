"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import {
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  Eye,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

interface ActiveWorkflowsProps {
  onWorkflowSelect: (workflowId: string) => void
  newWorkflows?: Array<{
    id: string
    templateId: string
    caseId: string
    assignee: string
    priority: string
  }>
}

export function ActiveWorkflows({ onWorkflowSelect, newWorkflows = [] }: ActiveWorkflowsProps) {
  const [workflows, setWorkflows] = useState([
    {
      id: "WF-2024-001",
      caseId: "CASE-2024-001",
      templateName: "Money Laundering Investigation",
      currentStep: "Customer Due Diligence Review",
      stepNumber: 3,
      totalSteps: 8,
      progress: 37,
      assignee: "Tendai Mukamuri",
      assigneeInitials: "TM",
      priority: "critical",
      status: "in_progress",
      startDate: "2024-01-15T10:30:00Z",
      dueDate: "2024-01-22T17:00:00Z",
      nextAction: "Complete KYC documentation review",
      automatedTasks: 2,
      pendingApprovals: 1,
      riskScore: 9.2,
    },
    {
      id: "WF-2024-002",
      caseId: "CASE-2024-002",
      templateName: "Account Takeover Response",
      currentStep: "Identity Verification",
      stepNumber: 4,
      totalSteps: 6,
      progress: 67,
      assignee: "Chipo Nyathi",
      assigneeInitials: "CN",
      priority: "high",
      status: "waiting_approval",
      startDate: "2024-01-15T14:20:00Z",
      dueDate: "2024-01-15T18:20:00Z",
      nextAction: "Await manager approval for account recovery",
      automatedTasks: 0,
      pendingApprovals: 1,
      riskScore: 8.7,
    },
    {
      id: "WF-2024-003",
      caseId: "CASE-2024-003",
      templateName: "Card Fraud Investigation",
      currentStep: "Merchant Analysis",
      stepNumber: 2,
      totalSteps: 7,
      progress: 29,
      assignee: "Blessing Moyo",
      assigneeInitials: "BM",
      priority: "medium",
      status: "automated",
      startDate: "2024-01-15T09:45:00Z",
      dueDate: "2024-01-18T17:00:00Z",
      nextAction: "Automated merchant risk assessment in progress",
      automatedTasks: 3,
      pendingApprovals: 0,
      riskScore: 6.8,
    },
    {
      id: "WF-2024-004",
      caseId: "CASE-2024-004",
      templateName: "Wire Fraud Assessment",
      currentStep: "Bank Verification",
      stepNumber: 5,
      totalSteps: 9,
      progress: 56,
      assignee: "Tatenda Sibanda",
      assigneeInitials: "TS",
      priority: "high",
      status: "blocked",
      startDate: "2024-01-14T16:15:00Z",
      dueDate: "2024-01-19T17:00:00Z",
      nextAction: "Waiting for external bank response",
      automatedTasks: 1,
      pendingApprovals: 0,
      riskScore: 7.8,
    },
    {
      id: "WF-2024-005",
      caseId: "CASE-2024-005",
      templateName: "Suspicious Activity Review",
      currentStep: "Manual Review",
      stepNumber: 4,
      totalSteps: 5,
      progress: 80,
      assignee: "Rumbidzai Dube",
      assigneeInitials: "RD",
      priority: "low",
      status: "in_progress",
      startDate: "2024-01-15T11:30:00Z",
      dueDate: "2024-01-16T17:00:00Z",
      nextAction: "Complete final review and documentation",
      automatedTasks: 0,
      pendingApprovals: 0,
      riskScore: 4.2,
    },
  ])

  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Add new workflows when they are created
  useEffect(() => {
    if (newWorkflows.length > 0) {
      const newWorkflowEntries = newWorkflows.map((nw) => ({
        id: nw.id,
        caseId: nw.caseId,
        templateName: getTemplateName(nw.templateId),
        currentStep: "Initial Setup",
        stepNumber: 1,
        totalSteps: getTotalSteps(nw.templateId),
        progress: 5,
        assignee: getAssigneeName(nw.assignee),
        assigneeInitials: getAssigneeInitials(nw.assignee),
        priority: nw.priority,
        status: "in_progress",
        startDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        nextAction: "Begin investigation process",
        automatedTasks: 0,
        pendingApprovals: 0,
        riskScore: 5.0,
      }))

      setWorkflows((prev) => [...newWorkflowEntries, ...prev])
    }
  }, [newWorkflows])

  const getTemplateName = (templateId: string) => {
    const templates = {
      "WF-TEMPLATE-001": "Money Laundering Investigation",
      "WF-TEMPLATE-002": "Account Takeover Response",
      "WF-TEMPLATE-003": "Card Fraud Investigation",
      "WF-TEMPLATE-004": "Wire Fraud Assessment",
      "WF-TEMPLATE-005": "Identity Theft Response",
      "WF-TEMPLATE-006": "Suspicious Activity Review",
    }
    return templates[templateId as keyof typeof templates] || "Unknown Template"
  }

  const getTotalSteps = (templateId: string) => {
    const steps = {
      "WF-TEMPLATE-001": 8,
      "WF-TEMPLATE-002": 6,
      "WF-TEMPLATE-003": 7,
      "WF-TEMPLATE-004": 9,
      "WF-TEMPLATE-005": 6,
      "WF-TEMPLATE-006": 5,
    }
    return steps[templateId as keyof typeof steps] || 5
  }

  const getAssigneeName = (assigneeKey: string) => {
    const names = {
      "tendai-mukamuri": "Tendai Mukamuri",
      "chipo-nyathi": "Chipo Nyathi",
      "blessing-moyo": "Blessing Moyo",
      "tatenda-sibanda": "Tatenda Sibanda",
      "rumbidzai-dube": "Rumbidzai Dube",
      "farai-ncube": "Farai Ncube",
      "precious-mpofu": "Precious Mpofu",
      "takudzwa-chirwa": "Takudzwa Chirwa",
    }
    return names[assigneeKey as keyof typeof names] || assigneeKey
  }

  const getAssigneeInitials = (assigneeKey: string) => {
    const initials = {
      "tendai-mukamuri": "TM",
      "chipo-nyathi": "CN",
      "blessing-moyo": "BM",
      "tatenda-sibanda": "TS",
      "rumbidzai-dube": "RD",
      "farai-ncube": "FN",
      "precious-mpofu": "PM",
      "takudzwa-chirwa": "TC",
    }
    return initials[assigneeKey as keyof typeof initials] || "UN"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "waiting_approval":
        return <Badge className="bg-orange-100 text-orange-800">Waiting Approval</Badge>
      case "automated":
        return <Badge className="bg-green-100 text-green-800">Automated</Badge>
      case "blocked":
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>
      case "paused":
        return <Badge className="bg-gray-100 text-gray-800">Paused</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-600 text-white">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500 text-white">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500 text-white">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeRemaining = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffHours = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60))

    if (diffHours < 0) return "Overdue"
    if (diffHours < 24) return `${diffHours}h remaining`
    return `${Math.ceil(diffHours / 24)}d remaining`
  }

  const handlePauseWorkflow = (workflowId: string) => {
    setWorkflows((prev) => prev.map((w) => (w.id === workflowId ? { ...w, status: "paused" } : w)))
    toast({
      title: "Workflow Paused",
      description: `Workflow ${workflowId} has been paused.`,
    })
  }

  const handleResumeWorkflow = (workflowId: string) => {
    setWorkflows((prev) => prev.map((w) => (w.id === workflowId ? { ...w, status: "in_progress" } : w)))
    toast({
      title: "Workflow Resumed",
      description: `Workflow ${workflowId} has been resumed.`,
    })
  }

  const handleViewDetails = (workflow: any) => {
    setSelectedWorkflow(workflow)
    setIsDetailDialogOpen(true)
  }

  const handleAdvanceStep = (workflowId: string) => {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === workflowId && w.stepNumber < w.totalSteps) {
          const newStepNumber = w.stepNumber + 1
          const newProgress = Math.round((newStepNumber / w.totalSteps) * 100)
          return {
            ...w,
            stepNumber: newStepNumber,
            progress: newProgress,
            currentStep: `Step ${newStepNumber}`,
            nextAction: newStepNumber === w.totalSteps ? "Complete workflow" : "Continue to next step",
          }
        }
        return w
      }),
    )

    toast({
      title: "Step Completed",
      description: `Workflow ${workflowId} advanced to next step.`,
    })
  }

  return (
    <div className="space-y-4">
      {workflows.map((workflow) => (
        <Card key={workflow.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{workflow.templateName}</h3>
                  {getStatusBadge(workflow.status)}
                  {getPriorityBadge(workflow.priority)}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>Case: {workflow.caseId}</span>
                  <span>Workflow: {workflow.id}</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Risk: {workflow.riskScore}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Step {workflow.stepNumber} of {workflow.totalSteps}: {workflow.currentStep}
                    </span>
                    <span className="text-sm text-gray-600">{workflow.progress}% complete</span>
                  </div>
                  <Progress value={workflow.progress} className="h-2" />
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  <strong>Next Action:</strong> {workflow.nextAction}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Started: {formatDate(workflow.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{getTimeRemaining(workflow.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span>{workflow.automatedTasks} automated tasks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-gray-400" />
                    <span>{workflow.pendingApprovals} pending approvals</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{workflow.assigneeInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{workflow.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    Assigned
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex gap-2">
                {workflow.status === "in_progress" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handlePauseWorkflow(workflow.id)}>
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                    <Button size="sm" onClick={() => handleAdvanceStep(workflow.id)}>
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Next Step
                    </Button>
                  </>
                )}
                {workflow.status === "paused" && (
                  <Button size="sm" variant="outline" onClick={() => handleResumeWorkflow(workflow.id)}>
                    <Play className="h-4 w-4 mr-1" />
                    Resume
                  </Button>
                )}
                {workflow.status === "waiting_approval" && <Button size="sm">Review Approval</Button>}
              </div>

              <Button variant="outline" size="sm" onClick={() => handleViewDetails(workflow)}>
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {workflows.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No active workflows found.</p>
          </CardContent>
        </Card>
      )}

      {/* Workflow Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Workflow Details: {selectedWorkflow?.id}</DialogTitle>
          </DialogHeader>

          {selectedWorkflow && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Workflow Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Template:</strong> {selectedWorkflow.templateName}
                    </div>
                    <div>
                      <strong>Case ID:</strong> {selectedWorkflow.caseId}
                    </div>
                    <div>
                      <strong>Assignee:</strong> {selectedWorkflow.assignee}
                    </div>
                    <div>
                      <strong>Priority:</strong> {selectedWorkflow.priority}
                    </div>
                    <div>
                      <strong>Status:</strong> {selectedWorkflow.status}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Progress Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Current Step:</strong> {selectedWorkflow.currentStep}
                    </div>
                    <div>
                      <strong>Progress:</strong> {selectedWorkflow.progress}%
                    </div>
                    <div>
                      <strong>Started:</strong> {formatDate(selectedWorkflow.startDate)}
                    </div>
                    <div>
                      <strong>Due:</strong> {formatDate(selectedWorkflow.dueDate)}
                    </div>
                    <div>
                      <strong>Risk Score:</strong> {selectedWorkflow.riskScore}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Next Action</h4>
                <p className="text-sm text-gray-700">{selectedWorkflow.nextAction}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => onWorkflowSelect(selectedWorkflow.id)}>Open Full View</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
