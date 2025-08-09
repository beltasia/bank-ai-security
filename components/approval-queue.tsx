"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Clock, User, AlertTriangle, CheckCircle, X, Eye, Calendar, DollarSign, FileText } from "lucide-react"

export function ApprovalQueue() {
  const [selectedApproval, setSelectedApproval] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [approvalComment, setApprovalComment] = useState("")

  const pendingApprovals = [
    {
      id: "APP-2024-001",
      workflowId: "WF-2024-002",
      caseId: "CASE-2024-002",
      type: "Account Recovery",
      title: "Account Takeover Response - Recovery Authorization",
      description: "Customer identity verified. Requesting approval to proceed with account recovery process.",
      requestedBy: "Chipo Nyathi",
      requestedByInitials: "CN",
      requestedDate: "2024-01-15T14:45:00Z",
      priority: "high",
      amount: "$25,000.00",
      customerName: "Mukamuri Mining Ltd",
      riskScore: 8.7,
      urgency: "4 hours remaining",
      requiredApprover: "Senior Manager",
      documents: ["Identity Verification", "Account Analysis", "Security Assessment"],
      businessJustification:
        "Customer has provided valid identification and security questions answered correctly. Account shows signs of unauthorized access but customer identity is confirmed.",
    },
    {
      id: "APP-2024-002",
      workflowId: "WF-2024-001",
      caseId: "CASE-2024-001",
      type: "SAR Filing",
      title: "Money Laundering Investigation - SAR Filing Decision",
      description:
        "Investigation completed. Recommending Suspicious Activity Report filing based on transaction patterns.",
      requestedBy: "Tendai Mukamuri",
      requestedByInitials: "TM",
      requestedDate: "2024-01-15T16:20:00Z",
      priority: "critical",
      amount: "$150,000.00",
      customerName: "Mukamuri Mining Ltd",
      riskScore: 9.2,
      urgency: "2 hours remaining",
      requiredApprover: "Compliance Manager",
      documents: ["Transaction Analysis", "Customer Profile", "Risk Assessment", "Investigation Report"],
      businessJustification:
        "Multiple large cash deposits followed by immediate wire transfers to high-risk jurisdictions. Pattern consistent with layering activities in money laundering schemes.",
    },
    {
      id: "APP-2024-003",
      workflowId: "WF-2024-004",
      caseId: "CASE-2024-004",
      type: "Wire Transfer Hold",
      title: "Wire Fraud Assessment - Transaction Hold Extension",
      description: "Requesting extension of wire transfer hold pending external bank verification.",
      requestedBy: "Tatenda Sibanda",
      requestedByInitials: "TS",
      requestedDate: "2024-01-15T12:30:00Z",
      priority: "high",
      amount: "$75,000.00",
      customerName: "Fife Street Enterprises",
      riskScore: 7.8,
      urgency: "1 day remaining",
      requiredApprover: "Operations Manager",
      documents: ["Wire Instructions", "Customer Authorization", "Beneficiary Analysis"],
      businessJustification:
        "Beneficiary bank has not responded to verification request. Customer authorization appears legitimate but requires additional verification time.",
    },
    {
      id: "APP-2024-004",
      workflowId: "WF-2024-006",
      caseId: "CASE-2024-006",
      type: "Account Closure",
      title: "High Risk Customer - Account Closure Recommendation",
      description: "Recommending account closure due to consistent high-risk activity and compliance concerns.",
      requestedBy: "Rumbidzai Dube",
      requestedByInitials: "RD",
      requestedDate: "2024-01-15T09:15:00Z",
      priority: "medium",
      amount: "$12,500.00",
      customerName: "Bulawayo Trading Co",
      riskScore: 8.9,
      urgency: "3 days remaining",
      requiredApprover: "Branch Manager",
      documents: ["Risk Assessment", "Transaction History", "Compliance Review", "Customer Communications"],
      businessJustification:
        "Customer consistently engages in high-risk transactions, fails to provide adequate documentation, and shows patterns consistent with sanctions evasion.",
    },
    {
      id: "APP-2024-005",
      workflowId: "WF-2024-007",
      caseId: "CASE-2024-007",
      type: "Enhanced Due Diligence",
      title: "PEP Customer - Enhanced Monitoring Authorization",
      description: "Politically Exposed Person identified. Requesting approval for enhanced due diligence procedures.",
      requestedBy: "Farai Ncube",
      requestedByInitials: "FN",
      requestedDate: "2024-01-15T11:45:00Z",
      priority: "high",
      amount: "$200,000.00",
      customerName: "Hon. Minister's Investment Trust",
      riskScore: 9.5,
      urgency: "6 hours remaining",
      requiredApprover: "Chief Risk Officer",
      documents: ["PEP Screening Results", "Source of Wealth Documentation", "Enhanced KYC"],
      businessJustification:
        "Customer identified as Politically Exposed Person through automated screening. Requires enhanced monitoring and senior management approval per regulatory requirements.",
    },
  ]

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "SAR Filing":
        return <FileText className="h-4 w-4" />
      case "Account Recovery":
        return <User className="h-4 w-4" />
      case "Wire Transfer Hold":
        return <DollarSign className="h-4 w-4" />
      case "Account Closure":
        return <X className="h-4 w-4" />
      case "Enhanced Due Diligence":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleApprove = (approvalId: string) => {
    toast({
      title: "Approval Granted",
      description: `Approval ${approvalId} has been granted and workflow will continue.`,
    })
  }

  const handleReject = (approvalId: string) => {
    toast({
      title: "Approval Rejected",
      description: `Approval ${approvalId} has been rejected. Workflow will be updated accordingly.`,
      variant: "destructive",
    })
  }

  const handleViewDetails = (approval: any) => {
    setSelectedApproval(approval)
    setIsDetailDialogOpen(true)
    setApprovalComment("")
  }

  const handleDetailedApproval = (approved: boolean) => {
    if (!selectedApproval) return

    const action = approved ? "approved" : "rejected"
    toast({
      title: `Approval ${approved ? "Granted" : "Rejected"}`,
      description: `${selectedApproval.title} has been ${action}.`,
      variant: approved ? "default" : "destructive",
    })

    setIsDetailDialogOpen(false)
    setSelectedApproval(null)
    setApprovalComment("")
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-orange-500">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold">{pendingApprovals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-red-500">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Critical Priority</p>
                <p className="text-2xl font-bold">{pendingApprovals.filter((a) => a.priority === "critical").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-yellow-500">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Urgent (&lt; 6 hours)</p>
                <p className="text-2xl font-bold">
                  {pendingApprovals.filter((a) => a.urgency.includes("hours")).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-500">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold">$462K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approval Queue */}
      {pendingApprovals.map((approval) => (
        <Card key={approval.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100">{getTypeIcon(approval.type)}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{approval.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getPriorityBadge(approval.priority)}
                      <Badge variant="outline">{approval.type}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>Case: {approval.caseId}</span>
                  <span>Workflow: {approval.workflowId}</span>
                  <span>Amount: {approval.amount}</span>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Risk: {approval.riskScore}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">{approval.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>Customer: {approval.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Requested: {formatDate(approval.requestedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-orange-600 font-medium">{approval.urgency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <span>Approver: {approval.requiredApprover}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{approval.requestedByInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{approval.requestedBy}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    Requested by
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleApprove(approval.id)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleReject(approval.id)}>
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>

              <Button variant="outline" size="sm" onClick={() => handleViewDetails(approval)}>
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {pendingApprovals.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-500">No pending approvals at this time.</p>
          </CardContent>
        </Card>
      )}

      {/* Approval Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Approval Request Details</DialogTitle>
          </DialogHeader>

          {selectedApproval && (
            <div className="space-y-6">
              {/* Header Information */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-100">{getTypeIcon(selectedApproval.type)}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedApproval.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getPriorityBadge(selectedApproval.priority)}
                      <Badge variant="outline">{selectedApproval.type}</Badge>
                      <Badge className="bg-orange-100 text-orange-800">{selectedApproval.urgency}</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Case ID:</strong> {selectedApproval.caseId}
                  </div>
                  <div>
                    <strong>Workflow ID:</strong> {selectedApproval.workflowId}
                  </div>
                  <div>
                    <strong>Customer:</strong> {selectedApproval.customerName}
                  </div>
                  <div>
                    <strong>Amount:</strong> {selectedApproval.amount}
                  </div>
                  <div>
                    <strong>Risk Score:</strong> {selectedApproval.riskScore}
                  </div>
                  <div>
                    <strong>Required Approver:</strong> {selectedApproval.requiredApprover}
                  </div>
                </div>
              </div>

              {/* Business Justification */}
              <div>
                <h4 className="font-semibold mb-2">Business Justification</h4>
                <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded">{selectedApproval.businessJustification}</p>
              </div>

              {/* Supporting Documents */}
              <div>
                <h4 className="font-semibold mb-2">Supporting Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApproval.documents.map((doc: string, index: number) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <FileText className="h-3 w-3 mr-1" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Approval Comments */}
              <div>
                <h4 className="font-semibold mb-2">Approval Comments</h4>
                <Textarea
                  placeholder="Add your comments for this approval decision..."
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => handleDetailedApproval(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button onClick={() => handleDetailedApproval(true)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
