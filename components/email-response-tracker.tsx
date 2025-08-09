"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Mail,
  Send,
  Reply,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  MessageSquare,
  Paperclip,
  Search,
  Calendar,
} from "lucide-react"

interface EmailThread {
  id: string
  subject: string
  caseId: string
  initiatedBy: string
  recipients: string[]
  status: "sent" | "delivered" | "read" | "replied" | "closed"
  priority: "high" | "medium" | "low"
  createdAt: string
  lastActivity: string
  responseCount: number
  readCount: number
  attachmentCount: number
  category: "investigation" | "escalation" | "false_positive" | "general"
  emails: EmailMessage[]
}

interface EmailMessage {
  id: string
  threadId: string
  from: string
  to: string[]
  cc?: string[]
  subject: string
  content: string
  timestamp: string
  status: "sent" | "delivered" | "read" | "replied"
  attachments?: string[]
  isResponse: boolean
  responseTime?: number
}

export function EmailResponseTracker({ caseId }: { caseId: string }) {
  const [selectedThread, setSelectedThread] = useState<EmailThread | null>(null)
  const [isThreadDialogOpen, setIsThreadDialogOpen] = useState(false)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Mock email threads data
  const emailThreads: EmailThread[] = [
    {
      id: "thread-001",
      subject: "Investigation Required: Suspicious Wire Transfer - Case #FR-2024-001",
      caseId: "FR-2024-001",
      initiatedBy: "sarah.mukamuri@nmb.co.zw",
      recipients: ["james.chikwanha@nmb.co.zw", "mercy.ndoro@nmb.co.zw"],
      status: "replied",
      priority: "high",
      createdAt: "2024-01-15T09:30:00Z",
      lastActivity: "2024-01-15T14:22:00Z",
      responseCount: 3,
      readCount: 2,
      attachmentCount: 2,
      category: "investigation",
      emails: [
        {
          id: "email-001",
          threadId: "thread-001",
          from: "sarah.mukamuri@nmb.co.zw",
          to: ["james.chikwanha@nmb.co.zw", "mercy.ndoro@nmb.co.zw"],
          subject: "Investigation Required: Suspicious Wire Transfer - Case #FR-2024-001",
          content:
            "Dear Team,\n\nWe have detected a suspicious wire transfer pattern that requires immediate investigation. Please review the attached transaction details and provide your analysis.\n\nKey Questions:\n1. Are there any similar patterns in the customer's transaction history?\n2. What is the customer's risk profile?\n3. Should we implement additional monitoring?\n\nPlease respond within 24 hours.\n\nBest regards,\nSarah Mukamuri",
          timestamp: "2024-01-15T09:30:00Z",
          status: "read",
          attachments: ["transaction_details.pdf", "customer_profile.xlsx"],
          isResponse: false,
        },
        {
          id: "email-002",
          threadId: "thread-001",
          from: "james.chikwanha@nmb.co.zw",
          to: ["sarah.mukamuri@nmb.co.zw"],
          cc: ["mercy.ndoro@nmb.co.zw"],
          subject: "Re: Investigation Required: Suspicious Wire Transfer - Case #FR-2024-001",
          content:
            "Hi Sarah,\n\nI've reviewed the transaction details. The pattern is indeed suspicious - multiple round-number transfers to the same beneficiary in South Africa.\n\nAnswers to your questions:\n1. Yes, similar patterns found in the last 30 days\n2. Customer risk profile is Medium-High\n3. Recommend immediate enhanced monitoring\n\nI'm escalating this to the compliance team.\n\nRegards,\nJames Chikwanha",
          timestamp: "2024-01-15T11:45:00Z",
          status: "read",
          isResponse: true,
          responseTime: 135, // minutes
        },
        {
          id: "email-003",
          threadId: "thread-001",
          from: "mercy.ndoro@nmb.co.zw",
          to: ["sarah.mukamuri@nmb.co.zw", "james.chikwanha@nmb.co.zw"],
          subject: "Re: Investigation Required: Suspicious Wire Transfer - Case #FR-2024-001",
          content:
            "Team,\n\nI concur with James's assessment. I've also noticed velocity anomalies in the account.\n\nAdditional findings:\n- Account opened 3 months ago\n- Rapid increase in transaction volume\n- Beneficiary details match known risk indicators\n\nRecommend immediate account freeze pending investigation.\n\nMercy Ndoro\nCompliance Officer",
          timestamp: "2024-01-15T14:22:00Z",
          status: "read",
          isResponse: true,
          responseTime: 292, // minutes
        },
      ],
    },
    {
      id: "thread-002",
      subject: "URGENT: Escalation Required - Account Takeover Case #FR-2024-002",
      caseId: "FR-2024-002",
      initiatedBy: "tendai.moyo@nmb.co.zw",
      recipients: ["chipo.masango@nmb.co.zw", "blessing.chigwada@nmb.co.zw"],
      status: "read",
      priority: "high",
      createdAt: "2024-01-15T16:15:00Z",
      lastActivity: "2024-01-15T16:45:00Z",
      responseCount: 1,
      readCount: 2,
      attachmentCount: 1,
      category: "escalation",
      emails: [
        {
          id: "email-004",
          threadId: "thread-002",
          from: "tendai.moyo@nmb.co.zw",
          to: ["chipo.masango@nmb.co.zw", "blessing.chigwada@nmb.co.zw"],
          subject: "URGENT: Escalation Required - Account Takeover Case #FR-2024-002",
          content:
            "Dear Senior Management,\n\nWe have a critical account takeover case that requires immediate escalation and senior management attention.\n\nCase Details:\n- Customer: Corporate Account #123456789\n- Incident: Unauthorized access and fund transfer attempts\n- Potential Loss: $45,000 USD\n- Time Sensitivity: High\n\nImmediate Actions Required:\n1. Should we freeze all related accounts?\n2. Do we need to contact law enforcement?\n3. What is our customer communication strategy?\n\nThis case requires senior management decision within 2 hours.\n\nUrgent regards,\nTendai Moyo",
          timestamp: "2024-01-15T16:15:00Z",
          status: "read",
          attachments: ["incident_report.pdf"],
          isResponse: false,
        },
        {
          id: "email-005",
          threadId: "thread-002",
          from: "chipo.masango@nmb.co.zw",
          to: ["tendai.moyo@nmb.co.zw"],
          cc: ["blessing.chigwada@nmb.co.zw"],
          subject: "Re: URGENT: Escalation Required - Account Takeover Case #FR-2024-002",
          content:
            "Tendai,\n\nI've reviewed the case. This is indeed critical.\n\nApproved Actions:\n1. Freeze all related accounts immediately\n2. Contact law enforcement - I'll handle this\n3. Customer communication - use our standard breach notification protocol\n\nI'm calling an emergency meeting for 5 PM today.\n\nChipo Masango\nBranch Manager",
          timestamp: "2024-01-15T16:45:00Z",
          status: "read",
          isResponse: true,
          responseTime: 30, // minutes
        },
      ],
    },
    {
      id: "thread-003",
      subject: "False Positive Analysis - Case #FR-2024-003",
      caseId: "FR-2024-003",
      initiatedBy: "farai.mutasa@nmb.co.zw",
      recipients: ["tech.team@nmb.co.zw", "ai.development@nmb.co.zw"],
      status: "sent",
      priority: "medium",
      createdAt: "2024-01-15T10:20:00Z",
      lastActivity: "2024-01-15T10:20:00Z",
      responseCount: 0,
      readCount: 0,
      attachmentCount: 3,
      category: "false_positive",
      emails: [
        {
          id: "email-006",
          threadId: "thread-003",
          from: "farai.mutasa@nmb.co.zw",
          to: ["tech.team@nmb.co.zw", "ai.development@nmb.co.zw"],
          subject: "False Positive Analysis - Case #FR-2024-003",
          content:
            "Dear Technical Team,\n\nWe've identified a false positive in our fraud detection system that requires analysis for system improvement.\n\nCase Summary:\n- Transaction flagged as suspicious but confirmed legitimate\n- Customer: Regular business client with established pattern\n- Issue: System flagged routine payroll transfers\n\nAnalysis Questions:\n1. What caused the false positive trigger?\n2. How can we improve the algorithm to prevent similar cases?\n3. What training data adjustments are needed?\n\nPlease analyze the attached data and provide recommendations for system enhancement.\n\nRegards,\nFarai Mutasa",
          timestamp: "2024-01-15T10:20:00Z",
          status: "sent",
          attachments: ["transaction_log.csv", "customer_history.xlsx", "system_alerts.json"],
          isResponse: false,
        },
      ],
    },
  ]

  // Email analytics data
  const responseRateData = [
    { day: "Mon", sent: 12, responded: 10, rate: 83.3 },
    { day: "Tue", sent: 15, responded: 13, rate: 86.7 },
    { day: "Wed", sent: 8, responded: 6, rate: 75.0 },
    { day: "Thu", sent: 18, responded: 16, rate: 88.9 },
    { day: "Fri", sent: 22, responded: 19, rate: 86.4 },
    { day: "Sat", sent: 5, responded: 3, rate: 60.0 },
    { day: "Sun", sent: 3, responded: 2, rate: 66.7 },
  ]

  const responseTimeData = [
    { category: "Investigation", avgTime: 145, target: 120 },
    { category: "Escalation", avgTime: 35, target: 60 },
    { category: "False Positive", avgTime: 280, target: 240 },
    { category: "General", avgTime: 95, target: 180 },
  ]

  const emailStatusDistribution = [
    { name: "Replied", value: 45, color: "#22c55e" },
    { name: "Read", value: 23, color: "#3b82f6" },
    { name: "Delivered", value: 15, color: "#f59e0b" },
    { name: "Sent", value: 12, color: "#6b7280" },
  ]

  const engagementTrendData = [
    { week: "W1", openRate: 85, responseRate: 72, avgResponseTime: 145 },
    { week: "W2", openRate: 88, responseRate: 75, avgResponseTime: 132 },
    { week: "W3", openRate: 82, responseRate: 68, avgResponseTime: 158 },
    { week: "W4", openRate: 91, responseRate: 78, avgResponseTime: 125 },
  ]

  const filteredThreads = emailThreads.filter((thread) => {
    const matchesSearch =
      thread.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.initiatedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || thread.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleViewThread = (thread: EmailThread) => {
    setSelectedThread(thread)
    setIsThreadDialogOpen(true)
  }

  const handleReply = (thread: EmailThread) => {
    setSelectedThread(thread)
    setIsReplyDialogOpen(true)
  }

  const handleSendReply = () => {
    if (!selectedThread || !replyContent.trim()) return

    // Simulate sending reply
    toast({
      title: "Reply Sent",
      description: `Your reply to "${selectedThread.subject}" has been sent successfully.`,
    })

    setReplyContent("")
    setIsReplyDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      sent: { label: "Sent", className: "bg-gray-100 text-gray-800" },
      delivered: { label: "Delivered", className: "bg-blue-100 text-blue-800" },
      read: { label: "Read", className: "bg-yellow-100 text-yellow-800" },
      replied: { label: "Replied", className: "bg-green-100 text-green-800" },
      closed: { label: "Closed", className: "bg-purple-100 text-purple-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.sent
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "High", className: "bg-red-100 text-red-800" },
      medium: { label: "Medium", className: "bg-orange-100 text-orange-800" },
      low: { label: "Low", className: "bg-green-100 text-green-800" },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "investigation":
        return <Search className="h-4 w-4" />
      case "escalation":
        return <AlertCircle className="h-4 w-4" />
      case "false_positive":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateResponseRate = () => {
    const totalThreads = emailThreads.length
    const repliedThreads = emailThreads.filter((t) => t.status === "replied").length
    return totalThreads > 0 ? Math.round((repliedThreads / totalThreads) * 100) : 0
  }

  const calculateAverageResponseTime = () => {
    const responseTimes = emailThreads
      .flatMap((t) => t.emails.filter((e) => e.isResponse && e.responseTime))
      .map((e) => e.responseTime!)

    return responseTimes.length > 0 ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) : 0
  }

  return (
    <div className="space-y-6">
      {/* Email Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Threads</p>
                <p className="text-2xl font-bold">{emailThreads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-500">
                <Reply className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold">{calculateResponseRate()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-orange-500">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold">{calculateAverageResponseTime()}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-500">
                <Eye className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Read Rate</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Daily Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={responseRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "rate" ? `${value}%` : value,
                      name === "sent" ? "Sent" : name === "responded" ? "Responded" : "Rate",
                    ]}
                  />
                  <Area type="monotone" dataKey="rate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="rate" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Response Time by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} min`, ""]} />
                  <Bar dataKey="avgTime" fill="#3b82f6" name="Actual" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Email Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Email Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emailStatusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emailStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  <Line type="monotone" dataKey="openRate" stroke="#22c55e" strokeWidth={2} name="Open Rate" />
                  <Line type="monotone" dataKey="responseRate" stroke="#3b82f6" strokeWidth={2} name="Response Rate" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Threads List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Email Threads
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search threads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="sent">Sent</option>
                <option value="delivered">Delivered</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <Card key={thread.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getCategoryIcon(thread.category)}
                      <h3 className="font-semibold text-sm">{thread.subject}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(thread.status)}
                        {getPriorityBadge(thread.priority)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">From:</span> {thread.initiatedBy.split("@")[0]}
                      </div>
                      <div>
                        <span className="font-medium">Recipients:</span> {thread.recipients.length}
                      </div>
                      <div>
                        <span className="font-medium">Responses:</span> {thread.responseCount}
                      </div>
                      <div>
                        <span className="font-medium">Last Activity:</span> {formatTimestamp(thread.lastActivity)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      {thread.attachmentCount > 0 && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Paperclip className="h-3 w-3" />
                          <span>{thread.attachmentCount} attachments</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>
                          {thread.readCount}/{thread.recipients.length} read
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>Created {formatTimestamp(thread.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleViewThread(thread)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReply(thread)}>
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {filteredThreads.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Mail className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No email threads found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Thread Details Dialog */}
      <Dialog open={isThreadDialogOpen} onOpenChange={setIsThreadDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Email Thread Details
            </DialogTitle>
          </DialogHeader>

          {selectedThread && (
            <div className="space-y-4">
              {/* Thread Header */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">{selectedThread.subject}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Initiated by: {selectedThread.initiatedBy}</span>
                  <span>Recipients: {selectedThread.recipients.length}</span>
                  <span>Responses: {selectedThread.responseCount}</span>
                  {getStatusBadge(selectedThread.status)}
                  {getPriorityBadge(selectedThread.priority)}
                </div>
              </div>

              {/* Email Messages */}
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {selectedThread.emails.map((email, index) => (
                    <Card key={email.id} className={`p-4 ${email.isResponse ? "ml-8 bg-blue-50" : ""}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{email.from.split("@")[0]}</span>
                            {email.isResponse && <Badge variant="outline">Response</Badge>}
                            {email.responseTime && (
                              <Badge className="bg-green-100 text-green-800">{email.responseTime}m response time</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            To: {email.to.map((to) => to.split("@")[0]).join(", ")}
                            {email.cc && email.cc.length > 0 && (
                              <span> • CC: {email.cc.map((cc) => cc.split("@")[0]).join(", ")}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{formatTimestamp(email.timestamp)}</div>
                          {getStatusBadge(email.status)}
                        </div>
                      </div>

                      <div className="text-sm mb-3 whitespace-pre-wrap">{email.content}</div>

                      {email.attachments && email.attachments.length > 0 && (
                        <div className="border-t pt-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Paperclip className="h-4 w-4" />
                            <span>Attachments:</span>
                          </div>
                          <div className="mt-1 space-y-1">
                            {email.attachments.map((attachment, idx) => (
                              <div key={idx} className="text-sm text-blue-600 hover:underline cursor-pointer">
                                {attachment}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsThreadDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsThreadDialogOpen(false)
                    handleReply(selectedThread)
                  }}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Reply className="h-5 w-5" />
              Reply to Thread
            </DialogTitle>
          </DialogHeader>

          {selectedThread && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <div>
                  <strong>Subject:</strong> Re: {selectedThread.subject}
                </div>
                <div>
                  <strong>To:</strong> {selectedThread.initiatedBy}
                </div>
                <div>
                  <strong>CC:</strong> {selectedThread.recipients.join(", ")}
                </div>
              </div>

              <Textarea
                placeholder="Type your reply here..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={8}
                className="resize-none"
              />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendReply} disabled={!replyContent.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
