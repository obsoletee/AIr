import { View, Image, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../../constants/images';
import FormField from '@/components/formField';
import StartButton from '@/components/startButton';
import { Link, router } from 'expo-router';

import { createUser } from '../../lib/appwrite';

interface Form {
  username: string;
  email: string;
  password: string;
}
const SignUp = () => {
  const [form, setForm] = useState<Form>({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.email || !form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#161622',
        height: '100%',
      }}
    >
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 24,
          }}
        >
          <Image
            source={images.logoUpdated}
            resizeMode="contain"
            style={{ width: 115, height: 35 }}
          />
          <Text
            style={{
              fontSize: 24,
              lineHeight: 32,
              fontFamily: 'Poppins-Medium',
              color: 'white',
              fontWeight: 'semibold',
              marginTop: 40,
            }}
          >
            Sign Up to AIr
          </Text>
          <FormField
            title="Username"
            placeholder="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            additionalStyles={{ marginTop: 28 }}
            keyboardType="default"
          />
          <FormField
            title="Email"
            placeholder="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            additionalStyles={{ marginTop: 28 }}
            keyboardType="email-address"
          />
          <FormField
            placeholder="Password"
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            additionalStyles={{ marginTop: 28 }}
            keyboardType="default"
          />
          <StartButton
            title="Sign Up"
            handlePress={submit}
            containerStyles={{ marginTop: 28, backgroundColor: 'pink' }}
            isLoading={isSubmitting}
          />
          <View
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              paddingTop: 20,
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 28,
                color: '#CDCDE0',
                fontFamily: 'Poppins-Regular',
              }}
            >
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              style={{
                fontSize: 18,
                lineHeight: 28,
                color: '#FF9C01',
                fontFamily: 'Poppins-Bold',
              }}
            >
              Log In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
