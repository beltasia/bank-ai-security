import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Filter, Eye, Shield, User, FileText, AlertTriangle } from "lucide-react"

export function AuditTrail() {
  const auditLogs = [
    {
      id: "AUDIT-2024-001",
      timestamp: "2024-01-15T14:35:22Z",
      user: "sarah.chen@nmb.co.zw",
      userRole: "Senior Fraud Investigator",
      action: "Transaction Flagged",
      resource: "Transaction TXN-ZW-001",
      details: "Flagged high-value USD wire transfer for manual review",
      ipAddress: "192.168.1.45",
      location: "Bulawayo, Zimbabwe",
      severity: "medium",
      category: "fraud_detection",
    },
    {
      id: "AUDIT-2024-002",
      timestamp: "2024-01-15T14:32:15Z",
      user: "system@nmb.co.zw",
      userRole: "AI System",
      action: "Risk Score Calculated",
      resource: "Account ****-4521",
      details: "AI model calculated risk score 8.5 for suspicious pattern",
      ipAddress: "10.0.0.1",
      location: "NMB Data Center",
      severity: "high",
      category: "ai_analysis",
    },
    {
      id: "AUDIT-2024-003",
      timestamp: "2024-01-15T14:30:08Z",
      user: "mike.rodriguez@nmb.co.zw",
      userRole: "Compliance Officer",
      action: "Report Generated",
      resource: "STR-2024-001",
      details: "Generated Suspicious Transaction Report for FIU submission",
      ipAddress: "192.168.1.67",
      location: "Bulawayo, Zimbabwe",
      severity: "high",
      category: "compliance",
    },
    {
      id: "AUDIT-2024-004",
      timestamp: "2024-01-15T14:28:42Z",
      user: "jennifer.liu@nmb.co.zw",
      userRole: "Branch Manager",
      action: "Account Access",
      resource: "Customer Profile ****-7892",
      details: "Accessed customer profile for KYC verification",
      ipAddress: "192.168.1.23",
      location: "Fife Street Branch",
      severity: "low",
      category: "customer_access",
    },
    {
      id: "AUDIT-2024-005",
      timestamp: "2024-01-15T14:25:18Z",
      user: "system@nmb.co.zw",
      userRole: "Automated System",
      action: "Transaction Blocked",
      resource: "Transaction TXN-ZW-003",
      details: "Automatically blocked transaction exceeding risk threshold",
      ipAddress: "10.0.0.1",
      location: "NMB Data Center",
      severity: "critical",
      category: "automated_action",
    },
    {
      id: "AUDIT-2024-006",
      timestamp: "2024-01-15T14:22:33Z",
      user: "david.park@nmb.co.zw",
      userRole: "IT Administrator",
      action: "System Configuration",
      resource: "Fraud Detection Rules",
      details: "Updated USD transaction threshold from $10,000 to $8,000",
      ipAddress: "192.168.1.89",
      location: "IT Department",
      severity: "medium",
      category: "system_config",
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

  const getCategoryBadge = (category: string) => {
    const colors = {
      fraud_detection: "bg-red-100 text-red-800",
      ai_analysis: "bg-purple-100 text-purple-800",
      compliance: "bg-blue-100 text-blue-800",
      customer_access: "bg-green-100 text-green-800",
      automated_action: "bg-orange-100 text-orange-800",
      system_config: "bg-gray-100 text-gray-800",
    }

    return (
      <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {category.replace("_", " ").toUpperCase()}
      </Badge>
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fraud_detection":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "ai_analysis":
        return <Shield className="h-4 w-4 text-purple-600" />
      case "compliance":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "customer_access":
        return <User className="h-4 w-4 text-green-600" />
      default:
        return <Eye className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Audit Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Events Today</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Critical Events</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Security Events</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Audit Trail
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search audit logs..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.user}</p>
                      <p className="text-xs text-gray-500">{log.userRole}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(log.category)}
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.resource}</p>
                      <p className="text-xs text-gray-500">{log.details}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(log.category)}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{log.location}</p>
                      <p className="text-xs text-gray-500">{log.ipAddress}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
