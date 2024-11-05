import React, { useState } from 'react';
import { PlayCircle, AlertCircle, CheckCircle, XCircle, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface ApiResponse {
  status: 'success' | 'error';
  data?: any;
  error?: string;
}

const API_ENDPOINTS = [
  { 
    id: 'courses', 
    name: 'List Courses', 
    baseUrl: '/udemy-api',
    path: '/organizations/{account_id}/courses/list/',
    description: 'Retrieve all courses in your organization'
  },
  { 
    id: 'learning-paths', 
    name: 'Learning Paths', 
    baseUrl: '/udemy-api',
    path: '/',
    description: 'Access learning paths information'
  },
  { 
    id: 'reporting', 
    name: 'User Activity Report', 
    baseUrl: '/udemy-api',
    path: '/organizations/{account_id}/analytics/user-activity/',
    description: 'Get user activity analytics and reports'
  },
];

export function ApiTest() {
  const { credentials, setCredentials } = useAuthStore();
  const [selectedEndpoint, setSelectedEndpoint] = useState('courses');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCredentials, setEditedCredentials] = useState(credentials);

  const selectedEndpointData = API_ENDPOINTS.find(e => e.id === selectedEndpoint);

  const getAuthHeader = (clientId: string, clientSecret: string): string => {
    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = btoa(credentials);
    return `Basic ${encodedCredentials}`;
  };

  const handleCredentialsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedCredentials) {
      setCredentials(editedCredentials);
      setIsEditing(false);
    }
  };

  const testApi = async () => {
    if (!credentials || !selectedEndpointData) return;

    setLoading(true);
    setResponse(null);

    try {
      const path = selectedEndpointData.path.replace('{account_id}', credentials.accountId);
      const url = `${selectedEndpointData.baseUrl}${path}`;

      const authHeader = getAuthHeader(credentials.clientId, credentials.clientSecret);

      const response = await fetch(url, {
        headers: {
          'Authorization': authHeader,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'API request failed');
      }

      setResponse({
        status: 'success',
        data,
      });
    } catch (error) {
      setResponse({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderEndpointUrl = () => {
    if (!selectedEndpointData) return null;
    const path = selectedEndpointData.path.replace(
      '{account_id}', 
      credentials?.accountId || '{account_id}'
    );
    return `${selectedEndpointData.baseUrl}${path}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <PlayCircle className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">API Test Console</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
        >
          <Settings className="w-4 h-4 mr-1" />
          {isEditing ? 'Cancel Editing' : 'Edit Credentials'}
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">API Configuration</h3>
        <div className="bg-gray-50 rounded-md p-4 space-y-3">
          {isEditing ? (
            <form onSubmit={handleCredentialsUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                <input
                  type="text"
                  value={editedCredentials?.clientId || ''}
                  onChange={(e) => setEditedCredentials(prev => prev ? {...prev, clientId: e.target.value} : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                <input
                  type="password"
                  value={editedCredentials?.clientSecret || ''}
                  onChange={(e) => setEditedCredentials(prev => prev ? {...prev, clientSecret: e.target.value} : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization ID</label>
                <input
                  type="text"
                  value={editedCredentials?.organizationId || ''}
                  onChange={(e) => setEditedCredentials(prev => prev ? {...prev, organizationId: e.target.value} : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
                <input
                  type="text"
                  value={editedCredentials?.accountId || ''}
                  onChange={(e) => setEditedCredentials(prev => prev ? {...prev, accountId: e.target.value} : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., 268770"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Update Credentials
              </button>
            </form>
          ) : (
            <>
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">Client ID:</span>
                <span className="text-gray-600">{credentials?.clientId}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">Organization ID:</span>
                <span className="text-gray-600">{credentials?.organizationId}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium mr-2">Account ID:</span>
                <span className="text-gray-600">{credentials?.accountId}</span>
              </div>
              {credentials && (
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-2">Auth Header:</span>
                  <span className="text-gray-600 font-mono text-xs">
                    {getAuthHeader(credentials.clientId, credentials.clientSecret)}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Available Endpoints</label>
        <select
          value={selectedEndpoint}
          onChange={(e) => setSelectedEndpoint(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {API_ENDPOINTS.map((endpoint) => (
            <option key={endpoint.id} value={endpoint.id}>
              {endpoint.name}
            </option>
          ))}
        </select>
        {selectedEndpointData && (
          <>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Full URL: </span>
              <span className="font-mono">{renderEndpointUrl()}</span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {selectedEndpointData.description}
            </div>
          </>
        )}
      </div>

      <button
        onClick={testApi}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>

      {response && (
        <div className="mt-6">
          <div className={`rounded-md p-4 ${
            response.status === 'success' ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <div className="flex items-center mb-2">
              {response.status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
              )}
              <span className={`font-medium ${
                response.status === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {response.status === 'success' ? 'Success' : 'Error'}
              </span>
            </div>
            <pre className="mt-2 text-sm whitespace-pre-wrap overflow-auto max-h-96">
              {JSON.stringify(response.data || response.error, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-amber-50 rounded-md">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Important Notes:</p>
            <ul className="mt-1 list-disc list-inside">
              <li>Ensure your API credentials have the necessary permissions</li>
              <li>Rate limits may apply to API requests</li>
              <li>Some endpoints may require additional scopes or permissions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}