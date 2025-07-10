#!/usr/bin/env node

/**
 * Simple test script to verify backend authentication
 * Run this from the project root: node test-auth.js
 * 
 * Project Structure:
 * test_med_app/
 * ├── app-name/          # React frontend
 * ├── server/            # Node.js backend  
 * ├── test-auth.js       # This test script
 * └── README.md
 */

const API_URL = 'http://localhost:8181';

// Test registration
async function testRegistration() {
  console.log('🔍 Testing user registration...');
  
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword123',
    phone: '1234567890',
    role: 'Patient'
  };

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('Auth token received:', data.authtoken ? 'Yes' : 'No');
      return data.authtoken;
    } else {
      console.log('❌ Registration failed:', data.error || data.errors);
      return null;
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message);
    return null;
  }
}

// Test login
async function testLogin() {
  console.log('🔍 Testing user login...');
  
  const loginData = {
    email: 'test@example.com',
    password: 'testpassword123'
  };

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('Auth token received:', data.authtoken ? 'Yes' : 'No');
      return data.authtoken;
    } else {
      console.log('❌ Login failed:', data.error || data.errors);
      return null;
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
    return null;
  }
}

// Test server connectivity
async function testServerConnection() {
  console.log('🔍 Testing server connection...');
  
  try {
    const response = await fetch(`${API_URL}/`);
    const text = await response.text();
    
    if (response.ok) {
      console.log('✅ Server is running!');
      console.log('Response:', text);
      return true;
    } else {
      console.log('❌ Server responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Cannot connect to server:', error.message);
    console.log('Make sure the server is running on http://localhost:8181');
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting authentication tests...\n');
  
  // Test server connection first
  const serverOk = await testServerConnection();
  console.log('');
  
  if (!serverOk) {
    console.log('❌ Cannot proceed with tests - server is not accessible');
    console.log('💡 Please start the server with: cd server && npm start');
    return;
  }
  
  // Test registration
  const registrationToken = await testRegistration();
  console.log('');
  
  // Test login
  const loginToken = await testLogin();
  console.log('');
  
  // Summary
  console.log('📊 Test Summary:');
  console.log('- Server Connection:', serverOk ? '✅' : '❌');
  console.log('- Registration:', registrationToken ? '✅' : '❌');
  console.log('- Login:', loginToken ? '✅' : '❌');
  
  if (serverOk && registrationToken && loginToken) {
    console.log('\n🎉 All tests passed! Your authentication system is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the server logs and database connection.');
  }
}

// Run the tests
runTests().catch(console.error);
