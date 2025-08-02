import React from 'react'

interface Device {
  id: string
  name: string
  zone: string
  status: 'running' | 'maintenance' | 'warning' | 'offline'
}

interface DeviceSelectorProps {
  devices: Device[]
  selectedDevice: string
  onDeviceSelect: (deviceId: string) => void
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ devices, selectedDevice, onDeviceSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500'
      case 'maintenance': return 'bg-yellow-500'
      case 'warning': return 'bg-orange-500'
      case 'offline': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return '運行中'
      case 'maintenance': return '維護中'
      case 'warning': return '警告'
      case 'offline': return '離線'
      default: return '未知'
    }
  }

  const groupedDevices = devices.reduce((acc, device) => {
    if (!acc[device.zone]) {
      acc[device.zone] = []
    }
    acc[device.zone].push(device)
    return acc
  }, {} as Record<string, Device[]>)

  return (
    <div className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-white/10 sticky top-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
        設備監控列表
      </h3>
      
      <div className="space-y-4">
        {Object.entries(groupedDevices).map(([zone, zoneDevices]) => (
          <div key={zone} className="space-y-2">
            <div className="text-sm font-medium text-blue-300 border-b border-white/10 pb-1">
              {zone}
            </div>
            
            {zoneDevices.map((device) => (
              <button
                key={device.id}
                onClick={() => onDeviceSelect(device.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  selectedDevice === device.id
                    ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-sm">{device.name}</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{device.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    device.status === 'running' ? 'bg-green-500/20 text-green-300' :
                    device.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-300' :
                    device.status === 'warning' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {getStatusText(device.status)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* 統計信息 */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-green-500/10 rounded p-2 text-center">
            <div className="text-green-400 font-bold">{devices.filter(d => d.status === 'running').length}</div>
            <div className="text-gray-400">正常</div>
          </div>
          <div className="bg-yellow-500/10 rounded p-2 text-center">
            <div className="text-yellow-400 font-bold">{devices.filter(d => d.status === 'maintenance').length}</div>
            <div className="text-gray-400">維護</div>
          </div>
          <div className="bg-orange-500/10 rounded p-2 text-center">
            <div className="text-orange-400 font-bold">{devices.filter(d => d.status === 'warning').length}</div>
            <div className="text-gray-400">警告</div>
          </div>
          <div className="bg-red-500/10 rounded p-2 text-center">
            <div className="text-red-400 font-bold">{devices.filter(d => d.status === 'offline').length}</div>
            <div className="text-gray-400">離線</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceSelector