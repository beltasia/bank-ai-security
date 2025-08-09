"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Play,
  Settings,
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  FileText,
} from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  description: string
  type: "manual" | "automated" | "approval" | "decision"
  assigneeRole: string
  estimatedDuration: string
  automationLevel: number
  conditions?: string[]
  actions?: string[]
}

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: string
  steps: WorkflowStep[]
  isCustom: boolean
  createdBy: string
  createdDate: string
}

export function WorkflowDesigner() {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([
    {
      id: "CUSTOM-001",
      name: "Zimbabwe Forex Compliance Check",
      description: "Custom workflow for Zimbabwe foreign exchange compliance verification",
      category: "Compliance",
      isCustom: true,
      createdBy: "Tendai Mukamuri",
      createdDate: "2024-01-10",
      steps: [
        {
          id: "step-1",
          name: "Initial Forex Declaration Review",
          description: "Review customer's foreign exchange declaration forms",
          type: "manual",
          assigneeRole: "Compliance Officer",
          estimatedDuration: "30 minutes",
          automationLevel: 20,
          conditions: ["Amount > $10,000", "Cross-border transaction"],
          actions: ["Verify declaration forms", "Check RBZ compliance"],
        },
        {
          id: "step-2",
          name: "Automated RBZ Database Check",
          description: "Automated verification against Reserve Bank of Zimbabwe database",
          type: "automated",
          assigneeRole: "System",
          estimatedDuration: "5 minutes",
          automationLevel: 100,
          conditions: ["Valid customer ID", "Active RBZ connection"],
          actions: ["Query RBZ database", "Validate forex allocation"],
        },
        {
          id: "step-3",
          name: "Senior Manager Approval",
          description: "Senior management approval for high-value forex transactions",
          type: "approval",
          assigneeRole: "Senior Manager",
          estimatedDuration: "2 hours",
          automationLevel: 0,
          conditions: ["Amount > $50,000", "High-risk customer"],
          actions: ["Review documentation", "Approve/reject transaction"],
        },
      ],
    },
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null)
  const [isDesignerOpen, setIsDesignerOpen] = useState(false)
  const [isNewTemplate, setIsNewTemplate] = useState(false)
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null)
  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false)

  const [templateForm, setTemplateForm] = useState({
    name: "",
    description: "",
    category: "",
  })

  const [stepForm, setStepForm] = useState({
    name: "",
    description: "",
    type: "manual" as "manual" | "automated" | "approval" | "decision",
    assigneeRole: "",
    estimatedDuration: "",
    automationLevel: 0,
    conditions: "",
    actions: "",
  })

  const stepTypes = [
    { value: "manual", label: "Manual Task", icon: User, color: "bg-blue-500" },
    { value: "automated", label: "Automated Task", icon: Settings, color: "bg-green-500" },
    { value: "approval", label: "Approval Required", icon: CheckCircle, color: "bg-orange-500" },
    { value: "decision", label: "Decision Point", icon: AlertTriangle, color: "bg-purple-500" },
  ]

  const assigneeRoles = [
    "Fraud Analyst",
    "Senior Investigator",
    "Compliance Officer",
    "Risk Manager",
    "AML Specialist",
    "Senior Manager",
    "Branch Manager",
    "Chief Risk Officer",
    "System",
  ]

  const categories = [
    "AML",
    "Fraud Investigation",
    "Compliance",
    "Risk Assessment",
    "Customer Onboarding",
    "Transaction Monitoring",
    "Regulatory Reporting",
  ]

  const handleCreateNew = () => {
    setIsNewTemplate(true)
    setSelectedTemplate(null)
    setTemplateForm({ name: "", description: "", category: "" })
    setIsDesignerOpen(true)
  }

  const handleEditTemplate = (template: WorkflowTemplate) => {
    setIsNewTemplate(false)
    setSelectedTemplate(template)
    setTemplateForm({
      name: template.name,
      description: template.description,
      category: template.category,
    })
    setIsDesignerOpen(true)
  }

  const handleSaveTemplate = () => {
    if (!templateForm.name || !templateForm.description || !templateForm.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (isNewTemplate) {
      const newTemplate: WorkflowTemplate = {
        id: `CUSTOM-${String(templates.length + 1).padStart(3, "0")}`,
        name: templateForm.name,
        description: templateForm.description,
        category: templateForm.category,
        steps: [],
        isCustom: true,
        createdBy: "Tendai Mukamuri",
        createdDate: new Date().toISOString().split("T")[0],
      }

      setTemplates([...templates, newTemplate])
      setSelectedTemplate(newTemplate)
      toast({
        title: "Template Created",
        description: `Workflow template "${templateForm.name}" has been created.`,
      })
    } else if (selectedTemplate) {
      const updatedTemplates = templates.map((t) =>
        t.id === selectedTemplate.id
          ? {
              ...t,
              name: templateForm.name,
              description: templateForm.description,
              category: templateForm.category,
            }
          : t,
      )
      setTemplates(updatedTemplates)
      toast({
        title: "Template Updated",
        description: `Workflow template "${templateForm.name}" has been updated.`,
      })
    }

    setIsNewTemplate(false)
  }

  const handleAddStep = () => {
    setEditingStep(null)
    setStepForm({
      name: "",
      description: "",
      type: "manual",
      assigneeRole: "",
      estimatedDuration: "",
      automationLevel: 0,
      conditions: "",
      actions: "",
    })
    setIsStepDialogOpen(true)
  }

  const handleEditStep = (step: WorkflowStep) => {
    setEditingStep(step)
    setStepForm({
      name: step.name,
      description: step.description,
      type: step.type,
      assigneeRole: step.assigneeRole,
      estimatedDuration: step.estimatedDuration,
      automationLevel: step.automationLevel,
      conditions: step.conditions?.join(", ") || "",
      actions: step.actions?.join(", ") || "",
    })
    setIsStepDialogOpen(true)
  }

  const handleSaveStep = () => {
    if (!stepForm.name || !stepForm.description || !stepForm.assigneeRole) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required step fields.",
        variant: "destructive",
      })
      return
    }

    if (!selectedTemplate) return

    const newStep: WorkflowStep = {
      id: editingStep?.id || `step-${Date.now()}`,
      name: stepForm.name,
      description: stepForm.description,
      type: stepForm.type,
      assigneeRole: stepForm.assigneeRole,
      estimatedDuration: stepForm.estimatedDuration,
      automationLevel: stepForm.automationLevel,
      conditions: stepForm.conditions ? stepForm.conditions.split(",").map((c) => c.trim()) : [],
      actions: stepForm.actions ? stepForm.actions.split(",").map((a) => a.trim()) : [],
    }

    const updatedTemplate = {
      ...selectedTemplate,
      steps: editingStep
        ? selectedTemplate.steps.map((s) => (s.id === editingStep.id ? newStep : s))
        : [...selectedTemplate.steps, newStep],
    }

    setSelectedTemplate(updatedTemplate)
    setTemplates(templates.map((t) => (t.id === selectedTemplate.id ? updatedTemplate : t)))
    setIsStepDialogOpen(false)

    toast({
      title: editingStep ? "Step Updated" : "Step Added",
      description: `Workflow step "${stepForm.name}" has been ${editingStep ? "updated" : "added"}.`,
    })
  }

  const handleDeleteStep = (stepId: string) => {
    if (!selectedTemplate) return

    const updatedTemplate = {
      ...selectedTemplate,
      steps: selectedTemplate.steps.filter((s) => s.id !== stepId),
    }

    setSelectedTemplate(updatedTemplate)
    setTemplates(templates.map((t) => (t.id === selectedTemplate.id ? updatedTemplate : t)))

    toast({
      title: "Step Deleted",
      description: "Workflow step has been removed.",
    })
  }

  const getStepTypeInfo = (type: string) => {
    return stepTypes.find((st) => st.value === type) || stepTypes[0]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workflow Designer</h2>
          <p className="text-gray-600">Create and customize investigation workflow templates</p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Template
        </Button>
      </div>

      {/* Template List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{template.category}</Badge>
                    {template.isCustom && <Badge className="bg-purple-100 text-purple-800">Custom</Badge>}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span>{template.steps.length} steps</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Created by {template.createdBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Created {template.createdDate}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => handleEditTemplate(template)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4 mr-1" />
                  Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Designer Dialog */}
      <Dialog open={isDesignerOpen} onOpenChange={setIsDesignerOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNewTemplate ? "Create New Workflow Template" : "Edit Workflow Template"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Template Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="templateName">Template Name *</Label>
                <Input
                  id="templateName"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  placeholder="e.g., Custom AML Investigation"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={templateForm.category}
                  onValueChange={(value) => setTemplateForm({ ...templateForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={templateForm.description}
                onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                placeholder="Describe the purpose and scope of this workflow template..."
              />
            </div>

            {/* Workflow Steps */}
            {selectedTemplate && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Workflow Steps</h3>
                  <Button size="sm" onClick={handleAddStep}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </div>

                <div className="space-y-3">
                  {selectedTemplate.steps.map((step, index) => {
                    const stepTypeInfo = getStepTypeInfo(step.type)
                    const StepIcon = stepTypeInfo.icon

                    return (
                      <Card key={step.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="flex flex-col items-center">
                              <div className={`p-2 rounded-lg ${stepTypeInfo.color}`}>
                                <StepIcon className="h-4 w-4 text-white" />
                              </div>
                              {index < selectedTemplate.steps.length - 1 && (
                                <ArrowDown className="h-4 w-4 text-gray-400 mt-2" />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{step.name}</h4>
                                <Badge variant="outline">{stepTypeInfo.label}</Badge>
                                <Badge className="bg-gray-100 text-gray-800">{step.assigneeRole}</Badge>
                              </div>

                              <p className="text-sm text-gray-600 mb-2">{step.description}</p>

                              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                                <div>Duration: {step.estimatedDuration}</div>
                                <div>Automation: {step.automationLevel}%</div>
                              </div>

                              {step.conditions && step.conditions.length > 0 && (
                                <div className="mt-2">
                                  <span className="text-xs font-medium text-gray-700">Conditions:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {step.conditions.map((condition, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {condition}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" onClick={() => handleEditStep(step)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteStep(step.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )
                  })}

                  {selectedTemplate.steps.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No steps added yet. Click "Add Step" to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsDesignerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTemplate}>
                <Save className="h-4 w-4 mr-2" />
                Save Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step Editor Dialog */}
      <Dialog open={isStepDialogOpen} onOpenChange={setIsStepDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingStep ? "Edit Workflow Step" : "Add New Workflow Step"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stepName">Step Name *</Label>
                <Input
                  id="stepName"
                  value={stepForm.name}
                  onChange={(e) => setStepForm({ ...stepForm, name: e.target.value })}
                  placeholder="e.g., Customer Verification"
                />
              </div>
              <div>
                <Label htmlFor="stepType">Step Type *</Label>
                <Select value={stepForm.type} onValueChange={(value: any) => setStepForm({ ...stepForm, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stepTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="stepDescription">Description *</Label>
              <Textarea
                id="stepDescription"
                value={stepForm.description}
                onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
                placeholder="Describe what happens in this step..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigneeRole">Assignee Role *</Label>
                <Select
                  value={stepForm.assigneeRole}
                  onValueChange={(value) => setStepForm({ ...stepForm, assigneeRole: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {assigneeRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Estimated Duration</Label>
                <Input
                  id="duration"
                  value={stepForm.estimatedDuration}
                  onChange={(e) => setStepForm({ ...stepForm, estimatedDuration: e.target.value })}
                  placeholder="e.g., 2 hours, 30 minutes"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="automation">Automation Level (%)</Label>
              <Input
                id="automation"
                type="number"
                min="0"
                max="100"
                value={stepForm.automationLevel}
                onChange={(e) => setStepForm({ ...stepForm, automationLevel: Number.parseInt(e.target.value) || 0 })}
              />
            </div>

            <div>
              <Label htmlFor="conditions">Conditions (comma-separated)</Label>
              <Input
                id="conditions"
                value={stepForm.conditions}
                onChange={(e) => setStepForm({ ...stepForm, conditions: e.target.value })}
                placeholder="e.g., Amount > $10000, High risk customer"
              />
            </div>

            <div>
              <Label htmlFor="actions">Actions (comma-separated)</Label>
              <Input
                id="actions"
                value={stepForm.actions}
                onChange={(e) => setStepForm({ ...stepForm, actions: e.target.value })}
                placeholder="e.g., Verify documents, Contact customer"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsStepDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveStep}>
                <Save className="h-4 w-4 mr-2" />
                {editingStep ? "Update Step" : "Add Step"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
