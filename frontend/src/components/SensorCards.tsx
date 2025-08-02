import React from 'react'

interface SensorCardsProps {
  sensorData: {
    temperature: number
    humidity: number
    power: number
    efficiency: number
    anomaly_count: number
    anomaly_score: number
  } | null
  deviceId?: string
}

const SensorCards: React.FC<SensorCardsProps> = ({ sensorData, deviceId }) => {
  if (!sensorData) return null

  const cards = [
    {
      icon: '🌡️',
      value: sensorData.temperature.toFixed(1),
      label: '溫度',
      unit: '°C',
      status: sensorData.temperature > 200 ? 'critical' : sensorData.temperature > 190 ? 'warning' : 'normal',
      trend: '+2.3'
    },
    {
      icon: '💧', 
      value: sensorData.humidity.toFixed(1),
      label: '濕度',
      unit: '%',
      status: sensorData.humidity < 30 || sensorData.humidity > 70 ? 'warning' : 'normal',
      trend: '-0.8'
    },
    {
      icon: '⚡',
      value: (sensorData.power / 1000).toFixed(1),
      label: '功耗',
      unit: 'kW',
      status: sensorData.power > 2500 ? 'warning' : 'normal',
      trend: '+5.2'
    },
    {
      icon: '📊',
      value: sensorData.efficiency.toFixed(1),
      label: '效率',
      unit: '%',
      status: sensorData.efficiency < 80 ? 'warning' : 'normal',
      trend: '+1.1'
    },
    {
      icon: '🔮',
      value: ((1 - sensorData.anomaly_score) * 100).toFixed(1),
      label: 'AI準確度',
      unit: '%',
      status: 'normal',
      trend: '+0.5'
    },
    {
      icon: '🚨',
      value: sensorData.anomaly_count,
      label: '異常計數',
      unit: '次',
      status: sensorData.anomaly_count > 5 ? 'critical' : sensorData.anomaly_count > 2 ? 'warning' : 'normal',
      trend: '+2'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl opacity-80">{card.icon}</div>
            <div className={`w-2 h-2 rounded-full ${getStatusColor(card.status)} animate-pulse`}></div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-white">{card.value}</span>
              <span className="text-sm text-gray-400">{card.unit}</span>
            </div>
            
            <div className="text-xs text-gray-300 mb-2">{card.label}</div>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${
                card.trend.startsWith('+') ? 'bg-green-500/20 text-green-300' : 
                'bg-red-500/20 text-red-300'
              }`}>
                {card.trend}
              </span>
              <span className="text-xs text-gray-500 font-mono">{deviceId}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SensorCards