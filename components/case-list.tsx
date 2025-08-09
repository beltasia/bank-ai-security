"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, Clock, DollarSign, User, Calendar, Eye, MoreHorizontal, CheckCircle, Pause } from "lucide-react"

interface CaseListProps {
  filter: string
  searchTerm: string
  onCaseSelect: (caseId: string) => void
  cases: any[]
}

export function CaseList({ filter, searchTerm, onCaseSelect, cases }: CaseListProps) {
  // Mock data for existing cases
  const mockCases = [
    {
      id: "CASE-2024-001",
      title: "Suspicious Wire Transfer Activity",
      category: "Wire Fraud",
      priority: "critical",
      status: "active",
      assignee: "Tendai Mukamuri",
      customerName: "Tafadzwa Mujuru",
      accountNumber: "ACC-ZW-78901",
      amount: "$45,000",
      riskScore: "9/10",
      createdAt: "2024-01-15T10:30:00Z",
      lastActivity: "2 hours ago",
      tags: ["high-value", "cross-border", "urgent"],
      description: "Multiple large wire transfers to offshore accounts detected within 24 hours",
    },
    {
      id: "CASE-2024-002",
      title: "Account Takeover Investigation",
      category: "Account Takeover",
      priority: "high",
      status: "investigating",
      assignee: "Chipo Nyathi",
      customerName: "Nomsa Sibanda",
      accountNumber: "ACC-ZW-45612",
      amount: "$12,500",
      riskScore: "7/10",
      createdAt: "2024-01-14T14:20:00Z",
      lastActivity: "1 day ago",
      tags: ["identity-theft", "mobile-banking"],
      description: "Unauthorized access detected from multiple IP addresses",
    },
    {
      id: "CASE-2024-003",
      title: "Money Laundering Pattern Analysis",
      category: "Money Laundering",
      priority: "medium",
      status: "pending_review",
      assignee: "Blessing Moyo",
      customerName: "Kudakwashe Ncube",
      accountNumber: "ACC-ZW-23456",
      amount: "$8,750",
      riskScore: "6/10",
      createdAt: "2024-01-13T09:15:00Z",
      lastActivity: "3 days ago",
      tags: ["structuring", "cash-deposits"],
      description: "Structured deposits just below reporting thresholds",
    },
    {
      id: "CASE-2024-004",
      title: "Card Fraud Investigation",
      category: "Card Fraud",
      priority: "high",
      status: "escalated",
      assignee: "Tatenda Sibanda",
      customerName: "Rutendo Dube",
      accountNumber: "ACC-ZW-67890",
      amount: "$3,200",
      riskScore: "8/10",
      createdAt: "2024-01-12T16:45:00Z",
      lastActivity: "4 hours ago",
      tags: ["skimming", "atm-fraud"],
      description: "Unusual card usage patterns at multiple ATM locations",
    },
    {
      id: "CASE-2024-005",
      title: "Internal Fraud Review",
      category: "Internal Fraud",
      priority: "critical",
      status: "closed",
      assignee: "Rumbidzai Dube",
      customerName: "Confidential",
      accountNumber: "ACC-ZW-INTERNAL",
      amount: "$25,000",
      riskScore: "10/10",
      createdAt: "2024-01-10T11:30:00Z",
      lastActivity: "Closed",
      tags: ["employee", "confidential", "resolved"],
      description: "Internal investigation completed - case resolved",
    },
  ]

  // Combine mock cases with user-created cases
  const allCases = [...cases, ...mockCases]

  // Filter cases based on the selected filter
  const filteredCases = allCases.filter((caseItem) => {
    const matchesFilter = (() => {
      switch (filter) {
        case "active":
          return ["active", "investigating", "pending_review"].includes(caseItem.status)
        case "assigned":
          return caseItem.assignee === "Current User" || caseItem.status === "active"
        case "closed":
          return caseItem.status === "closed"
        case "escalated":
          return caseItem.status === "escalated"
        default:
          return true
      }
    })()

    const matchesSearch =
      searchTerm === "" ||
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.category.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "investigating":
        return "bg-yellow-100 text-yellow-800"
      case "pending_review":
        return "bg-orange-100 text-orange-800"
      case "escalated":
        return "bg-red-100 text-red-800"
      case "closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-3 w-3" />
      case "investigating":
        return <AlertTriangle className="h-3 w-3" />
      case "pending_review":
        return <Pause className="h-3 w-3" />
      case "escalated":
        return <AlertTriangle className="h-3 w-3" />
      case "closed":
        return <CheckCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (filteredCases.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
          <p className="text-gray-500">
            {searchTerm ? `No cases match your search for "${searchTerm}"` : `No ${filter} cases available`}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {filteredCases.map((caseItem) => (
        <Card key={caseItem.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{caseItem.title}</h3>
                  <Badge className={getPriorityColor(caseItem.priority)}>
                    {caseItem.priority.charAt(0).toUpperCase() + caseItem.priority.slice(1)}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(caseItem.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(caseItem.status)}
                      {caseItem.status.replace("_", " ").charAt(0).toUpperCase() +
                        caseItem.status.replace("_", " ").slice(1)}
                    </div>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{caseItem.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{caseItem.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Risk: {caseItem.riskScore}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{caseItem.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{getInitials(caseItem.assignee)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{caseItem.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(caseItem.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {caseItem.tags &&
                      caseItem.tags.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    {caseItem.tags && caseItem.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{caseItem.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm" onClick={() => onCaseSelect(caseItem.id)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
