import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Spinner from '../components/ui/Spinner';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('verdoq_token', token);
      fetchUser().then(() => {
        navigate('/dashboard', { replace: true });
      });
    } else {
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate, fetchUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Spinner size="lg" className="mb-6" />
      <h2 className="text-xl font-heading font-bold text-text-primary">Authenticating...</h2>
      <p className="text-sm text-text-secondary mt-2">Please wait while we log you in securely.</p>
    </div>
  );
}
