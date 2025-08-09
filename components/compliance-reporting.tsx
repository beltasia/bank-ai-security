import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, Calendar, CheckCircle, AlertCircle } from "lucide-react"

export function ComplianceReporting() {
  const reports = [
    {
      id: "SAR-2024-001",
      type: "Suspicious Activity Report",
      status: "submitted",
      dueDate: "2024-01-20",
      submittedDate: "2024-01-18",
      amount: "$125,000.00",
      priority: "high",
    },
    {
      id: "CTR-2024-045",
      type: "Currency Transaction Report",
      status: "pending",
      dueDate: "2024-01-22",
      submittedDate: null,
      amount: "$15,000.00",
      priority: "medium",
    },
    {
      id: "BSA-2024-012",
      type: "Bank Secrecy Act Report",
      status: "draft",
      dueDate: "2024-01-25",
      submittedDate: null,
      amount: "$89,500.00",
      priority: "high",
    },
  ]

  const complianceMetrics = [
    { label: "AML Compliance Score", value: 94, target: 95 },
    { label: "KYC Completion Rate", value: 98, target: 100 },
    { label: "SAR Filing Timeliness", value: 87, target: 90 },
    { label: "Risk Assessment Coverage", value: 92, target: 95 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-green-100 text-green-800">Submitted</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{metric.label}</span>
                {metric.value >= metric.target ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
              <div className="text-2xl font-bold mb-2">{metric.value}%</div>
              <Progress value={metric.value} className="h-2" />
              <p className="text-xs text-gray-600 mt-1">Target: {metric.target}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Regulatory Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Regulatory Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{report.type}</h3>
                    <p className="text-sm text-gray-600">ID: {report.id}</p>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(report.status)}
                    {getPriorityBadge(report.priority)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600">Amount:</span>
                    <p className="font-semibold">{report.amount}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Due Date:</span>
                    <p className="font-medium">{report.dueDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Submitted:</span>
                    <p className="font-medium">{report.submittedDate || "Not submitted"}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  {report.status === "draft" && <Button size="sm">Submit Report</Button>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Compliance Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium">BSA Annual Report</p>
                <p className="text-sm text-gray-600">Due in 3 days</p>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium">AML Risk Assessment Update</p>
                <p className="text-sm text-gray-600">Due in 7 days</p>
              </div>
              <Badge className="bg-yellow-500 text-white">Upcoming</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Quarterly Compliance Review</p>
                <p className="text-sm text-gray-600">Due in 14 days</p>
              </div>
              <Badge variant="outline">Scheduled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
