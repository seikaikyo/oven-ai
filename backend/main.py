from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from database import init_db
from routers import sensors, ai_models

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    yield
    # Shutdown

app = FastAPI(
    title="智慧烘箱 AI 監控系統",
    description="Intelligent Oven Monitoring with AI-Powered Analytics",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://172.30.96.216:5173",
        "http://10.255.255.254:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensors.router, prefix="/api/sensors", tags=["sensors"])
app.include_router(ai_models.router, prefix="/api/ai", tags=["ai_models"])

@app.get("/")
async def root():
    return {"message": "智慧烘箱 AI 監控系統 API", "status": "online"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "oven-ai-backend"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)