from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
import random
import json

from database import get_db, AIModelResult

router = APIRouter()

@router.get("/models/status")
async def get_ai_models_status():
    """獲取AI模型狀態"""
    models = [
        {
            "name": "溫度異常檢測",
            "type": "LSTM-AutoEncoder", 
            "status": "running",
            "accuracy": round(92.5 + random.uniform(-2, 2), 1),
            "last_updated": datetime.utcnow().isoformat(),
            "confidence": round(random.uniform(0.85, 0.98), 2)
        },
        {
            "name": "濕度趨勢預測",
            "type": "Prophet + LSTM",
            "status": "running", 
            "accuracy": round(89.3 + random.uniform(-2, 2), 1),
            "last_updated": datetime.utcnow().isoformat(),
            "confidence": round(random.uniform(0.82, 0.95), 2)
        },
        {
            "name": "功耗優化",
            "type": "Multi-objective Optimization",
            "status": "running",
            "accuracy": round(94.7 + random.uniform(-1, 1), 1), 
            "last_updated": datetime.utcnow().isoformat(),
            "confidence": round(random.uniform(0.88, 0.96), 2)
        },
        {
            "name": "維護預測",
            "type": "Random Forest + Survival Analysis",
            "status": "training" if random.random() > 0.8 else "running",
            "accuracy": round(91.2 + random.uniform(-2, 2), 1),
            "last_updated": datetime.utcnow().isoformat(), 
            "confidence": round(random.uniform(0.85, 0.93), 2)
        }
    ]
    return {"models": models}

@router.get("/predictions/anomaly")
async def get_anomaly_prediction(db: Session = Depends(get_db)):
    """異常檢測預測"""
    risk_level = random.choice(["低", "中等", "高"])
    prediction = {
        "model": "LSTM-AutoEncoder",
        "risk_level": risk_level,
        "anomaly_score": round(random.uniform(0, 1), 3),
        "prediction": "未來2小時內溫度可能上升至210°C" if risk_level == "中等" else "系統運行正常",
        "confidence": round(random.uniform(0.85, 0.98), 2),
        "timestamp": datetime.utcnow().isoformat()
    }
    
    # 儲存預測結果
    result = AIModelResult(
        model_name="anomaly_detector",
        prediction_type="anomaly",
        input_data=json.dumps({"risk_level": risk_level}),
        output_result=json.dumps(prediction),
        confidence=prediction["confidence"]
    )
    db.add(result)
    db.commit()
    
    return prediction

@router.get("/insights")
async def get_ai_insights():
    """獲取AI洞察分析"""
    insights = [
        {
            "type": "異常預測",
            "icon": "🔮",
            "level": random.choice(["低", "中等", "高"]),
            "description": "未來2小時內溫度可能上升至210°C，建議調整參數以避免過熱"
        },
        {
            "type": "效率優化", 
            "icon": "⚡",
            "level": "節能建議：12% ↓",
            "description": "調整功率至2000W可節省電力，同時維持最佳烘烤效果"
        },
        {
            "type": "維護建議",
            "icon": "🔧", 
            "level": "中",
            "description": "溫度感測器精度下降3.2%，建議7天內進行校正維護"
        },
        {
            "type": "品質預測",
            "icon": "🎯",
            "level": f"合格率：{round(96.8 + random.uniform(-1, 1), 1)}%",
            "description": "當前參數配置下，預測產品品質將維持在高標準水平"
        }
    ]
    return {"insights": insights}