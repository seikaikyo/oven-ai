import React from 'react'

interface AIModel {
  name: string
  type: string
  status: string
  accuracy: number
  confidence: number
  last_updated: string
}

interface AIModelsPanelProps {
  aiModels: AIModel[]
}

const AIModelsPanel: React.FC<AIModelsPanelProps> = ({ aiModels }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400'
      case 'training': return 'text-yellow-400'
      case 'offline': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return '🟢'
      case 'training': return '🟡'
      case 'offline': return '🔴'
      default: return '⚪'
    }
  }

  const getModelDescription = (name: string) => {
    switch (name) {
      case '溫度異常檢測':
        return {
          description: '監控烘箱溫度變化模式，自動識別異常溫度波動與潛在故障徵兆',
          scope: '適用範圍：160°C-250°C，檢測精度±0.5°C，反應時間<3秒'
        }
      case '濕度趨勢預測':
        return {
          description: '基於歷史數據預測未來濕度變化趨勢，優化烘烤環境控制',
          scope: '預測範圍：未來2-24小時，濕度範圍20%-80%，預測準確率>85%'
        }
      case '功耗優化':
        return {
          description: '智能分析功耗模式，提供節能建議並維持最佳烘烤效果',
          scope: '優化範圍：1500W-3500W，平均節能10-15%，效能維持>95%'
        }
      case '維護預測':
        return {
          description: '預測設備維護需求，提前識別潛在故障，減少意外停機時間',
          scope: '預測週期：7-30天，預測精度>90%，涵蓋加熱元件、感測器、控制系統'
        }
      default:
        return {
          description: 'AI智能分析模型，提供專業的設備監控與優化建議',
          scope: '全面覆蓋設備運行的各個層面'
        }
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
        🤖 AI模型監控中心
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiModels.map((model, index) => {
          const modelInfo = getModelDescription(model.name)
          return (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-5 border-l-4 border-yellow-400 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-lg">{model.name}</h3>
                <div className="flex items-center gap-2">
                  <span>{getStatusIcon(model.status)}</span>
                  <span className={`text-sm ${getStatusColor(model.status)}`}>
                    {model.status === 'running' ? '運行中' : 
                     model.status === 'training' ? '訓練中' : '離線'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="text-white/90">
                  <span className="font-medium text-yellow-300">功能描述：</span>
                  <p className="mt-1 text-white/80 leading-relaxed">{modelInfo.description}</p>
                </div>
                
                <div className="text-white/90">
                  <span className="font-medium text-blue-300">適用範圍：</span>
                  <p className="mt-1 text-white/70 text-xs leading-relaxed">{modelInfo.scope}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>模型類型: <span className="text-blue-300">{model.type}</span></div>
                  <div className="flex items-center gap-2">
                    <span>準確度: <span className="text-green-300">{model.accuracy}%</span></span>
                    <div className="group relative">
                      <span className="text-gray-400 hover:text-white cursor-help">ℹ️</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        預測正確的比例，越高表示模型越可靠
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>置信度: <span className="text-purple-300">{(model.confidence * 100).toFixed(1)}%</span></span>
                    <div className="group relative">
                      <span className="text-gray-400 hover:text-white cursor-help">ℹ️</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        AI對自己預測結果的信心程度，越高表示預測越可信
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${model.accuracy}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AIModelsPanel