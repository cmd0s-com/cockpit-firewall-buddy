
import { useState, useEffect } from "react";
import { getFirewallRules, FirewallRule } from "@/services/firewallService";
import { RuleItem } from "@/components/RuleItem";
import { AddRuleForm } from "@/components/AddRuleForm";
import { 
  Card, 
  CardTitle, 
  CardBody, 
  Flex, 
  FlexItem, 
  Button, 
  Spinner,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateHeader,
  Text,
  Bullseye,
  TextVariants
} from "@patternfly/react-core";
import { SyncAltIcon, LockIcon } from "@patternfly/react-icons";

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
      <CardTitle>
        <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
          <FlexItem>
            <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsNone' }}>
              <FlexItem>
                <Text component={TextVariants.h2}>Firewall Rules</Text>
              </FlexItem>
              <FlexItem>
                <Text component={TextVariants.small} className="pf-v5-u-color-200">
                  Manage UFW firewall rules
                </Text>
              </FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem>
            <Flex spaceItems={{ default: 'spaceItemsSm' }}>
              <FlexItem>
                <Button 
                  variant="control" 
                  onClick={fetchRules}
                  isDisabled={loading}
                  icon={loading ? <Spinner size="sm" /> : <SyncAltIcon />}
                >
                  Refresh
                </Button>
              </FlexItem>
              <FlexItem>
                <AddRuleForm onRuleAdded={fetchRules} />
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </CardTitle>
      <CardBody className="pf-v5-u-p-0">
        {loading ? (
          <Bullseye className="pf-v5-u-py-xl">
            <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsMd' }}>
              <FlexItem>
                <Spinner size="xl" />
              </FlexItem>
              <FlexItem>
                <Text component={TextVariants.p} className="pf-v5-u-color-200">
                  Loading firewall rules...
                </Text>
              </FlexItem>
            </Flex>
          </Bullseye>
        ) : rules.length > 0 ? (
          <div className="pf-v5-u-border pf-v5-u-border-200">
            {rules.map((rule) => (
              <RuleItem 
                key={rule.id} 
                rule={rule} 
                onRuleChange={fetchRules} 
              />
            ))}
          </div>
        ) : (
          <EmptyState>
            <EmptyStateHeader 
              titleText="No firewall rules found" 
              icon={<EmptyStateIcon icon={LockIcon} />} 
              headingLevel="h2"
            />
            <EmptyStateBody>
              Click "Add Rule" to create your first rule.
            </EmptyStateBody>
          </EmptyState>
        )}
      </CardBody>
    </Card>
  );
};
