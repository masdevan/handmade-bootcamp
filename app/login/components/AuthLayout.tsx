export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="w-full max-w-6xl animate-scale-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-black/10 min-h-[600px]">
          {/* Left */}
          
          <img src="/images/feature-images.png" alt="Login Background" className="w-full h-full object-cover" />
  
          {/* Right */}
          <div className="p-12 flex items-center justify-center">
          <div className="w-full max-w-sm">
            {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
  