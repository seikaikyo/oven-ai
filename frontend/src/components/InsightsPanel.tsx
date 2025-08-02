import React from 'react'

interface Insight {
  type: string
  icon: string
  level: string
  description: string
}

interface InsightsPanelProps {
  insights: Insight[]
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  const getLevelColor = (level: string) => {
    // 根據 level 內容判斷顏色
    const lowerLevel = level.toLowerCase()
    
    if (lowerLevel.includes('離線') || lowerLevel.includes('無法') || lowerLevel.includes('緊急') || lowerLevel.includes('停機') || lowerLevel.includes('中斷')) {
      return 'bg-red-500/20 text-red-300 border-red-500/50'
    }
    if (lowerLevel.includes('高風險') || lowerLevel.includes('警告') || lowerLevel.includes('異常') || lowerLevel.includes('下降') || lowerLevel.includes('風險')) {
      return 'bg-red-400/20 text-red-300 border-red-400/50'
    }
    if (lowerLevel.includes('維護') || lowerLevel.includes('暫停') || lowerLevel.includes('進行中') || lowerLevel.includes('訓練') || lowerLevel.includes('高優先級')) {
      return 'bg-orange-400/20 text-orange-300 border-orange-400/50'
    }
    if (lowerLevel.includes('中等') || lowerLevel.includes('中度') || lowerLevel.includes('預防') || lowerLevel.includes('計劃')) {
      return 'bg-yellow-400/20 text-yellow-300 border-yellow-400/50'
    }
    if (lowerLevel.includes('良好') || lowerLevel.includes('正常') || lowerLevel.includes('優秀') || lowerLevel.includes('穩定') || lowerLevel.includes('低風險')) {
      return 'bg-green-400/20 text-green-300 border-green-400/50'
    }
    if (lowerLevel.includes('優化') || lowerLevel.includes('節能') || lowerLevel.includes('提升')) {
      return 'bg-blue-400/20 text-blue-300 border-blue-400/50'
    }
    
    // 默認顏色
    return 'bg-gray-400/20 text-gray-300 border-gray-400/50'
  }

  const getInsightExplanation = (type: string) => {
    switch (type) {
      case '異常預測':
        return '基於機器學習模型分析溫度、濕度、功耗等多維度數據，提前識別可能的設備異常'
      case '效率優化':
        return '通過智能算法分析能耗模式，在保證產品品質的前提下找出最佳節能方案'
      case '維護建議':
        return '利用預測性維護技術，根據設備運行數據預測零件壽命，制定最優維護計劃'
      case '品質預測':
        return '結合環境參數和歷史數據，預測烘烤產品的品質表現，確保一致性'
      case '性能提升':
        return '基於大數據分析找出性能瓶頸，提供具體的設備優化建議和改進方案'
      case '能耗分析':
        return '監控與分析能源消耗模式，識別節能機會，優化運營成本'
      case '趨勢分析':
        return '分析設備長期運行趨勢，識別性能變化模式，為決策提供數據支持'
      default:
        return 'AI系統綜合分析設備數據，提供智能化的運營建議和優化方案'
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          🧠 AI 智能分析洞察
        </h2>
        <p className="text-white/70 text-sm">
          整合多種AI算法，提供全方位的設備運營洞察與優化建議
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-lg p-5 border-l-4 border-yellow-400 hover:bg-white/10 hover:transform hover:translate-x-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{insight.icon}</span>
              <h3 className="font-semibold text-white text-lg">{insight.type}</h3>
            </div>
            
            <div className="space-y-3">
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(insight.level)}`}>
                  {insight.level}
                </span>
              </div>
              
              <div className="bg-black/20 rounded-md p-3 space-y-2">
                <div className="text-white/90">
                  <span className="font-medium text-blue-300 text-sm">功能說明：</span>
                  <p className="mt-1 text-white/70 text-xs leading-relaxed">
                    {getInsightExplanation(insight.type)}
                  </p>
                </div>
              </div>
              
              <div className="text-white/90">
                <span className="font-medium text-yellow-300 text-sm">分析結果：</span>
                <p className="mt-1 text-white/80 text-sm leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InsightsPanel