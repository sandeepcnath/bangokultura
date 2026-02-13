import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, AdminUser } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  adminUser: AdminUser | null;
  loading: boolean;
  demoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  enterDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for testing
const DEMO_USER = {
  id: 'demo-user-id',
  email: 'demo@admin.portal',
  user_metadata: { name: 'Demo Admin' },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as unknown as User;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdminUser(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAdminUser(session.user.id);
      } else {
        setAdminUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAdminUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        // If table doesn't exist or user not found, create a default admin
        console.log('Admin user not found, using auth user data');
        setAdminUser(null);
      } else {
        setAdminUser(data);
      }
    } catch (err) {
      console.error('Error fetching admin user:', err);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { name }
      }
    });
    
    if (!error && data.user) {
      // Try to create admin user record
      await supabase.from('admin_users').insert({
        id: data.user.id,
        email: data.user.email,
        name: name,
        role: 'admin'
      });
    }
    
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, adminUser, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
