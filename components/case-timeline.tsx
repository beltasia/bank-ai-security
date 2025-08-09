"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  MessageSquare,
  Mail,
  Send,
  Reply,
  Eye,
  Paperclip,
  TrendingUp,
  Shield,
  Search,
  Flag,
} from "lucide-react"

interface TimelineEvent {
  id: string
  type:
    | "case_created"
    | "status_change"
    | "investigation"
    | "escalation"
    | "email_sent"
    | "email_received"
    | "email_read"
    | "comment"
    | "evidence_added"
    | "workflow_started"
    | "approval"
    | "false_positive"
  title: string
  description: string
  timestamp: string
  user: string
  userRole: string
  metadata?: {
    oldStatus?: string
    newStatus?: string
    emailSubject?: string
    emailRecipients?: string[]
    emailId?: string
    threadId?: string
    responseTime?: number
    attachmentCount?: number
    priority?: string
    category?: string
    readBy?: string[]
    deliveryStatus?: string
  }
}

export function CaseTimeline({ caseId }: { caseId: string }) {
  // Enhanced timeline events with email tracking
  const timelineEvents: TimelineEvent[] = [
    {
      id: "event-001",
      type: "case_created",
      title: "Case Created",
      description: "Fraud case FR-2024-001 created for suspicious wire transfer activity",
      timestamp: "2024-01-15T08:30:00Z",
      user: "Sarah Mukamuri",
      userRole: "Fraud Analyst",
    },
    {
      id: "event-002",
      type: "email_sent",
      title: "Investigation Email Sent",
      description: "Investigation request sent to fraud investigation team",
      timestamp: "2024-01-15T09:30:00Z",
      user: "Sarah Mukamuri",
      userRole: "Fraud Analyst",
      metadata: {
        emailSubject: "Investigation Required: Suspicious Wire Transfer - Case #FR-2024-001",
        emailRecipients: ["james.chikwanha@nmb.co.zw", "mercy.ndoro@nmb.co.zw"],
        emailId: "email-001",
        threadId: "thread-001",
        attachmentCount: 2,
        priority: "high",
        category: "investigation",
      },
    },
    {
      id: "event-003",
      type: "email_read",
      title: "Email Opened",
      description: "Investigation email opened by James Chikwanha",
      timestamp: "2024-01-15T09:45:00Z",
      user: "James Chikwanha",
      userRole: "Senior Investigator",
      metadata: {
        emailId: "email-001",
        threadId: "thread-001",
        deliveryStatus: "read",
      },
    },
    {
      id: "event-004",
      type: "email_read",
      title: "Email Opened",
      description: "Investigation email opened by Mercy Ndoro",
      timestamp: "2024-01-15T10:15:00Z",
      user: "Mercy Ndoro",
      userRole: "Compliance Officer",
      metadata: {
        emailId: "email-001",
        threadId: "thread-001",
        deliveryStatus: "read",
      },
    },
    {
      id: "event-005",
      type: "email_received",
      title: "Investigation Response Received",
      description: "James Chikwanha provided investigation findings and recommendations",
      timestamp: "2024-01-15T11:45:00Z",
      user: "James Chikwanha",
      userRole: "Senior Investigator",
      metadata: {
        emailSubject: "Re: Investigation Required: Suspicious Wire Transfer - Case #FR-2024-001",
        emailId: "email-002",
        threadId: "thread-001",
        responseTime: 135,
        category: "investigation",
      },
    },
    {
      id: "event-006",
      type: "status_change",
      title: "Case Status Updated",
      description: "Case status changed from New to Under Investigation",
      timestamp: "2024-01-15T12:00:00Z",
      user: "James Chikwanha",
      userRole: "Senior Investigator",
      metadata: {
        oldStatus: "New",
        newStatus: "Under Investigation",
      },
    },
    {
      id: "event-007",
      type: "evidence_added",
      title: "Evidence Added",
      description: "Transaction analysis report and customer risk profile uploaded",
      timestamp: "2024-01-15T13:30:00Z",
      user: "James Chikwanha",
      userRole: "Senior Investigator",
    },
    {
      id: "event-008",
      type: "email_received",
      title: "Compliance Review Response",
      description: "Mercy Ndoro provided compliance assessment and recommendations",
      timestamp: "2024-01-15T14:22:00Z",
      user: "Mercy Ndoro",
      userRole: "Compliance Officer",
      metadata: {
        emailSubject: "Re: Investigation Required: Suspicious Wire Transfer - Case #FR-2024-001",
        emailId: "email-003",
        threadId: "thread-001",
        responseTime: 292,
        category: "investigation",
      },
    },
    {
      id: "event-009",
      type: "escalation",
      title: "Case Escalated",
      description: "Case escalated to senior management due to high risk and potential loss",
      timestamp: "2024-01-15T15:00:00Z",
      user: "Mercy Ndoro",
      userRole: "Compliance Officer",
    },
    {
      id: "event-010",
      type: "email_sent",
      title: "Escalation Email Sent",
      description: "Urgent escalation notification sent to senior management",
      timestamp: "2024-01-15T16:15:00Z",
      user: "Tendai Moyo",
      userRole: "Operations Manager",
      metadata: {
        emailSubject: "URGENT: Escalation Required - Account Takeover Case #FR-2024-002",
        emailRecipients: ["chipo.masango@nmb.co.zw", "blessing.chigwada@nmb.co.zw"],
        emailId: "email-004",
        threadId: "thread-002",
        attachmentCount: 1,
        priority: "high",
        category: "escalation",
      },
    },
    {
      id: "event-011",
      type: "email_received",
      title: "Management Response Received",
      description: "Senior management approved immediate actions and called emergency meeting",
      timestamp: "2024-01-15T16:45:00Z",
      user: "Chipo Masango",
      userRole: "Branch Manager",
      metadata: {
        emailSubject: "Re: URGENT: Escalation Required - Account Takeover Case #FR-2024-002",
        emailId: "email-005",
        threadId: "thread-002",
        responseTime: 30,
        category: "escalation",
      },
    },
    {
      id: "event-012",
      type: "approval",
      title: "Actions Approved",
      description: "Account freeze and law enforcement contact approved by branch manager",
      timestamp: "2024-01-15T17:00:00Z",
      user: "Chipo Masango",
      userRole: "Branch Manager",
    },
    {
      id: "event-013",
      type: "status_change",
      title: "Case Status Updated",
      description: "Case status changed to Resolved - Account secured and customer notified",
      timestamp: "2024-01-15T18:30:00Z",
      user: "Tendai Moyo",
      userRole: "Operations Manager",
      metadata: {
        oldStatus: "Escalated",
        newStatus: "Resolved",
      },
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "case_created":
        return <FileText className="h-4 w-4" />
      case "status_change":
        return <TrendingUp className="h-4 w-4" />
      case "investigation":
        return <Search className="h-4 w-4" />
      case "escalation":
        return <AlertTriangle className="h-4 w-4" />
      case "email_sent":
        return <Send className="h-4 w-4" />
      case "email_received":
        return <Reply className="h-4 w-4" />
      case "email_read":
        return <Eye className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "evidence_added":
        return <Paperclip className="h-4 w-4" />
      case "workflow_started":
        return <Flag className="h-4 w-4" />
      case "approval":
        return <CheckCircle className="h-4 w-4" />
      case "false_positive":
        return <Shield className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "case_created":
        return "bg-blue-500"
      case "status_change":
        return "bg-green-500"
      case "investigation":
        return "bg-purple-500"
      case "escalation":
        return "bg-red-500"
      case "email_sent":
        return "bg-blue-600"
      case "email_received":
        return "bg-green-600"
      case "email_read":
        return "bg-yellow-500"
      case "comment":
        return "bg-gray-500"
      case "evidence_added":
        return "bg-orange-500"
      case "workflow_started":
        return "bg-indigo-500"
      case "approval":
        return "bg-emerald-500"
      case "false_positive":
        return "bg-cyan-500"
      default:
        return "bg-gray-400"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getEmailStatusBadge = (status: string) => {
    const statusConfig = {
      sent: { label: "Sent", className: "bg-gray-100 text-gray-800" },
      delivered: { label: "Delivered", className: "bg-blue-100 text-blue-800" },
      read: { label: "Read", className: "bg-yellow-100 text-yellow-800" },
      replied: { label: "Replied", className: "bg-green-100 text-green-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.sent
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "High Priority", className: "bg-red-100 text-red-800" },
      medium: { label: "Medium Priority", className: "bg-orange-100 text-orange-800" },
      low: { label: "Low Priority", className: "bg-green-100 text-green-800" },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig]
    return config ? <Badge className={config.className}>{config.label}</Badge> : null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Case Timeline & Email Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-6">
              {timelineEvents.map((event, index) => {
                const { date, time } = formatTimestamp(event.timestamp)

                return (
                  <div key={event.id} className="relative flex items-start gap-4">
                    {/* Timeline dot */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getEventColor(event.type)} text-white`}
                    >
                      {getEventIcon(event.type)}
                    </div>

                    {/* Event content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{event.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          </div>
                          <div className="text-right text-xs text-gray-500 ml-4">
                            <div className="font-medium">{date}</div>
                            <div>{time}</div>
                          </div>
                        </div>

                        {/* User info */}
                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{getInitials(event.user)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{event.user}</span>
                          <Badge variant="outline" className="text-xs">
                            {event.userRole}
                          </Badge>
                        </div>

                        {/* Email-specific metadata */}
                        {event.metadata && (
                          <div className="space-y-2">
                            {/* Email subject and recipients */}
                            {event.metadata.emailSubject && (
                              <div className="bg-blue-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <Mail className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium text-sm text-blue-900">Email Details</span>
                                </div>
                                <div className="text-sm space-y-1">
                                  <div>
                                    <span className="font-medium">Subject:</span> {event.metadata.emailSubject}
                                  </div>
                                  {event.metadata.emailRecipients && (
                                    <div>
                                      <span className="font-medium">Recipients:</span>{" "}
                                      {event.metadata.emailRecipients.map((email) => email.split("@")[0]).join(", ")}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Email status and metrics */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {event.metadata.deliveryStatus && getEmailStatusBadge(event.metadata.deliveryStatus)}
                              {event.metadata.priority && getPriorityBadge(event.metadata.priority)}
                              {event.metadata.category && (
                                <Badge variant="outline" className="capitalize">
                                  {event.metadata.category}
                                </Badge>
                              )}
                              {event.metadata.responseTime && (
                                <Badge className="bg-green-100 text-green-800">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {event.metadata.responseTime}m response
                                </Badge>
                              )}
                              {event.metadata.attachmentCount && event.metadata.attachmentCount > 0 && (
                                <Badge variant="outline">
                                  <Paperclip className="h-3 w-3 mr-1" />
                                  {event.metadata.attachmentCount} attachments
                                </Badge>
                              )}
                            </div>

                            {/* Status change details */}
                            {event.metadata.oldStatus && event.metadata.newStatus && (
                              <div className="bg-green-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  <span className="font-medium">Status Change:</span>
                                  <Badge variant="outline">{event.metadata.oldStatus}</Badge>
                                  <span>→</span>
                                  <Badge className="bg-green-100 text-green-800">{event.metadata.newStatus}</Badge>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action buttons for email events */}
                        {(event.type === "email_sent" || event.type === "email_received") &&
                          event.metadata?.threadId && (
                            <div className="flex gap-2 mt-3 pt-3 border-t">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                View Thread
                              </Button>
                              {event.type === "email_received" && (
                                <Button size="sm" variant="outline">
                                  <Reply className="h-3 w-3 mr-1" />
                                  Reply
                                </Button>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollArea>

        {/* Timeline summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {timelineEvents.filter((e) => e.type === "email_sent").length}
              </div>
              <div className="text-sm text-gray-600">Emails Sent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {timelineEvents.filter((e) => e.type === "email_received").length}
              </div>
              <div className="text-sm text-gray-600">Responses Received</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {timelineEvents
                  .filter((e) => e.metadata?.responseTime)
                  .reduce((avg, e) => avg + (e.metadata?.responseTime || 0), 0) /
                  timelineEvents.filter((e) => e.metadata?.responseTime).length || 0}
                m
              </div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(
                  (timelineEvents.filter((e) => e.type === "email_received").length /
                    timelineEvents.filter((e) => e.type === "email_sent").length) *
                    100,
                ) || 0}
                %
              </div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
