import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface useAppwiteProps<T> {
  fn: () => Promise<T>; // fn возвращает промис с данными типа T
}

export const useAppwite = <T>({ fn }: useAppwiteProps<T>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null); // data может быть типа T или null

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fn]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, refetch };
};
