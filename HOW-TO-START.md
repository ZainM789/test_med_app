# 🚀 How to Start Your Medical Web App

## Prerequisites
- Node.js must be installed (download from https://nodejs.org/)

## Quick Start Instructions

### 1. Start Backend Server
Open Command Prompt/PowerShell:
```
cd "C:\Users\Admin\Documents\PROJECT\test_med_app\server"
npm install
npm run dev
```
✅ Backend will run on: http://localhost:8181

### 2. Start Frontend App  
Open ANOTHER Command Prompt/PowerShell:
```
cd "C:\Users\Admin\Documents\PROJECT\test_med_app\app-name"
npm install
npm start
```
✅ Frontend will run on: http://localhost:3000

### 3. Open Your Web App
🌐 Visit: http://localhost:3000

## Features You Can Test:
✅ Landing Page with navigation
✅ User Registration (SignUp)
✅ User Login
✅ Medical Reports System
✅ Instant Consultation
✅ Profile Management
✅ Review System

## Test Authentication:
Run this command from project root:
```
node test-auth.js
```

## Troubleshooting:
- If npm is not recognized: Install Node.js and restart terminal
- If ports are busy: Kill existing processes or use different ports
- If MongoDB connection fails: Check server/db.js configuration

## Project Structure:
- app-name/ = React Frontend
- server/ = Node.js Backend
- test-auth.js = Authentication test script

Happy coding! 🎉
