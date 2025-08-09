"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Target,
  FileText,
  Download,
  Calendar,
  Zap,
  Users,
} from "lucide-react"
import { PieChart, Pie, Cell } from "recharts"

export function ExecutiveDashboard() {
  // Executive KPIs
  const executiveKPIs = [
    {
      title: "Fraud Losses Prevented",
      value: "$12.4M",
      change: "+18.5%",
      trend: "up",
      period: "vs last quarter",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Total financial losses prevented through fraud detection",
    },
    {
      title: "Detection Accuracy",
      value: "96.8%",
      change: "+2.3%",
      trend: "up",
      period: "vs last quarter",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "AI model accuracy in fraud detection",
    },
    {
      title: "Operational Efficiency",
      value: "87.2%",
      change: "+5.1%",
      trend: "up",
      period: "vs last quarter",
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Overall operational efficiency score",
    },
    {
      title: "Regulatory Compliance",
      value: "98.1%",
      change: "+1.2%",
      trend: "up",
      period: "vs last quarter",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Compliance with regulatory requirements",
    },
  ]

  // Financial Impact Over Time
  const financialImpactData = [
    { month: "Jul", prevented: 8.2, losses: 0.3, roi: 2733 },
    { month: "Aug", prevented: 9.1, losses: 0.2, roi: 4550 },
    { month: "Sep", prevented: 7.8, losses: 0.4, roi: 1950 },
    { month: "Oct", prevented: 11.2, losses: 0.1, roi: 11200 },
    { month: "Nov", prevented: 10.5, losses: 0.2, roi: 5250 },
    { month: "Dec", prevented: 13.8, losses: 0.1, roi: 13800 },
    { month: "Jan", prevented: 12.4, losses: 0.2, roi: 6200 },
  ]

  // Risk Exposure by Category
  const riskExposureData = [
    { category: "Wire Fraud", exposure: 35, amount: 4.2, color: "#ef4444" },
    { category: "Card Fraud", exposure: 28, amount: 3.1, color: "#f97316" },
    { category: "Money Laundering", exposure: 20, amount: 2.8, color: "#eab308" },
    { category: "Account Takeover", exposure: 12, amount: 1.5, color: "#22c55e" },
    { category: "Identity Theft", exposure: 5, amount: 0.8, color: "#6366f1" },
  ]

  // Operational Performance Trends
  const operationalTrendsData = [
    { week: "W1", caseResolution: 94, slaCompliance: 96, customerSatisfaction: 89 },
    { week: "W2", caseResolution: 96, slaCompliance: 94, customerSatisfaction: 91 },
    { week: "W3", caseResolution: 92, slaCompliance: 98, customerSatisfaction: 88 },
    { week: "W4", caseResolution: 98, slaCompliance: 95, customerSatisfaction: 93 },
    { week: "W5", caseResolution: 95, slaCompliance: 97, customerSatisfaction: 90 },
    { week: "W6", caseResolution: 97, slaCompliance: 99, customerSatisfaction: 94 },
  ]

  // Strategic Initiatives Progress
  const strategicInitiatives = [
    {
      name: "AI Model Enhancement",
      progress: 78,
      status: "on_track",
      budget: "$2.1M",
      timeline: "Q2 2024",
      impact: "15% accuracy improvement",
    },
    {
      name: "Real-time Analytics Platform",
      progress: 92,
      status: "ahead",
      budget: "$1.8M",
      timeline: "Q1 2024",
      impact: "50% faster detection",
    },
    {
      name: "Regulatory Compliance Automation",
      progress: 65,
      status: "at_risk",
      budget: "$1.2M",
      timeline: "Q3 2024",
      impact: "90% automation rate",
    },
    {
      name: "Customer Experience Enhancement",
      progress: 85,
      status: "on_track",
      budget: "$900K",
      timeline: "Q2 2024",
      impact: "25% reduction in false positives",
    },
  ]

  // Executive Alerts
  const executiveAlerts = [
    {
      type: "critical",
      title: "Unusual Wire Transfer Activity",
      description: "45% increase in high-risk wire transfers detected in the last 24 hours",
      impact: "High",
      action: "Investigation team deployed",
      timestamp: "2 hours ago",
    },
    {
      type: "warning",
      title: "SLA Performance Dip",
      description: "Wire fraud investigation SLA compliance dropped to 89%",
      impact: "Medium",
      action: "Process optimization initiated",
      timestamp: "6 hours ago",
    },
    {
      type: "info",
      title: "Quarterly Compliance Review",
      description: "Q1 regulatory compliance review scheduled for next week",
      impact: "Low",
      action: "Documentation prepared",
      timestamp: "1 day ago",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on_track":
        return <Badge className="bg-green-100 text-green-800">On Track</Badge>
      case "ahead":
        return <Badge className="bg-blue-100 text-blue-800">Ahead</Badge>
      case "at_risk":
        return <Badge className="bg-red-100 text-red-800">At Risk</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-red-600 text-white">Critical</Badge>
      case "warning":
        return <Badge className="bg-orange-500 text-white">Warning</Badge>
      case "info":
        return <Badge className="bg-blue-500 text-white">Info</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // AI-Powered Forecasting Data
  const fraudLossForecast = [
    // Historical data
    { month: "Jul", actual: 8.2, predicted: null, confidence: null, type: "historical" },
    { month: "Aug", actual: 9.1, predicted: null, confidence: null, type: "historical" },
    { month: "Sep", actual: 7.8, predicted: null, confidence: null, type: "historical" },
    { month: "Oct", actual: 11.2, predicted: null, confidence: null, type: "historical" },
    { month: "Nov", actual: 10.5, predicted: null, confidence: null, type: "historical" },
    { month: "Dec", actual: 13.8, predicted: null, confidence: null, type: "historical" },
    { month: "Jan", actual: 12.4, predicted: null, confidence: null, type: "historical" },
    // Forecasted data
    { month: "Feb", actual: null, predicted: 14.2, confidence: [12.8, 15.6], type: "forecast" },
    { month: "Mar", actual: null, predicted: 15.8, confidence: [13.9, 17.7], type: "forecast" },
    { month: "Apr", actual: null, predicted: 16.5, confidence: [14.2, 18.8], type: "forecast" },
    { month: "May", actual: null, predicted: 18.1, confidence: [15.1, 21.1], type: "forecast" },
    { month: "Jun", actual: null, predicted: 19.3, confidence: [15.8, 22.8], type: "forecast" },
  ]

  const detectionAccuracyForecast = [
    // Historical data
    { month: "Jul", actual: 94.5, predicted: null, type: "historical" },
    { month: "Aug", actual: 95.1, predicted: null, type: "historical" },
    { month: "Sep", actual: 94.8, predicted: null, type: "historical" },
    { month: "Oct", actual: 96.2, predicted: null, type: "historical" },
    { month: "Nov", actual: 95.9, predicted: null, type: "historical" },
    { month: "Dec", actual: 96.5, predicted: null, type: "historical" },
    { month: "Jan", actual: 96.8, predicted: null, type: "historical" },
    // Forecasted data
    { month: "Feb", actual: null, predicted: 97.2, type: "forecast" },
    { month: "Mar", actual: null, predicted: 97.6, type: "forecast" },
    { month: "Apr", actual: null, predicted: 98.1, type: "forecast" },
    { month: "May", actual: null, predicted: 98.3, type: "forecast" },
    { month: "Jun", actual: null, predicted: 98.7, type: "forecast" },
  ]

  // Risk Scenario Analysis
  const riskScenarios = [
    {
      scenario: "Optimistic",
      probability: 25,
      fraudLosses: "$8.2M",
      detectionRate: "98.5%",
      operationalCost: "$2.1M",
      roi: "8,500%",
      description: "Enhanced AI models, improved processes, favorable market conditions",
    },
    {
      scenario: "Most Likely",
      probability: 50,
      fraudLosses: "$12.4M",
      detectionRate: "97.2%",
      operationalCost: "$2.8M",
      roi: "6,200%",
      description: "Current trajectory with planned improvements",
    },
    {
      scenario: "Pessimistic",
      probability: 25,
      fraudLosses: "$18.7M",
      detectionRate: "95.8%",
      operationalCost: "$3.5M",
      roi: "4,100%",
      description: "Increased fraud sophistication, regulatory changes, resource constraints",
    },
  ]

  // Predictive Insights
  const predictiveInsights = [
    {
      type: "opportunity",
      title: "AI Model Enhancement Impact",
      description:
        "Completing AI model enhancement by Q2 could increase detection accuracy to 98.7% and prevent additional $6.2M in losses",
      confidence: 87,
      timeframe: "Q2 2024",
      impact: "High",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      type: "risk",
      title: "Wire Fraud Trend Alert",
      description: "Current wire fraud patterns suggest 23% increase in sophisticated attacks by Q3 2024",
      confidence: 78,
      timeframe: "Q3 2024",
      impact: "Medium",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      type: "optimization",
      title: "Resource Allocation Opportunity",
      description: "Reallocating 15% of manual review resources to AI training could improve efficiency by 12%",
      confidence: 82,
      timeframe: "Q2 2024",
      impact: "Medium",
      icon: Target,
      color: "text-blue-600",
    },
  ]

  // Seasonal Trend Analysis
  const seasonalTrends = [
    { period: "Q1", historicalAvg: 11.2, forecast: 14.8, variance: "+32%" },
    { period: "Q2", historicalAvg: 9.8, forecast: 17.1, variance: "+75%" },
    { period: "Q3", historicalAvg: 8.5, forecast: 15.3, variance: "+80%" },
    { period: "Q4", historicalAvg: 12.1, forecast: 16.9, variance: "+40%" },
  ]

  // Update the return statement to include dark theme classes and animations
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Executive Summary Header */}
      <div className="flex items-center justify-between animate-slide-in">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Executive Summary</h2>
          <p className="text-muted-foreground mt-1">Strategic overview of fraud detection and compliance operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="btn-animate hover-lift bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Review
          </Button>
          <Button className="btn-animate hover-lift">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Executive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executiveKPIs.map((kpi, index) => {
          const IconComponent = kpi.icon
          const isPositiveTrend = kpi.trend === "up"

          return (
            <Card
              key={index}
              className="card-hover hover-lift animate-fade-in relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`absolute top-0 right-0 w-20 h-20 ${kpi.bgColor} rounded-bl-full opacity-10`}></div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${isPositiveTrend ? "text-green-400" : "text-red-400"}`}>
                      {isPositiveTrend ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="text-sm font-medium">{kpi.change}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{kpi.period}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</h3>
                  <p className="text-3xl font-bold text-foreground mb-2">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI-Powered Forecasting Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">AI-Powered Forecasts & Predictions</h3>
          <Badge className="bg-purple-100 text-purple-800 hover-lift">
            <Zap className="h-3 w-3 mr-1" />
            AI Insights
          </Badge>
        </div>

        {/* Fraud Loss Prevention Forecast */}
        <Card className="card-hover hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <DollarSign className="h-5 w-5 text-green-400" />
                Fraud Loss Prevention Forecast
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="hover-lift">
                  6-Month Projection
                </Badge>
                <Badge className="bg-green-100 text-green-800 hover-lift">Confidence: 85%</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fraudLossForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    formatter={(value, name) => [
                      value ? `$${value}M` : "N/A",
                      name === "actual" ? "Historical" : "Forecast",
                    ]}
                    contentStyle={{ background: "#333", color: "#fff", border: "none" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.6}
                    connectNulls={false}
                    name="actual"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                    strokeDasharray="5,5"
                    connectNulls={false}
                    name="predicted"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-bold text-green-400">$19.3M</p>
                <p className="text-sm text-muted-foreground">Projected Jun 2024</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-lg font-bold text-blue-400">+56%</p>
                <p className="text-sm text-muted-foreground">Growth vs Current</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-lg font-bold text-purple-400">85%</p>
                <p className="text-sm text-muted-foreground">Forecast Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detection Accuracy Forecast and Risk Scenarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detection Accuracy Forecast */}
          <Card className="card-hover hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5 text-blue-400" />
                Detection Accuracy Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={detectionAccuracyForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis dataKey="month" stroke="#999" />
                    <YAxis domain={[94, 99]} stroke="#999" />
                    <Tooltip
                      formatter={(value) => [`${value}%`, ""]}
                      contentStyle={{ background: "#333", color: "#fff", border: "none" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#22c55e"
                      strokeWidth={3}
                      connectNulls={false}
                      name="Historical"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      strokeDasharray="5,5"
                      connectNulls={false}
                      name="Forecast"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-bold text-blue-400">98.7%</p>
                <p className="text-sm text-muted-foreground">Projected accuracy by June 2024</p>
              </div>
            </CardContent>
          </Card>

          {/* Risk Scenario Analysis */}
          <Card className="card-hover hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Risk Scenario Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskScenarios.map((scenario, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{scenario.scenario}</h4>
                      <Badge variant="outline">{scenario.probability}% probability</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Fraud Losses:</span>
                        <span className="font-semibold ml-1 text-foreground">{scenario.fraudLosses}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Detection Rate:</span>
                        <span className="font-semibold ml-1 text-foreground">{scenario.detectionRate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Op. Cost:</span>
                        <span className="font-semibold ml-1 text-foreground">{scenario.operationalCost}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="font-semibold ml-1 text-foreground">{scenario.roi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictive Insights */}
        <Card className="card-hover hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Zap className="h-5 w-5 text-purple-400" />
              AI-Generated Strategic Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predictiveInsights.map((insight, index) => {
                const IconComponent = insight.icon
                return (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          insight.type === "opportunity"
                            ? "bg-green-50"
                            : insight.type === "risk"
                              ? "bg-orange-50"
                              : "bg-blue-50"
                        }`}
                      >
                        <IconComponent className={`h-4 w-4 ${insight.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1 text-foreground">{insight.title}</h4>
                        <p className="text-xs text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs hover-lift">
                          {insight.impact} Impact
                        </Badge>
                        <span className="text-muted-foreground">{insight.timeframe}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-muted-foreground">{insight.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Seasonal Trends and Resource Planning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seasonal Trend Analysis */}
          <Card className="card-hover hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Calendar className="h-5 w-5 text-indigo-400" />
                Seasonal Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seasonalTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">{trend.period}</h4>
                      <p className="text-sm text-muted-foreground">Historical: ${trend.historicalAvg}M</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">${trend.forecast}M</p>
                      <Badge
                        className={`text-xs ${
                          trend.variance.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {trend.variance}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>AI Insight:</strong> Q2 shows highest growth potential (+75%) due to enhanced detection
                  capabilities and seasonal fraud patterns.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Resource Planning Forecast */}
          <Card className="card-hover hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-green-400" />
                Resource Planning Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-foreground">Staffing Recommendations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Investigators:</span>
                      <span className="font-semibold text-foreground">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recommended (Q2):</span>
                      <span className="font-semibold text-green-400">28 (+4)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Automation Impact:</span>
                      <span className="font-semibold text-blue-400">-6 FTE equivalent</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 text-foreground">Technology Investment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AI Model Training:</span>
                      <span className="font-semibold text-foreground">$1.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Infrastructure Scaling:</span>
                      <span className="font-semibold text-foreground">$800K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected ROI:</span>
                      <span className="font-semibold text-green-400">340%</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Forecast:</strong> Optimal resource allocation could increase efficiency by 23% while
                    reducing operational costs by $1.1M annually.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Financial Impact and Risk Exposure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Impact Over Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Financial Impact Trend
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">ROI: 6,200%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "prevented" ? `$${value}M` : name === "losses" ? `$${value}M` : `${value}%`,
                      name === "prevented" ? "Prevented" : name === "losses" ? "Losses" : "ROI",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="prevented"
                    stackId="1"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.6}
                    name="prevented"
                  />
                  <Area
                    type="monotone"
                    dataKey="losses"
                    stackId="2"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="losses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">$12.4M</p>
                <p className="text-sm text-gray-600">Losses Prevented</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">$0.2M</p>
                <p className="text-sm text-gray-600">Actual Losses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">6,200%</p>
                <p className="text-sm text-gray-600">ROI This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Exposure by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Risk Exposure by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskExposureData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, exposure }) => `${category}: ${exposure}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="exposure"
                  >
                    {riskExposureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Risk Exposure"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {riskExposureData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">${item.amount}M</span>
                    <span className="text-xs text-gray-500 ml-2">({item.exposure}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Performance and Strategic Initiatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operational Performance Trends */}
        <Card className="card-hover hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Operational Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={operationalTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis dataKey="week" stroke="#999" />
                  <YAxis domain={[80, 100]} stroke="#999" />
                  <Tooltip
                    formatter={(value) => [`${value}%`, ""]}
                    contentStyle={{ background: "#333", color: "#fff", border: "none" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="caseResolution"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Case Resolution"
                  />
                  <Line
                    type="monotone"
                    dataKey="slaCompliance"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="SLA Compliance"
                  />
                  <Line
                    type="monotone"
                    dataKey="customerSatisfaction"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name="Customer Satisfaction"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-blue-400">97%</p>
                <p className="text-xs text-muted-foreground">Case Resolution</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-400">99%</p>
                <p className="text-xs text-muted-foreground">SLA Compliance</p>
              </div>
              <div>
                <p className="text-lg font-bold text-orange-400">94%</p>
                <p className="text-xs text-muted-foreground">Customer Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Initiatives */}
        <Card className="card-hover hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="h-5 w-5 text-purple-400" />
              Strategic Initiatives Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {strategicInitiatives.map((initiative, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{initiative.name}</h4>
                      <p className="text-xs text-muted-foreground">{initiative.impact}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(initiative.status)}
                      <span className="text-sm font-medium text-foreground">{initiative.progress}%</span>
                    </div>
                  </div>
                  <Progress value={initiative.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Budget: {initiative.budget}</span>
                    <span>Target: {initiative.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Executive Alerts */}
      <Card className="card-hover hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Executive Alerts & Actions Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {executiveAlerts.map((alert, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getAlertBadge(alert.type)}
                    <div>
                      <h4 className="font-semibold text-foreground">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Impact: <span className="font-medium text-foreground">{alert.impact}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Action: <span className="font-medium text-foreground">{alert.action}</span>
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Executive Summary Insights */}
      <Card className="card-hover hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5 text-foreground" />
            Executive Summary & Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Key Achievements
              </h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Prevented $12.4M in fraud losses this month (+18.5%)</li>
                <li>• Achieved 96.8% detection accuracy (+2.3%)</li>
                <li>• Maintained 98.1% regulatory compliance</li>
                <li>• Improved operational efficiency to 87.2%</li>
                <li>• Real-time analytics platform 92% complete</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-orange-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Areas of Focus
              </h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Wire fraud SLA compliance at 89% (below target)</li>
                <li>• Regulatory compliance automation at risk</li>
                <li>• 45% increase in high-risk wire transfers</li>
                <li>• Customer satisfaction fluctuating (88-94%)</li>
                <li>• Need to optimize approval processes</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-blue-400 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Strategic Priorities
              </h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Complete AI model enhancement (Q2 2024)</li>
                <li>• Deploy real-time analytics platform</li>
                <li>• Accelerate compliance automation project</li>
                <li>• Enhance customer experience initiatives</li>
                <li>• Strengthen wire fraud detection capabilities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
