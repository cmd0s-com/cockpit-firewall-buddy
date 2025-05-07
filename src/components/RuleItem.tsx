
import { useState } from "react";
import { FirewallRule, toggleFirewallRule, deleteFirewallRule } from "@/services/firewallService";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowUpRight, ArrowDownLeft, Trash2 } from "lucide-react";

interface RuleItemProps {
  rule: FirewallRule;
  onRuleChange: () => void;
}

export const RuleItem = ({ rule, onRuleChange }: RuleItemProps) => {
  const [loading, setLoading] = useState(false);
  
  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleFirewallRule(rule.id, !rule.enabled);
      onRuleChange();
    } catch (error) {
      console.error("Failed to toggle rule:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteFirewallRule(rule.id);
      onRuleChange();
    } catch (error) {
      console.error("Failed to delete rule:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={rule.action === "allow" ? "default" : "destructive"} className="capitalize">
            {rule.action}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            {rule.direction === "in" ? 
              <ArrowDownLeft className="h-3 w-3" /> : 
              <ArrowUpRight className="h-3 w-3" />
            }
            {rule.direction === "in" ? "Inbound" : "Outbound"}
          </Badge>
          <Badge variant="secondary">{rule.protocol.toUpperCase()}</Badge>
        </div>
        <div className="flex flex-wrap gap-x-4 text-sm">
          <p>
            <span className="text-muted-foreground">Port: </span>
            <span className="font-medium">{rule.port || "any"}</span>
          </p>
          <p>
            <span className="text-muted-foreground">From: </span>
            <span className="font-medium">{rule.from}</span>
          </p>
          <p>
            <span className="text-muted-foreground">To: </span>
            <span className="font-medium">{rule.to}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {rule.enabled ? "On" : "Off"}
          </span>
          <Switch 
            checked={rule.enabled} 
            onCheckedChange={handleToggle} 
            disabled={loading}
          />
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Firewall Rule</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this firewall rule? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
