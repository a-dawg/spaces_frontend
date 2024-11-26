'use client';

import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      // TODO: Implement actual authentication logic here
      // For now, we'll just simulate a successful login
      console.log('Login attempt with:', email);
      
      // Redirect to home page after successful login
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}
