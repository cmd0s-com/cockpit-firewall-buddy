
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import PatternFly base styles
import '@patternfly/react-core/dist/styles/base.css';

createRoot(document.getElementById("root")!).render(<App />);
