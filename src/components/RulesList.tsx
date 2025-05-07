
import { useState, useEffect } from "react";
import { getFirewallRules, FirewallRule } from "@/services/firewallService";
import { RuleItem } from "@/components/RuleItem";
import { AddRuleForm } from "@/components/AddRuleForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export const RulesList = () => {
  const [rules, setRules] = useState<FirewallRule[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchRules = async () => {
    setLoading(true);
    try {
      const firewallRules = await getFirewallRules();
      setRules(firewallRules);
    } catch (error) {
      console.error("Failed to fetch firewall rules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Firewall Rules</CardTitle>
            <CardDescription>
              Manage UFW firewall rules
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchRules}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <AddRuleForm onRuleAdded={fetchRules} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border rounded-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-2 text-sm text-muted-foreground">Loading firewall rules...</p>
            </div>
          ) : rules.length > 0 ? (
            <div>
              {rules.map((rule) => (
                <RuleItem 
                  key={rule.id} 
                  rule={rule} 
                  onRuleChange={fetchRules} 
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No firewall rules found.</p>
              <p className="text-sm mt-1 text-muted-foreground">
                Click "Add Rule" to create your first rule.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
