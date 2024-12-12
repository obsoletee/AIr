import StartButton from '@/components/startButton';
import { deleteCurrentSession } from '@/lib/appwrite';
import { router } from 'expo-router';
import { View } from 'react-native';

const Profile = () => {
  const handlePress = () => {
    deleteCurrentSession();
    router.push('/');
  };
  return (
    <View>
      <StartButton handlePress={handlePress} title="Logout" />
    </View>
  );
};

export default Profile;
