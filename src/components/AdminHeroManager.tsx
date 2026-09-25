import React, { useState, useEffect, useRef } from 'react';
import { Lock, Upload, Image as ImageIcon, CheckCircle2, AlertCircle, ArrowLeft, LogOut, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { GeetaLogo } from './AdityaLogo';

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const AdminHeroManager: React.FC = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Hero Image State
  const [currentHeroImage, setCurrentHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Check current session & fetch current hero image
  useEffect(() => {
    checkSession();
    fetchCurrentHeroImage();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth?action=session', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(!!data.authenticated);
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setCheckingAuth(false);
    }
  };

  const fetchCurrentHeroImage = async () => {
    try {
      const res = await fetch('/api/hero-image', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setCurrentHeroImage(data.url);
          setLastUpdated(data.updatedAt);
        }
      }
    } catch (err) {
      console.error('Failed to load current hero image:', err);
    }
  };

  // 2. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });

      const data = await res.json();

      if (res.ok && data.authenticated) {
        setIsAuthenticated(true);
        setPassword('');
        fetchCurrentHeroImage();
      } else {
        setLoginError(data.error || 'Incorrect admin password. Please try again.');
      }
    } catch (err) {
      setLoginError('Failed to authenticate. Please verify server connection.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 3. Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsAuthenticated(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadStatus(null);
    }
  };

  // 4. Handle File Selection & Client Validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadStatus(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Client-side validation: MIME Type
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      setUploadStatus({
        type: 'error',
        message: 'Invalid file type. Only JPG, JPEG, PNG, and WebP image files are allowed.',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Client-side validation: File Size (5 MB max)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadStatus({
        type: 'error',
        message: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 5 MB.`,
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // 5. Handle Upload to Vercel Blob / Local Storage
  const handleUpdateHeroImage = async () => {
    if (!selectedFile) {
      setUploadStatus({ type: 'error', message: 'Please select an image file first.' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/hero-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.data?.url) {
        setCurrentHeroImage(data.data.url);
        setLastUpdated(data.data.updatedAt);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setUploadStatus({
          type: 'success',
          message: 'Hero image updated successfully! Public website is now displaying the new image.',
        });
      } else {
        setUploadStatus({
          type: 'error',
          message: data.error || 'Failed to update hero image. Please try again.',
        });
      }
    } catch (err: any) {
      setUploadStatus({
        type: 'error',
        message: err.message || 'An error occurred during upload. Please check your network connection.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 text-slate-900 font-sans">
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full border border-[#E7DFD3] shadow-md text-slate-700">
          <Loader2 className="w-5 h-5 animate-spin text-red-600" />
          <span className="font-bold text-xs uppercase tracking-wider">Verifying Admin Access...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Floating Rounded Cream Bar (Matching Website Navbar Style) */}
      <div className="sticky top-3 sm:top-5 z-40 px-3 sm:px-6 lg:px-8 2xl:px-12 w-full max-w-[1536px] mx-auto transition-all">
        <header className="w-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E7DFD3] rounded-full shadow-[0_12px_36px_-6px_rgba(45,35,20,0.09),0_2px_12px_-2px_rgba(45,35,20,0.04)] px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 flex items-center justify-between transition-all">
          
          {/* Left: Brand Logo & Admin Badge */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2" title="Return to Public Website">
              <GeetaLogo size="sm" showTagline={false} />
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>Admin Portal</span>
            </div>
          </div>

          {/* Right: View Website & Logout Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs font-bold text-slate-700 hover:text-red-600 flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E7DFD3] bg-white hover:bg-amber-900/[0.04] transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Website</span>
            </a>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 border border-red-200 hover:bg-red-100 transition-all shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </header>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center my-6">
        {!isAuthenticated ? (
          /* ---------------- LOGIN SCREEN ---------------- */
          <div className="max-w-md w-full mx-auto bg-white border border-[#E7DFD3] rounded-3xl p-7 sm:p-10 shadow-[0_20px_50px_-12px_rgba(45,35,20,0.1)] space-y-6 my-auto">
            <div className="text-center space-y-2.5">
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              <div className="text-[11px] font-extrabold text-red-600 uppercase tracking-widest pt-1">
                GEETA SOLARS
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
                Admin Hero Manager
              </h1>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Enter your administrator password to update the live hero banner.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn-red w-full py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Login to Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2 text-[11px] text-slate-400 font-medium">
              Authorized access only &bull; Protected by server-side authentication
            </div>
          </div>
        ) : (
          /* ---------------- HERO IMAGE MANAGER ---------------- */
          <div className="space-y-8 my-auto py-4">
            {/* Title Section */}
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>GEETA SOLARS LIVE ASSET CONTROL</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
                Hero Image Manager
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Update the main photography image displayed in the public hero section.
              </p>
            </div>

            {/* Status Alert */}
            {uploadStatus && (
              <div
                className={`p-4 rounded-3xl border text-xs sm:text-sm flex items-start gap-3 shadow-md ${
                  uploadStatus.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                {uploadStatus.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-bold">{uploadStatus.message}</p>
                  {uploadStatus.type === 'success' && (
                    <a
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 underline font-bold text-xs mt-1 inline-block"
                    >
                      Open Homepage in New Tab &rarr;
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Grid of Current Image & New Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {/* Card 1: Current Hero Image */}
              <div className="bg-white border border-[#E7DFD3] rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(45,35,20,0.06)] flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    Current Hero Image
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {lastUpdated
                      ? `Last updated: ${new Date(lastUpdated).toLocaleString('en-IN')}`
                      : 'Default active image'}
                  </p>
                </div>

                {/* Current Image Container */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] sm:aspect-[16/11] border border-slate-200 shadow-inner">
                  <img
                    src={currentHeroImage}
                    alt="Current Hero"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                    Active on Website
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 text-center font-medium">
                  Aspect ratio: 4:3 / 16:11 &bull; Auto-optimized for desktop &amp; mobile
                </div>
              </div>

              {/* Card 2: Choose & Preview New Image */}
              <div className="bg-white border border-[#E7DFD3] rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(45,35,20,0.06)] flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-red-600" />
                    New Image Preview
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Formats: JPG, PNG, WebP &bull; Max size: 5 MB
                  </p>
                </div>

                {/* Preview Image Container */}
                <div className="relative rounded-2xl overflow-hidden bg-[#FAF7F2] aspect-[4/3] sm:aspect-[16/11] border border-[#E7DFD3] flex items-center justify-center">
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="New Hero Preview"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black shadow-md">
                        Ready to Upload
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6 space-y-2 text-slate-400">
                      <ImageIcon className="w-10 h-10 mx-auto text-slate-300" />
                      <p className="text-xs font-semibold text-slate-500">No new image selected</p>
                      <p className="text-[11px] text-slate-400">
                        Click "Choose New Image" below to preview.
                      </p>
                    </div>
                  )}
                </div>

                {/* File Input & Action Buttons */}
                <div className="space-y-3">
                  {/* Hidden native input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                    className="hidden"
                    id="hero-file-upload"
                  />

                  {/* Choose New Image Button */}
                  <label
                    htmlFor="hero-file-upload"
                    className="w-full py-3 rounded-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-slate-800 border border-[#E7DFD3] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm hover:shadow"
                  >
                    <Upload className="w-4 h-4 text-red-600" />
                    <span>{selectedFile ? 'Change Selected Image' : 'Choose New Image'}</span>
                  </label>

                  {/* Update Hero Image Action */}
                  <button
                    type="button"
                    onClick={handleUpdateHeroImage}
                    disabled={!selectedFile || isUploading}
                    className="btn-red w-full py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Updating Hero Image...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Publish New Hero Image</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E7DFD3] py-5 text-center text-xs text-slate-500 font-medium">
        &copy; {new Date().getFullYear()} Geeta Solars &bull; Dedicated Hero Image Manager
      </footer>
    </div>
  );
};

export default AdminHeroManager;
