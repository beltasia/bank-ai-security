import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, MapPin, Clock, AlertTriangle, TrendingUp, Eye } from "lucide-react"

interface CaseTransactionsProps {
  caseId: string
}

export function CaseTransactions({ caseId }: CaseTransactionsProps) {
  const transactions = [
    {
      id: "TXN-ZW-2024-001",
      timestamp: "2024-01-15T09:15:22Z",
      type: "International Wire Transfer",
      amount: 89500.0,
      currency: "USD",
      localAmount: 1440750.0,
      localCurrency: "ZWL",
      fromAccount: "****-4521",
      toAccount: "****-7890",
      toBank: "Standard Bank South Africa",
      fromBranch: "NMB Bank - Fife Street, Bulawayo",
      location: "Bulawayo, Zimbabwe",
      riskScore: 9.5,
      status: "flagged",
      flags: ["High Amount", "Cross-border", "Velocity", "USD Transaction"],
      correspondent: "Standard Chartered Zimbabwe",
    },
    {
      id: "TXN-ZW-2024-002",
      timestamp: "2024-01-15T09:45:18Z",
      type: "SWIFT Wire Transfer",
      amount: 78200.0,
      currency: "USD",
      localAmount: 1258220.0,
      localCurrency: "ZWL",
      fromAccount: "****-4521",
      toAccount: "****-3456",
      toBank: "Barclays Bank UK",
      fromBranch: "NMB Bank - Fife Street, Bulawayo",
      location: "Bulawayo, Zimbabwe",
      riskScore: 9.2,
      status: "flagged",
      flags: ["High Amount", "International", "Pattern", "Foreign Exchange"],
    },
    {
      id: "TXN-ZW-2024-003",
      timestamp: "2024-01-15T10:12:45Z",
      type: "Cross-Border Transfer",
      amount: 79800.0,
      currency: "USD",
      localAmount: 1283970.0,
      localCurrency: "ZWL",
      fromAccount: "****-4521",
      toAccount: "****-9876",
      toBank: "First National Bank Botswana",
      fromBranch: "NMB Bank - Fife Street, Bulawayo",
      location: "Bulawayo, Zimbabwe",
      riskScore: 9.1,
      status: "blocked",
      flags: ["High Amount", "Regional Transfer", "Structuring", "Multiple Transactions"],
    },
    {
      id: "TXN-ZW-2024-004",
      timestamp: "2024-01-14T16:30:12Z",
      type: "RTGS Transfer",
      amount: 9800.0,
      currency: "USD",
      localAmount: 157730.0,
      localCurrency: "ZWL",
      fromAccount: "****-4521",
      toAccount: "****-1122",
      toBank: "CBZ Bank - Harare",
      fromBranch: "NMB Bank - Fife Street, Bulawayo",
      location: "Bulawayo, Zimbabwe",
      riskScore: 6.8,
      status: "approved",
      flags: ["Threshold Avoidance", "Domestic Transfer"],
    },
    {
      id: "TXN-ZW-2024-005",
      timestamp: "2024-01-14T14:22:33Z",
      type: "EcoCash Transfer",
      amount: 9750.0,
      currency: "USD",
      localAmount: 156925.0,
      localCurrency: "ZWL",
      fromAccount: "****-4521",
      toAccount: "****-3344",
      toBank: "Steward Bank - Mobile Money",
      fromBranch: "NMB Bank - Fife Street, Bulawayo",
      location: "Bulawayo, Zimbabwe",
      riskScore: 6.5,
      status: "approved",
      flags: ["Mobile Money", "Threshold Avoidance"],
    },
  ]

  const formatAmount = (amount: number, currency: string, localAmount?: number, localCurrency?: string) => {
    const primary = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)

    if (localAmount && localCurrency) {
      const secondary = new Intl.NumberFormat("en-ZW", {
        style: "currency",
        currency: localCurrency,
      }).format(localAmount)
      return (
        <div className="space-y-1">
          <div className="font-semibold">{primary}</div>
          <div className="text-xs text-muted-foreground">{secondary}</div>
        </div>
      )
    }

    return primary
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRiskBadge = (score: number) => {
    if (score >= 9) return <Badge className="bg-red-600 text-white">Critical</Badge>
    if (score >= 7) return <Badge className="bg-orange-500 text-white">High</Badge>
    if (score >= 5) return <Badge className="bg-yellow-500 text-white">Medium</Badge>
    return <Badge className="bg-green-500 text-white">Low</Badge>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "flagged":
        return <Badge className="bg-yellow-100 text-yellow-800">Flagged</Badge>
      case "blocked":
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalAmount = transactions.reduce((sum, txn) => sum + txn.amount, 0)
  const flaggedTransactions = transactions.filter((txn) => txn.status === "flagged" || txn.status === "blocked").length
  const averageRiskScore = transactions.reduce((sum, txn) => sum + txn.riskScore, 0) / transactions.length

  return (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl font-bold">{formatAmount(totalAmount, "USD")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Flagged/Blocked</p>
                <p className="text-xl font-bold">{flaggedTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Risk Score</p>
                <p className="text-xl font-bold">{averageRiskScore.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Time Span</p>
                <p className="text-xl font-bold">2 Days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Related Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      {formatTimestamp(transaction.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className="font-semibold">
                    {formatAmount(
                      transaction.amount,
                      transaction.currency,
                      transaction.localAmount,
                      transaction.localCurrency,
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{transaction.toBank}</p>
                      <p className="text-xs text-gray-500">{transaction.toAccount}</p>
                      <p className="text-xs text-blue-600">{transaction.fromBranch}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{transaction.riskScore}</span>
                      {getRiskBadge(transaction.riskScore)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
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

      {/* Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Pattern Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900">High-Risk Pattern Detected</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Multiple large wire transfers to offshore banks within a 24-hour period. Amounts appear structured
                    to avoid reporting thresholds.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                      Velocity Anomaly
                    </Badge>
                    <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                      Offshore Transfers
                    </Badge>
                    <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                      Structuring Pattern
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900">Geographic Risk Factors</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Transactions directed to high-risk jurisdictions with limited banking transparency.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                      Cayman Islands
                    </Badge>
                    <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                      Switzerland
                    </Badge>
                    <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                      Bermuda
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
