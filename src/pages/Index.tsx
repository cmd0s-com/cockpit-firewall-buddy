
import { FirewallStatus } from "@/components/FirewallStatus";
import { RulesList } from "@/components/RulesList";
import { 
  Page, 
  PageSection, 
  Title, 
  Text, 
  TextContent,
  TextVariants 
} from "@patternfly/react-core";

const Index = () => {
  return (
    <Page>
      <PageSection variant="light" className="pf-v5-u-pb-0">
        <TextContent>
          <Title headingLevel="h1">Firewall Manager</Title>
          <Text component={TextVariants.p}>
            Manage your system's Uncomplicated Firewall (UFW) settings
          </Text>
        </TextContent>
      </PageSection>
      
      <PageSection>
        <FirewallStatus />
        <RulesList />
      </PageSection>
      
      <PageSection variant="light" isFilled={false}>
        <Text component={TextVariants.small} className="pf-v5-u-text-align-center pf-v5-u-color-200">
          Cockpit Firewall Buddy • A Cockpit Project Plugin
        </Text>
      </PageSection>
    </Page>
  );
};

export default Index;
