import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import { Shield, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
            <Shield className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl font-heading font-bold text-text-primary">Verdoq</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/analyze" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                Analyze
              </Link>
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-border" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center">
                    <User className="w-4 h-4 text-text-secondary" />
                  </div>
                )}
                <span className="text-sm text-text-secondary hidden sm:block">{user?.name}</span>
                <button onClick={handleLogout} className="text-text-secondary hover:text-danger transition-colors" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/google`;
              }}
            >
              Sign in with Google
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
