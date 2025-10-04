import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ActiveUsers() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  // Mock active users data
  const activeUsers = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      role: 'Student',
      department: 'Computer Science',
      status: 'online',
      lastActive: 'Now',
    },
    {
      id: 2,
      name: 'Bob Williams',
      email: 'bob.w@example.com',
      role: 'Admin',
      department: 'Administration',
      status: 'online',
      lastActive: '2 min ago',
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol.d@example.com',
      role: 'Dept-Admin',
      department: 'Engineering',
      status: 'online',
      lastActive: '5 min ago',
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.b@example.com',
      role: 'Student',
      department: 'Mathematics',
      status: 'away',
      lastActive: '15 min ago',
    },
    {
      id: 5,
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      role: 'Other',
      department: 'Library',
      status: 'online',
      lastActive: 'Now',
    },
  ];

  const filteredUsers = activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Student':
        return '#3498db';
      case 'Admin':
        return '#e74c3c';
      case 'Dept-Admin':
        return '#f39c12';
      default:
        return '#9b59b6';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? '#27ae60' : '#f39c12';
  };

  const handleNavigation = (route: string) => {
    setActiveTab(route);
    if (route === 'dashboard') {
      router.push('/superadmin');
    } else if (route === 'create-user') {
      router.push('/superadmin/create-user');
    } else if (route === 'approval') {
      router.push('/superadmin/approval');
    }
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
                  <Text style={styles.headerTitle}>Active Users</Text>
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

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#7f8c8d" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#7f8c8d" />
              </TouchableOpacity>
            )}
          </View>

          {/* Stats Bar */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <View style={[styles.statusDot, { backgroundColor: '#27ae60' }]} />
              <Text style={styles.statText}>
                {activeUsers.filter((u) => u.status === 'online').length} Online
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statusDot, { backgroundColor: '#f39c12' }]} />
              <Text style={styles.statText}>
                {activeUsers.filter((u) => u.status === 'away').length} Away
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            {filteredUsers.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={80} color="#95a5a6" />
                <Text style={styles.emptyText}>No users found</Text>
                <Text style={styles.emptySubtext}>Try adjusting your search</Text>
              </View>
            ) : (
              filteredUsers.map((user) => (
                <View key={user.id} style={styles.userCard}>
                  <View style={styles.userHeader}>
                    <View style={styles.avatarContainer}>
                      <View style={styles.avatarPlaceholder}>
                        <Ionicons name="person" size={24} color="#fff" />
                      </View>
                      <View
                        style={[
                          styles.statusIndicator,
                          { backgroundColor: getStatusColor(user.status) },
                        ]}
                      />
                    </View>

                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{user.name}</Text>
                      <Text style={styles.userEmail}>{user.email}</Text>
                    </View>

                    <View
                      style={[
                        styles.roleBadge,
                        { backgroundColor: getRoleBadgeColor(user.role) },
                      ]}
                    >
                      <Text style={styles.roleBadgeText}>{user.role}</Text>
                    </View>
                  </View>

                  <View style={styles.userDetails}>
                    <View style={styles.detailRow}>
                      <Ionicons name="business-outline" size={16} color="#7f8c8d" />
                      <Text style={styles.detailText}>{user.department}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="time-outline" size={16} color="#7f8c8d" />
                      <Text style={styles.detailText}>Last active: {user.lastActive}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.viewProfileButton}>
                    <Text style={styles.viewProfileText}>View Profile</Text>
                    <Ionicons name="chevron-forward" size={16} color="#3498db" />
                  </TouchableOpacity>
                </View>
              ))
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#2c3e50',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 10,
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 8,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  roleBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  userDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#2c3e50',
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 8,
  },
  viewProfileText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
    marginRight: 4,
  },
});
