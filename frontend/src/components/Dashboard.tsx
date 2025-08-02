import React from 'react'
import SensorCards from './SensorCards'
import AIModelsPanel from './AIModelsPanel'
import InsightsPanel from './InsightsPanel'
import DeviceSelector from './DeviceSelector'
import Footer from './Footer'

interface DashboardProps {
  sensorData: any
  aiModels: any[]
  insights: any[]
  selectedDevice?: string
  onDeviceSelect?: (deviceId: string) => void
}

const Dashboard: React.FC<DashboardProps> = ({ 
  sensorData, 
  aiModels, 
  insights, 
  selectedDevice = 'OVEN-001',
  onDeviceSelect = () => {}
}) => {
  
  // 模擬10台設備數據
  const devices = [
    { id: 'OVEN-001', name: '烘箱設備 #001', zone: 'A區產線', status: 'running' as const },
    { id: 'OVEN-002', name: '烘箱設備 #002', zone: 'A區產線', status: 'running' as const },
    { id: 'OVEN-003', name: '烘箱設備 #003', zone: 'B區產線', status: 'maintenance' as const },
    { id: 'OVEN-004', name: '烘箱設備 #004', zone: 'B區產線', status: 'running' as const },
    { id: 'OVEN-005', name: '烘箱設備 #005', zone: 'C區產線', status: 'running' as const },
    { id: 'OVEN-006', name: '烘箱設備 #006', zone: 'C區產線', status: 'warning' as const },
    { id: 'OVEN-007', name: '烘箱設備 #007', zone: 'D區產線', status: 'running' as const },
    { id: 'OVEN-008', name: '烘箱設備 #008', zone: 'D區產線', status: 'running' as const },
    { id: 'OVEN-009', name: '烘箱設備 #009', zone: 'E區產線', status: 'offline' as const },
    { id: 'OVEN-010', name: '烘箱設備 #010', zone: 'E區產線', status: 'running' as const }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">智慧製造監控中心</h1>
                <p className="text-blue-300 text-sm">Intelligent Manufacturing Control Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <div className="text-white font-medium">系統狀態：正常運行</div>
                <div className="text-green-400">連線設備：{devices.filter(d => d.status !== 'offline').length}/10</div>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* 左側設備選擇器 */}
          <div className="col-span-12 lg:col-span-3">
            <DeviceSelector 
              devices={devices}
              selectedDevice={selectedDevice}
              onDeviceSelect={onDeviceSelect}
            />
          </div>

          {/* 主要監控區域 */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {/* 當前選中設備信息 */}
            <div className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {devices.find(d => d.id === selectedDevice)?.name}
                  </h2>
                  <p className="text-blue-300">
                    {devices.find(d => d.id === selectedDevice)?.zone} | 設備ID: {selectedDevice}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-300">最後更新</div>
                  <div className="text-white font-mono">{new Date().toLocaleTimeString()}</div>
                </div>
              </div>
            </div>

            <SensorCards sensorData={sensorData} deviceId={selectedDevice} />
            <AIModelsPanel aiModels={aiModels} />
            <InsightsPanel insights={insights} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Dashboard