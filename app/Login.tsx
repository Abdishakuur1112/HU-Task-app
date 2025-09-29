import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Basic validation
    if (!username.trim()) {
      alert("Please enter your username or student ID");
      return;
    }
    
    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // TODO: Implement actual login logic here
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Login attempt", { username, password });
      
      // Navigate to main app screen after successful login
      router.push('/');
      
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    alert("Forgot password functionality will be implemented");
  };

  const handleSignUp = () => {
    router.push('/SignUp');
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
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubtitle}>SIGN IN TO YOUR ACCOUNT</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Username/Student ID Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={setUsername}
                placeholder="Username or Student ID"
                placeholderTextColor="#999999"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#999999"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Forgot Password Link */}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>
            
            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            
            {/* Help Section */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>Need help or have questions?</Text>
              <TouchableOpacity>
                <Text style={styles.helpLink}>Contact Support</Text>
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  loginButton: {
    backgroundColor: '#1e40af',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: '#1e40af',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonDisabled: {
    backgroundColor: '#94a3b8',
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  signUpLink: {
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
