import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getUserById } from '@database/schema/User';

type UserData = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  gender: 'male' | 'female' | 'other';
  dob: Date;
};

const ProfileScreen = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userID = await AsyncStorage.getItem('userID');

        if (!userID) {
          setLoading(false);
          return;
        }

        const userData = await getUserById(userID);
        setUser(userData);
      } catch (e) {
        console.error('Error loading profile:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={48} color="#fff" />
      </View>

      <Text style={styles.name}>{user.name}</Text>

      <TouchableOpacity
        disabled
        style={[styles.editButton, styles.editButtonDisabled]}
      >
        <Ionicons name="create-outline" size={16} color="#999" />
        <Text style={styles.editButtonTextDisabled}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <ProfileRow icon="mail-outline" label="Email" value={user.email} />
        <ProfileRow icon="call-outline" label="Mobile" value={user.mobile} />
        <ProfileRow
          icon="male-female-outline"
          label="Gender"
          value={user.gender}
        />
        <ProfileRow
          icon="calendar-outline"
          label="Date of Birth"
          value={new Date(user.dob).toDateString()}
        />
      </View>
    </View>
  );
};

const ProfileRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={18} color="#555" />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111',
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },

  editButtonDisabled: {
    backgroundColor: '#EEE',
  },

  editButtonTextDisabled: {
    marginLeft: 6,
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },

  value: {
    fontSize: 14,
    color: '#111',
    fontWeight: '500',
  },
});
