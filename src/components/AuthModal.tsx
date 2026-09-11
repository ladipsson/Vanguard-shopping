import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Check, 
  Eye, 
  EyeOff, 
  UserCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: '', color: '' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, text: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, text: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, text: 'Good', color: 'bg-blue-500' };
    return { score: 100, text: 'Strong (Sartorial Safe)', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSocialLogin = (provider: 'google' | 'apple' | 'github') => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      let mockName = 'Prince Tunde';
      let mockEmail = 'princetunde17@gmail.com';
      let mockAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80';

      if (provider === 'apple') {
        mockName = 'Sterling Vance (Apple ID)';
        mockEmail = 's.vance@icloud.com';
        mockAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80';
      } else if (provider === 'github') {
        mockName = 'Julian Croft (GitHub)';
        mockEmail = 'j.croft@atelier.dev';
        mockAvatar = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80';
      }

      const user: User = {
        id: `usr-${Date.now()}`,
        name: mockName,
        email: mockEmail,
        avatar: mockAvatar,
        role,
        provider,
        memberSince: 'March 2026',
        ordersCount: 3,
        savedAddress: {
          name: mockName,
          address: '742 Montgomery Street',
          city: 'San Francisco',
          postalCode: '94111',
          country: 'United States',
          phone: '+1 (555) 438-9921'
        }
      };

      setIsLoading(false);
      onLogin(user);
      onClose();
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    if (tab === 'register' && !name) {
      setError('Please provide your full name.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const user: User = {
        id: `usr-${Date.now()}`,
        name: tab === 'register' ? name : (email.split('@')[0] || 'Sartorial Member'),
        email,
        role,
        provider: 'email',
        memberSince: 'Today',
        ordersCount: 1,
        savedAddress: {
          name: tab === 'register' ? name : 'Valued Client',
          address: '280 Park Avenue',
          city: 'New York',
          postalCode: '10017',
          country: 'United States',
          phone: '+1 (555) 892-1002'
        }
      };

      setIsLoading(false);
      onLogin(user);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="auth-modal-dialog"
        className="bg-white w-full max-w-md shadow-2xl border border-stone-300 relative overflow-hidden"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-widest text-amber-400 uppercase font-bold">
              Atelier Member Portal
            </span>
            <h2 className="font-['Playfair_Display',serif] text-xl font-bold">
              {tab === 'login' ? 'Welcome Back to Vanguard' : 'Create Exclusive Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200 text-xs font-bold">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-center transition ${
              tab === 'login' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-center transition ${
              tab === 'register' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          {/* Social Media Login Buttons */}
          <div className="space-y-2">
            <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
              1-Click Social Verification
            </span>

            {/* Google */}
            <button
              id="auth-google-login-btn"
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full py-2.5 px-4 border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-semibold flex items-center justify-center space-x-3 transition bg-white shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Apple */}
            <button
              id="auth-apple-login-btn"
              type="button"
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-black text-white hover:bg-stone-800 text-xs font-semibold flex items-center justify-center space-x-3 transition"
            >
              <span className="text-base leading-none"></span>
              <span>Continue with Apple</span>
            </button>

            {/* GitHub */}
            <button
              id="auth-github-login-btn"
              type="button"
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-stone-800 text-white hover:bg-stone-900 text-xs font-semibold flex items-center justify-center space-x-3 transition"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-stone-200"></div>
            <span className="flex-shrink mx-3 text-[10px] text-stone-600 uppercase tracking-widest font-medium">
              Or Traditional Credentials
            </span>
            <div className="flex-grow border-t border-stone-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sterling Montgomery"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 focus:outline-none focus:border-stone-900"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="client@vanguard-atelier.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 pl-9 border border-stone-300 focus:outline-none focus:border-stone-900"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-2.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">Password</label>
                {tab === 'login' && (
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Reset instructions sent to your email.'); }} className="text-[11px] text-amber-700 hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs p-2.5 pl-9 pr-9 border border-stone-300 focus:outline-none focus:border-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-2.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-3 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength bar when registering */}
              {tab === 'register' && password && (
                <div className="mt-2 space-y-1">
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium block">
                    Security Rating: <strong>{strength.text}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Role Demo Toggle (Allows toggling between Customer & Admin for inspecting features) */}
            <div className="p-3 bg-stone-50 border border-stone-200 text-xs">
              <span className="font-semibold text-stone-900 block mb-1.5">Account Role Access:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`py-1.5 px-2 border text-center font-medium transition ${
                    role === 'customer'
                      ? 'bg-stone-900 text-white font-bold border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  VIP Client
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-1.5 px-2 border text-center font-medium transition ${
                    role === 'admin'
                      ? 'bg-amber-600 text-white font-bold border-amber-600'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  Store Owner / Admin
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-stone-950 hover:bg-amber-600 text-white text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2 shadow"
            >
              {isLoading ? (
                <span>Authenticating Secure Session...</span>
              ) : (
                <>
                  <span>{tab === 'login' ? 'Sign In to Account' : 'Create Exclusive Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center space-x-2 text-[10px] text-stone-500 pt-2 border-t border-stone-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted credentials with automated multi-factor verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
