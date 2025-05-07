
import { FirewallStatus } from "@/components/FirewallStatus";
import { RulesList } from "@/components/RulesList";

const Index = () => {
  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Firewall Manager</h1>
        <p className="text-muted-foreground">
          Manage your system's Uncomplicated Firewall (UFW) settings
        </p>
      </header>

      <FirewallStatus />
      <RulesList />
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Cockpit Firewall Buddy • A Cockpit Project Plugin</p>
      </footer>
    </div>
  );
};

export default Index;
