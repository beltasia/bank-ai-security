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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, Plus, User, DollarSign, FileText, Tag, CheckCircle, Clock } from "lucide-react"

interface CaseCreationFormProps {
  onClose: () => void
  onCaseCreated: (caseData: any) => void
}

export function CaseCreationForm({ onClose, onCaseCreated }: CaseCreationFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    assignee: "",
    customerName: "",
    accountNumber: "",
    amount: "",
    riskScore: "",
    description: "",
    alertSource: "",
    transactionDate: "",
  })

  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    "Money Laundering",
    "Account Takeover",
    "Card Fraud",
    "Wire Fraud",
    "Identity Theft",
    "Internal Fraud",
    "Structuring",
    "Suspicious Activity",
    "Cyber Fraud",
    "Check Fraud",
  ]

  const priorities = [
    { value: "critical", label: "Critical", color: "bg-red-600" },
    { value: "high", label: "High", color: "bg-orange-500" },
    { value: "medium", label: "Medium", color: "bg-yellow-500" },
    { value: "low", label: "Low", color: "bg-green-500" },
  ]

  const teamMembers = [
    { id: "1", name: "Tendai Mukamuri", initials: "TM", role: "Senior Investigator" },
    { id: "2", name: "Chipo Nyathi", initials: "CN", role: "Fraud Analyst" },
    { id: "3", name: "Blessing Moyo", initials: "BM", role: "Compliance Officer" },
    { id: "4", name: "Tatenda Sibanda", initials: "TS", role: "Risk Manager" },
    { id: "5", name: "Rumbidzai Dube", initials: "RD", role: "AML Specialist" },
    { id: "6", name: "Farai Ncube", initials: "FN", role: "Senior Analyst" },
    { id: "7", name: "Precious Mpofu", initials: "PM", role: "Investigation Lead" },
    { id: "8", name: "Takudzwa Chirwa", initials: "TC", role: "Compliance Analyst" },
  ]

  const alertSources = [
    "Transaction Monitoring System",
    "Customer Report",
    "Internal Audit",
    "Regulatory Notice",
    "Third Party Alert",
    "Manual Review",
    "AI/ML Detection",
    "Cross-Reference Check",
  ]

  const availableTags = [
    "High Value",
    "Cross-Border",
    "Urgent",
    "Regulatory",
    "Customer Risk",
    "Pattern Analysis",
    "Velocity",
    "Threshold",
    "Suspicious",
    "Investigation",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Case title is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.priority) newErrors.priority = "Priority is required"
    if (!formData.assignee) newErrors.assignee = "Assignee is required"
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required"
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required"
    if (!formData.amount.trim()) newErrors.amount = "Amount is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.alertSource) newErrors.alertSource = "Alert source is required"

    // Validate risk score
    const riskScore = Number.parseFloat(formData.riskScore)
    if (!formData.riskScore || isNaN(riskScore) || riskScore < 1 || riskScore > 10) {
      newErrors.riskScore = "Risk score must be between 1 and 10"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Generate case ID
      const caseId = `CASE-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`

      // Find assignee details
      const assignee = teamMembers.find((member) => member.id === formData.assignee)

      const newCase = {
        id: caseId,
        title: formData.title,
        category: formData.category,
        priority: formData.priority,
        status: "active",
        assignee: assignee?.name || "",
        assigneeInitials: assignee?.initials || "",
        customerName: formData.customerName,
        accountNumber: formData.accountNumber,
        amount: formData.amount,
        riskScore: `${formData.riskScore}/10`,
        description: formData.description,
        alertSource: formData.alertSource,
        transactionDate: formData.transactionDate,
        createdAt: new Date().toISOString(),
        lastActivity: "Just created",
        tags: tags,
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onCaseCreated(newCase)
    } catch (error) {
      console.error("Error creating case:", error)
      alert("Error creating case. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedAssignee = teamMembers.find((member) => member.id === formData.assignee)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create New Fraud Investigation Case
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Case Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the fraud case..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger className={errors.priority ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select priority..." />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
                              {priority.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.priority && <p className="text-sm text-red-600 mt-1">{errors.priority}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="assignee">Assign to *</Label>
                  <Select value={formData.assignee} onValueChange={(value) => handleInputChange("assignee", value)}>
                    <SelectTrigger className={errors.assignee ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select team member..." />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.assignee && <p className="text-sm text-red-600 mt-1">{errors.assignee}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Customer & Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer & Financial Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      placeholder="Full customer name..."
                      value={formData.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                      className={errors.customerName ? "border-red-500" : ""}
                    />
                    {errors.customerName && <p className="text-sm text-red-600 mt-1">{errors.customerName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Account number..."
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                      className={errors.accountNumber ? "border-red-500" : ""}
                    />
                    {errors.accountNumber && <p className="text-sm text-red-600 mt-1">{errors.accountNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Transaction Amount *</Label>
                    <Input
                      id="amount"
                      placeholder="$0.00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      className={errors.amount ? "border-red-500" : ""}
                    />
                    {errors.amount && <p className="text-sm text-red-600 mt-1">{errors.amount}</p>}
                  </div>

                  <div>
                    <Label htmlFor="riskScore">Risk Score (1-10) *</Label>
                    <Input
                      id="riskScore"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      placeholder="8.5"
                      value={formData.riskScore}
                      onChange={(e) => handleInputChange("riskScore", e.target.value)}
                      className={errors.riskScore ? "border-red-500" : ""}
                    />
                    {errors.riskScore && <p className="text-sm text-red-600 mt-1">{errors.riskScore}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="alertSource">Alert Source *</Label>
                    <Select
                      value={formData.alertSource}
                      onValueChange={(value) => handleInputChange("alertSource", value)}
                    >
                      <SelectTrigger className={errors.alertSource ? "border-red-500" : ""}>
                        <SelectValue placeholder="How was this detected..." />
                      </SelectTrigger>
                      <SelectContent>
                        {alertSources.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.alertSource && <p className="text-sm text-red-600 mt-1">{errors.alertSource}</p>}
                  </div>

                  <div>
                    <Label htmlFor="transactionDate">Transaction Date</Label>
                    <Input
                      id="transactionDate"
                      type="date"
                      value={formData.transactionDate}
                      onChange={(e) => handleInputChange("transactionDate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description & Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Case Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the suspicious activity, patterns observed, and any relevant context..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {availableTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => {
                          if (!tags.includes(tag)) {
                            setTags((prev) => [...prev, tag])
                          }
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Case Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.title && (
                  <div>
                    <h3 className="font-semibold text-lg">{formData.title}</h3>
                    <p className="text-sm text-gray-500">Case will be auto-assigned ID</p>
                  </div>
                )}

                {(formData.category || formData.priority) && (
                  <div className="flex flex-wrap gap-2">
                    {formData.category && <Badge variant="outline">{formData.category}</Badge>}
                    {formData.priority && (
                      <Badge className={priorities.find((p) => p.value === formData.priority)?.color || "bg-gray-500"}>
                        {priorities.find((p) => p.value === formData.priority)?.label}
                      </Badge>
                    )}
                  </div>
                )}

                {selectedAssignee && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{selectedAssignee.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{selectedAssignee.name}</p>
                      <p className="text-xs text-gray-500">{selectedAssignee.role}</p>
                    </div>
                  </div>
                )}

                {(formData.customerName || formData.amount) && (
                  <div className="space-y-2">
                    {formData.customerName && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{formData.customerName}</span>
                      </div>
                    )}
                    {formData.amount && (
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold">{formData.amount}</span>
                      </div>
                    )}
                  </div>
                )}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p>Case will be created and assigned to selected team member</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p>Assignee will receive email notification</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p>Case timeline will begin tracking</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <p>Investigation workflow will be initiated</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="min-w-[120px]">
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </div>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Case
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
