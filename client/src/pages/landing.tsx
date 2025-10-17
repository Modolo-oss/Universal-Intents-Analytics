import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  BarChart3, 
  Database, 
  Download, 
  Globe, 
  Zap,
  Github,
  ExternalLink,
  TrendingUp,
  Filter,
  FileJson
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Blockchain Indexing",
      description: "Monitor ERC-7683 intent events across multiple chains with sub-15 second latency"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Interactive Analytics",
      description: "Visualize protocol performance, chain distribution, and success rates with dynamic charts"
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Advanced Filtering",
      description: "Filter intents by chain, status, protocol, and solver with powerful search capabilities"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Data Export",
      description: "Export intent data in CSV or JSON format for custom analysis and research"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-chain Support",
      description: "Track intents across Ethereum, Optimism, Arbitrum, Base, and more EVM chains"
    },
    {
      icon: <FileJson className="w-6 h-6" />,
      title: "Public REST API",
      description: "Access all platform data programmatically with comprehensive API documentation"
    }
  ];

  const stats = [
    { value: "150+", label: "Intents Tracked" },
    { value: "4", label: "Chains Supported" },
    { value: "100%", label: "Open Source" },
    { value: "<15s", label: "Indexing Latency" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        {/* Animated Gradient Blur Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-slow" />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/80 to-background" />
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badges */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2" data-testid="badges-container">
              <Badge variant="outline" className="gap-1.5">
                <Github className="w-3 h-3" />
                Open Source
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Zap className="w-3 h-3" />
                Production Ready
              </Badge>
              <Badge variant="outline" className="gap-1.5 bg-primary/10">
                Gitcoin GG24
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl" data-testid="headline">
              Universal Intents Analytics Platform
            </h1>

            {/* Tagline */}
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl" data-testid="tagline">
              Open-source dashboard for indexing, analyzing, and visualizing ERC-7683 intent activities across Ethereum chains
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4" data-testid="cta-buttons">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2" data-testid="button-try-demo">
                  <TrendingUp className="w-5 h-5" />
                  Try Demo
                </Button>
              </Link>
              <a 
                href="https://universal-intents-analytics-production.up.railway.app" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="secondary" className="gap-2" data-testid="button-live-demo">
                  <Globe className="w-5 h-5" />
                  Live Demo
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              <a 
                href="https://github.com/Modolo-oss/Universal-Intents-Analytics" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-github">
                  <Github className="w-5 h-5" />
                  View on GitHub
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4" data-testid="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" data-testid="features-section">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" data-testid="features-heading">
              Everything You Need for Intent Analytics
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="features-description">
              Comprehensive tools for monitoring, analyzing, and understanding cross-chain intent transactions
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`feature-card-${index}`}>
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold" data-testid={`feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Preview Section */}
      <section className="relative border-t bg-muted/30 py-20 overflow-hidden" data-testid="preview-section">
        {/* Subtle Gradient Blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" data-testid="preview-heading">
              See It In Action
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="preview-description">
              Explore real-time intent data with our interactive dashboard and analytics tools
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <Card className="overflow-hidden" data-testid="preview-card">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 md:p-12">
                <div className="rounded-lg border bg-background shadow-2xl overflow-hidden">
                  {/* Mock Dashboard Preview */}
                  <div className="border-b bg-card p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Live Dashboard</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Metrics Cards */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="rounded-lg border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Total Intents</p>
                        <p className="text-2xl font-bold mt-1">200+</p>
                      </div>
                      <div className="rounded-lg border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-bold mt-1">22%</p>
                      </div>
                      <div className="rounded-lg border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Active Chains</p>
                        <p className="text-2xl font-bold mt-1">4</p>
                      </div>
                      <div className="rounded-lg border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Top Protocol</p>
                        <p className="text-2xl font-bold mt-1">UniswapX</p>
                      </div>
                    </div>
                    {/* Chart Placeholders */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border bg-card p-4 h-48 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <BarChart3 className="mx-auto mb-2 h-12 w-12" />
                          <p className="text-xs">Protocol Rankings</p>
                        </div>
                      </div>
                      <div className="rounded-lg border bg-card p-4 h-48 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Activity className="mx-auto mb-2 h-12 w-12" />
                          <p className="text-xs">Chain Distribution</p>
                        </div>
                      </div>
                    </div>
                    {/* CTA */}
                    <div className="text-center pt-4">
                      <Link href="/dashboard">
                        <Button size="lg" className="gap-2" data-testid="button-view-dashboard">
                          View Dashboard
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-20" data-testid="cta-section">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl" data-testid="cta-heading">
              Ready to Track Intents?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground" data-testid="cta-description">
              Start monitoring ERC-7683 intent activities across Ethereum chains today
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2" data-testid="button-get-started">
                  Get Started
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-api-docs">
                  <FileJson className="w-5 h-5" />
                  API Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" data-testid="footer">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <Badge variant="outline">MIT License</Badge>
              <a 
                href="https://github.com/Modolo-oss/Universal-Intents-Analytics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
                data-testid="link-github-footer"
              >
                GitHub
              </a>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="footer-text">
              Built for the ERC-7683/OIF ecosystem · Gitcoin GG24 Submission
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
