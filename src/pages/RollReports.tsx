import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ChartCard from '../components/ChartCard';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getFabricRolls, getRollDetail, FabricRoll, RollDetail } from '../services/api';

export default function RollReports() {
  const [rolls, setRolls] = useState<FabricRoll[]>([]);
  const [filteredRolls, setFilteredRolls] = useState<FabricRoll[]>([]);
  const [selectedRoll, setSelectedRoll] = useState<RollDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    getFabricRolls().then((data) => {
      setRolls(data);
      setFilteredRolls(data);
    });
  }, []);

  useEffect(() => {
    let filtered = rolls;

    if (searchTerm) {
      filtered = filtered.filter(
        (roll) =>
          roll.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          roll.fabricType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((roll) => roll.status === statusFilter);
    }

    setFilteredRolls(filtered);
  }, [searchTerm, statusFilter, rolls]);

  const handleRollClick = (roll: FabricRoll) => {
    getRollDetail(roll.id).then(setSelectedRoll);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Roll Reports</h2>
        <p className="text-gray-600">Comprehensive inspection reports for fabric rolls</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Roll ID or Fabric Type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Accepted', 'Rework', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DataTable
          columns={[
            { key: 'id', label: 'Roll ID' },
            { key: 'fabricType', label: 'Fabric Type' },
            { key: 'standardColor', label: 'Standard Color' },
            {
              key: 'totalMeters',
              label: 'Total Meters',
              render: (value) => `${value} m`,
            },
            {
              key: 'totalDefects',
              label: 'Total Defects',
              render: (value) => <span className="font-semibold">{value}</span>,
            },
            {
              key: 'defectDensity',
              label: 'Defect Density',
              render: (value) => `${value}/100m`,
            },
            {
              key: 'avgDeltaE',
              label: 'Avg ΔE',
              render: (value) => <span className="font-semibold">{value}</span>,
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value as 'Accepted' | 'Rework' | 'Rejected'} />,
            },
            { key: 'inspectionDate', label: 'Inspection Date' },
          ]}
          data={filteredRolls}
          onRowClick={handleRollClick}
        />
      </div>

      {selectedRoll && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRoll(null)}
        >
          <div
            className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedRoll.id} - Detailed Report</h3>
                <p className="text-gray-600 mt-1">{selectedRoll.fabricType}</p>
              </div>
              <button
                onClick={() => setSelectedRoll(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Meters</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRoll.totalMeters} m</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Defects</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRoll.totalDefects}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Defect Density</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedRoll.defectDensity}/100m</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
                  <StatusBadge status={selectedRoll.status} size="lg" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Defects by Type">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={selectedRoll.defectsByType}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="ΔE Throughout Roll Length">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={selectedRoll.deltaEHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="position" tick={{ fontSize: 12 }} label={{ value: 'Position (m)', position: 'insideBottom', offset: -5 }} />
                      <YAxis domain={[0, 4]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="ΔE" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Standard Color</p>
                    <p className="font-semibold text-gray-900">{selectedRoll.standardColor}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Average ΔE</p>
                    <p className="font-semibold text-gray-900">{selectedRoll.avgDeltaE}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Inspection Date</p>
                    <p className="font-semibold text-gray-900">{selectedRoll.inspectionDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Quality Status</p>
                    <p className="font-semibold text-gray-900">{selectedRoll.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
