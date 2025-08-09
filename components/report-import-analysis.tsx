"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import {
  Upload,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Download,
  Eye,
  Trash2,
  RefreshCw,
  Brain,
  Target,
  Shield,
} from "lucide-react"

interface UploadedReport {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  status: "processing" | "analyzed" | "failed"
  progress: number
  recordCount: number
  analysisResults?: {
    riskDistribution: { high: number; medium: number; low: number }
    anomaliesDetected: number
    complianceScore: number
    keyInsights: string[]
    recommendations: string[]
    processingTime: string
    accuracy: number
  }
}

export function ReportImportAnalysis() {
  const [uploadedReports, setUploadedReports] = useState<UploadedReport[]>([
    {
      id: "RPT-001",
      name: "NMB_Transactions_January_2024.csv",
      type: "Transaction Log",
      size: "15.2 MB",
      uploadDate: "2024-01-15T10:30:00Z",
      status: "analyzed",
      progress: 100,
      recordCount: 45678,
      analysisResults: {
        riskDistribution: { high: 12, medium: 34, low: 54 },
        anomaliesDetected: 23,
        complianceScore: 87,
        keyInsights: [
          "Unusual transaction patterns detected in mining sector accounts",
          "Increased cross-border transfers to South Africa",
          "Multiple round-number transactions flagged",
          "Velocity anomalies in corporate accounts",
        ],
        recommendations: [
          "Review mining sector accounts for enhanced due diligence",
          "Implement additional monitoring for SA transfers",
          "Investigate round-number transaction patterns",
          "Set velocity limits for high-risk corporate accounts",
        ],
        processingTime: "2.3 minutes",
        accuracy: 94.2,
      },
    },
    {
      id: "RPT-002",
      name: "Wire_Transfers_Q4_2023.xlsx",
      type: "Wire Transfer Report",
      size: "8.7 MB",
      uploadDate: "2024-01-15T14:20:00Z",
      status: "processing",
      progress: 67,
      recordCount: 12456,
    },
    {
      id: "RPT-003",
      name: "Customer_Risk_Assessment_Dec2023.json",
      type: "Risk Assessment",
      size: "3.1 MB",
      uploadDate: "2024-01-15T16:45:00Z",
      status: "failed",
      progress: 0,
      recordCount: 0,
    },
  ])

  const [selectedReport, setSelectedReport] = useState<UploadedReport | null>(null)
  const [isAnalysisDialogOpen, setIsAnalysisDialogOpen] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }, [])

  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      const newReport: UploadedReport = {
        id: `RPT-${String(uploadedReports.length + 1).padStart(3, "0")}`,
        name: file.name,
        type: getReportType(file.name),
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString(),
        status: "processing",
        progress: 0,
        recordCount: 0,
      }

      setUploadedReports((prev) => [newReport, ...prev])

      // Simulate processing
      simulateProcessing(newReport.id)

      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded and analysis has started.`,
      })
    })
  }

  const getReportType = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase()
    const name = filename.toLowerCase()

    if (name.includes("transaction")) return "Transaction Log"
    if (name.includes("wire") || name.includes("transfer")) return "Wire Transfer Report"
    if (name.includes("risk") || name.includes("assessment")) return "Risk Assessment"
    if (name.includes("compliance")) return "Compliance Report"
    if (name.includes("customer")) return "Customer Data"
    if (name.includes("audit")) return "Audit Trail"

    switch (extension) {
      case "csv":
        return "CSV Data"
      case "xlsx":
      case "xls":
        return "Excel Report"
      case "json":
        return "JSON Data"
      case "pdf":
        return "PDF Report"
      case "xml":
        return "XML Data"
      default:
        return "Unknown Format"
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  const simulateProcessing = (reportId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        // Complete processing with mock results
        setUploadedReports((prev) =>
          prev.map((report) =>
            report.id === reportId
              ? {
                  ...report,
                  status: "analyzed",
                  progress: 100,
                  recordCount: Math.floor(Math.random() * 50000) + 10000,
                  analysisResults: {
                    riskDistribution: {
                      high: Math.floor(Math.random() * 20) + 5,
                      medium: Math.floor(Math.random() * 40) + 20,
                      low: Math.floor(Math.random() * 40) + 40,
                    },
                    anomaliesDetected: Math.floor(Math.random() * 50) + 10,
                    complianceScore: Math.floor(Math.random() * 30) + 70,
                    keyInsights: [
                      "Pattern analysis completed successfully",
                      "Risk scoring applied to all transactions",
                      "Compliance checks performed",
                      "Anomaly detection algorithms executed",
                    ],
                    recommendations: [
                      "Review flagged transactions for manual investigation",
                      "Update risk parameters based on findings",
                      "Consider enhanced monitoring for high-risk accounts",
                      "Generate compliance report for regulatory submission",
                    ],
                    processingTime: `${(Math.random() * 5 + 1).toFixed(1)} minutes`,
                    accuracy: Math.floor(Math.random() * 10) + 90,
                  },
                }
              : report,
          ),
        )

        toast({
          title: "Analysis Complete",
          description: `Report analysis for ${reportId} has been completed successfully.`,
        })
      } else {
        setUploadedReports((prev) => prev.map((report) => (report.id === reportId ? { ...report, progress } : report)))
      }
    }, 500)
  }

  const handleViewAnalysis = (report: UploadedReport) => {
    setSelectedReport(report)
    setIsAnalysisDialogOpen(true)
  }

  const handleDeleteReport = (reportId: string) => {
    setUploadedReports((prev) => prev.filter((report) => report.id !== reportId))
    toast({
      title: "Report Deleted",
      description: "Report has been removed from the system.",
    })
  }

  const handleReprocessReport = (reportId: string) => {
    setUploadedReports((prev) =>
      prev.map((report) => (report.id === reportId ? { ...report, status: "processing", progress: 0 } : report)),
    )
    simulateProcessing(reportId)
    toast({
      title: "Reprocessing Started",
      description: "Report analysis has been restarted.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "analyzed":
        return <Badge className="bg-green-100 text-green-800">Analyzed</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
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

  const totalReports = uploadedReports.length
  const analyzedReports = uploadedReports.filter((r) => r.status === "analyzed").length
  const processingReports = uploadedReports.filter((r) => r.status === "processing").length
  const failedReports = uploadedReports.filter((r) => r.status === "failed").length

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold">{totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-500">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Analyzed</p>
                <p className="text-2xl font-bold">{analyzedReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-orange-500">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold">{processingReports}</p>
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
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold">{failedReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Reports for Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
            <p className="text-gray-600 mb-4">Supported formats: CSV, XLSX, JSON, PDF, XML (Max 100MB per file)</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="outline">Transaction Logs</Badge>
              <Badge variant="outline">Wire Transfers</Badge>
              <Badge variant="outline">Risk Assessments</Badge>
              <Badge variant="outline">Compliance Reports</Badge>
              <Badge variant="outline">Customer Data</Badge>
              <Badge variant="outline">Audit Trails</Badge>
            </div>
            <Button
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.multiple = true
                input.accept = ".csv,.xlsx,.xls,.json,.pdf,.xml"
                input.onchange = (e) => {
                  const files = Array.from((e.target as HTMLInputElement).files || [])
                  handleFileUpload(files)
                }
                input.click()
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedReports.map((report) => (
              <Card key={report.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-semibold">{report.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(report.status)}
                          <Badge variant="outline">{report.type}</Badge>
                          <span className="text-sm text-gray-500">{report.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Uploaded:</span> {formatDate(report.uploadDate)}
                      </div>
                      <div>
                        <span className="text-gray-500">Records:</span> {report.recordCount.toLocaleString()}
                      </div>
                      {report.analysisResults && (
                        <>
                          <div>
                            <span className="text-gray-500">Anomalies:</span> {report.analysisResults.anomaliesDetected}
                          </div>
                          <div>
                            <span className="text-gray-500">Compliance:</span> {report.analysisResults.complianceScore}%
                          </div>
                        </>
                      )}
                    </div>

                    {report.status === "processing" && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Processing...</span>
                          <span>{Math.round(report.progress)}%</span>
                        </div>
                        <Progress value={report.progress} className="h-2" />
                      </div>
                    )}

                    {report.analysisResults && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span>High Risk: {report.analysisResults.riskDistribution.high}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span>Medium Risk: {report.analysisResults.riskDistribution.medium}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span>Low Risk: {report.analysisResults.riskDistribution.low}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {report.status === "analyzed" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleViewAnalysis(report)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Analysis
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </>
                    )}
                    {report.status === "failed" && (
                      <Button size="sm" variant="outline" onClick={() => handleReprocessReport(report.id)}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Retry
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteReport(report.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {uploadedReports.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No reports uploaded yet. Upload your first report to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results Dialog */}
      <Dialog open={isAnalysisDialogOpen} onOpenChange={setIsAnalysisDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analysis Results: {selectedReport?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedReport?.analysisResults && (
            <div className="space-y-6">
              {/* Analysis Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Brain className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedReport.analysisResults.accuracy}%</p>
                    <p className="text-sm text-gray-600">AI Accuracy</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedReport.analysisResults.anomaliesDetected}</p>
                    <p className="text-sm text-gray-600">Anomalies Found</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedReport.analysisResults.complianceScore}%</p>
                    <p className="text-sm text-gray-600">Compliance Score</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedReport.analysisResults.processingTime}</p>
                    <p className="text-sm text-gray-600">Processing Time</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="insights" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="insights">Key Insights</TabsTrigger>
                  <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="details">Technical Details</TabsTrigger>
                </TabsList>

                <TabsContent value="insights" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        AI-Generated Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedReport.analysisResults.keyInsights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="p-1 rounded-full bg-blue-500 mt-1">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <p className="font-medium text-blue-900">Insight #{index + 1}</p>
                              <p className="text-blue-800">{insight}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className="bg-blue-100 text-blue-800">High Confidence</Badge>
                                <span className="text-xs text-blue-600">
                                  Affects {Math.floor(Math.random() * 500) + 100} records
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="risk" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Risk Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-red-700">High Risk</span>
                              <span className="text-sm text-red-700">
                                {selectedReport.analysisResults.riskDistribution.high}%
                              </span>
                            </div>
                            <Progress value={selectedReport.analysisResults.riskDistribution.high} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-orange-700">Medium Risk</span>
                              <span className="text-sm text-orange-700">
                                {selectedReport.analysisResults.riskDistribution.medium}%
                              </span>
                            </div>
                            <Progress value={selectedReport.analysisResults.riskDistribution.medium} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-green-700">Low Risk</span>
                              <span className="text-sm text-green-700">
                                {selectedReport.analysisResults.riskDistribution.low}%
                              </span>
                            </div>
                            <Progress value={selectedReport.analysisResults.riskDistribution.low} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Anomaly Detection</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-orange-600 mb-2">
                            {selectedReport.analysisResults.anomaliesDetected}
                          </div>
                          <p className="text-gray-600 mb-4">Anomalies Detected</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-red-50 rounded-lg">
                              <p className="font-medium text-red-800">Critical</p>
                              <p className="text-2xl font-bold text-red-600">
                                {Math.floor(selectedReport.analysisResults.anomaliesDetected * 0.3)}
                              </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <p className="font-medium text-orange-800">Warning</p>
                              <p className="text-2xl font-bold text-orange-600">
                                {Math.floor(selectedReport.analysisResults.anomaliesDetected * 0.7)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedReport.analysisResults.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                            <div className="p-2 rounded-full bg-green-100">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">Recommendation #{index + 1}</h4>
                              <p className="text-gray-700 mb-2">{recommendation}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">Priority: High</Badge>
                                <Badge variant="outline">Impact: Medium</Badge>
                                <span className="text-xs text-gray-500">
                                  Estimated effort: {Math.floor(Math.random() * 8) + 1} hours
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Implement
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Processing Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Records Processed:</span>
                          <span className="font-medium">{selectedReport.recordCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Time:</span>
                          <span className="font-medium">{selectedReport.analysisResults.processingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">AI Model Accuracy:</span>
                          <span className="font-medium">{selectedReport.analysisResults.accuracy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Data Quality Score:</span>
                          <span className="font-medium">{Math.floor(Math.random() * 20) + 80}%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Analysis Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">False Positive Rate:</span>
                          <span className="font-medium">{(Math.random() * 5 + 2).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Detection Sensitivity:</span>
                          <span className="font-medium">{(Math.random() * 10 + 90).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pattern Recognition:</span>
                          <span className="font-medium">{(Math.random() * 15 + 85).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Confidence Level:</span>
                          <span className="font-medium">{(Math.random() * 10 + 90).toFixed(1)}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAnalysisDialogOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
