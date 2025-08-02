# 🚀 智慧烘箱 AI 監控系統啟動指南

## 前置需求
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (推薦)

## 方法1: Docker Compose (推薦)
```bash
# 啟動所有服務
docker-compose up --build

# 訪問
前端: http://localhost:5173
後端API: http://localhost:8000
API文檔: http://localhost:8000/docs
```

## 方法2: 分別啟動

### 後端啟動
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### 前端啟動
```bash
cd frontend
npm install
npm run dev
```

## API端點測試
```bash
# 測試後端健康狀態
curl http://localhost:8000/health

# 獲取感測器數據
curl http://localhost:8000/api/sensors/current

# 獲取AI模型狀態
curl http://localhost:8000/api/ai/models/status
```

## 功能特色
✅ 即時感測器數據監控
✅ AI模型狀態顯示  
✅ 智能分析洞察
✅ 響應式設計
✅ RESTful API