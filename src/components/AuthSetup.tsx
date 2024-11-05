import React, { useState } from 'react';
import { Shield, Key, Building } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function AuthSetup() {
  const { setCredentials } = useAuthStore();
  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
    organizationId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentials(formData);
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <Shield className="w-12 h-12 text-indigo-600 mx-auto" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">API Credentials Setup</h2>
        <p className="mt-2 text-gray-600">Enter your Udemy Business API credentials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Key className="w-4 h-4 mr-2" />
            Client ID
          </label>
          <input
            type="text"
            value={formData.clientId}
            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Key className="w-4 h-4 mr-2" />
            Client Secret
          </label>
          <input
            type="password"
            value={formData.clientSecret}
            onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Building className="w-4 h-4 mr-2" />
            Organization ID
          </label>
          <input
            type="text"
            value={formData.organizationId}
            onChange={(e) => setFormData({ ...formData, organizationId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Save Credentials
        </button>
      </form>
    </div>
  );
}