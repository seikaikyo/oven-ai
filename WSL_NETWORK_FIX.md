# 🌐 WSL網路連接解決方案

## 問題診斷
WSL2使用虛擬網路，Windows無法直接訪問WSL的IP地址。

## 解決方案

### 方法1: Windows端口轉發 (推薦)
**在Windows PowerShell (管理員權限) 中執行：**

```powershell
# 添加端口轉發規則
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=172.30.96.216
netsh interface portproxy add v4tov4 listenport=8000 listenaddress=0.0.0.0 connectport=8000 connectaddress=172.30.96.216

# 檢查規則是否生效
netsh interface portproxy show all
```

**然後訪問：**
- 前端：http://localhost:5173
- 後端：http://localhost:8000

### 方法2: WSL配置修改
**創建或編輯 `C:\Users\yoshika\.wslconfig`：**

```ini
[wsl2]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
```

**重啟WSL：**
```powershell
wsl --shutdown
wsl
```

### 方法3: 防火牆規則
**在Windows防火牆中允許：**
1. 打開 Windows Defender 防火牆
2. 進階設定 → 輸入規則 → 新增規則
3. 連接埠 → TCP → 特定本機連接埠 → 5173,8000
4. 允許連線

## 當前狀態
- ✅ 後端API: 正常運行 (port 8000)
- ✅ 前端服務: 正常運行 (port 5173)  
- ❌ 網路連接: 需要設定端口轉發

## 測試命令
```bash
# 在WSL中測試
curl http://localhost:5173
curl http://localhost:8000/health
```