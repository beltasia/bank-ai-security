"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  AlertTriangle,
  CreditCard,
  DollarSign,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Play,
  Copy,
  Edit,
} from "lucide-react"

interface WorkflowTemplatesProps {
  onWorkflowStarted?: (workflowId: string, templateId: string) => void
}

export function WorkflowTemplates({ onWorkflowStarted }: WorkflowTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false)
  const [workflowData, setWorkflowData] = useState({
    caseId: "",
    assignee: "",
    priority: "",
    description: "",
    customerName: "",
    accountNumber: "",
    amount: "",
  })

  const templates = [
    {
      id: "WF-TEMPLATE-001",
      name: "Money Laundering Investigation",
      description: "Comprehensive workflow for investigating suspected money laundering activities",
      category: "AML",
      steps: 8,
      avgDuration: "5-7 days",
      automationLevel: 75,
      usageCount: 45,
      icon: DollarSign,
      color: "bg-green-500",
      steps_detail: [
        "Initial Risk Assessment",
        "Transaction Pattern Analysis",
        "Customer Due Diligence Review",
        "Source of Funds Verification",
        "Regulatory Reporting Check",
        "Senior Management Approval",
        "SAR Filing Decision",
        "Case Closure Documentation",
      ],
    },
    {
      id: "WF-TEMPLATE-002",
      name: "Account Takeover Response",
      description: "Rapid response workflow for confirmed or suspected account takeover incidents",
      category: "Cybersecurity",
      steps: 6,
      avgDuration: "2-4 hours",
      automationLevel: 85,
      usageCount: 32,
      icon: Shield,
      color: "bg-red-500",
      steps_detail: [
        "Immediate Account Freeze",
        "Customer Notification",
        "Forensic Data Collection",
        "Identity Verification",
        "Security Assessment",
        "Account Recovery Process",
      ],
    },
    {
      id: "WF-TEMPLATE-003",
      name: "Card Fraud Investigation",
      description: "Standard investigation process for credit/debit card fraud cases",
      category: "Card Fraud",
      steps: 7,
      avgDuration: "3-5 days",
      automationLevel: 70,
      usageCount: 78,
      icon: CreditCard,
      color: "bg-blue-500",
      steps_detail: [
        "Transaction Verification",
        "Merchant Analysis",
        "Cardholder Contact",
        "Dispute Processing",
        "Chargeback Evaluation",
        "Fraud Pattern Analysis",
        "Case Resolution",
      ],
    },
    {
      id: "WF-TEMPLATE-004",
      name: "Wire Fraud Assessment",
      description: "Detailed workflow for investigating suspicious wire transfer activities",
      category: "Wire Fraud",
      steps: 9,
      avgDuration: "4-6 days",
      automationLevel: 60,
      usageCount: 23,
      icon: AlertTriangle,
      color: "bg-orange-500",
      steps_detail: [
        "Wire Details Verification",
        "Beneficiary Analysis",
        "Authorization Review",
        "Customer Interview",
        "Bank Verification",
        "Regulatory Compliance Check",
        "Risk Assessment",
        "Decision Documentation",
        "Follow-up Actions",
      ],
    },
    {
      id: "WF-TEMPLATE-005",
      name: "Identity Theft Response",
      description: "Comprehensive response workflow for identity theft cases",
      category: "Identity Fraud",
      steps: 6,
      avgDuration: "2-3 days",
      automationLevel: 80,
      usageCount: 19,
      icon: Users,
      color: "bg-purple-500",
      steps_detail: [
        "Identity Verification",
        "Account Security Review",
        "Fraudulent Activity Assessment",
        "Customer Support",
        "Documentation Collection",
        "Recovery Process",
      ],
    },
    {
      id: "WF-TEMPLATE-006",
      name: "Suspicious Activity Review",
      description: "General workflow for reviewing and investigating suspicious activities",
      category: "General",
      steps: 5,
      avgDuration: "1-2 days",
      automationLevel: 90,
      usageCount: 156,
      icon: CheckCircle,
      color: "bg-gray-500",
      steps_detail: [
        "Activity Analysis",
        "Risk Scoring",
        "Automated Checks",
        "Manual Review",
        "Decision & Documentation",
      ],
    },
  ]

  const getCategoryBadge = (category: string) => {
    const colors = {
      AML: "bg-green-100 text-green-800",
      Cybersecurity: "bg-red-100 text-red-800",
      "Card Fraud": "bg-blue-100 text-blue-800",
      "Wire Fraud": "bg-orange-100 text-orange-800",
      "Identity Fraud": "bg-purple-100 text-purple-800",
      General: "bg-gray-100 text-gray-800",
    }

    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const handleStartWorkflow = (templateId: string) => {
    setSelectedTemplate(templateId)
    setIsStartDialogOpen(true)
    // Reset form data
    setWorkflowData({
      caseId: "",
      assignee: "",
      priority: "",
      description: "",
      customerName: "",
      accountNumber: "",
      amount: "",
    })
  }

  const handleWorkflowSubmit = () => {
    if (!selectedTemplate) return

    // Validate required fields
    if (!workflowData.caseId || !workflowData.assignee || !workflowData.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to start the workflow.",
        variant: "destructive",
      })
      return
    }

    // Generate new workflow ID
    const workflowId = `WF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

    // Create workflow entry (in real app, this would be saved to database)
    const newWorkflow = {
      id: workflowId,
      templateId: selectedTemplate,
      caseId: workflowData.caseId,
      assignee: workflowData.assignee,
      priority: workflowData.priority,
      description: workflowData.description,
      customerName: workflowData.customerName,
      accountNumber: workflowData.accountNumber,
      amount: workflowData.amount,
      status: "in_progress",
      startDate: new Date().toISOString(),
      currentStep: 1,
      progress: 0,
    }

    // Show success message
    const template = templates.find((t) => t.id === selectedTemplate)
    toast({
      title: "Workflow Started Successfully",
      description: `${template?.name} workflow has been initiated with ID: ${workflowId}`,
    })

    // Close dialog
    setIsStartDialogOpen(false)
    setSelectedTemplate(null)

    // Notify parent component
    if (onWorkflowStarted) {
      onWorkflowStarted(workflowId, selectedTemplate)
    }

    // In a real application, you would also:
    // 1. Save the workflow to the database
    // 2. Send notifications to the assignee
    // 3. Create the first task in the workflow
    // 4. Update the active workflows list
  }

  const handleCopyTemplate = (templateId: string) => {
    toast({
      title: "Template Copied",
      description: "Template has been copied to your drafts for customization.",
    })
  }

  const handleEditTemplate = (templateId: string) => {
    toast({
      title: "Edit Template",
      description: "Opening template editor...",
    })
  }

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const IconComponent = template.icon

          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${template.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {getCategoryBadge(template.category)}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{template.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span>{template.steps} steps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{template.avgDuration}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Automation Level</span>
                    <span>{template.automationLevel}%</span>
                  </div>
                  <Progress value={template.automationLevel} className="h-2" />
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Used {template.usageCount} times</span> in the last 30 days
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1" onClick={() => handleStartWorkflow(template.id)}>
                    <Play className="h-4 w-4 mr-1" />
                    Start Workflow
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleCopyTemplate(template.id)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEditTemplate(template.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Start Workflow Dialog */}
      <Dialog open={isStartDialogOpen} onOpenChange={setIsStartDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start New Workflow: {selectedTemplateData?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Template Overview */}
            {selectedTemplateData && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${selectedTemplateData.color}`}>
                    <selectedTemplateData.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedTemplateData.name}</h4>
                    <p className="text-sm text-gray-600">{selectedTemplateData.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Steps:</span> {selectedTemplateData.steps}
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span> {selectedTemplateData.avgDuration}
                  </div>
                  <div>
                    <span className="text-gray-500">Automation:</span> {selectedTemplateData.automationLevel}%
                  </div>
                </div>
              </div>
            )}

            {/* Workflow Form */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="caseId">Case ID *</Label>
                <Input
                  id="caseId"
                  placeholder="e.g., CASE-2024-001"
                  value={workflowData.caseId}
                  onChange={(e) => setWorkflowData({ ...workflowData, caseId: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="assignee">Assignee *</Label>
                <Select
                  value={workflowData.assignee}
                  onValueChange={(value) => setWorkflowData({ ...workflowData, assignee: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tendai-mukamuri">Tendai Mukamuri - Senior Investigator</SelectItem>
                    <SelectItem value="chipo-nyathi">Chipo Nyathi - Fraud Analyst</SelectItem>
                    <SelectItem value="blessing-moyo">Blessing Moyo - Compliance Officer</SelectItem>
                    <SelectItem value="tatenda-sibanda">Tatenda Sibanda - Risk Manager</SelectItem>
                    <SelectItem value="rumbidzai-dube">Rumbidzai Dube - AML Specialist</SelectItem>
                    <SelectItem value="farai-ncube">Farai Ncube - Senior Analyst</SelectItem>
                    <SelectItem value="precious-mpofu">Precious Mpofu - Investigation Lead</SelectItem>
                    <SelectItem value="takudzwa-chirwa">Takudzwa Chirwa - Compliance Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={workflowData.priority}
                  onValueChange={(value) => setWorkflowData({ ...workflowData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  placeholder="e.g., 50000.00"
                  value={workflowData.amount}
                  onChange={(e) => setWorkflowData({ ...workflowData, amount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  placeholder="e.g., John Doe"
                  value={workflowData.customerName}
                  onChange={(e) => setWorkflowData({ ...workflowData, customerName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="e.g., ****-4521"
                  value={workflowData.accountNumber}
                  onChange={(e) => setWorkflowData({ ...workflowData, accountNumber: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide additional context for this investigation..."
                value={workflowData.description}
                onChange={(e) => setWorkflowData({ ...workflowData, description: e.target.value })}
              />
            </div>

            {/* Workflow Steps Preview */}
            {selectedTemplateData && (
              <div>
                <Label>Workflow Steps Preview</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
                  <ol className="text-sm space-y-1">
                    {selectedTemplateData.steps_detail.map((step, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-gray-500">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsStartDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleWorkflowSubmit}>
                <Play className="h-4 w-4 mr-2" />
                Start Workflow
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
