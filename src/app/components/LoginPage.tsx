import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { getColor } = useTheme();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const from = (location.state as any)?.from?.pathname || '/admin';

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API delay for realistic feel
    setTimeout(() => {
      const success = login(formData.username, formData.password);
      
      if (success) {
        toast.success('Login successful! 🎉', {
          description: 'Welcome back, admin'
        });
        navigate(from, { replace: true });
      } else {
        toast.error('Invalid credentials', {
          description: 'Please check your username and password'
        });
        setErrors({
          username: 'Invalid username or password',
          password: 'Invalid username or password'
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: getColor('bgPrimary') }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{ background: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Light')})` }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" 
          style={{ 
            background: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
            animationDelay: '1s'
          }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-2xl relative"
            style={{ background: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Dark')})` }}
          >
            <div 
              className="absolute inset-0 rounded-2xl blur-lg opacity-50"
              style={{ background: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Light')})` }}
            ></div>
            <Shield className="h-8 w-8 text-white relative z-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>Admin Access</h1>
          <p style={{ color: getColor('textSecondary') }}>Secure authentication required</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card 
            className="border-2 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
          >
            <CardHeader 
              className="pb-6 border-b"
              style={{
                background: `linear-gradient(to right, ${getColor('accent2')}15, transparent)`,
                borderColor: getColor('border')
              }}
            >
              <CardTitle className="text-2xl" style={{ color: getColor('textPrimary') }}>Sign In</CardTitle>
              <CardDescription style={{ color: getColor('textSecondary') }}>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base font-semibold" style={{ color: getColor('textPrimary') }}>
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: getColor('textTertiary') }} />
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => {
                        setFormData({ ...formData, username: e.target.value });
                        setErrors({ ...errors, username: '' });
                      }}
                      placeholder="Enter your username"
                      className={`h-12 pl-11 rounded-xl border-2 transition-all ${
                        errors.username
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : ''
                      }`}
                      style={{
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary'),
                        borderColor: errors.username ? '#ef4444' : getColor('border')
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.username && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 flex items-center gap-1 px-3 py-2 rounded-lg border border-red-500/20"
                      style={{ backgroundColor: `${getColor('error')}10` }}
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.username}
                    </motion.p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-semibold" style={{ color: getColor('textPrimary') }}>
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: getColor('textTertiary') }} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setErrors({ ...errors, password: '' });
                      }}
                      placeholder="Enter your password"
                      className={`h-12 pl-11 pr-11 rounded-xl border-2 transition-all ${
                        errors.password
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : ''
                      }`}
                      style={{
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary'),
                        borderColor: errors.password ? '#ef4444' : getColor('border')
                      }}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: getColor('textTertiary') }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 flex items-center gap-1 px-3 py-2 rounded-lg border border-red-500/20"
                      style={{ backgroundColor: `${getColor('error')}10` }}
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Demo Credentials Info */}
                <div 
                  className="border-2 rounded-xl p-4 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(to right, ${getColor('accent3')}10, ${getColor('accent3')}05)`,
                    borderColor: `${getColor('accent3')}50`
                  }}
                >
                  <p className="text-sm" style={{ color: getColor('textSecondary') }}>
                    <strong style={{ color: getColor('accent3') }}>Demo Credentials:</strong><br />
                    Username: <code className="px-2 py-0.5 rounded border" style={{ 
                      backgroundColor: getColor('bgSecondary'),
                      color: getColor('accent3'),
                      borderColor: `${getColor('accent3')}50`
                    }}>admin</code><br />
                    Password: <code className="px-2 py-0.5 rounded border" style={{ 
                      backgroundColor: getColor('bgSecondary'),
                      color: getColor('accent3'),
                      borderColor: `${getColor('accent3')}50`
                    }}>admin123</code>
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base shadow-lg rounded-xl font-semibold text-white border-0 relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Dark')})`
                  }}
                  disabled={isLoading}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(to right, ${getColor('accent2Light')}, ${getColor('accent2')})` }}
                  ></div>
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" />
                        Sign In
                      </>
                    )}
                  </span>
                </Button>

                {/* Back to Home */}
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/')}
                    style={{ color: getColor('textSecondary') }}
                  >
                    ← Back to Home
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-sm flex items-center justify-center gap-2" style={{ color: getColor('textTertiary') }}>
              <span 
                className="inline-block w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: getColor('success') }}
              ></span>
              Encrypted connection active
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
