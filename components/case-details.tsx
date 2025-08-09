"use client"

import { Input } from "@/components/ui/input"

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
import { EmailResponseTracker } from "@/components/email-response-tracker"
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
  Mail,
  Send,
  X,
  MailOpen,
} from "lucide-react"

interface EmailThread {
  id: string
  subject: string
  type: "investigate" | "escalate" | "false_positive" | "general"
  priority: "low" | "normal" | "high" | "urgent"
  sentAt: string
  sentBy: string
  recipients: string[]
  status: "sent" | "delivered" | "read" | "replied"
  responses: EmailResponse[]
  attachments: string[]
}

interface EmailResponse {
  id: string
  threadId: string
  from: string
  message: string
  timestamp: string
  type: "reply" | "forward" | "question" | "answer"
  readBy: string[]
}

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

  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailType, setEmailType] = useState<"investigate" | "escalate" | "false_positive" | "">("")
  const [emailRecipients, setEmailRecipients] = useState<string[]>([])
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [emailPriority, setEmailPriority] = useState("normal")
  const [includeAttachments, setIncludeAttachments] = useState(false)

  // Email tracking state
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>([
    {
      id: "email-001",
      subject: "Investigation Started: Suspicious Wire Transfer Pattern (CASE-2024-001)",
      type: "investigate",
      priority: "high",
      sentAt: "2024-01-15T14:30:00Z",
      sentBy: "Tendai Mukamuri",
      recipients: ["Chipo Nyathi", "Blessing Moyo"],
      status: "replied",
      attachments: ["case-summary.pdf", "transaction-log.xlsx"],
      responses: [
        {
          id: "response-001",
          threadId: "email-001",
          from: "Chipo Nyathi",
          message:
            "I've reviewed the transaction patterns. The velocity and amounts are indeed suspicious. I recommend we contact the customer immediately and request documentation for all transactions over $50,000. Should we also place a temporary hold on the account?",
          timestamp: "2024-01-15T15:45:00Z",
          type: "reply",
          readBy: ["Tendai Mukamuri", "Blessing Moyo"],
        },
        {
          id: "response-002",
          threadId: "email-001",
          from: "Blessing Moyo",
          message:
            "From a compliance perspective, we need to file a SAR within 30 days if this investigation confirms suspicious activity. I've prepared the preliminary documentation. Question: Do we have the customer's updated KYC information?",
          timestamp: "2024-01-15T16:20:00Z",
          type: "question",
          readBy: ["Tendai Mukamuri"],
        },
      ],
    },
    {
      id: "email-002",
      subject: "Follow-up: Customer Contact Attempt",
      type: "general",
      priority: "normal",
      sentAt: "2024-01-15T17:00:00Z",
      sentBy: "Chipo Nyathi",
      recipients: ["Tendai Mukamuri"],
      status: "read",
      attachments: [],
      responses: [],
    },
  ])

  const [showEmailTracker, setShowEmailTracker] = useState(false)

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
      email: "tendai.mukamuri@nmb.co.zw",
    },
    {
      id: "2",
      name: "Chipo Nyathi",
      initials: "CN",
      role: "Fraud Analyst",
      department: "Risk Management",
      email: "chipo.nyathi@nmb.co.zw",
    },
    {
      id: "3",
      name: "Blessing Moyo",
      initials: "BM",
      role: "Compliance Officer",
      department: "Compliance",
      email: "blessing.moyo@nmb.co.zw",
    },
    {
      id: "4",
      name: "Tatenda Sibanda",
      initials: "TS",
      role: "Risk Manager",
      department: "Risk Management",
      email: "tatenda.sibanda@nmb.co.zw",
    },
    {
      id: "5",
      name: "Rumbidzai Dube",
      initials: "RD",
      role: "AML Specialist",
      department: "AML",
      email: "rumbidzai.dube@nmb.co.zw",
    },
    {
      id: "6",
      name: "Farai Ncube",
      initials: "FN",
      role: "Senior Analyst",
      department: "Analytics",
      email: "farai.ncube@nmb.co.zw",
    },
    {
      id: "7",
      name: "Precious Mpofu",
      initials: "PM",
      role: "Investigation Lead",
      department: "Fraud Investigation",
      email: "precious.mpofu@nmb.co.zw",
    },
    {
      id: "8",
      name: "Takudzwa Chirwa",
      initials: "TC",
      role: "Compliance Analyst",
      department: "Compliance",
      email: "takudzwa.chirwa@nmb.co.zw",
    },
  ]

  const addEmailToTimeline = (emailData: EmailThread) => {
    // In real app, this would update the database and trigger timeline refresh
    console.log("Adding email to timeline:", emailData)
  }

  const handleInvestigate = () => {
    setCaseData((prev) => ({
      ...prev,
      status: "investigating",
      lastActivity: new Date().toISOString(),
    }))

    // Set up email dialog for investigation
    setEmailType("investigate")
    setEmailRecipients([caseData.assignee])
    setEmailSubject(`Investigation Started: ${caseData.title} (${caseData.id})`)
    setEmailMessage(`Dear ${caseData.assignee},

Investigation has been initiated for case ${caseData.id}: ${caseData.title}

Case Details:
- Customer: ${caseData.customerName}
- Amount: ${caseData.amount}
- Risk Score: ${caseData.riskScore}
- Priority: ${caseData.priority}

Please review the case details and begin your investigation. If you have any questions or need additional information, please respond to this email.

Key areas to focus on:
- Transaction pattern analysis
- Customer verification
- Documentation review
- Risk assessment validation

Best regards,
Fraud Investigation Team`)
    setShowEmailDialog(true)

    console.log("Case status changed to investigating")
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

    // Set up email dialog for escalation
    setEmailType("escalate")
    setEmailRecipients(["Senior Management", "Compliance Team", caseData.assignee])
    setEmailSubject(`URGENT ESCALATION: ${caseData.title} (${caseData.id})`)
    setEmailMessage(`URGENT: Case Escalation Required

Case ID: ${caseData.id}
Title: ${caseData.title}
Priority: ${escalationPriority.toUpperCase()}
Assigned to: ${caseData.assignee}

ESCALATION REASON:
${escalationReason}

Case Summary:
- Customer: ${caseData.customerName}
- Amount: ${caseData.amount}
- Risk Score: ${caseData.riskScore}
- Days Open: 3

This case requires immediate senior management attention. Please review and provide guidance on next steps.

Questions for Management:
1. Should we involve external authorities?
2. Do we need additional resources assigned?
3. Are there any specific compliance requirements?
4. Should we implement immediate account restrictions?

Please respond with your recommendations and any additional questions.

Regards,
${caseData.assignee}
Fraud Investigation Team`)
    setEmailPriority("urgent")
    setShowEmailDialog(true)

    setShowEscalateDialog(false)
    setEscalationReason("")
    setEscalationPriority("high")
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

      // Set up email dialog for false positive
      setEmailType("false_positive")
      setEmailRecipients(["Compliance Team", "Risk Management", "System Admin"])
      setEmailSubject(`False Positive Confirmation: ${caseData.title} (${caseData.id})`)
      setEmailMessage(`Case Marked as False Positive

Case ID: ${caseData.id}
Title: ${caseData.title}
Customer: ${caseData.customerName}
Original Risk Score: ${caseData.riskScore}

After thorough investigation, this case has been determined to be a false positive alert.

Investigation Summary:
- All transactions were legitimate and properly authorized
- Customer provided satisfactory documentation
- No suspicious patterns identified upon detailed review
- Risk factors were within acceptable parameters

Actions Taken:
- Customer contacted and verified transactions
- Documentation reviewed and validated
- Account activity analyzed for 90-day period
- Cross-referenced with known fraud patterns

Questions for System Improvement:
1. Can we adjust the detection algorithm to reduce similar false positives?
2. Should we update the risk scoring model based on this case?
3. Are there additional data points we should consider?
4. Should we implement pre-screening for similar transaction patterns?

This case will be added to the false positive database for future reference and system training.

Please confirm receipt and provide any feedback on system improvements.

Best regards,
${caseData.assignee}
Fraud Investigation Team`)
      setShowEmailDialog(true)

      console.log("Case marked as false positive")
    }
  }

  const handleSendEmail = () => {
    if (!emailMessage.trim() || emailRecipients.length === 0) {
      alert("Please provide email content and select recipients")
      return
    }

    // Create new email thread
    const newEmailThread: EmailThread = {
      id: `email-${Date.now()}`,
      subject: emailSubject,
      type: emailType as "investigate" | "escalate" | "false_positive",
      priority: emailPriority as "low" | "normal" | "high" | "urgent",
      sentAt: new Date().toISOString(),
      sentBy: caseData.assignee,
      recipients: emailRecipients,
      status: "sent",
      responses: [],
      attachments: includeAttachments ? ["case-summary.pdf", "evidence-package.zip"] : [],
    }

    // Add to email threads
    setEmailThreads((prev) => [newEmailThread, ...prev])

    // Add to timeline
    addEmailToTimeline(newEmailThread)

    // In real app, this would send actual emails
    console.log("Sending email:", {
      type: emailType,
      recipients: emailRecipients,
      subject: emailSubject,
      message: emailMessage,
      priority: emailPriority,
      attachments: includeAttachments,
      caseId: caseData.id,
    })

    setShowEmailDialog(false)

    // Reset email form
    setEmailType("")
    setEmailRecipients([])
    setEmailSubject("")
    setEmailMessage("")
    setEmailPriority("normal")
    setIncludeAttachments(false)

    const actionText =
      emailType === "investigate"
        ? "Investigation started"
        : emailType === "escalate"
          ? "Case escalated"
          : "Case marked as false positive"

    alert(
      `${actionText} and email notifications sent to relevant stakeholders. Email tracking is now active - you can monitor responses in the timeline.`,
    )
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

  const getEmailStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <Badge variant="outline" className="text-blue-600">
            Sent
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-600">
            Delivered
          </Badge>
        )
      case "read":
        return (
          <Badge variant="outline" className="text-purple-600">
            Read
          </Badge>
        )
      case "replied":
        return (
          <Badge variant="outline" className="text-orange-600">
            Replied
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
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
          {/* Email Tracker Button */}
          <Button
            variant="outline"
            onClick={() => setShowEmailTracker(true)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <MailOpen className="h-4 w-4 mr-2" />
            Email Tracker ({emailThreads.length})
          </Button>

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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm">Email Threads</span>
                </div>
                <span className="font-semibold">{emailThreads.length}</span>
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
          <CaseTimeline caseId={caseData.id} emailThreads={emailThreads} />
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

      {/* Email Response Tracker Dialog */}
      <EmailResponseTracker
        isOpen={showEmailTracker}
        onClose={() => setShowEmailTracker(false)}
        emailThreads={emailThreads}
        setEmailThreads={setEmailThreads}
        caseId={caseData.id}
      />

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {emailType === "investigate" && "Send Investigation Notification"}
              {emailType === "escalate" && "Send Escalation Alert"}
              {emailType === "false_positive" && "Send False Positive Notification"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Email Recipients */}
            <div>
              <Label htmlFor="email-recipients">Recipients</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {emailRecipients.map((recipient, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {recipient}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => setEmailRecipients((prev) => prev.filter((_, i) => i !== index))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Select
                onValueChange={(value) => {
                  if (!emailRecipients.includes(value)) {
                    setEmailRecipients((prev) => [...prev, value])
                  }
                }}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Add recipients..." />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                  <SelectItem value="Senior Management">Senior Management</SelectItem>
                  <SelectItem value="Compliance Team">Compliance Team</SelectItem>
                  <SelectItem value="Risk Management">Risk Management</SelectItem>
                  <SelectItem value="System Admin">System Admin</SelectItem>
                  <SelectItem value="Legal Department">Legal Department</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email-priority">Priority</Label>
                <Select value={emailPriority} onValueChange={setEmailPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="normal">Normal Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  id="include-attachments"
                  checked={includeAttachments}
                  onChange={(e) => setIncludeAttachments(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="include-attachments">Include case attachments</Label>
              </div>
            </div>

            {/* Email Subject */}
            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Email Message */}
            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                className="min-h-[300px] mt-1"
                placeholder="Type your message here..."
              />
            </div>

            {/* Suggested Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Suggested Questions to Include</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {emailType === "investigate" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-left justify-start h-auto p-2"
                        onClick={() =>
                          setEmailMessage(
                            (prev) =>
                              prev +
                              "\n\nQuestions:\n1. Do you need additional resources for this investigation?\n2. Are there any specific areas of concern?\n3. What is your estimated timeline for completion?",
                          )
                        }
                      >
                        + Add investigation questions
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-left justify-start h-auto p-2"
                        onClick={() =>
                          setEmailMessage(
                            (prev) =>
                              prev +
                              "\n\n4. Should we contact the customer immediately?\n5. Do you need access to additional transaction history?\n6. Are there any compliance considerations?",
                          )
                        }
                      >
                        + Add resource questions
                      </Button>
                    </>
                  )}
                  {emailType === "escalate" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-left justify-start h-auto p-2"
                        onClick={() =>
                          setEmailMessage(
                            (prev) =>
                              prev +
                              "\n\nAdditional Questions:\n1. Should we involve law enforcement?\n2. Do we need to freeze the account immediately?\n3. Are there regulatory reporting requirements?",
                          )
                        }
                      >
                        + Add escalation questions
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-left justify-start h-auto p-2"
                        onClick={() =>
                          setEmailMessage(
                            (prev) =>
                              prev +
                              "\n\n4. Should we contact other financial institutions?\n5. Do we need external forensic analysis?\n6. What are the potential reputational risks?",
                          )
                        }
                      >
                        + Add management questions
                      </Button>
                    </>
                  )}
                  {emailType === "false_positive" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-left justify-start h-auto p-2"
                        onClick={() =>
                          setEmailMessage(
                            (prev) =>
                              prev +
                              "\n\nSystem Improvement Questions:\n1. How can we prevent similar false positives?\n2. Should we adjust the risk scoring algorithm?\n3. Are there additional data points to consider?",
                          )
                        }
                      >
                        + Add system improvement questions
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-left justify-start h-auto p-2"
                        onClick={() =>
                          setEmailMessage(
                            (prev) =>
                              prev +
                              "\n\n4. Should we update training materials?\n5. Do we need to review similar historical cases?\n6. Are there process improvements needed?",
                          )
                        }
                      >
                        + Add process questions
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail} className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Send Email &{" "}
                {emailType === "investigate"
                  ? "Start Investigation"
                  : emailType === "escalate"
                    ? "Escalate Case"
                    : "Mark False Positive"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
