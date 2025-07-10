# 🩺 Medical Appointment Booking Website

## 📄 General Instructions and Notes

This project is a web-based **Medical Appointment Booking System** that allows patients to:
- Search for doctors by specialty
- Book medical appointments
- Log in or sign up for an account
- Leave reviews after consultations

The interface is designed in **Figma** and includes components such as a navigation bar, sign-up/login forms, appointment search and booking tools, and a review system.

---

## ✅ Key Features

- **Navigation Bar**  
  Includes links to Home, Sign Up, Login, and Appointments pages.

- **Sign-Up Form**  
  Allows user registration with fields for Name, Email, Phone Number, and Password.

- **Login Form**  
  Secure user login with basic validation and password visibility toggle.

- **Appointment Booking Section**
  - **Search Bar** to find doctors by specialty.
  - **Doctor Cards** show doctor information:
    - Name
    - Specialty
    - Experience
    - Ratings
    - "Book Appointment" button

- **Review Section**
  - Displays consultation history.
  - Allows users to write reviews, give ratings, and optionally attach images.

---

## 🛠 Technologies Used

### Design
- [Figma](https://figma.com/) for all UI/UX designs and mockups

### (Planned Development Stack)
- **Frontend**: HTML, CSS, JavaScript (React optional)
- **Backend**: Node.js / Express or Django (planned)
- **Database**: MongoDB / Firebase (planned)

---

## 📸 Design Files & Screenshots

Designs and layout screenshots are named as follows:

| Section               | Filename                   |
|-----------------------|----------------------------|
| Navigation Bar        | `navbar_design.png`        |
| Sign-Up Form          | `signup_form_design.png`   |
| Login Form            | `login_form_design.png`    |
| Appointment Search    | `appt_search_design.png`   |
| Doctor Card Layout    | `appt_doccard_design.png`  |
| Review Section        | `reviews_design.png`       |

---

## 🧑‍💻 Notes for Developers

- Use **Figma Components** and **Auto Layout** for consistency and scalability.
- Keep spacing uniform: 16–24px between sections/elements.
- Typography and colors should follow a defined **Design System** (e.g., base font: 14px, primary color: #0D6EFD).
- Ensure that all forms are:
  - Aligned and grouped properly
  - Have placeholder text and labels
  - Include validation and error messages

---

## 🔐 Security Recommendations (For Future Implementation)

- Use **client-side and server-side validation**.
- Hash passwords securely before storage (e.g., using bcrypt).
- Use **JWT tokens** for user session management.
- Protect patient data in accordance with privacy best practices (e.g., HIPAA/GDPR compliance).

---

## 🚀 Future Enhancements

- Doctor dashboard for managing availability
- Admin dashboard for managing users and appointments
- Email notifications and reminders
- Calendar integration
- Video consultation support

---

## 📬 Feedback & Contributions

You're welcome to:
- Fork this repository
- Submit pull requests for improvements
- Open issues for bugs or ideas

---

## 📅 License

This project is currently for educational/demo purposes and not under an open-source license yet. Please contact the project owner before reuse.

---

## �️ **Clean Project Structure** (Redundancy Removed)

```
test_med_app/
├── app-name/                 # React frontend (MAIN APP)
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Landing_Page/
│   │   │   ├── Login/
│   │   │   ├── SignUp/
│   │   │   ├── Navbar/
│   │   │   ├── ReportsLayout/
│   │   │   ├── InstantConsultation/
│   │   │   ├── Notification/
│   │   │   ├── ProfileCard/
│   │   │   └── ReviewForm/
│   │   ├── App.js
│   │   └── config.js
│   ├── public/
│   └── package.json
├── server/                   # Node.js backend
│   ├── models/User.js
│   ├── routes/auth.js
│   ├── db.js
│   ├── index.js
│   └── package.json
├── test-auth.js             # Authentication test script
└── README.md
```

### ✅ **Redundancy Cleanup Completed**
- **Removed duplicate src folder** from root directory
- **Removed duplicate public folder** from root directory  
- **Removed duplicate package.json** from root directory
- **Kept only app-name as the main React application**
- **Clean, organized structure** with no confusion

### ✅ Authentication Issues Fixed
- **SignUp Component**: Fixed email/phone field confusion - now has separate email and phone fields
- **User Model**: Added missing `role` field to support Doctor/Patient roles
- **Backend Validation**: Improved error handling and validation in auth routes
- **API Integration**: Fixed registration and login flows with proper error handling

### ✅ Code Quality Improvements
- **ESLint Warnings**: Removed all unnecessary eslint-disable comments
- **Unused Imports**: Cleaned up unused variables and imports (logo.svg, unused email variable)
- **Error Handling**: Added proper try-catch blocks and user feedback instead of alerts
- **Loading States**: Added loading indicators and disabled buttons during API calls

### ✅ UI/UX Enhancements
- **Error Messages**: Proper error display with styled error boxes instead of browser alerts
- **Form Validation**: Enhanced client-side and server-side validation
- **Responsive Design**: Improved mobile-friendly layouts
- **Loading States**: Visual feedback during form submissions

### ✅ Configuration Updates
- **API URL**: Fixed config.js to use localhost:8181 for local development
- **Database Schema**: Added role field with proper validation and enum values
- **Package Scripts**: Added dev script for server with nodemon

## 🧪 Testing Your Setup

A test script has been created to verify your authentication system:

```bash
# From project root directory
node test-auth.js
```

This will test:
- Server connectivity
- User registration with all required fields
- User login functionality

## 🚀 **Quick Start Guide** (Updated for Clean Structure)

### Option 1: Automatic Start (Windows)
```bash
# Double-click start-app.bat or run:
start-app.bat
```

### Option 2: Manual Start

**Backend (Server)**
```bash
cd server
npm install  # First time only
npm run dev  # Starts with nodemon for auto-reload
```

**Frontend (React App)**
```bash
cd app-name
npm install  # First time only
npm start    # Starts development server
```

### Verify Everything Works
```bash
# Test authentication system (from project root)
node test-auth.js
```

**Access Points:**
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8181
- 📊 **Test Script**: `node test-auth.js`

## 🛠️ Troubleshooting Common Issues

1. **SignUp/Login not working**: 
   - Check server is running on port 8181
   - Verify MongoDB connection in server/db.js
   - Check browser console for API errors

2. **ESLint warnings**: All have been cleaned up
3. **Missing dependencies**: Run npm install in both directories
4. **Database connection**: Update server/db.js with your MongoDB URI
