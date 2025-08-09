import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Download, Eye, Upload, Calendar, User } from "lucide-react"

interface CaseEvidenceProps {
  caseId: string
}

export function CaseEvidence({ caseId }: CaseEvidenceProps) {
  const evidenceItems = [
    {
      id: "EV-001",
      name: "Bank Statement - December 2023",
      type: "document",
      format: "PDF",
      size: "2.4 MB",
      uploadedBy: "Sarah Chen",
      uploadedDate: "2024-01-15T10:45:00Z",
      category: "Financial Records",
      description: "Complete bank statement showing transaction history",
      tags: ["Primary Evidence", "Financial"],
    },
    {
      id: "EV-002",
      name: "Transaction Log Export",
      type: "data",
      format: "CSV",
      size: "856 KB",
      uploadedBy: "System",
      uploadedDate: "2024-01-15T10:30:00Z",
      category: "Transaction Data",
      description: "Detailed transaction log with timestamps and metadata",
      tags: ["System Generated", "Raw Data"],
    },
    {
      id: "EV-003",
      name: "Customer ID Verification",
      type: "image",
      format: "JPG",
      size: "1.2 MB",
      uploadedBy: "Mike Rodriguez",
      uploadedDate: "2024-01-15T11:20:00Z",
      category: "Identity Verification",
      description: "Scanned copy of customer identification documents",
      tags: ["KYC", "Identity"],
    },
    {
      id: "EV-004",
      name: "Wire Transfer Receipts",
      type: "document",
      format: "PDF",
      size: "3.1 MB",
      uploadedBy: "Jennifer Liu",
      uploadedDate: "2024-01-15T12:15:00Z",
      category: "Transaction Evidence",
      description: "Collection of wire transfer receipts and confirmations",
      tags: ["Wire Transfers", "Receipts"],
    },
    {
      id: "EV-005",
      name: "IP Address Logs",
      type: "data",
      format: "JSON",
      size: "245 KB",
      uploadedBy: "System",
      uploadedDate: "2024-01-15T13:30:00Z",
      category: "Technical Evidence",
      description: "Login IP addresses and geolocation data",
      tags: ["Technical", "Geolocation"],
    },
    {
      id: "EV-006",
      name: "Customer Communication",
      type: "document",
      format: "PDF",
      size: "892 KB",
      uploadedBy: "Mike Rodriguez",
      uploadedDate: "2024-01-15T14:45:00Z",
      category: "Communications",
      description: "Email correspondence with customer regarding account activity",
      tags: ["Communication", "Email"],
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "data":
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Financial Records": "bg-blue-100 text-blue-800",
      "Transaction Data": "bg-green-100 text-green-800",
      "Identity Verification": "bg-purple-100 text-purple-800",
      "Transaction Evidence": "bg-orange-100 text-orange-800",
      "Technical Evidence": "bg-red-100 text-red-800",
      Communications: "bg-yellow-100 text-yellow-800",
    }

    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Evidence Management
            </CardTitle>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG, CSV, JSON (Max 10MB)</p>
          </div>
        </CardContent>
      </Card>

      {/* Evidence List */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence Items ({evidenceItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evidenceItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {getFileIcon(item.type)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>

                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>
                          {item.format} • {item.size}
                        </span>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.uploadedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(item.uploadedDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">{getCategoryBadge(item.category)}</div>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidence Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">6</p>
              <p className="text-sm text-gray-600">Total Items</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">4</p>
              <p className="text-sm text-gray-600">Documents</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">1</p>
              <p className="text-sm text-gray-600">Images</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">8.7MB</p>
              <p className="text-sm text-gray-600">Total Size</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
