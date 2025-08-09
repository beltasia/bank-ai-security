import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, AlertTriangle, DollarSign, MapPin, FileText } from "lucide-react"

interface CustomerRiskProfileProps {
  customerId: string
}

export function CustomerRiskProfile({ customerId }: CustomerRiskProfileProps) {
  const customerData = {
    id: "CUST-ZW-4521",
    name: "Mukamuri Mining Enterprises (Pvt) Ltd",
    type: "Corporate",
    accountNumber: "****-4521",
    branch: "NMB Bank - Fife Street, Bulawayo",
    openDate: "2019-03-15",
    kycStatus: "verified",
    riskRating: "high",
    riskScore: 8.5,
    lastReview: "2024-01-10",
    nextReview: "2024-04-10",
    relationship: "5 years",
    industry: "Mining & Minerals",
    businessType: "Gold Mining Operations",
    registrationNumber: "RC 2019/045821",
    taxNumber: "VAT 10458921",
    address: "Plot 45, Industrial Site, Bulawayo",
    directors: ["John Mukamuri", "Sarah Mukamuri", "David Chikwanha"],
    authorizedSignatories: ["John Mukamuri", "Sarah Mukamuri"],
  }

  const riskFactors = [
    {
      category: "Industry Risk",
      level: "high",
      score: 8.0,
      factors: ["Mining industry (high-risk sector)", "Cash-intensive business", "Export-oriented operations"],
    },
    {
      category: "Geographic Risk",
      level: "medium",
      score: 6.5,
      factors: ["Operations in rural areas", "Cross-border transactions", "Regional supplier network"],
    },
    {
      category: "Transaction Risk",
      level: "high",
      score: 9.0,
      factors: ["High-value USD transactions", "Frequent international transfers", "Irregular transaction patterns"],
    },
    {
      category: "Compliance Risk",
      level: "medium",
      score: 5.5,
      factors: ["Export documentation delays", "Occasional KYC updates needed", "Complex ownership structure"],
    },
  ]

  const transactionProfile = {
    monthlyVolume: "USD $2.4M",
    averageTransaction: "USD $45,000",
    transactionFrequency: "45 per month",
    primaryChannels: ["Wire Transfer", "RTGS", "International Transfer"],
    commonDestinations: ["South Africa", "United Kingdom", "Dubai", "Singapore"],
    peakTransactionTimes: ["Month-end", "After gold sales", "Export settlements"],
  }

  const complianceHistory = [
    {
      date: "2024-01-10",
      type: "KYC Review",
      status: "completed",
      findings: "All documentation updated and verified",
      nextAction: "Routine review in 3 months",
    },
    {
      date: "2023-10-15",
      type: "Enhanced Due Diligence",
      status: "completed",
      findings: "Source of funds verified through mining permits",
      nextAction: "Monitor high-value transactions",
    },
    {
      date: "2023-07-20",
      type: "Suspicious Activity Review",
      status: "cleared",
      findings: "Large transactions justified by gold export contracts",
      nextAction: "Continue monitoring",
    },
  ]

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge className="bg-red-600 text-white">High Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium Risk</Badge>
      case "low":
        return <Badge className="bg-green-500 text-white">Low Risk</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "cleared":
        return <Badge className="bg-green-100 text-green-800">Cleared</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Customer Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">{customerData.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{customerData.type}</Badge>
                  {getStatusBadge(customerData.kycStatus)}
                  {getRiskBadge(customerData.riskRating)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">{customerData.riskScore}</div>
              <p className="text-sm text-gray-600">Risk Score</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Account Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">{customerData.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Branch:</span>
                  <span className="font-medium">Fife Street</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Opened:</span>
                  <span className="font-medium">{new Date(customerData.openDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Relationship:</span>
                  <span className="font-medium">{customerData.relationship}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Business Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">{customerData.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Business Type:</span>
                  <span className="font-medium">{customerData.businessType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration:</span>
                  <span className="font-medium">{customerData.registrationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Number:</span>
                  <span className="font-medium">{customerData.taxNumber}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Compliance Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Review:</span>
                  <span className="font-medium">{new Date(customerData.lastReview).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Review:</span>
                  <span className="font-medium">{new Date(customerData.nextReview).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">KYC Status:</span>
                  {getStatusBadge(customerData.kycStatus)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="risk-assessment" className="w-full">
        <TabsList>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="transaction-profile">Transaction Profile</TabsTrigger>
          <TabsTrigger value="compliance-history">Compliance History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-assessment" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {riskFactors.map((factor, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{factor.category}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getRiskBadge(factor.level)}
                      <span className="font-bold text-lg">{factor.score}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={factor.score * 10} className="mb-4" />
                  <ul className="space-y-2">
                    {factor.factors.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-orange-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transaction-profile" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Transaction Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Volume:</span>
                    <span className="font-bold text-lg">{transactionProfile.monthlyVolume}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Transaction:</span>
                    <span className="font-semibold">{transactionProfile.averageTransaction}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-semibold">{transactionProfile.transactionFrequency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Transaction Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Primary Channels:</h4>
                    <div className="flex flex-wrap gap-2">
                      {transactionProfile.primaryChannels.map((channel, idx) => (
                        <Badge key={idx} variant="outline">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Common Destinations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {transactionProfile.commonDestinations.map((dest, idx) => (
                        <Badge key={idx} variant="secondary">
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance-history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Compliance Review History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceHistory.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{item.type}</h4>
                        <p className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{item.findings}</p>
                    <p className="text-sm font-medium text-blue-600">{item.nextAction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Customer Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Identity Documents</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Certificate of Incorporation</span>
                      <Badge className="bg-green-100 text-green-800">Valid</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Tax Clearance Certificate</span>
                      <Badge className="bg-green-100 text-green-800">Valid</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Mining License</span>
                      <Badge className="bg-green-100 text-green-800">Valid</Badge>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Financial Documents</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Audited Financial Statements</span>
                      <Badge className="bg-green-100 text-green-800">2023</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Bank References</span>
                      <Badge className="bg-green-100 text-green-800">Current</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Export Permits</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
