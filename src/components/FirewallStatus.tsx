
import { useState, useEffect } from "react";
import { getFirewallStatus, toggleFirewall } from "@/services/firewallService";
import { 
  Card, 
  CardTitle, 
  CardBody, 
  CardFooter,
  Switch,
  Button,
  Spinner,
  Flex,
  FlexItem,
  Text,
  TextVariants
} from "@patternfly/react-core";
import { ShieldIcon, ShieldAltIcon, SyncAltIcon } from "@patternfly/react-icons";

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
    <Card isFlat className="pf-v5-u-mb-md">
      <CardTitle>
        <Flex alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            {status ? (
              <ShieldIcon color="var(--pf-v5-global--success-color--100)" />
            ) : (
              <ShieldAltIcon color="var(--pf-v5-global--danger-color--100)" />
            )}
          </FlexItem>
          <FlexItem>Firewall Status</FlexItem>
          <FlexItem align={{ default: 'alignRight' }}>
            <Button 
              variant="plain" 
              onClick={fetchStatus}
              isDisabled={loading}
              aria-label="Refresh status"
            >
              {loading ? <Spinner size="sm" /> : <SyncAltIcon />}
            </Button>
          </FlexItem>
        </Flex>
      </CardTitle>
      <CardBody>
        <Text component={TextVariants.p}>
          Control the Uncomplicated Firewall (UFW)
        </Text>
      </CardBody>
      <CardFooter>
        <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
          <FlexItem>
            <div>
              <Text component={TextVariants.h4}>
                {status === null 
                  ? "Loading status..." 
                  : status 
                    ? "Firewall is enabled" 
                    : "Firewall is disabled"}
              </Text>
              <Text component={TextVariants.small} className="pf-v5-u-color-200">
                {status === null 
                  ? "Checking status..." 
                  : status 
                    ? "Your system is protected" 
                    : "Your system is vulnerable"}
              </Text>
            </div>
          </FlexItem>
          <FlexItem>
            <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
              <FlexItem>
                <Text component={TextVariants.small} className="pf-v5-u-font-weight-bold">
                  {status ? "On" : "Off"}
                </Text>
              </FlexItem>
              <FlexItem>
                <Switch 
                  isChecked={!!status} 
                  onChange={handleToggle} 
                  isDisabled={loading || status === null}
                  aria-label="Toggle firewall"
                />
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </CardFooter>
    </Card>
  );
};
