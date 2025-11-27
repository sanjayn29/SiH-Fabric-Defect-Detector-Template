import { useEffect, useState } from 'react';
import { Activity, Cpu, Gauge } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { getLiveDefects, getMachineStatus, LiveDefect, MachineStatus } from '../services/api';

export default function LiveInspection() {
  const [defects, setDefects] = useState<LiveDefect[]>([]);
  const [machineStatus, setMachineStatus] = useState<MachineStatus | null>(null);

  useEffect(() => {
    getLiveDefects().then(setDefects);
    getMachineStatus().then(setMachineStatus);

    const interval = setInterval(() => {
      getLiveDefects().then(setDefects);
      getMachineStatus().then(setMachineStatus);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!machineStatus) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Live Inspection</h2>
        <p className="text-gray-600">Real-time fabric defect detection monitoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <Gauge className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Machine Speed</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{machineStatus.speed} <span className="text-xl text-gray-600">m/min</span></p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Model Active</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{machineStatus.model}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">Machine Status</h3>
          </div>
          <div className="mt-3">
            <StatusBadge status={machineStatus.status} size="lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Camera Feed</h3>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <img
              src="https://via.placeholder.com/1280x720/1e293b/64748b?text=Live+Camera+Feed"
              alt="Live feed"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <rect
                x="30%"
                y="35%"
                width="15%"
                height="12%"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
              />
              <text x="30%" y="33%" fill="#ef4444" fontSize="14" fontWeight="bold">
                Hole - 96%
              </text>

              <rect
                x="55%"
                y="50%"
                width="18%"
                height="15%"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
              />
              <text x="55%" y="48%" fill="#f97316" fontSize="14" fontWeight="bold">
                Stain - 89%
              </text>

              <rect
                x="18%"
                y="60%"
                width="12%"
                height="10%"
                fill="none"
                stroke="#eab308"
                strokeWidth="3"
              />
              <text x="18%" y="58%" fill="#eab308" fontSize="14" fontWeight="bold">
                Thread Break - 92%
              </text>
            </svg>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <p>Resolution: 1920x1080 @ 30fps</p>
            <p>Inspection Width: 1.8m</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Real-Time Defects</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {defects.map((defect) => (
              <div key={defect.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{defect.type}</p>
                    <p className="text-xs text-gray-500">{defect.id}</p>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    {(defect.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-600">Position</p>
                    <p className="font-semibold text-gray-900">{defect.position.toFixed(1)}m</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900">{defect.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
