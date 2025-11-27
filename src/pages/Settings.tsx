import { useState } from 'react';
import { Save, User, Trash2 } from 'lucide-react';

export default function Settings() {
  const [defectThreshold, setDefectThreshold] = useState(0.85);
  const [deltaEThreshold, setDeltaEThreshold] = useState(3.0);
  const [machineSpeed, setMachineSpeed] = useState(45);
  const [inspectionWidth, setInspectionWidth] = useState(1.8);
  const [activeModel, setActiveModel] = useState('MobileNetV3');

  const handleSave = (section: string) => {
    alert(`${section} settings saved successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Settings & Administration</h2>
        <p className="text-gray-600">Configure system parameters and manage users</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Defect Detection Parameters</h3>
          <button
            onClick={() => handleSave('Defect Detection')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confidence Threshold
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={defectThreshold}
                onChange={(e) => setDefectThreshold(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-semibold text-gray-900 w-16">{defectThreshold.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum confidence score for defect detection (0.50 - 1.00)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Active Detection Model
            </label>
            <select
              value={activeModel}
              onChange={(e) => setActiveModel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="MobileNetV3">MobileNetV3</option>
              <option value="EfficientNetB0">EfficientNetB0</option>
              <option value="ShuffleNetV2">ShuffleNetV2</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select the neural network model for defect detection
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Color Quality Parameters</h3>
          <button
            onClick={() => handleSave('Color Quality')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ΔE Threshold (Pass/Fail)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={deltaEThreshold}
                onChange={(e) => setDeltaEThreshold(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-semibold text-gray-900 w-16">{deltaEThreshold.toFixed(1)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum acceptable color deviation (1.0 - 5.0)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Measurement Frequency
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Every 10 meters</option>
              <option>Every 20 meters</option>
              <option>Every 50 meters</option>
              <option>Continuous</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              How often to perform color measurements
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Machine Parameters</h3>
          <button
            onClick={() => handleSave('Machine')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Machine Speed (m/min)
            </label>
            <input
              type="number"
              value={machineSpeed}
              onChange={(e) => setMachineSpeed(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Fabric inspection speed in meters per minute
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inspection Width (m)
            </label>
            <input
              type="number"
              step="0.1"
              value={inspectionWidth}
              onChange={(e) => setInspectionWidth(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum fabric width for inspection
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <User className="w-4 h-4" />
            Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  username: 'admin',
                  role: 'Administrator',
                  email: 'admin@fabspector.com',
                  lastLogin: '2025-11-27 14:30',
                },
                {
                  username: 'operator1',
                  role: 'Operator',
                  email: 'operator1@fabspector.com',
                  lastLogin: '2025-11-27 09:15',
                },
                {
                  username: 'qc_inspector',
                  role: 'Quality Control',
                  email: 'qc@fabspector.com',
                  lastLogin: '2025-11-26 16:45',
                },
              ].map((user) => (
                <tr key={user.username} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-800 inline-flex items-center gap-1">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
