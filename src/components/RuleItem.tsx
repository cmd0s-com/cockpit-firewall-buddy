
import { useState } from "react";
import { FirewallRule, toggleFirewallRule, deleteFirewallRule } from "@/services/firewallService";
import {
  Flex,
  FlexItem,
  Switch,
  Button,
  Label,
  LabelGroup,
  Modal,
  ModalVariant,
  Text,
  TextVariants
} from "@patternfly/react-core";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon
} from "@patternfly/react-icons";

interface RuleItemProps {
  rule: FirewallRule;
  onRuleChange: () => void;
}

export const RuleItem = ({ rule, onRuleChange }: RuleItemProps) => {
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
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
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete rule:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLabelColor = (action: string) => {
    switch(action) {
      case 'allow': return 'green';
      case 'deny': return 'red';
      case 'reject': return 'orange';
      default: return 'blue';
    }
  };

  return (
    <>
      <Flex 
        className="pf-v5-u-p-md pf-v5-u-border-bottom pf-v5-u-border-200 pf-v5-u-background-color-hover-100-on-hover" 
        alignItems={{ default: 'alignItemsCenter' }} 
        justifyContent={{ default: 'justifyContentSpaceBetween' }}
      >
        <FlexItem grow={{ default: 'grow' }} className="pf-v5-u-min-width-0">
          <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
            <FlexItem>
              <LabelGroup>
                <Label color={getLabelColor(rule.action)} className="pf-v5-u-text-transform-capitalize">
                  {rule.action}
                </Label>
                <Label icon={rule.direction === "in" ? <ArrowDownIcon /> : <ArrowUpIcon />} variant="outline">
                  {rule.direction === "in" ? "Inbound" : "Outbound"}
                </Label>
                <Label className="pf-v5-u-text-transform-uppercase">{rule.protocol}</Label>
              </LabelGroup>
            </FlexItem>
            <FlexItem>
              <Flex wrap={{ default: "wrap" }} spaceItems={{ default: "spaceItemsMd" }}>
                <FlexItem>
                  <Text component={TextVariants.small} className="pf-v5-u-color-200">Port:</Text>{" "}
                  <Text component={TextVariants.small} className="pf-v5-u-font-weight-bold">{rule.port || "any"}</Text>
                </FlexItem>
                <FlexItem>
                  <Text component={TextVariants.small} className="pf-v5-u-color-200">From:</Text>{" "}
                  <Text component={TextVariants.small} className="pf-v5-u-font-weight-bold">{rule.from}</Text>
                </FlexItem>
                <FlexItem>
                  <Text component={TextVariants.small} className="pf-v5-u-color-200">To:</Text>{" "}
                  <Text component={TextVariants.small} className="pf-v5-u-font-weight-bold">{rule.to}</Text>
                </FlexItem>
              </Flex>
            </FlexItem>
          </Flex>
        </FlexItem>
        <FlexItem>
          <Flex spaceItems={{ default: 'spaceItemsMd' }}>
            <FlexItem>
              <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
                <FlexItem>
                  <Text component={TextVariants.small} className="pf-v5-u-color-200 pf-v5-u-font-weight-bold">
                    {rule.enabled ? "On" : "Off"}
                  </Text>
                </FlexItem>
                <FlexItem>
                  <Switch 
                    isChecked={rule.enabled} 
                    onChange={handleToggle} 
                    isDisabled={loading}
                    aria-label="Toggle rule"
                  />
                </FlexItem>
              </Flex>
            </FlexItem>
            <FlexItem>
              <Button 
                variant="plain" 
                isDanger
                onClick={() => setIsDeleteModalOpen(true)}
                icon={<TrashIcon />}
                aria-label="Delete rule"
              />
            </FlexItem>
          </Flex>
        </FlexItem>
      </Flex>

      <Modal
        variant={ModalVariant.small}
        title="Delete Firewall Rule"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        actions={[
          <Button key="cancel" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="delete" variant="danger" onClick={handleDelete} isLoading={loading}>
            Delete
          </Button>
        ]}
      >
        Are you sure you want to delete this firewall rule? This action cannot be undone.
      </Modal>
    </>
  );
};
