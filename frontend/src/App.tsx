import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://172.30.96.216:8000'
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.VITE_API_URL === 'demo'

// Mock data for demo mode - realistic mathematical variations like backend
const getDeviceMockData = (deviceId: string) => {
  const now = new Date().getTime() / 1000 // timestamp in seconds
  
  const baseData = {
    'OVEN-001': { tempBase: 185, humBase: 42, powerBase: 2300, effBase: 87.2 },
    'OVEN-002': { tempBase: 188, humBase: 44, powerBase: 2400, effBase: 89.5 },
    'OVEN-003': { tempBase: 210, humBase: 55, powerBase: 2800, effBase: 72.0 }, // maintenance
    'OVEN-004': { tempBase: 186, humBase: 43, powerBase: 2350, effBase: 88.1 },
    'OVEN-005': { tempBase: 184, humBase: 41, powerBase: 2250, effBase: 90.3 },
    'OVEN-006': { tempBase: 195, humBase: 48, powerBase: 2650, effBase: 79.5 }, // warning
    'OVEN-007': { tempBase: 183, humBase: 40, powerBase: 2200, effBase: 92.8 },
    'OVEN-008': { tempBase: 189, humBase: 45, powerBase: 2420, effBase: 87.6 },
    'OVEN-009': { tempBase: 0, humBase: 0, powerBase: 0, effBase: 0 }, // offline
    'OVEN-010': { tempBase: 187, humBase: 43, powerBase: 2380, effBase: 89.2 }
  }
  
  const device = baseData[deviceId as keyof typeof baseData] || baseData['OVEN-001']
  
  // Realistic mathematical variations using sine waves (like backend)
  const tempVariation = Math.sin(now / 1000) * 15 + Math.random() * 10 - 5
  const humVariation = Math.sin(now / 800) * 8 + Math.random() * 6 - 3
  const powerVariation = Math.sin(now / 1200) * 300 + Math.random() * 200 - 100
  const effVariation = Math.random() * 4 - 2
  
  return {
    timestamp: new Date().toISOString(),
    temperature: Math.round((device.tempBase + tempVariation) * 10) / 10,
    humidity: Math.round((device.humBase + humVariation) * 10) / 10,
    power: Math.round(device.powerBase + powerVariation),
    efficiency: Math.round((device.effBase + effVariation) * 10) / 10,
    anomaly_score: deviceId === 'OVEN-003' ? 0.85 + Math.random() * 0.1 : 
                   deviceId === 'OVEN-006' ? 0.6 + Math.random() * 0.1 : 
                   Math.round(Math.random() * 100) / 1000,
    anomaly_count: deviceId === 'OVEN-003' ? 144 + Math.floor(Math.random() * 10) : 
                   deviceId === 'OVEN-006' ? 89 + Math.floor(Math.random() * 8) : 
                   12 + Math.floor(Math.random() * 15)
  }
}

const getMockAiModels = (selectedDevice: string) => {
  // 取得設備狀態
  const deviceStatus = {
    'OVEN-003': 'maintenance',
    'OVEN-006': 'warning',
    'OVEN-009': 'offline'
  }[selectedDevice] || 'running'
  
  // 根據設備狀態調整 AI 模型表現
  let statusMultiplier = 1
  let modelStatus = "running"
  
  if (deviceStatus === 'offline') {
    statusMultiplier = 0 // 離線時準確度為 0
    modelStatus = "offline"
  } else if (deviceStatus === 'maintenance') {
    statusMultiplier = 0.3 // 維護時準確度降低
    modelStatus = "training"
  } else if (deviceStatus === 'warning') {
    statusMultiplier = 0.7 // 警告時準確度降低
    modelStatus = "running"
  }
  
  return [
    {
      name: "溫度異常檢測",
      type: "LSTM-AutoEncoder",
      status: modelStatus,
      accuracy: deviceStatus === 'offline' ? 0 : Math.round((92.5 * statusMultiplier + Math.random() * 2) * 10) / 10,
      confidence: deviceStatus === 'offline' ? 0 : Math.round((0.87 * statusMultiplier + Math.random() * 0.1) * 100) / 100,
      last_updated: new Date().toISOString()
    },
    {
      name: "濕度趨勢預測",
      type: "Prophet + LSTM",
      status: modelStatus,
      accuracy: deviceStatus === 'offline' ? 0 : Math.round((89.3 * statusMultiplier + Math.random() * 2) * 10) / 10,
      confidence: deviceStatus === 'offline' ? 0 : Math.round((0.85 * statusMultiplier + Math.random() * 0.1) * 100) / 100,
      last_updated: new Date().toISOString()
    },
    {
      name: "功耗優化",
      type: "Multi-objective Optimization",
      status: modelStatus,
      accuracy: deviceStatus === 'offline' ? 0 : Math.round((94.7 * statusMultiplier + Math.random() * 1.5) * 10) / 10,
      confidence: deviceStatus === 'offline' ? 0 : Math.round((0.90 * statusMultiplier + Math.random() * 0.08) * 100) / 100,
      last_updated: new Date().toISOString()
    },
    {
      name: "維護預測",
      type: "Random Forest + Survival Analysis",
      status: deviceStatus === 'maintenance' ? "training" : modelStatus,
      accuracy: deviceStatus === 'offline' ? 0 : Math.round((91.2 * statusMultiplier + Math.random() * 2) * 10) / 10,
      confidence: deviceStatus === 'offline' ? 0 : Math.round((0.87 * statusMultiplier + Math.random() * 0.1) * 100) / 100,
      last_updated: new Date().toISOString()
    }
  ]
}

const getMockInsights = (selectedDevice: string) => {
  // 取得設備狀態
  const deviceStatus = {
    'OVEN-003': 'maintenance',
    'OVEN-006': 'warning', 
    'OVEN-009': 'offline'
  }[selectedDevice] || 'running'
  
  // 根據設備狀態產生對應的洞察
  if (deviceStatus === 'offline') {
    return [
      {
        type: "異常預測",
        icon: "🔮",
        level: "設備離線",
        description: `設備 ${selectedDevice} 已離線，無法進行異常預測分析，請檢查網路連接和電源狀態`
      },
      {
        type: "效率優化",
        icon: "⚡",
        level: "無法分析", 
        description: "設備離線狀態下無法進行效率分析，恢復在線後將提供節能優化建議"
      },
      {
        type: "維護建議",
        icon: "🔧",
        level: "緊急",
        description: `設備 ${selectedDevice} 離線，需立即檢查電源連接、網路通訊和主控板狀態`
      },
      {
        type: "品質預測",
        icon: "🎯", 
        level: "無法預測",
        description: "設備離線期間無法進行品質預測，建議恢復在線後重新評估"
      },
      {
        type: "能耗分析",
        icon: "📊",
        level: "設備停機",
        description: "設備離線期間功耗為零，但停機損失需評估，建議儘快恢復運行"
      },
      {
        type: "趨勢分析",
        icon: "📈",
        level: "數據中斷",
        description: "設備離線導致趨勢分析中斷，歷史數據顯示該設備穩定性需要關注"
      }
    ]
  }
  
  if (deviceStatus === 'maintenance') {
    return [
      {
        type: "異常預測",
        icon: "🔮",
        level: "維護模式",
        description: `設備 ${selectedDevice} 正在維護中，檢測到溫控系統異常，維護完成後將恢復正常監控`
      },
      {
        type: "效率優化",
        icon: "⚡",
        level: "暫停分析",
        description: "維護期間效率分析暫停，預計維修後效率提升8%"
      },
      {
        type: "維護建議", 
        icon: "🔧",
        level: "進行中",
        description: "正在執行溫度感測器校正、加熱元件檢查、控制系統更新"
      },
      {
        type: "品質預測",
        icon: "🎯",
        level: "維護中",
        description: "維護期間暫停生產，預計維護完成後品質提升至98%"
      },
      {
        type: "能耗分析",
        icon: "📊",
        level: "維護週期",
        description: "維護期間能耗分析暫停，維護完成後將恢復正常監控"
      },
      {
        type: "趨勢分析",
        icon: "📈", 
        level: "維護週期",
        description: "設備進入預定維護週期，根據運行趨勢此次維護將有效提升設備可靠性"
      }
    ]
  }
  
  if (deviceStatus === 'warning') {
    return [
      {
        type: "異常預測",
        icon: "🔮",
        level: "高風險",
        description: `設備 ${selectedDevice} 溫度波動異常，未來2小時內可能超過200°C，建議立即檢查冷卻系統`
      },
      {
        type: "效率優化",
        icon: "⚡",
        level: "效率下降：22% ↓",
        description: "當前效率僅79.8%，建議檢查加熱元件和控溫系統，修復後可提升15%效率"
      },
      {
        type: "維護建議",
        icon: "🔧",
        level: "高優先級",
        description: "檢測到多項參數異常，建議24小時內進行全面檢修，包括溫控、安全閥和排氣系統"
      },
      {
        type: "品質預測",
        icon: "🎯",
        level: "品質風險：中等",
        description: "溫控不穩定可能影響產品一致性，建議降低產能並優先處理設備問題"
      },
      {
        type: "能耗分析",
        icon: "📊",
        level: "能耗異常",
        description: "功耗比正常高18%，主要因溫控系統頻繁調節，修復後可恢復正常能耗"
      },
      {
        type: "趨勢分析",
        icon: "📈",
        level: "下降趨勢",
        description: "近7天效率呈下降趨勢，從89%降至79.8%，建議立即介入處理"
      }
    ]
  }
  
  // 正常運行設備的洞察
  return [
    {
      type: "異常預測",
      icon: "🔮", 
      level: "低風險",
      description: `設備 ${selectedDevice} 運行穩定，未來6小時內預測無異常風險，可正常使用`
    },
    {
      type: "效率優化",
      icon: "⚡",
      level: `節能建議：${(Math.random() * 8 + 8).toFixed(1)}% ↓`,
      description: `調整功率至${Math.round(2000 + Math.random() * 300)}W可節省電力，同時維持最佳烘烤效果`
    },
    {
      type: "維護建議",
      icon: "🔧",
      level: "預防性",
      description: `感測器精度下降${(Math.random() * 3 + 1).toFixed(1)}%，建議${Math.ceil(Math.random() * 7 + 10)}天內進行校正維護`
    },
    {
      type: "品質預測",
      icon: "🎯",
      level: `合格率：${(Math.random() * 3 + 96.5).toFixed(1)}%`,
      description: "當前參數配置下，預測產品品質將維持在高標準水平"
    },
    {
      type: "能耗分析",
      icon: "📊",
      level: "優化中",
      description: `整體能效提升${(Math.random() * 6 + 3).toFixed(1)}%，建議持續監控關鍵指標變化`
    },
    {
      type: "趨勢分析",
      icon: "📈",
      level: "穩定上升",
      description: `過去30天運行效率穩定提升，平均效率達${(88 + Math.random() * 4).toFixed(1)}%，維持良好運行狀態`
    }
  ]
}

function App() {
  const [sensorData, setSensorData] = useState<any>(null)
  const [aiModels, setAiModels] = useState<any[]>([])
  const [insights, setInsights] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState('OVEN-001')

  useEffect(() => {
    const fetchData = async () => {
      if (isDemoMode) {
        // Demo mode: use mock data with slight variations based on selected device
        setTimeout(() => {
          const deviceData = getDeviceMockData(selectedDevice)
          setSensorData({
            ...deviceData,
            temperature: deviceData.temperature + (Math.random() - 0.5) * 2,
            humidity: deviceData.humidity + (Math.random() - 0.5) * 1,
            power: deviceData.power + (Math.random() - 0.5) * 50,
            efficiency: deviceData.efficiency + (Math.random() - 0.5) * 1,
            timestamp: new Date().toISOString()
          })
          setAiModels(getMockAiModels(selectedDevice))
          setInsights(getMockInsights(selectedDevice))
          setIsLoading(false)
        }, 1000)
      } else {
        // Production mode: try to fetch from API
        try {
          const [sensorsRes, modelsRes, insightsRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/api/sensors/current`),
            axios.get(`${API_BASE_URL}/api/ai/models/status`),
            axios.get(`${API_BASE_URL}/api/ai/insights`)
          ])
          
          setSensorData(sensorsRes.data)
          setAiModels(modelsRes.data.models)
          setInsights(insightsRes.data.insights)
          setIsLoading(false)
        } catch (error) {
          console.error('API連接失敗，切換到演示模式:', error)
          // Fallback to demo mode if API fails
          const deviceData = getDeviceMockData(selectedDevice)
          setSensorData(deviceData)
          setAiModels(getMockAiModels(selectedDevice))
          setInsights(getMockInsights(selectedDevice))
          setIsLoading(false)
        }
      }
    }

    fetchData()
    const interval = setInterval(fetchData, isDemoMode ? 5000 : 3000)
    return () => clearInterval(interval)
  }, [selectedDevice])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center">
        <div className="text-white text-xl">載入中...</div>
      </div>
    )
  }

  return (
    <Dashboard 
      sensorData={sensorData}
      aiModels={aiModels}
      insights={insights}
      selectedDevice={selectedDevice}
      onDeviceSelect={setSelectedDevice}
    />
  )
}

export default App
