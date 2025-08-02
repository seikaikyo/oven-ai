import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-8 py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* 系統開發 */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold flex items-center justify-center md:justify-start gap-2">
              <span>📧</span>
              <span>系統開發</span>
            </h4>
            <p className="text-blue-300 hover:text-blue-200 transition-colors">
              選我正解
            </p>
          </div>

          {/* GitHub 來源 */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold flex items-center justify-center md:justify-start gap-2">
              <span>⭐</span>
              <span>開源專案</span>
            </h4>
            <a 
              href="https://github.com/seikaikyo/oven-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 transition-colors block"
            >
              GitHub 來源倉庫
            </a>
          </div>

          {/* 技術架構 */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold flex items-center justify-center md:justify-start gap-2">
              <span>⚙️</span>
              <span>技術架構</span>
            </h4>
            <div className="text-gray-300 text-sm space-y-1">
              <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full inline-block mb-2">
                演示環境
              </div>
              <p className="text-xs leading-relaxed">
                React(Vite) + Python FastAPI + SQLite + AI Models
              </p>
              
              <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full inline-block mb-2 mt-3">
                正式環境
              </div>
              <p className="text-xs leading-relaxed">
                React(Vite) + Python + AI Models + Advantech WISE-IoT iEMS
              </p>
            </div>
          </div>
        </div>

        {/* 版權聲明 */}
        <div className="border-t border-white/10 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 智慧烘箱 AI 監控系統 | 
            <span className="mx-2">🤖</span>
            Powered by Advanced AI Analytics
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer