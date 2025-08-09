import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, User, DollarSign } from "lucide-react"

export function FraudAlerts() {
  const alerts = [
    {
      id: "ALERT-ZW-001",
      type: "Suspicious Pattern",
      severity: "critical",
      timestamp: "2024-01-15 14:35:22",
      account: "****-4521",
      description:
        "Multiple high-value USD transfers from NMB Fife Street branch to offshore accounts within 30 minutes",
      amount: "USD $47,250.00",
      localAmount: "ZWL $759,825.00",
      riskFactors: [
        "Geographic anomaly",
        "Velocity check failed",
        "USD amount threshold exceeded",
        "Cross-border transfer",
      ],
      status: "active",
      location: "NMB Bank - Fife Street, Bulawayo",
      destination: "Multiple offshore jurisdictions",
    },
    {
      id: "ALERT-ZW-002",
      type: "Account Takeover",
      severity: "high",
      timestamp: "2024-01-15 14:28:15",
      account: "****-7892",
      description:
        "Login from new device in Bulawayo followed by immediate password change and international transfer attempt",
      amount: "USD $12,500.00",
      localAmount: "ZWL $201,250.00",
      riskFactors: ["New device login", "Password change", "Immediate international transfer", "Off-hours activity"],
      status: "investigating",
      location: "NMB Bank - Fife Street, Bulawayo",
      destination: "United Kingdom",
    },
    {
      id: "ALERT-ZW-003",
      type: "Currency Structuring",
      severity: "high",
      timestamp: "2024-01-15 14:15:33",
      account: "****-1234",
      description: "Structured USD deposits just below $10,000 reporting threshold over 5 days from Fife Street branch",
      amount: "USD $49,500.00",
      localAmount: "ZWL $796,725.00",
      riskFactors: ["Structuring pattern", "Multiple USD deposits", "Threshold avoidance", "Same branch origin"],
      status: "escalated",
      location: "NMB Bank - Fife Street, Bulawayo",
      destination: "Multiple correspondent banks",
    },
    {
      id: "ALERT-ZW-004",
      type: "Cross-Border Fraud",
      severity: "medium",
      timestamp: "2024-01-15 14:10:18",
      account: "****-9876",
      description: "Card used at high-risk merchant in neighboring country with unusual spending pattern",
      amount: "USD $890.45",
      localAmount: "ZWL $14,353.24",
      riskFactors: ["Cross-border usage", "High-risk merchant", "Unusual spending pattern", "Foreign currency"],
      status: "resolved",
      location: "NMB Bank - Fife Street, Bulawayo",
      destination: "Botswana merchant",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-600 text-white">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500 text-white">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500 text-white">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800">Active</Badge>
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800">Investigating</Badge>
      case "escalated":
        return <Badge className="bg-purple-100 text-purple-800">Escalated</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {alerts.map((alert) => (
        <Card key={alert.id} className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <CardTitle className="text-lg">{alert.type}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    {getSeverityBadge(alert.severity)}
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {alert.timestamp}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Account: {alert.account}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div className="text-sm">
                  <div className="font-semibold">{alert.amount}</div>
                  <div className="text-xs text-muted-foreground">{alert.localAmount}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Branch: {alert.location}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{alert.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Risk Factors:</h4>
              <div className="flex flex-wrap gap-2">
                {alert.riskFactors.map((factor, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="default">
                Investigate
              </Button>
              <Button size="sm" variant="outline">
                Escalate
              </Button>
              <Button size="sm" variant="outline">
                Mark False Positive
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
