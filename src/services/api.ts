export interface MetricData {
  totalMeters: number;
  totalDefects: number;
  defectRate: number;
  avgDeltaE: number;
}

export interface DefectTrend {
  date: string;
  count: number;
}

export interface DefectType {
  type: string;
  count: number;
  percentage: number;
}

export interface ColorCluster {
  batchId: string;
  standardColor: { rgb: string; hex: string; lab: string };
  detectedColor: { rgb: string; hex: string; lab: string };
  deltaE: number;
  status: 'Pass' | 'Fail';
}

export interface LiveDefect {
  id: string;
  type: string;
  confidence: number;
  position: number;
  timestamp: string;
}

export interface MachineStatus {
  speed: number;
  model: string;
  status: 'Running' | 'Stopped';
}

export interface DefectImage {
  id: string;
  rollId: string;
  type: string;
  position: number;
  timestamp: string;
  imageUrl: string;
}

export interface FabricRoll {
  id: string;
  fabricType: string;
  standardColor: string;
  totalMeters: number;
  totalDefects: number;
  defectDensity: number;
  avgDeltaE: number;
  status: 'Accepted' | 'Rework' | 'Rejected';
  inspectionDate: string;
}

export interface RollDetail extends FabricRoll {
  defectsByType: DefectType[];
  deltaEHistory: { position: number; value: number }[];
}

export const getDashboardMetrics = (): Promise<MetricData> => {
  return Promise.resolve({
    totalMeters: 45820,
    totalDefects: 234,
    defectRate: 0.51,
    avgDeltaE: 1.8,
  });
};

export const getDefectTrends = (): Promise<DefectTrend[]> => {
  return Promise.resolve([
    { date: '2025-11-20', count: 28 },
    { date: '2025-11-21', count: 35 },
    { date: '2025-11-22', count: 30 },
    { date: '2025-11-23', count: 42 },
    { date: '2025-11-24', count: 38 },
    { date: '2025-11-25', count: 33 },
    { date: '2025-11-26', count: 28 },
  ]);
};

export const getDefectTypeDistribution = (): Promise<DefectType[]> => {
  return Promise.resolve([
    { type: 'Hole', count: 89, percentage: 38 },
    { type: 'Stain', count: 68, percentage: 29 },
    { type: 'Thread Break', count: 45, percentage: 19 },
    { type: 'Color Variation', count: 32, percentage: 14 },
  ]);
};

export const getCurrentBatchColor = (): Promise<ColorCluster> => {
  return Promise.resolve({
    batchId: 'BATCH-2025-1127-001',
    standardColor: {
      rgb: 'rgb(65, 105, 225)',
      hex: '#4169E1',
      lab: 'L*44.6 a*20.5 b*-63.2',
    },
    detectedColor: {
      rgb: 'rgb(68, 108, 228)',
      hex: '#446CE4',
      lab: 'L*45.2 a*21.1 b*-64.0',
    },
    deltaE: 1.3,
    status: 'Pass',
  });
};

export const getLiveDefects = (): Promise<LiveDefect[]> => {
  return Promise.resolve([
    {
      id: 'D001',
      type: 'Hole',
      confidence: 0.96,
      position: 1245.6,
      timestamp: '14:23:45',
    },
    {
      id: 'D002',
      type: 'Stain',
      confidence: 0.89,
      position: 1247.2,
      timestamp: '14:24:12',
    },
    {
      id: 'D003',
      type: 'Thread Break',
      confidence: 0.92,
      position: 1248.8,
      timestamp: '14:24:38',
    },
  ]);
};

export const getMachineStatus = (): Promise<MachineStatus> => {
  return Promise.resolve({
    speed: 45.5,
    model: 'MobileNetV3',
    status: 'Running',
  });
};

export const getBatchColorClusters = (): Promise<ColorCluster[]> => {
  return Promise.resolve([
    {
      batchId: 'BATCH-2025-1127-001',
      standardColor: {
        rgb: 'rgb(65, 105, 225)',
        hex: '#4169E1',
        lab: 'L*44.6 a*20.5 b*-63.2',
      },
      detectedColor: {
        rgb: 'rgb(68, 108, 228)',
        hex: '#446CE4',
        lab: 'L*45.2 a*21.1 b*-64.0',
      },
      deltaE: 1.3,
      status: 'Pass',
    },
    {
      batchId: 'BATCH-2025-1126-004',
      standardColor: {
        rgb: 'rgb(220, 20, 60)',
        hex: '#DC143C',
        lab: 'L*47.5 a*68.3 b*41.2',
      },
      detectedColor: {
        rgb: 'rgb(225, 25, 65)',
        hex: '#E11941',
        lab: 'L*48.8 a*70.1 b*42.8',
      },
      deltaE: 2.8,
      status: 'Pass',
    },
    {
      batchId: 'BATCH-2025-1126-003',
      standardColor: {
        rgb: 'rgb(34, 139, 34)',
        hex: '#228B22',
        lab: 'L*46.2 a*-51.7 b*49.9',
      },
      detectedColor: {
        rgb: 'rgb(40, 145, 38)',
        hex: '#289126',
        lab: 'L*48.5 a*-53.2 b*51.3',
      },
      deltaE: 3.2,
      status: 'Fail',
    },
  ]);
};

export const getDeltaEHistory = (): Promise<{ time: string; value: number }[]> => {
  return Promise.resolve([
    { time: '10:00', value: 1.2 },
    { time: '10:30', value: 1.5 },
    { time: '11:00', value: 1.3 },
    { time: '11:30', value: 1.8 },
    { time: '12:00', value: 1.6 },
    { time: '12:30', value: 1.4 },
    { time: '13:00', value: 1.7 },
    { time: '13:30', value: 1.5 },
    { time: '14:00', value: 1.9 },
  ]);
};

export const getDefectGallery = (): Promise<DefectImage[]> => {
  const defectTypes = ['Hole', 'Stain', 'Thread Break', 'Color Variation'];
  return Promise.resolve(
    Array.from({ length: 24 }, (_, i) => ({
      id: `IMG${String(i + 1).padStart(3, '0')}`,
      rollId: `ROLL-${Math.floor(Math.random() * 100 + 1)}`,
      type: defectTypes[Math.floor(Math.random() * defectTypes.length)],
      position: Math.random() * 2000,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      imageUrl: `https://via.placeholder.com/400x300/334155/f1f5f9?text=Defect+${i + 1}`,
    }))
  );
};

export const getFabricRolls = (): Promise<FabricRoll[]> => {
  return Promise.resolve([
    {
      id: 'ROLL-001',
      fabricType: 'Cotton Twill',
      standardColor: 'Royal Blue #4169E1',
      totalMeters: 2450,
      totalDefects: 12,
      defectDensity: 0.49,
      avgDeltaE: 1.3,
      status: 'Accepted',
      inspectionDate: '2025-11-27',
    },
    {
      id: 'ROLL-002',
      fabricType: 'Polyester Satin',
      standardColor: 'Crimson Red #DC143C',
      totalMeters: 1890,
      totalDefects: 8,
      defectDensity: 0.42,
      avgDeltaE: 2.1,
      status: 'Accepted',
      inspectionDate: '2025-11-27',
    },
    {
      id: 'ROLL-003',
      fabricType: 'Silk Chiffon',
      standardColor: 'Forest Green #228B22',
      totalMeters: 1650,
      totalDefects: 18,
      defectDensity: 1.09,
      avgDeltaE: 3.5,
      status: 'Rework',
      inspectionDate: '2025-11-26',
    },
    {
      id: 'ROLL-004',
      fabricType: 'Linen Plain',
      standardColor: 'Navy Blue #000080',
      totalMeters: 2100,
      totalDefects: 6,
      defectDensity: 0.29,
      avgDeltaE: 1.8,
      status: 'Accepted',
      inspectionDate: '2025-11-26',
    },
    {
      id: 'ROLL-005',
      fabricType: 'Cotton Jersey',
      standardColor: 'Charcoal #36454F',
      totalMeters: 3200,
      totalDefects: 42,
      defectDensity: 1.31,
      avgDeltaE: 4.2,
      status: 'Rejected',
      inspectionDate: '2025-11-25',
    },
  ]);
};

export const getRollDetail = (rollId: string): Promise<RollDetail> => {
  return Promise.resolve({
    id: rollId,
    fabricType: 'Cotton Twill',
    standardColor: 'Royal Blue #4169E1',
    totalMeters: 2450,
    totalDefects: 12,
    defectDensity: 0.49,
    avgDeltaE: 1.3,
    status: 'Accepted',
    inspectionDate: '2025-11-27',
    defectsByType: [
      { type: 'Hole', count: 5, percentage: 42 },
      { type: 'Stain', count: 4, percentage: 33 },
      { type: 'Thread Break', count: 3, percentage: 25 },
    ],
    deltaEHistory: [
      { position: 0, value: 1.2 },
      { position: 500, value: 1.4 },
      { position: 1000, value: 1.1 },
      { position: 1500, value: 1.5 },
      { position: 2000, value: 1.3 },
      { position: 2450, value: 1.2 },
    ],
  });
};
