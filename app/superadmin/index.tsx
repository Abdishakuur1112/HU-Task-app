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
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Mock data - replace with actual data from your backend
  const userStats = {
    students: 1247,
    admins: 12,
    deptAdmins: 8,
    others: 45,
  };

  const totalAdminMembers = userStats.admins + userStats.deptAdmins;

  // Mock admin members list
  const adminMembers = [
    { id: 1, name: 'Ahmed Hassan', role: 'Admin', email: 'ahmed.h@university.edu', status: 'online' },
    { id: 2, name: 'Fatima Mohamed', role: 'Admin', email: 'fatima.m@university.edu', status: 'online' },
    { id: 3, name: 'Omar Ali', role: 'Dept-Admin', email: 'omar.a@university.edu', status: 'away' },
    { id: 4, name: 'Amina Yusuf', role: 'Admin', email: 'amina.y@university.edu', status: 'online' },
    { id: 5, name: 'Ibrahim Ahmed', role: 'Dept-Admin', email: 'ibrahim.a@university.edu', status: 'online' },
    { id: 6, name: 'Khadija Abdi', role: 'Admin', email: 'khadija.a@university.edu', status: 'away' },
  ];

  const handleNavigation = (route: string) => {
    setActiveTab(route);
    if (route === 'create-user') {
      router.push('/superadmin/create-user');
    } else if (route === 'approval') {
      router.push('/superadmin/approval');
    } else if (route === 'active') {
      router.push('/superadmin/active');
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
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
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
                  <Text style={styles.headerTitle}>Dashboard Overview</Text>
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

          {/* User Statistics */}
          <View style={styles.statsContainer}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>User Analytics</Text>
                <Text style={styles.sectionSubtitle}>Real-time user distribution across roles</Text>
              </View>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View Details</Text>
                <Ionicons name="arrow-forward" size={16} color="#1e40af" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.statsGrid}>
              {/* Student Users Card */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#1e40af15' }]}>
                  <Ionicons name="school" size={28} color="#1e40af" />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statLabel}>Student Users</Text>
                  <Text style={styles.statNumber}>{userStats.students.toLocaleString()}</Text>
                  <View style={styles.statTrend}>
                    <Ionicons name="trending-up" size={14} color="#10b981" />
                    <Text style={styles.statTrendText}>+12.5% this month</Text>
                  </View>
                </View>
              </View>

              {/* Admin Users Card */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#ef444415' }]}>
                  <Ionicons name="shield-checkmark" size={28} color="#ef4444" />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statLabel}>Admin Users</Text>
                  <Text style={styles.statNumber}>{userStats.admins}</Text>
                  <View style={styles.statTrend}>
                    <Ionicons name="remove" size={14} color="#64748b" />
                    <Text style={styles.statTrendText}>No change</Text>
                  </View>
                </View>
              </View>

              {/* Dept-Admin Users Card */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#ffa50215' }]}>
                  <Ionicons name="business" size={28} color="#ffa502" />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statLabel}>Dept-Admin Users</Text>
                  <Text style={styles.statNumber}>{userStats.deptAdmins}</Text>
                  <View style={styles.statTrend}>
                    <Ionicons name="trending-up" size={14} color="#10b981" />
                    <Text style={styles.statTrendText}>+2 new</Text>
                  </View>
                </View>
              </View>

              {/* Other Users Card */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#a29bfe15' }]}>
                  <Ionicons name="people" size={28} color="#a29bfe" />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statLabel}>Other Users</Text>
                  <Text style={styles.statNumber}>{userStats.others}</Text>
                  <View style={styles.statTrend}>
                    <Ionicons name="trending-down" size={14} color="#ef4444" />
                    <Text style={styles.statTrendText}>-3.2% this month</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Admin Members List */}
            <View style={styles.totalAdminCard}>
              <View style={styles.totalAdminHeader}>
                <View>
                  <Text style={styles.totalAdminLabel}>Admin Members</Text>
                  <Text style={styles.totalAdminDescription}>
                    {totalAdminMembers} Total • {userStats.admins} Admins • {userStats.deptAdmins} Dept-Admins
                  </Text>
                </View>
                <View style={styles.totalAdminBadge}>
                  <Text style={styles.totalAdminBadgeText}>MANAGEMENT</Text>
                </View>
              </View>

              {/* Admin Members List */}
              <View style={styles.adminMembersList}>
                {adminMembers.map((member, index) => (
                  <View key={member.id}>
                    <View style={styles.adminMemberItem}>
                      <View style={styles.adminMemberLeft}>
                        <View style={styles.adminMemberAvatarContainer}>
                          <View style={styles.adminMemberAvatar}>
                            <Text style={styles.adminMemberAvatarText}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                          </View>
                          <View style={[
                            styles.adminMemberStatus,
                            { backgroundColor: member.status === 'online' ? '#10b981' : '#ffa502' }
                          ]} />
                        </View>
                        <View style={styles.adminMemberInfo}>
                          <Text style={styles.adminMemberName}>{member.name}</Text>
                          <Text style={styles.adminMemberEmail}>{member.email}</Text>
                        </View>
                      </View>
                      <View style={[
                        styles.adminMemberRoleBadge,
                        { backgroundColor: member.role === 'Admin' ? '#1e40af15' : '#ffa50215' }
                      ]}>
                        <Text style={[
                          styles.adminMemberRoleText,
                          { color: member.role === 'Admin' ? '#1e40af' : '#ffa502' }
                        ]}>
                          {member.role}
                        </Text>
                      </View>
                    </View>
                    {index < adminMembers.length - 1 && <View style={styles.adminMemberDivider} />}
                  </View>
                ))}
              </View>

              {/* View All Button */}
              <TouchableOpacity style={styles.viewAllAdminsButton}>
                <Text style={styles.viewAllAdminsText}>View All Admin Members</Text>
                <Ionicons name="arrow-forward" size={16} color="#1e40af" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity Section */}
          <View style={styles.activitySection}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <Text style={styles.sectionSubtitle}>Latest system events and updates</Text>
              </View>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="arrow-forward" size={16} color="#1e40af" />
              </TouchableOpacity>
            </View>
            <View style={styles.activityCard}>
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#10b98115' }]}>
                  <Ionicons name="person-add" size={18} color="#10b981" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>New user registered</Text>
                  <Text style={styles.activitySubtext}>John Doe joined as Student</Text>
                </View>
                <Text style={styles.activityTime}>2 min</Text>
              </View>
              <View style={styles.activityDivider} />
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#1e40af15' }]}>
                  <Ionicons name="checkmark-circle" size={18} color="#1e40af" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>User approved</Text>
                  <Text style={styles.activitySubtext}>Jane Smith - Admin role</Text>
                </View>
                <Text style={styles.activityTime}>15 min</Text>
              </View>
              <View style={styles.activityDivider} />
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#ffa50215' }]}>
                  <Ionicons name="shield-checkmark" size={18} color="#ffa502" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Settings updated</Text>
                  <Text style={styles.activitySubtext}>Security preferences changed</Text>
                </View>
                <Text style={styles.activityTime}>1 hour</Text>
              </View>
              <View style={styles.activityDivider} />
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#a29bfe15' }]}>
                  <Ionicons name="document-text" size={18} color="#a29bfe" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Report generated</Text>
                  <Text style={styles.activitySubtext}>Monthly analytics report</Text>
                </View>
                <Text style={styles.activityTime}>3 hours</Text>
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
  statsContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748b',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f5',
    marginHorizontal: 4,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 6,
    fontWeight: '500',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statTrendText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  totalAdminCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#1e40af',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#1e40af20',
  },
  totalAdminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f5',
  },
  totalAdminBadge: {
    backgroundColor: '#1e40af15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  totalAdminBadgeText: {
    fontSize: 11,
    color: '#1e40af',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  totalAdminLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
  },
  totalAdminDescription: {
    fontSize: 13,
    color: '#64748b',
  },
  adminMembersList: {
    marginBottom: 16,
  },
  adminMemberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  adminMemberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  adminMemberAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  adminMemberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e40af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminMemberAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  adminMemberStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  adminMemberInfo: {
    flex: 1,
  },
  adminMemberName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  adminMemberEmail: {
    fontSize: 13,
    color: '#64748b',
  },
  adminMemberRoleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  adminMemberRoleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  adminMemberDivider: {
    height: 1,
    backgroundColor: '#f0f0f5',
  },
  viewAllAdminsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f5',
    gap: 6,
  },
  viewAllAdminsText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
  },
  activitySection: {
    marginBottom: 32,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f5',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  activitySubtext: {
    fontSize: 13,
    color: '#64748b',
  },
  activityTime: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  activityDivider: {
    height: 1,
    backgroundColor: '#f0f0f5',
    marginVertical: 4,
  },
});