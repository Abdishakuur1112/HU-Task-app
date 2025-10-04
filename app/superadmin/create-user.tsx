import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CreateUser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
  });
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('create-user');

  const handleCreateUser = () => {
    // Validation
    if (!formData.name || !formData.email || !formData.role) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Add user creation logic here
    Alert.alert('Success', 'User created successfully!');
    setFormData({ name: '', email: '', role: '', department: '', phone: '' });
  };

  const handleNavigation = (route: string) => {
    setActiveTab(route);
    if (route === 'dashboard') {
      router.push('/superadmin');
    } else if (route === 'approval') {
      router.push('/superadmin/approval');
    } else if (route === 'active') {
      router.push('/superadmin/active');
    }
  };

  const handleCancel = () => {
    router.push('/superadmin');
  };

  const handleLogout = () => {
    router.push('/Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      
      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('@/assets/images/icon.png')}
                style={styles.avatar}
              />
              <View style={styles.statusBadge} />
            </View>
            <Text style={styles.profileName}>Super Admin</Text>
            <Text style={styles.profileRole}>System Administrator</Text>
          </View>

          {/* Navigation Tabs */}
          <View style={styles.navSection}>
            <Text style={styles.navSectionTitle}>MAIN MENU</Text>
            <TouchableOpacity
              style={[styles.navItem, activeTab === 'dashboard' && styles.navItemActive]}
              onPress={() => handleNavigation('dashboard')}
            >
              <View style={[styles.navIconContainer, activeTab === 'dashboard' && styles.navIconActive]}>
                <Ionicons
                  name="grid"
                  size={20}
                  color={activeTab === 'dashboard' ? '#fff' : '#94a3b8'}
                />
              </View>
              <Text style={[styles.navText, activeTab === 'dashboard' && styles.navTextActive]}>
                Dashboard
              </Text>
              {activeTab === 'dashboard' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navItem, activeTab === 'create-user' && styles.navItemActive]}
              onPress={() => handleNavigation('create-user')}
            >
              <View style={[styles.navIconContainer, activeTab === 'create-user' && styles.navIconActive]}>
                <Ionicons
                  name="person-add"
                  size={20}
                  color={activeTab === 'create-user' ? '#fff' : '#94a3b8'}
                />
              </View>
              <Text style={[styles.navText, activeTab === 'create-user' && styles.navTextActive]}>
                Create User
              </Text>
              {activeTab === 'create-user' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navItem, activeTab === 'approval' && styles.navItemActive]}
              onPress={() => handleNavigation('approval')}
            >
              <View style={[styles.navIconContainer, activeTab === 'approval' && styles.navIconActive]}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={activeTab === 'approval' ? '#fff' : '#94a3b8'}
                />
              </View>
              <Text style={[styles.navText, activeTab === 'approval' && styles.navTextActive]}>
                Approvals
              </Text>
              {activeTab === 'approval' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navItem, activeTab === 'active' && styles.navItemActive]}
              onPress={() => handleNavigation('active')}
            >
              <View style={[styles.navIconContainer, activeTab === 'active' && styles.navIconActive]}>
                <Ionicons
                  name="pulse"
                  size={20}
                  color={activeTab === 'active' ? '#fff' : '#94a3b8'}
                />
              </View>
              <Text style={[styles.navText, activeTab === 'active' && styles.navTextActive]}>
                Active Users
              </Text>
              {activeTab === 'active' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          </View>

          {/* Bottom Actions */}
          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.bottomButton}>
              <View style={styles.navIconContainer}>
                <Ionicons name="settings-outline" size={20} color="#94a3b8" />
              </View>
              <Text style={styles.bottomButtonText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <View style={styles.logoutIconContainer}>
                <Ionicons name="log-out-outline" size={20} color="#ff4757" />
              </View>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main Content */}
      <View style={[styles.mainContent, !sidebarVisible && styles.mainContentExpanded]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerTitleRow}>
                <TouchableOpacity 
                  style={styles.menuToggle} 
                  onPress={() => setSidebarVisible(!sidebarVisible)}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name={sidebarVisible ? "chevron-back" : "chevron-forward"} 
                    size={20} 
                    color="#64748b" 
                  />
                </TouchableOpacity>
                <View>
                  <Text style={styles.headerTitle}>Create New User</Text>
                  <Text style={styles.headerSubtitle}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerIconButton}>
                <Ionicons name="notifications-outline" size={20} color="#64748b" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="download-outline" size={18} color="#fff" />
                <Text style={styles.headerButtonText}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Professional Form Card */}
          <View style={styles.formWrapper}>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Add New User</Text>
              <Text style={styles.formSubtitle}>Create a new account in just a few steps</Text>

              {/* Professional Two-Column Layout */}
              <View style={styles.formLayout}>
                {/* Basic Information Column */}
                <View style={styles.leftColumn}>
                  <Text style={styles.sectionTitle}>Basic Information</Text>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name *</Text>
                    <View style={styles.inputWithIcon}>
                      <Ionicons name="person-outline" size={20} color="#94a3b8" />
                      <TextInput
                        style={styles.inputField}
                        placeholder="Enter full name"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        placeholderTextColor="#cbd5e1"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address *</Text>
                    <View style={styles.inputWithIcon}>
                      <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                      <TextInput
                        style={styles.inputField}
                        placeholder="Enter email address"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#cbd5e1"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Department</Text>
                    <View style={styles.inputWithIcon}>
                      <Ionicons name="business-outline" size={20} color="#94a3b8" />
                      <TextInput
                        style={styles.inputField}
                        placeholder="e.g., Computer Science"
                        value={formData.department}
                        onChangeText={(text) => setFormData({ ...formData, department: text })}
                        placeholderTextColor="#cbd5e1"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.inputWithIcon}>
                      <Ionicons name="call-outline" size={20} color="#94a3b8" />
                      <TextInput
                        style={styles.inputField}
                        placeholder="e.g., +252 61 234 5678"
                        value={formData.phone}
                        onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        keyboardType="phone-pad"
                        placeholderTextColor="#cbd5e1"
                      />
                    </View>
                  </View>
                </View>

                {/* Admin Role Column */}
                <View style={styles.rightColumn}>
                  <Text style={styles.sectionTitle}>Admin Role</Text>
                  
                  <View style={styles.roleSelection}>
                    {[
                      { role: 'Admin', icon: 'shield-checkmark', desc: 'Full system access' },
                      { role: 'Dept-Admin', icon: 'business', desc: 'Department level access' }
                    ].map((item) => (
                      <TouchableOpacity
                        key={item.role}
                        style={[
                          styles.roleCard,
                          formData.role === item.role && styles.roleCardActive,
                        ]}
                        onPress={() => setFormData({ ...formData, role: item.role })}
                      >
                        <Ionicons 
                          name={item.icon as any} 
                          size={24} 
                          color={formData.role === item.role ? '#1e40af' : '#94a3b8'} 
                        />
                        <View style={styles.roleCardContent}>
                          <Text style={[
                            styles.roleCardTitle,
                            formData.role === item.role && styles.roleCardTitleActive
                          ]}>
                            {item.role}
                          </Text>
                          <Text style={styles.roleCardDesc}>{item.desc}</Text>
                        </View>
                        {formData.role === item.role && (
                          <Ionicons name="checkmark-circle" size={22} color="#1e40af" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCreateUser}
                >
                  <Ionicons name="person-add" size={20} color="#fff" />
                  <Text style={styles.createButtonText}>Create User</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#1e293b',
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginHorizontal: 20,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10b981',
    borderWidth: 3,
    borderColor: '#1e293b',
  },
  profileName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  profileRole: {
    fontSize: 13,
    color: '#8b92a8',
  },
  navSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 16,
    paddingLeft: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: '#334155',
  },
  navIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  navIconActive: {
    backgroundColor: '#1e40af',
  },
  navText: {
    flex: 1,
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: '50%',
    marginTop: -12,
    width: 4,
    height: 24,
    backgroundColor: '#1e40af',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  bottomActions: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
  },
  bottomButtonText: {
    flex: 1,
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#ff475715',
  },
  logoutIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoutButtonText: {
    flex: 1,
    fontSize: 14,
    color: '#ff4757',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    padding: 32,
  },
  mainContentExpanded: {
    marginLeft: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuToggle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#f8fafc',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e40af',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    gap: 8,
    shadowColor: '#1e40af',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  formWrapper: {
    alignItems: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: 900,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 32,
    textAlign: 'center',
  },
  formLayout: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 32,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    color: '#1e293b',
  },
  roleSelection: {
    gap: 12,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  roleCardActive: {
    backgroundColor: '#1e40af08',
    borderColor: '#1e40af',
  },
  roleCardContent: {
    flex: 1,
  },
  roleCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 2,
  },
  roleCardTitleActive: {
    color: '#1e293b',
  },
  roleCardDesc: {
    fontSize: 13,
    color: '#94a3b8',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
  },
  createButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1e40af',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
});
