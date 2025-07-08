import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// Restore scroll position on reload
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollPosition', window.scrollY.toString());
});
window.addEventListener('DOMContentLoaded', () => {
  const scrollY = sessionStorage.getItem('scrollPosition');
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY, 10));
  }
});
