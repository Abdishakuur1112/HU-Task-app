import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function CreateUser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
  });

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New User</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Add New User</Text>
          <Text style={styles.formSubtitle}>Create a new account in just a few steps</Text>

          {/* Compact horizontal layout - all in one row */}
          <View style={styles.compactForm}>
            {/* Basic Info Column */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Basic Information</Text>
              
              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name *</Text>
                  <View style={styles.inputWithIcon}>
                    <Ionicons name="person-outline" size={16} color="#64748b" />
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
                    <Ionicons name="mail-outline" size={16} color="#64748b" />
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
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Department</Text>
                  <View style={styles.inputWithIcon}>
                    <Ionicons name="business-outline" size={16} color="#64748b" />
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
                    <Ionicons name="call-outline" size={16} color="#64748b" />
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
            </View>

            {/* Role Selection Column */}
            <View style={styles.formSection}>
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
                      size={20} 
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
                      <Ionicons name="checkmark-circle" size={18} color="#1e40af" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => router.back()}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCreateUser}
                >
                  <Ionicons name="person-add" size={16} color="#fff" />
                  <Text style={styles.createButtonText}>Create User</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  compactForm: {
    flexDirection: 'row',
    gap: 20,
  },
  formSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 6,
  },
  inputField: {
    flex: 1,
    fontSize: 13,
    color: '#1e293b',
  },
  roleSelection: {
    gap: 8,
    marginBottom: 16,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  roleCardActive: {
    backgroundColor: '#1e40af08',
    borderColor: '#1e40af',
  },
  roleCardContent: {
    flex: 1,
  },
  roleCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 2,
  },
  roleCardTitleActive: {
    color: '#1e293b',
  },
  roleCardDesc: {
    fontSize: 11,
    color: '#94a3b8',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  createButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#1e40af',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  createButtonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
});
