import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, FileText, AlertTriangle, CheckCircle, Clock, Download } from "lucide-react"

export function RegulatoryCompliance() {
  const complianceMetrics = [
    {
      regulation: "Reserve Bank of Zimbabwe (RBZ) Guidelines",
      status: "compliant",
      score: 98,
      lastAudit: "2024-01-10",
      nextReview: "2024-04-10",
      requirements: ["USD Transaction Reporting", "Cross-border Monitoring", "Customer Due Diligence"],
    },
    {
      regulation: "Financial Intelligence Unit (FIU) Requirements",
      status: "compliant",
      score: 96,
      lastAudit: "2024-01-08",
      nextReview: "2024-04-08",
      requirements: ["Suspicious Transaction Reports", "Cash Transaction Reports", "Wire Transfer Reports"],
    },
    {
      regulation: "Banking Act Chapter 24:20",
      status: "minor_issues",
      score: 89,
      lastAudit: "2024-01-12",
      nextReview: "2024-02-12",
      requirements: ["Capital Adequacy", "Risk Management", "Internal Controls"],
    },
    {
      regulation: "Exchange Control Regulations",
      status: "compliant",
      score: 94,
      lastAudit: "2024-01-15",
      nextReview: "2024-04-15",
      requirements: ["Foreign Currency Transactions", "Export/Import Documentation", "Repatriation Requirements"],
    },
    {
      regulation: "FATF Recommendations",
      status: "compliant",
      score: 97,
      lastAudit: "2024-01-05",
      nextReview: "2024-07-05",
      requirements: ["Customer Due Diligence", "Record Keeping", "Suspicious Activity Reporting"],
    },
  ]

  const pendingReports = [
    {
      id: "STR-2024-001",
      type: "Suspicious Transaction Report",
      customer: "Corporate Account ****-4521",
      amount: "USD $247,500",
      dueDate: "2024-01-20",
      priority: "high",
      regulator: "Financial Intelligence Unit",
    },
    {
      id: "CTR-2024-045",
      type: "Cash Transaction Report",
      customer: "Individual Account ****-7892",
      amount: "USD $15,000",
      dueDate: "2024-01-22",
      priority: "medium",
      regulator: "Reserve Bank of Zimbabwe",
    },
    {
      id: "FOREX-2024-012",
      type: "Foreign Exchange Transaction Report",
      customer: "Business Account ****-1234",
      amount: "USD $89,500",
      dueDate: "2024-01-25",
      priority: "high",
      regulator: "RBZ Exchange Control",
    },
  ]

  const getComplianceStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>
      case "minor_issues":
        return <Badge className="bg-yellow-100 text-yellow-800">Minor Issues</Badge>
      case "non_compliant":
        return <Badge className="bg-red-100 text-red-800">Non-Compliant</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Overall Compliance</p>
                <p className="text-2xl font-bold text-green-600">94.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Reports</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Overdue Items</p>
                <p className="text-2xl font-bold text-orange-600">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regulatory Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Regulatory Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {complianceMetrics.map((reg, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{reg.regulation}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getComplianceStatusBadge(reg.status)}
                      <span className="text-sm text-gray-600">Score: {reg.score}%</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3" />
                      <span>Last Audit: {new Date(reg.lastAudit).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Next Review: {new Date(reg.nextReview).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Progress value={reg.score} className="h-2 mb-3" />
                <div className="flex flex-wrap gap-2">
                  {reg.requirements.map((req, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Regulatory Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Regulatory Reports
            </CardTitle>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{report.type}</h3>
                    <p className="text-sm text-gray-600">ID: {report.id}</p>
                  </div>
                  <div className="flex gap-2">{getPriorityBadge(report.priority)}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-600">Customer:</span>
                    <p className="font-medium">{report.customer}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Amount:</span>
                    <p className="font-semibold">{report.amount}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Due Date:</span>
                    <p className="font-medium">{new Date(report.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Regulator:</span>
                    <p className="font-medium">{report.regulator}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm">Submit Report</Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Download Draft
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
