import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, Gauge, Droplet } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import StatusBadge from '../components/StatusBadge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  getDashboardMetrics,
  getDefectTrends,
  getDefectTypeDistribution,
  getCurrentBatchColor,
  MetricData,
  DefectTrend,
  DefectType,
  ColorCluster,
} from '../services/api';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [defectTrends, setDefectTrends] = useState<DefectTrend[]>([]);
  const [defectTypes, setDefectTypes] = useState<DefectType[]>([]);
  const [batchColor, setBatchColor] = useState<ColorCluster | null>(null);

  useEffect(() => {
    getDashboardMetrics().then(setMetrics);
    getDefectTrends().then(setDefectTrends);
    getDefectTypeDistribution().then(setDefectTypes);
    getCurrentBatchColor().then(setBatchColor);
  }, []);

  if (!metrics || !batchColor) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h2>
        <p className="text-gray-600">Real-time monitoring of fabric inspection system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Meters Inspected"
          value={metrics.totalMeters.toLocaleString()}
          unit="m"
          icon={Activity}
          color="bg-blue-500"
        />
        <MetricCard
          title="Total Defects Detected"
          value={metrics.totalDefects}
          icon={AlertTriangle}
          color="bg-orange-500"
        />
        <MetricCard
          title="Defect Rate"
          value={metrics.defectRate}
          unit="%"
          icon={Gauge}
          color="bg-red-500"
        />
        <MetricCard
          title="Avg ΔE Color Deviation"
          value={metrics.avgDeltaE}
          icon={Droplet}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Defect Trends (Last 7 Days)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={defectTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Defect Type Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={defectTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Batch Color Cluster</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Batch ID</p>
            <p className="text-lg font-semibold text-gray-900">{batchColor.batchId}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Standard Color</p>
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 rounded-lg shadow-md border border-gray-200"
                style={{ backgroundColor: batchColor.standardColor.hex }}
              />
              <div>
                <p className="text-xs text-gray-700">{batchColor.standardColor.hex}</p>
                <p className="text-xs text-gray-500">{batchColor.standardColor.lab}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Detected Color</p>
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 rounded-lg shadow-md border border-gray-200"
                style={{ backgroundColor: batchColor.detectedColor.hex }}
              />
              <div>
                <p className="text-xs text-gray-700">{batchColor.detectedColor.hex}</p>
                <p className="text-xs text-gray-500">{batchColor.detectedColor.lab}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">ΔE & Status</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{batchColor.deltaE}</p>
            <StatusBadge status={batchColor.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
