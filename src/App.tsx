import React from 'react';
import { AuthSetup } from './components/AuthSetup';
import { Dashboard } from './components/Dashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const { credentials } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {!credentials ? <AuthSetup /> : <Dashboard />}
    </div>
  );
}

export default App;