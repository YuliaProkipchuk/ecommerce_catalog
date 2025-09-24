'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSession, setSession } from '../stores/slices/authSlice';
import { supabase } from '../helpers/supabase/supabaseclient';

export function AuthProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) dispatch(setSession(data.session));
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setSession(session));
        localStorage.setItem('authSession', JSON.stringify(session));
      } else {
        dispatch(clearSession());
        localStorage.removeItem('authSession');
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [dispatch, supabase]);

  return null;
}
