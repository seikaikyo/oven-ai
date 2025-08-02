from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random
import math

from database import get_db, SensorData

router = APIRouter()

@router.get("/current")
async def get_current_sensors(db: Session = Depends(get_db)):
    """獲取當前感測器數據"""
    # 模擬即時數據
    now = datetime.utcnow()
    base_temp = 185 + math.sin(now.timestamp() / 1000) * 15 + random.uniform(-5, 5)
    base_humidity = 42 + math.sin(now.timestamp() / 800) * 8 + random.uniform(-3, 3)
    base_power = 2300 + math.sin(now.timestamp() / 1200) * 300 + random.uniform(-100, 100)
    
    current_data = {
        "timestamp": now.isoformat(),
        "temperature": round(base_temp, 1),
        "humidity": round(base_humidity, 1), 
        "power": round(base_power),
        "efficiency": round(87.2 + random.uniform(-2, 2), 1),
        "anomaly_score": round(random.uniform(0, 1), 3),
        "anomaly_count": 144 + random.randint(0, 5)
    }
    
    # 儲存到資料庫
    sensor_record = SensorData(
        temperature=current_data["temperature"],
        humidity=current_data["humidity"], 
        power=current_data["power"],
        efficiency=current_data["efficiency"],
        anomaly_score=current_data["anomaly_score"]
    )
    db.add(sensor_record)
    db.commit()
    
    return current_data

@router.get("/history")
async def get_sensor_history(hours: int = 24, db: Session = Depends(get_db)):
    """獲取歷史感測器數據"""
    start_time = datetime.utcnow() - timedelta(hours=hours)
    
    records = db.query(SensorData).filter(
        SensorData.timestamp >= start_time
    ).order_by(SensorData.timestamp.desc()).limit(100).all()
    
    return [{
        "timestamp": record.timestamp.isoformat(),
        "temperature": record.temperature,
        "humidity": record.humidity,
        "power": record.power,
        "efficiency": record.efficiency,
        "anomaly_score": record.anomaly_score
    } for record in records]