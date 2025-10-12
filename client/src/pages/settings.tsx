import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Bell, Globe, Database } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your analytics platform preferences
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Manage alert preferences
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications">Enable Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for failed intents and anomalies
              </p>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications}
              onCheckedChange={setNotifications}
              data-testid="switch-notifications"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook">Webhook URL</Label>
            <Input 
              id="webhook" 
              type="url" 
              placeholder="https://your-webhook.com/endpoint"
              data-testid="input-webhook"
            />
            <p className="text-xs text-muted-foreground">
              Optional: Receive notifications via webhook
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">RPC Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Configure blockchain RPC endpoints
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eth-rpc">Ethereum RPC URL</Label>
            <Input 
              id="eth-rpc" 
              type="url" 
              placeholder="https://eth-mainnet.g.alchemy.com/v2/..."
              data-testid="input-eth-rpc"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="op-rpc">Optimism RPC URL</Label>
            <Input 
              id="op-rpc" 
              type="url" 
              placeholder="https://opt-mainnet.g.alchemy.com/v2/..."
              data-testid="input-op-rpc"
            />
          </div>
          <Button variant="outline" data-testid="button-add-rpc">Add Custom RPC</Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Data Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Configure data collection and display
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-refresh">Auto-refresh Dashboard</Label>
              <p className="text-sm text-muted-foreground">
                Automatically update data every 30 seconds
              </p>
            </div>
            <Switch 
              id="auto-refresh" 
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              data-testid="switch-auto-refresh"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="retention">Data Retention Period</Label>
            <Select defaultValue="90">
              <SelectTrigger id="retention" data-testid="select-retention">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" data-testid="button-cancel">Cancel</Button>
        <Button data-testid="button-save-settings">Save Changes</Button>
      </div>
    </div>
  );
}
