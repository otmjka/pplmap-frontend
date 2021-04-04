import React, { useState, useEffect } from 'react';

import firebaseService, {
  CHANNEL_NAME_ONMESSAGE,
  User,
} from '../../services/FirebaseService';

export type UseAppLoadingState = {
  loading: boolean;
  isUserAuthicated: boolean;
  user: User;
  logout: () => void;
};

const useAppLoading = (): UseAppLoadingState => {
  const [appData, setAppData] = useState<UseAppLoadingState>({
    loading: firebaseService.isAppLoading,
    isUserAuthicated: firebaseService.isAuthicated,
    user: firebaseService.currentUser,
    logout: firebaseService.logout,
  });
  useEffect(() => {
    const observer = firebaseService.setListener(CHANNEL_NAME_ONMESSAGE, () => {
      setAppData({
        loading: firebaseService.isAppLoading,
        isUserAuthicated: firebaseService.isAuthicated,
        user: firebaseService.currentUser,
        logout: firebaseService.logout,
      });
    });
    return () => observer();
  }, []);

  return appData;
};

export default useAppLoading;
