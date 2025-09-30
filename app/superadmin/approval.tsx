import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Approval() {
  const router = useRouter();

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pending Approvals</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{pendingUsers.length}</Text>
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
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  badge: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
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
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e40af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
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
