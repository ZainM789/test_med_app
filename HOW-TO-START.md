# 🚀 How to Start Your Medical Web App

## Prerequisites
- Node.js must be installed (download from https://nodejs.org/)
- MongoDB (optional - app works in demo mode without it)

## 🎯 Easy Start (Recommended)

### Option 1: Use Automated Scripts
1. **Double-click `start_app.bat`** to start both frontend and backend
2. **OR Double-click `start-backend.bat`** to start just the backend

### Option 2: Manual Start

### 1. Start Backend Server (Optional but Recommended)
Open Command Prompt/PowerShell:
```bash
cd "C:\Users\Admin\Documents\PROJECT\test_med_app\server"
npm install
npm start
```
✅ Backend will run on: http://localhost:8181

### 2. Start Frontend App  
Open ANOTHER Command Prompt/PowerShell:
```bash
cd "C:\Users\Admin\Documents\PROJECT\test_med_app\app-name"
npm install
npm start
```
✅ Frontend will run on: http://localhost:3000

### 3. Open Your Web App
🌐 Visit: http://localhost:3000

## ⚠️ Demo Mode (Backend Offline)
If you see "Network error" when signing up/logging in:
- The app will automatically switch to **Demo Mode**
- You can still test all features with simulated data
- To enable full functionality, start the backend server using `start-backend.bat`

## Features You Can Test:
✅ Landing Page with navigation
✅ User Registration (SignUp) - works in demo mode
✅ User Login - works in demo mode  
✅ Medical Reports System
✅ Doctor Appointments with cartoon avatars
✅ Star Ratings System
✅ Profile Management
✅ Review System

## Test Authentication:
Run this command from project root:
```bash
node test-auth.js
```

## Troubleshooting:
- **Network Error on Login/SignUp**: Backend server not running - use demo mode or start backend
- If npm is not recognized: Install Node.js and restart terminal
- If ports are busy: Kill existing processes or use different ports
- If MongoDB connection fails: App works in demo mode without database

## Project Structure:
- app-name/ = React Frontend
- server/ = Node.js Backend
- test-auth.js = Authentication test script

Happy coding! 🎉
