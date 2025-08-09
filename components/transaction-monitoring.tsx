import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, AlertCircle } from "lucide-react"

export function TransactionMonitoring() {
  const transactions = [
    {
      id: "TXN-ZW-001",
      timestamp: "2024-01-15 14:32:15",
      amount: "USD $15,750.00",
      account: "****-4521",
      type: "Wire Transfer",
      riskScore: 8.5,
      status: "flagged",
      location: "Bulawayo, Zimbabwe",
      branch: "NMB Bank - Fife Street",
      currency: "USD",
      localAmount: "ZWL $253,200.00",
      destination: "South Africa",
    },
    {
      id: "TXN-ZW-002",
      timestamp: "2024-01-15 14:28:42",
      amount: "USD $2,340.50",
      account: "****-7892",
      type: "Card Payment",
      riskScore: 3.2,
      status: "approved",
      location: "Bulawayo, Zimbabwe",
      branch: "NMB Bank - Fife Street",
      currency: "USD",
      localAmount: "ZWL $37,648.00",
      destination: "Local Merchant",
    },
    {
      id: "TXN-ZW-003",
      timestamp: "2024-01-15 14:25:18",
      amount: "USD $89,200.00",
      account: "****-1234",
      type: "International Transfer",
      riskScore: 9.1,
      status: "blocked",
      location: "Bulawayo, Zimbabwe",
      branch: "NMB Bank - Fife Street",
      currency: "USD",
      localAmount: "ZWL $1,435,200.00",
      destination: "United Kingdom",
    },
    {
      id: "TXN-ZW-004",
      timestamp: "2024-01-15 14:22:33",
      amount: "USD $456.78",
      account: "****-9876",
      type: "ATM Withdrawal",
      riskScore: 1.8,
      status: "approved",
      location: "Bulawayo, Zimbabwe",
      branch: "NMB Bank - Fife Street ATM",
      currency: "USD",
      localAmount: "ZWL $7,348.48",
      destination: "Cash Withdrawal",
    },
    {
      id: "TXN-ZW-005",
      timestamp: "2024-01-15 14:19:07",
      amount: "USD $25,000.00",
      account: "****-5555",
      type: "RTGS Transfer",
      riskScore: 7.3,
      status: "review",
      location: "Bulawayo, Zimbabwe",
      branch: "NMB Bank - Fife Street",
      currency: "USD",
      localAmount: "ZWL $402,500.00",
      destination: "Harare, Zimbabwe",
    },
  ]

  const getRiskBadge = (score: number) => {
    if (score >= 7) return <Badge variant="destructive">High Risk</Badge>
    if (score >= 4) return <Badge variant="secondary">Medium Risk</Badge>
    return <Badge variant="outline">Low Risk</Badge>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "flagged":
        return <Badge className="bg-yellow-100 text-yellow-800">Flagged</Badge>
      case "blocked":
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>
      case "review":
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Real-time Transaction Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Amount (USD/ZWL)</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Branch Location</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.timestamp}</TableCell>
                <TableCell className="font-semibold">
                  <div className="space-y-1">
                    <div>{transaction.amount}</div>
                    <div className="text-xs text-muted-foreground">{transaction.localAmount}</div>
                  </div>
                </TableCell>
                <TableCell>{transaction.account}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{transaction.branch}</div>
                    <div className="text-xs text-muted-foreground">{transaction.location}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{transaction.riskScore}</span>
                    {getRiskBadge(transaction.riskScore)}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell>{transaction.destination}</TableCell>
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
  )
}
