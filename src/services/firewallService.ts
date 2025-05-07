
// This service would interface with Cockpit's DBus API to control UFW
// In a real implementation, this would use Cockpit's API to execute UFW commands

import { toast } from "sonner";

export interface FirewallRule {
  id: string;
  action: "allow" | "deny" | "reject";
  direction: "in" | "out";
  protocol: "any" | "tcp" | "udp";
  from: string;
  to: string;
  port: string;
  enabled: boolean;
}

// Mock data for the UI - in a real implementation, this would fetch data from UFW
const mockRules: FirewallRule[] = [
  {
    id: "1",
    action: "allow",
    direction: "in",
    protocol: "tcp",
    from: "any",
    to: "any",
    port: "22",
    enabled: true,
  },
  {
    id: "2",
    action: "allow",
    direction: "in",
    protocol: "tcp",
    from: "any",
    to: "any",
    port: "80",
    enabled: true,
  },
  {
    id: "3",
    action: "deny",
    direction: "in",
    protocol: "tcp",
    from: "any",
    to: "any",
    port: "25",
    enabled: true,
  },
];

let firewallEnabled = true;
let rules = [...mockRules];

// In a real implementation, this would check the actual status of UFW
export const getFirewallStatus = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(firewallEnabled);
    }, 300);
  });
};

// Toggle firewall status
export const toggleFirewall = async (enable: boolean): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      firewallEnabled = enable;
      toast(enable ? "Firewall enabled" : "Firewall disabled");
      resolve(firewallEnabled);
    }, 500);
  });
};

// Get all firewall rules
export const getFirewallRules = (): Promise<FirewallRule[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...rules]);
    }, 300);
  });
};

// Add a new rule
export const addFirewallRule = (rule: Omit<FirewallRule, "id">): Promise<FirewallRule> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRule = {
        ...rule,
        id: String(Date.now()),
      };
      rules = [...rules, newRule];
      toast.success("Rule added successfully");
      resolve(newRule);
    }, 500);
  });
};

// Delete a rule
export const deleteFirewallRule = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      rules = rules.filter((rule) => rule.id !== id);
      toast.success("Rule deleted successfully");
      resolve(true);
    }, 500);
  });
};

// Toggle rule status
export const toggleFirewallRule = (id: string, enabled: boolean): Promise<FirewallRule> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      rules = rules.map((rule) => 
        rule.id === id ? { ...rule, enabled } : rule
      );
      const updatedRule = rules.find((rule) => rule.id === id);
      toast(`Rule ${enabled ? "enabled" : "disabled"}`);
      resolve(updatedRule as FirewallRule);
    }, 500);
  });
};
