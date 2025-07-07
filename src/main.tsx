import { createRoot } from 'react-dom/client'
import { UnitSystemProvider } from '@/contexts/UnitSystemContext'
import { TooltipProvider } from "@/components/ui/tooltip"
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <UnitSystemProvider>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </UnitSystemProvider>
);
