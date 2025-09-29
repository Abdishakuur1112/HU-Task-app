import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // 'student' or 'other' - default to 'student'

  const handleNext = () => {
    // Basic validation
    if (!userType) {
      alert("Please select an account type (Student or Other)");
      return;
    }
    
    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (userType === 'student' && (!name.trim() || !studentId.trim())) {
      alert("Please enter both name and student ID");
      return;
    }
    
    if (userType === 'other' && !username.trim()) {
      alert("Please enter username");
      return;
    }
    
    // Show success popup
    alert("Account created successfully! You can now login with your credentials.");
    
    // Navigate to login screen
    router.push('/Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Main Card Container */}
        <View style={styles.mainCard}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/LOGOO.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Welcome</Text>
            <Text style={styles.headerSubtitle}>CREATE YOUR A NEW ACCOUNT</Text>
          </View>

          {/* Account Type Selection */}
          <View style={styles.userTypeContainer}>
            <Text style={styles.userTypeLabel}>Account Type</Text>
            <View style={styles.segmentedControl}>
              <TouchableOpacity 
                style={[styles.segment, userType === 'student' && styles.segmentSelected]}
                onPress={() => setUserType('student')}
              >
                <Text style={styles.studentIcon}>🎓</Text>
                <Text style={[styles.segmentText, userType === 'student' && styles.segmentTextSelected]}>
                  Student
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.segment, userType === 'other' && styles.segmentSelected]}
                onPress={() => setUserType('other')}
              >
                <Text style={styles.otherIcon}>👤</Text>
                <Text style={[styles.segmentText, userType === 'other' && styles.segmentTextSelected]}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Conditional Input Fields */}
            {userType === 'student' && (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Full Name"
                    placeholderTextColor="#999999"
                    autoCapitalize="words"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={studentId}
                    onChangeText={setStudentId}
                    placeholder="Student ID"
                    placeholderTextColor="#999999"
                    autoCapitalize="none"
                  />
                </View>
              </>
            )}

            {userType === 'other' && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                  placeholderTextColor="#999999"
                  autoCapitalize="none"
                />
              </View>
            )}

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Create Password"
                placeholderTextColor="#999999"
                secureTextEntry={true}
              />
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#999999"
                secureTextEntry={true}
              />
            </View>

            {/* Next Button */}
            <TouchableOpacity 
              style={styles.nextButton} 
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            
            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account ? </Text>
              <TouchableOpacity onPress={() => router.push('/Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
            
            {/* Help Section */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>Still have Questions or Need help</Text>
              <TouchableOpacity>
                <Text style={styles.helpLink}>Request a Free Demo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  logo: {
    width: 300,
    height: 300,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: -70,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: '#1e40af',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 24,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  userTypeContainer: {
    marginBottom: 24,
  },
  userTypeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
    marginBottom: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  segmentSelected: {
    backgroundColor: '#1e40af',
    shadowColor: '#1e40af',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  segmentText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6b7280',
    marginLeft: 8,
  },
  segmentTextSelected: {
    color: '#ffffff',
  },
  studentIcon: {
    fontSize: 16,
  },
  otherIcon: {
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  helpContainer: {
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  helpText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  helpLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
});
