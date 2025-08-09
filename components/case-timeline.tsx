import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, AlertTriangle, FileText, User, Phone, Shield, TrendingUp } from "lucide-react"

interface CaseTimelineProps {
  caseId: string
}

export function CaseTimeline({ caseId }: CaseTimelineProps) {
  const timelineEvents = [
    {
      id: 1,
      timestamp: "2024-01-15T16:45:00Z",
      type: "note",
      title: "Investigation Note Added",
      description: "Reviewed transaction patterns and identified potential structuring behavior",
      user: "Tendai Mukamuri",
      userInitials: "TM",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      id: 2,
      timestamp: "2024-01-15T14:30:00Z",
      type: "contact",
      title: "Customer Contact Attempted",
      description: "Called customer regarding suspicious activity - no response, left voicemail",
      user: "Chipo Nyathi",
      userInitials: "CN",
      icon: Phone,
      color: "bg-orange-500",
    },
    {
      id: 3,
      timestamp: "2024-01-15T12:15:00Z",
      type: "evidence",
      title: "Evidence Collected",
      description: "Bank statements and transaction logs from past 30 days added to case file",
      user: "Blessing Moyo",
      userInitials: "BM",
      icon: Shield,
      color: "bg-green-500",
    },
    {
      id: 4,
      timestamp: "2024-01-15T11:00:00Z",
      type: "alert",
      title: "High-Risk Alert Generated",
      description: "AI system flagged account for velocity and amount anomalies (Risk Score: 9.2)",
      user: "System",
      userInitials: "SY",
      icon: AlertTriangle,
      color: "bg-red-500",
    },
    {
      id: 5,
      timestamp: "2024-01-15T10:45:00Z",
      type: "assignment",
      title: "Case Assigned",
      description: "Case assigned to Tendai Mukamuri for investigation",
      user: "Tatenda Sibanda",
      userInitials: "TS",
      icon: User,
      color: "bg-purple-500",
    },
    {
      id: 6,
      timestamp: "2024-01-15T10:30:00Z",
      type: "creation",
      title: "Case Created",
      description: "Case automatically created from fraud detection alert ALERT-001",
      user: "System",
      userInitials: "SY",
      icon: TrendingUp,
      color: "bg-gray-500",
    },
  ]

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const getEventBadge = (type: string) => {
    switch (type) {
      case "alert":
        return <Badge className="bg-red-100 text-red-800">Alert</Badge>
      case "note":
        return <Badge className="bg-blue-100 text-blue-800">Note</Badge>
      case "contact":
        return <Badge className="bg-orange-100 text-orange-800">Contact</Badge>
      case "evidence":
        return <Badge className="bg-green-100 text-green-800">Evidence</Badge>
      case "assignment":
        return <Badge className="bg-purple-100 text-purple-800">Assignment</Badge>
      case "creation":
        return <Badge className="bg-gray-100 text-gray-800">System</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Investigation Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const { date, time } = formatTimestamp(event.timestamp)
              const IconComponent = event.icon

              return (
                <div key={event.id} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${event.color}`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>

                  {/* Event content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">{getEventBadge(event.type)}</div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">{event.userInitials}</AvatarFallback>
                        </Avatar>
                        <span>{event.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {date} at {time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
