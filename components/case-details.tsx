"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CaseTimeline } from "@/components/case-timeline"
import { CaseEvidence } from "@/components/case-evidence"
import { CaseTransactions } from "@/components/case-transactions"
import { CaseCollaboration } from "@/components/case-collaboration"
import {
  ArrowLeft,
  User,
  DollarSign,
  Calendar,
  AlertTriangle,
  FileText,
  MessageSquare,
  Users,
  Clock,
  TrendingUp,
  Play,
  XCircle,
  ArrowUp,
  UserCheck,
} from "lucide-react"

interface CaseDetailsProps {
  caseId: string
  onBack: () => void
}

export function CaseDetails({ caseId, onBack }: CaseDetailsProps) {
  const [newNote, setNewNote] = useState("")
  const [caseStatus, setCaseStatus] = useState("investigating")
  const [showEscalateDialog, setShowEscalateDialog] = useState(false)
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [escalationReason, setEscalationReason] = useState("")
  const [escalationPriority, setEscalationPriority] = useState("high")
  const [selectedAssignee, setSelectedAssignee] = useState("")
  const [assignmentNotes, setAssignmentNotes] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [statusReason, setStatusReason] = useState("")

  // Mock case data - in real app, this would be fetched based on caseId
  const [caseData, setCaseData] = useState({
    id: "CASE-2024-001",
    title: "Suspicious Wire Transfer Pattern",
    description:
      "Multiple high-value wire transfers to offshore accounts within 24 hours. Pattern suggests potential money laundering activity with structured amounts designed to avoid detection thresholds.",
    status: "investigating",
    priority: "critical",
    category: "Money Laundering",
    assignee: "Tendai Mukamuri",
    assigneeInitials: "TM",
    createdDate: "2024-01-15T10:30:00Z",
    lastActivity: "2024-01-15T16:45:00Z",
    amount: "$247,500.00",
    account: "****-4521",
    customerName: "Tafadzwa Madziva",
    riskScore: 9.2,
    alertsCount: 3,
    evidenceCount: 12,
    transactionsCount: 8,
    tags: ["High Value", "International", "Velocity", "Pattern"],
    relatedCases: ["CASE-2024-003", "CASE-2023-089"],
  })

  const teamMembers = [
    {
      id: "1",
      name: "Tendai Mukamuri",
      initials: "TM",
      role: "Senior Investigator",
      department: "Fraud Investigation",
    },
    { id: "2", name: "Chipo Nyathi", initials: "CN", role: "Fraud Analyst", department: "Risk Management" },
    { id: "3", name: "Blessing Moyo", initials: "BM", role: "Compliance Officer", department: "Compliance" },
    { id: "4", name: "Tatenda Sibanda", initials: "TS", role: "Risk Manager", department: "Risk Management" },
    { id: "5", name: "Rumbidzai Dube", initials: "RD", role: "AML Specialist", department: "AML" },
    { id: "6", name: "Farai Ncube", initials: "FN", role: "Senior Analyst", department: "Analytics" },
    { id: "7", name: "Precious Mpofu", initials: "PM", role: "Investigation Lead", department: "Fraud Investigation" },
    { id: "8", name: "Takudzwa Chirwa", initials: "TC", role: "Compliance Analyst", department: "Compliance" },
  ]

  const handleInvestigate = () => {
    setCaseData((prev) => ({
      ...prev,
      status: "investigating",
      lastActivity: new Date().toISOString(),
    }))

    // Add timeline entry
    console.log("Case status changed to investigating")

    // In real app, this would make an API call
    alert("Case status updated to 'Investigating'. Investigation workflow has been initiated.")
  }

  const handleEscalate = () => {
    if (!escalationReason.trim()) {
      alert("Please provide a reason for escalation")
      return
    }

    setCaseData((prev) => ({
      ...prev,
      status: "escalated",
      priority: escalationPriority as "critical" | "high" | "medium" | "low",
      lastActivity: new Date().toISOString(),
    }))

    // Add timeline entry
    console.log("Case escalated:", { reason: escalationReason, priority: escalationPriority })

    setShowEscalateDialog(false)
    setEscalationReason("")
    setEscalationPriority("high")

    alert(`Case has been escalated with ${escalationPriority} priority. Senior management has been notified.`)
  }

  const handleAssign = () => {
    if (!selectedAssignee) {
      alert("Please select an assignee")
      return
    }

    const assignee = teamMembers.find((member) => member.id === selectedAssignee)
    if (assignee) {
      setCaseData((prev) => ({
        ...prev,
        assignee: assignee.name,
        assigneeInitials: assignee.initials,
        lastActivity: new Date().toISOString(),
      }))

      console.log("Case assigned:", { assignee: assignee.name, notes: assignmentNotes })

      setShowAssignDialog(false)
      setSelectedAssignee("")
      setAssignmentNotes("")

      alert(`Case has been assigned to ${assignee.name}. They have been notified via email.`)
    }
  }

  const handleStatusUpdate = () => {
    if (!newStatus || !statusReason.trim()) {
      alert("Please select a status and provide a reason")
      return
    }

    setCaseData((prev) => ({
      ...prev,
      status: newStatus,
      lastActivity: new Date().toISOString(),
    }))

    console.log("Status updated:", { status: newStatus, reason: statusReason })

    setShowStatusDialog(false)
    setNewStatus("")
    setStatusReason("")

    alert(
      `Case status has been updated to '${newStatus.replace("_", " ").toUpperCase()}'. All stakeholders have been notified.`,
    )
  }

  const handleMarkFalsePositive = () => {
    const confirmed = window.confirm(
      "Are you sure you want to mark this case as a false positive? This action will close the case and cannot be undone.",
    )

    if (confirmed) {
      setCaseData((prev) => ({
        ...prev,
        status: "closed",
        lastActivity: new Date().toISOString(),
      }))

      console.log("Case marked as false positive")
      alert(
        "Case has been marked as a false positive and closed. The alert has been added to the false positive database for future reference.",
      )
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "investigating":
        return <Badge className="bg-yellow-100 text-yellow-800">Investigating</Badge>
      case "pending_review":
        return <Badge className="bg-orange-100 text-orange-800">Pending Review</Badge>
      case "escalated":
        return <Badge className="bg-red-100 text-red-800">Escalated</Badge>
      case "closed":
        return <Badge className="bg-green-100 text-green-800">Closed</Badge>
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Active</Badge>
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

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In real app, this would save the note
      console.log("Adding note:", newNote)
      setNewNote("")
      alert("Note has been added to the case.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cases
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{caseData.title}</h1>
          <p className="text-gray-600">Case ID: {caseData.id}</p>
        </div>
        <div className="flex gap-2">
          {/* Escalate Dialog */}
          <Dialog open={showEscalateDialog} onOpenChange={setShowEscalateDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                <ArrowUp className="h-4 w-4 mr-2" />
                Escalate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Escalate Case</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="escalation-priority">Escalation Priority</Label>
                  <Select value={escalationPriority} onValueChange={setEscalationPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="escalation-reason">Reason for Escalation</Label>
                  <Textarea
                    id="escalation-reason"
                    placeholder="Explain why this case needs to be escalated..."
                    value={escalationReason}
                    onChange={(e) => setEscalationReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowEscalateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEscalate} className="bg-red-600 hover:bg-red-700">
                    Escalate Case
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Assign Dialog */}
          <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserCheck className="h-4 w-4 mr-2" />
                Assign
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Case</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="assignee">Assign to Team Member</Label>
                  <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member..." />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name} - {member.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignment-notes">Assignment Notes</Label>
                  <Textarea
                    id="assignment-notes"
                    placeholder="Add any specific instructions or context for the assignee..."
                    value={assignmentNotes}
                    onChange={(e) => setAssignmentNotes(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAssign}>Assign Case</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Update Status Dialog */}
          <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
            <DialogTrigger asChild>
              <Button>Update Status</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Case Status</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-status">New Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="pending_review">Pending Review</SelectItem>
                      <SelectItem value="escalated">Escalated</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status-reason">Reason for Status Change</Label>
                  <Textarea
                    id="status-reason"
                    placeholder="Explain the reason for this status change..."
                    value={statusReason}
                    onChange={(e) => setStatusReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleStatusUpdate}>Update Status</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Case Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Case Overview</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(caseData.status)}
                    {getPriorityBadge(caseData.priority)}
                    <Badge variant="outline">{caseData.category}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{caseData.assigneeInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{caseData.assignee}</p>
                      <p className="text-xs text-gray-500">Lead Investigator</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{caseData.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="text-sm font-medium">{caseData.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-sm font-semibold">{caseData.amount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Risk Score</p>
                    <p className="text-sm font-semibold text-red-600">{caseData.riskScore}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-sm font-medium">Jan 15, 2024</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {caseData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Case Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Alerts</span>
                </div>
                <span className="font-semibold">{caseData.alertsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Evidence Items</span>
                </div>
                <span className="font-semibold">{caseData.evidenceCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Transactions</span>
                </div>
                <span className="font-semibold">{caseData.transactionsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Days Open</span>
                </div>
                <span className="font-semibold">3</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleInvestigate}>
                <Play className="h-4 w-4 mr-2" />
                Start Investigation
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Request Collaboration
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Create SAR
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleMarkFalsePositive}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Mark False Positive
              </Button>
            </CardContent>
          </Card>

          {/* Add Note */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Add Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add investigation notes..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="mb-3"
              />
              <Button onClick={handleAddNote} className="w-full">
                Add Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="notes">Notes & Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-6">
          <CaseTimeline caseId={caseData.id} />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <CaseTransactions caseId={caseData.id} />
        </TabsContent>

        <TabsContent value="evidence" className="mt-6">
          <CaseEvidence caseId={caseData.id} />
        </TabsContent>

        <TabsContent value="collaboration" className="mt-6">
          <CaseCollaboration caseId={caseData.id} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Investigation Notes & Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">TM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Tendai Mukamuri</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Reviewed transaction patterns. The timing and amounts suggest coordinated activity. Requesting
                    additional documentation from compliance team.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">CN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Chipo Nyathi</span>
                    <span className="text-xs text-gray-500">5 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Customer contacted regarding unusual activity. Claims transactions were authorized but unable to
                    provide supporting documentation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
