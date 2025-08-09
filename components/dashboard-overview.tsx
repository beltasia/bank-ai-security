import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Shield, TrendingUp, Users } from "lucide-react"

export function DashboardOverview() {
  const metrics = [
    {
      title: "Transactions Processed (NMB Bulawayo)",
      value: "847,392",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      delay: "0s",
    },
    {
      title: "Fraud Cases Detected",
      value: "247",
      change: "-8.2%",
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      delay: "0.1s",
    },
    {
      title: "Risk Score Average (Fife St)",
      value: "3.1/10",
      change: "-0.3",
      icon: Shield,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      delay: "0.2s",
    },
    {
      title: "Active Investigations",
      value: "23",
      change: "+5",
      icon: Users,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      delay: "0.3s",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {metrics.map((metric, index) => (
        <Card key={index} className="card-hover hover-lift animate-fade-in" style={{ animationDelay: metric.delay }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={metric.change.startsWith("+") ? "text-green-400" : "text-red-400"}>{metric.change}</span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
