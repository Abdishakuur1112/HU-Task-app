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
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Approval() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('approval');

  // Mock pending users data
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@hu.edu.so',
      role: 'Admin',
      department: 'Computer Science',
      requestDate: '2025-01-15',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Fatima Ali',
      email: 'fatima.ali@hu.edu.so',
      role: 'Dept-Admin',
      department: 'Engineering',
      requestDate: '2025-01-14',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Omar Mohamed',
      email: 'omar.mohamed@hu.edu.so',
      role: 'Admin',
      department: 'Business Administration',
      requestDate: '2025-01-13',
      status: 'pending',
    },
  ]);

  const handleApprove = (userId: number, userName: string) => {
    Alert.alert(
      'Approve User',
      `Are you sure you want to approve ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
            Alert.alert('Success', `${userName} has been approved!`);
          },
        },
      ]
    );
  };

  const handleReject = (userId: number, userName: string) => {
    Alert.alert(
      'Reject User',
      `Are you sure you want to reject ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
            Alert.alert('Rejected', `${userName} has been rejected.`);
          },
        },
      ]
    );
  };

  const handleNavigation = (route: string) => {
    setActiveTab(route);
    if (route === 'dashboard') {
      router.push('/superadmin');
    } else if (route === 'create-user') {
      router.push('/superadmin/create-user');
    } else if (route === 'active') {
      router.push('/superadmin/active');
    }
  };

  const handleLogout = () => {
    router.push('/Login');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'shield-checkmark';
      case 'Dept-Admin':
        return 'business';
      default:
        return 'person';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return '#1e40af';
      case 'Dept-Admin':
        return '#059669';
      default:
        return '#64748b';
    }
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
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{pendingUsers.length}</Text>
              </View>
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
                  <Text style={styles.headerTitle}>Pending Approvals</Text>
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

          <View style={styles.content}>
            {pendingUsers.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIconContainer}>
                  <Ionicons name="checkmark-circle" size={48} color="#1e40af" />
                </View>
                <Text style={styles.emptyTitle}>All Caught Up!</Text>
                <Text style={styles.emptySubtitle}>No pending user approvals</Text>
                <Text style={styles.emptyDescription}>All user requests have been processed</Text>
              </View>
            ) : (
              <View style={styles.approvalsContainer}>
                <Text style={styles.sectionTitle}>Review & Approve Users</Text>
                <Text style={styles.sectionSubtitle}>Manage pending user registration requests</Text>
                
                <View style={styles.usersList}>
                  {pendingUsers.map((user) => (
                    <View key={user.id} style={styles.userCard}>
                      <View style={styles.userHeader}>
                        <View style={styles.avatarContainer}>
                          <View style={styles.userAvatar}>
                            <Text style={styles.userAvatarText}>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                          </View>
                          <View style={styles.statusIndicator} />
                        </View>
                        
                        <View style={styles.userInfo}>
                          <Text style={styles.userName}>{user.name}</Text>
                          <Text style={styles.userEmail}>{user.email}</Text>
                          <View style={styles.userMeta}>
                            <View style={styles.metaItem}>
                              <Ionicons name="business-outline" size={14} color="#64748b" />
                              <Text style={styles.metaText}>{user.department}</Text>
                            </View>
                            <View style={styles.metaItem}>
                              <Ionicons name="calendar-outline" size={14} color="#64748b" />
                              <Text style={styles.metaText}>{user.requestDate}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.roleContainer}>
                          <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) + '15' }]}>
                            <Ionicons 
                              name={getRoleIcon(user.role) as any} 
                              size={16} 
                              color={getRoleColor(user.role)} 
                            />
                            <Text style={[styles.roleText, { color: getRoleColor(user.role) }]}>
                              {user.role}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.actionButtons}>
                        <TouchableOpacity
                          style={styles.rejectButton}
                          onPress={() => handleReject(user.id, user.name)}
                        >
                          <Ionicons name="close-circle-outline" size={16} color="#dc2626" />
                          <Text style={styles.rejectButtonText}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.approveButton}
                          onPress={() => handleApprove(user.id, user.name)}
                        >
                          <Ionicons name="checkmark-circle-outline" size={16} color="#fff" />
                          <Text style={styles.approveButtonText}>Approve</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
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
  notificationBadge: {
    backgroundColor: '#ff4757',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
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
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e40af08',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  emptyDescription: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  approvalsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  usersList: {
    gap: 12,
  },
  userCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e40af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f59e0b',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  userMeta: {
    gap: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
  },
  roleContainer: {
    alignItems: 'flex-end',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  rejectButtonText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
  approveButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    shadowColor: '#1e40af',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  approveButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});
