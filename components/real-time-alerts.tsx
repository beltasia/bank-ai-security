"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, X, CheckCircle, Clock } from "lucide-react"

export function RealTimeAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: "ALERT-RT-001",
      timestamp: new Date(),
      type: "High Value Transaction",
      severity: "critical",
      message: "USD $89,500 wire transfer to UK exceeds daily limit",
      account: "****-4521",
      amount: "USD $89,500",
      location: "NMB Fife Street",
      autoAction: "Transaction held for review",
      acknowledged: false,
    },
    {
      id: "ALERT-RT-002",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      type: "Velocity Check Failed",
      severity: "high",
      message: "5 transactions within 10 minutes from same account",
      account: "****-7892",
      amount: "USD $45,200",
      location: "NMB Fife Street",
      autoAction: "Account temporarily restricted",
      acknowledged: false,
    },
    {
      id: "ALERT-RT-003",
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      type: "Geographic Anomaly",
      severity: "medium",
      message: "Card usage in Botswana after recent Zimbabwe transaction",
      account: "****-9876",
      amount: "USD $1,250",
      location: "Cross-border",
      autoAction: "SMS verification sent to customer",
      acknowledged: true,
    },
  ])

  const [newAlertCount, setNewAlertCount] = useState(0)

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate new alerts
      if (Math.random() > 0.7) {
        const newAlert = {
          id: `ALERT-RT-${Date.now()}`,
          timestamp: new Date(),
          type: ["Suspicious Pattern", "High Value Transaction", "Geographic Anomaly"][Math.floor(Math.random() * 3)],
          severity: ["critical", "high", "medium"][Math.floor(Math.random() * 3)],
          message: "New suspicious activity detected requiring immediate attention",
          account: `****-${Math.floor(Math.random() * 9999)
            .toString()
            .padStart(4, "0")}`,
          amount: `USD $${(Math.random() * 100000).toFixed(2)}`,
          location: "NMB Fife Street",
          autoAction: "Transaction flagged for review",
          acknowledged: false,
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]) // Keep only 10 alerts
        setNewAlertCount((prev) => prev + 1)

        // Play notification sound (in real implementation)
        // new Audio('/notification.mp3').play()
      }
    }, 15000) // Check every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
    setNewAlertCount((prev) => Math.max(0, prev - 1))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-600 text-white animate-pulse">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500 text-white">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-red-500 bg-red-50"
      case "high":
        return "border-l-orange-500 bg-orange-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  return (
    <div className="space-y-4">
      {/* Alert Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Real-Time Security Alerts
              {newAlertCount > 0 && <Badge className="bg-red-600 text-white animate-bounce">{newAlertCount} New</Badge>}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {alerts.filter((a) => a.severity === "critical").length}
              </p>
              <p className="text-sm text-red-700">Critical</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{alerts.filter((a) => a.severity === "high").length}</p>
              <p className="text-sm text-orange-700">High</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {alerts.filter((a) => a.severity === "medium").length}
              </p>
              <p className="text-sm text-yellow-700">Medium</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{alerts.filter((a) => a.acknowledged).length}</p>
              <p className="text-sm text-green-700">Acknowledged</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-l-4 ${getSeverityColor(alert.severity)} ${
              !alert.acknowledged ? "shadow-lg" : "opacity-75"
            } transition-all duration-300`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        alert.severity === "critical"
                          ? "text-red-600"
                          : alert.severity === "high"
                            ? "text-orange-600"
                            : "text-yellow-600"
                      }`}
                    />
                    <div>
                      <h4 className="font-semibold">{alert.type}</h4>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(alert.severity)}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{alert.message}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Account:</span>
                      <p className="font-medium">{alert.account}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <p className="font-semibold">{alert.amount}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <p className="font-medium">{alert.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Auto Action:</span>
                      <p className="font-medium text-blue-600">{alert.autoAction}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {!alert.acknowledged && (
                    <Button size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Acknowledge
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => dismissAlert(alert.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {alert.acknowledged && (
                <div className="mt-3 p-2 bg-green-50 rounded border-l-2 border-green-500">
                  <p className="text-sm text-green-700 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Alert acknowledged and under investigation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {alerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-500">No active alerts. System monitoring normally.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
