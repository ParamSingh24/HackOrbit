import React, { useState } from 'react';

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // @ts-ignore
      const { getAuth, createUserWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      // @ts-ignore
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // @ts-ignore
      const { getAuth, GoogleAuthProvider, signInWithPopup } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
      // @ts-ignore
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative glass-box p-8 rounded-2xl border border-cyan-400 shadow-2xl max-w-md w-full text-center bg-black bg-opacity-60">
        <button className="absolute top-4 right-4 text-white text-2xl font-bold" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">Sign Up</h2>
        {success ? (
          <div className="text-green-400 font-semibold mb-4">Sign up successful! Welcome to CareerBoost 🎉</div>
        ) : (
          <>
            <form onSubmit={handleEmailSignUp} className="space-y-4 mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="w-full glassy-button px-4 py-2 rounded text-white font-semibold border border-cyan-400 hover:bg-[#00FFFF] hover:text-black transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
            <div className="my-4 text-gray-400">or</div>
            <button
              className="w-full glassy-button px-4 py-2 rounded text-white font-semibold border border-cyan-400 flex items-center justify-center gap-2 hover:bg-[#00FFFF] hover:text-black transition-all duration-200"
              onClick={handleGoogleSignUp}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303C33.962 32.833 29.418 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c2.803 0 5.377.99 7.413 2.626l6.293-6.293C34.583 6.527 29.617 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20c11.045 0 19.954-8.954 19.954-20 0-1.341-.138-2.651-.343-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 13 24 13c2.803 0 5.377.99 7.413 2.626l6.293-6.293C34.583 6.527 29.617 4 24 4c-7.732 0-14.37 4.41-17.694 10.691z"/><path fill="#FBBC05" d="M24 44c5.356 0 10.207-1.843 13.994-5.018l-6.481-5.307C29.418 36 24 36 24 36c-5.418 0-9.962-3.167-11.303-8.083l-6.571 5.081C9.63 39.59 16.268 44 24 44z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303C34.62 32.833 29.418 36 24 36c-5.418 0-9.962-3.167-11.303-8.083l-6.571 5.081C9.63 39.59 16.268 44 24 44c5.356 0 10.207-1.843 13.994-5.018l-6.481-5.307C29.418 36 24 36 24 36c-5.418 0-9.962-3.167-11.303-8.083l-6.571 5.081C9.63 39.59 16.268 44 24 44z"/></g></svg>
              Continue with Google
            </button>
            {error && <div className="text-red-400 mt-4">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpModal; 