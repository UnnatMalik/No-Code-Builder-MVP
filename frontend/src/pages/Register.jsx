import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register({ username, email, password });
      navigate('/dashboard');
    } catch (err) {
      if (err?.payload) {
        const firstFieldError = Object.values(err.payload)[0];
        if (Array.isArray(firstFieldError) && firstFieldError.length > 0) {
          setError(firstFieldError[0]);
        } else {
          setError('Unable to register with provided details.');
        }
      } else {
        setError('Unable to register with provided details.');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[32rem] relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-[2rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-headline font-extrabold text-slate-900 mb-3">Create Account</h1>
            <p className="text-slate-500 text-sm">Start building your no-code website in minutes.</p>
            {error && <p className="text-red-500 text-sm mt-3 font-medium">{error}</p>}
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-3.5 text-slate-900 transition-all placeholder:text-slate-400 outline-none appearance-none"
                placeholder="your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-3.5 text-slate-900 transition-all placeholder:text-slate-400 outline-none appearance-none"
                placeholder="hello@creators.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-3.5 text-slate-900 transition-all placeholder:text-slate-400 outline-none appearance-none"
                placeholder="At least 8 characters"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-on-primary py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-on-surface-variant font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-secondary font-bold transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
