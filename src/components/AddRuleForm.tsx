
import { useState } from "react";
import { addFirewallRule, FirewallRule } from "@/services/firewallService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

interface AddRuleFormProps {
  onRuleAdded: () => void;
}

export const AddRuleForm = ({ onRuleAdded }: AddRuleFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<FirewallRule, "id">>({
    action: "allow",
    direction: "in",
    protocol: "tcp",
    from: "any",
    to: "any",
    port: "",
    enabled: true,
  });

  const handleChange = (field: keyof Omit<FirewallRule, "id">, value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      [field]: value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addFirewallRule(formData);
      setOpen(false);
      onRuleAdded();
      // Reset form
      setFormData({
        action: "allow",
        direction: "in",
        protocol: "tcp",
        from: "any",
        to: "any",
        port: "",
        enabled: true,
      });
    } catch (error) {
      console.error("Failed to add rule:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Rule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Firewall Rule</DialogTitle>
          <DialogDescription>
            Create a new UFW firewall rule to control traffic
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Select 
                value={formData.action} 
                onValueChange={(value: "allow" | "deny" | "reject") => handleChange("action", value)}
              >
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="allow">Allow</SelectItem>
                    <SelectItem value="deny">Deny</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <Select 
                value={formData.direction} 
                onValueChange={(value: "in" | "out") => handleChange("direction", value)}
              >
                <SelectTrigger id="direction">
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="in">Inbound</SelectItem>
                    <SelectItem value="out">Outbound</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="protocol">Protocol</Label>
              <Select 
                value={formData.protocol} 
                onValueChange={(value: "any" | "tcp" | "udp") => handleChange("protocol", value)}
              >
                <SelectTrigger id="protocol">
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="tcp">TCP</SelectItem>
                    <SelectItem value="udp">UDP</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input 
                id="port" 
                value={formData.port} 
                onChange={(e) => handleChange("port", e.target.value)}
                placeholder="e.g., 22 or leave empty for any"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input 
                id="from" 
                value={formData.from} 
                onChange={(e) => handleChange("from", e.target.value)}
                placeholder="e.g., 192.168.1.0/24 or 'any'"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input 
                id="to" 
                value={formData.to} 
                onChange={(e) => handleChange("to", e.target.value)}
                placeholder="e.g., 192.168.1.0/24 or 'any'"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Rule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
