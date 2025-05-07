
import { useState, useEffect } from "react";
import { getFirewallStatus, toggleFirewall } from "@/services/firewallService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield, ShieldAlert, RefreshCw } from "lucide-react";

export const FirewallStatus = () => {
  const [status, setStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fetchStatus = async () => {
    setLoading(true);
    try {
      const firewallStatus = await getFirewallStatus();
      setStatus(firewallStatus);
    } catch (error) {
      console.error("Failed to fetch firewall status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleToggle = async () => {
    if (status === null) return;
    
    setLoading(true);
    try {
      const newStatus = await toggleFirewall(!status);
      setStatus(newStatus);
    } catch (error) {
      console.error("Failed to toggle firewall:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            {status ? (
              <Shield className="h-5 w-5 text-green-500" />
            ) : (
              <ShieldAlert className="h-5 w-5 text-red-500" />
            )}
            Firewall Status
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchStatus}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </CardTitle>
        <CardDescription>
          Control the Uncomplicated Firewall (UFW)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              {status === null 
                ? "Loading status..." 
                : status 
                  ? "Firewall is enabled" 
                  : "Firewall is disabled"}
            </p>
            <p className="text-sm text-muted-foreground">
              {status === null 
                ? "Checking status..." 
                : status 
                  ? "Your system is protected" 
                  : "Your system is vulnerable"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {status ? "On" : "Off"}
            </span>
            <Switch 
              checked={!!status} 
              onCheckedChange={handleToggle} 
              disabled={loading || status === null}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
