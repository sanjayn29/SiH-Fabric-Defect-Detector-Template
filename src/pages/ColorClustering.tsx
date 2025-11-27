import { useEffect, useState } from 'react';
import ChartCard from '../components/ChartCard';
import StatusBadge from '../components/StatusBadge';
import DataTable from '../components/DataTable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getBatchColorClusters, getDeltaEHistory, ColorCluster } from '../services/api';

export default function ColorClustering() {
  const [colorClusters, setColorClusters] = useState<ColorCluster[]>([]);
  const [deltaEHistory, setDeltaEHistory] = useState<{ time: string; value: number }[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<ColorCluster | null>(null);

  useEffect(() => {
    getBatchColorClusters().then((data) => {
      setColorClusters(data);
      if (data.length > 0) setSelectedBatch(data[0]);
    });
    getDeltaEHistory().then(setDeltaEHistory);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Color Clustering Analysis</h2>
        <p className="text-gray-600">Monitor and analyze color consistency across batches</p>
      </div>

      {selectedBatch && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Selected Batch Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Batch ID</p>
              <p className="text-lg font-semibold text-gray-900">{selectedBatch.batchId}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">Standard Color</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-lg shadow-md border border-gray-200"
                  style={{ backgroundColor: selectedBatch.standardColor.hex }}
                />
                <div>
                  <p className="text-xs font-semibold text-gray-900">{selectedBatch.standardColor.hex}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{selectedBatch.standardColor.rgb}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedBatch.standardColor.lab}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">Detected Color</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-lg shadow-md border border-gray-200"
                  style={{ backgroundColor: selectedBatch.detectedColor.hex }}
                />
                <div>
                  <p className="text-xs font-semibold text-gray-900">{selectedBatch.detectedColor.hex}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{selectedBatch.detectedColor.rgb}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedBatch.detectedColor.lab}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">ΔE Calculation</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{selectedBatch.deltaE}</p>
              <StatusBadge status={selectedBatch.status} />
              <p className="text-xs text-gray-500 mt-2">Threshold: ΔE &lt; 3.0</p>
            </div>
          </div>
        </div>
      )}

      <ChartCard title="ΔE Color Deviation Over Time">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={deltaEHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="ΔE" />
            <line y1={0} y2={300} x1="0%" x2="100%" stroke="#ef4444" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">Red dashed line indicates ΔE threshold (3.0)</p>
      </ChartCard>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Batch Color Clusters</h3>
        <DataTable
          columns={[
            { key: 'batchId', label: 'Batch ID' },
            {
              key: 'standardColor',
              label: 'Standard Color',
              render: (value) => {
                const color = value as ColorCluster['standardColor'];
                return (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs">{color.hex}</span>
                  </div>
                );
              },
            },
            {
              key: 'detectedColor',
              label: 'Detected Color',
              render: (value) => {
                const color = value as ColorCluster['detectedColor'];
                return (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs">{color.hex}</span>
                  </div>
                );
              },
            },
            {
              key: 'deltaE',
              label: 'ΔE Value',
              render: (value) => <span className="font-semibold">{value}</span>,
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value as 'Pass' | 'Fail'} />,
            },
          ]}
          data={colorClusters}
          onRowClick={setSelectedBatch}
        />
      </div>
    </div>
  );
}
