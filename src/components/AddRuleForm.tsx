
import { useState } from "react";
import { addFirewallRule, FirewallRule } from "@/services/firewallService";
import {
  Button,
  Form,
  FormGroup,
  TextInput,
  Select,
  SelectOption,
  Modal,
  ModalVariant,
  ActionGroup,
  InputGroup,
  PlusCircleIcon
} from "@patternfly/react-core";

interface AddRuleFormProps {
  onRuleAdded: () => void;
}

export const AddRuleForm = ({ onRuleAdded }: AddRuleFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Select states
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isDirectionOpen, setIsDirectionOpen] = useState(false);
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);

  const handleChange = (field: keyof Omit<FirewallRule, "id">, value: any) => {
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
      setIsModalOpen(false);
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

  const actionOptions = [
    <SelectOption key="allow" value="allow">Allow</SelectOption>,
    <SelectOption key="deny" value="deny">Deny</SelectOption>,
    <SelectOption key="reject" value="reject">Reject</SelectOption>
  ];

  const directionOptions = [
    <SelectOption key="in" value="in">Inbound</SelectOption>,
    <SelectOption key="out" value="out">Outbound</SelectOption>
  ];

  const protocolOptions = [
    <SelectOption key="any" value="any">Any</SelectOption>,
    <SelectOption key="tcp" value="tcp">TCP</SelectOption>,
    <SelectOption key="udp" value="udp">UDP</SelectOption>
  ];

  return (
    <>
      <Button icon={<PlusCircleIcon />} onClick={() => setIsModalOpen(true)}>
        Add Rule
      </Button>

      <Modal
        variant={ModalVariant.medium}
        title="Add New Firewall Rule"
        description="Create a new UFW firewall rule to control traffic"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actions={[
          <Button key="cancel" variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="add" variant="primary" onClick={handleSubmit} isLoading={loading}>
            {loading ? "Adding..." : "Add Rule"}
          </Button>
        ]}
      >
        <Form>
          <div className="pf-v5-u-display-flex pf-v5-u-flex-wrap">
            <div className="pf-v5-u-w-50 pf-v5-u-pr-sm">
              <FormGroup label="Action" fieldId="action">
                <Select
                  id="action"
                  aria-label="Select action"
                  selections={formData.action}
                  isOpen={isActionOpen}
                  onToggle={() => setIsActionOpen(!isActionOpen)}
                  onSelect={(_, value) => {
                    handleChange("action", value as "allow" | "deny" | "reject");
                    setIsActionOpen(false);
                  }}
                >
                  {actionOptions}
                </Select>
              </FormGroup>
            </div>
            
            <div className="pf-v5-u-w-50 pf-v5-u-pl-sm">
              <FormGroup label="Direction" fieldId="direction">
                <Select
                  id="direction"
                  aria-label="Select direction"
                  selections={formData.direction}
                  isOpen={isDirectionOpen}
                  onToggle={() => setIsDirectionOpen(!isDirectionOpen)}
                  onSelect={(_, value) => {
                    handleChange("direction", value as "in" | "out");
                    setIsDirectionOpen(false);
                  }}
                >
                  {directionOptions}
                </Select>
              </FormGroup>
            </div>
            
            <div className="pf-v5-u-w-50 pf-v5-u-pr-sm">
              <FormGroup label="Protocol" fieldId="protocol">
                <Select
                  id="protocol"
                  aria-label="Select protocol"
                  selections={formData.protocol}
                  isOpen={isProtocolOpen}
                  onToggle={() => setIsProtocolOpen(!isProtocolOpen)}
                  onSelect={(_, value) => {
                    handleChange("protocol", value as "any" | "tcp" | "udp");
                    setIsProtocolOpen(false);
                  }}
                >
                  {protocolOptions}
                </Select>
              </FormGroup>
            </div>
            
            <div className="pf-v5-u-w-50 pf-v5-u-pl-sm">
              <FormGroup label="Port" fieldId="port">
                <TextInput
                  id="port"
                  value={formData.port}
                  onChange={(_, value) => handleChange("port", value)}
                  placeholder="e.g., 22 or leave empty for any"
                />
              </FormGroup>
            </div>
            
            <div className="pf-v5-u-w-50 pf-v5-u-pr-sm">
              <FormGroup label="From" fieldId="from">
                <TextInput
                  id="from"
                  value={formData.from}
                  onChange={(_, value) => handleChange("from", value)}
                  placeholder="e.g., 192.168.1.0/24 or 'any'"
                />
              </FormGroup>
            </div>
            
            <div className="pf-v5-u-w-50 pf-v5-u-pl-sm">
              <FormGroup label="To" fieldId="to">
                <TextInput
                  id="to"
                  value={formData.to}
                  onChange={(_, value) => handleChange("to", value)}
                  placeholder="e.g., 192.168.1.0/24 or 'any'"
                />
              </FormGroup>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
