import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-center mb-8">
          {/* Use Next.js Link component for internal routing */}
          <Link href="/eth">
            <a
              className="bg-accent text-accent-foreground rounded-md px-6 py-2 font-sans font-semibold hover:bg-accent/80 transition shadow-neon animate-fadeIn"
            >
              Start New Token
            </a>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative text-center py-16 px-4 rounded-xl mb-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)' }}>
          <div className="absolute inset-0 opacity-20 animate-pulse" style={{ background: 'linear-gradient(135deg, #9333EA 0%, #6B21A8 100%)' }}></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-sans text-primary-foreground mb-4 animate-fadeIn">
              Launch Your Token on Ethereum
            </h2>
            <p className="text-lg md:text-xl mb-6 text-secondary-foreground font-sans animate-fadeIn">
              No Coding. Lightning Fast. Ethereum-Powered.
            </p>
            {/* Use Link for navigation */}
            <Link href="/eth">
              <a
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg font-semibold font-sans hover:bg-primary/80 transition shadow-neon animate-fadeIn"
              >
                🚀 Launch on Ethereum
              </a>
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 text-center rounded-xl mb-16 bg-background">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-8 relative">
            How It Works
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent animate-fadeIn"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 animate-fadeIn">
              <h3 className="text-xl font-semibold font-sans text-primary mb-2">1. Connect Wallet</h3>
              <p className="text-muted-foreground font-sans">Use MetaMask wallet to connect securely on Ethereum.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 animate-fadeIn">
              <h3 className="text-xl font-semibold font-sans text-primary mb-2">2. Fill Token Details</h3>
              <p className="text-muted-foreground font-sans">Enter your token name, symbol, and supply.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 animate-fadeIn">
              <h3 className="text-xl font-semibold font-sans text-primary mb-2">3. Launch Instantly</h3>
              <p className="text-muted-foreground font-sans">Within seconds, your token will be created on Ethereum!</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4 rounded-xl mb-16 bg-muted text-foreground">
          <h2 className="text-3xl font-bold font-sans text-center mb-8 relative">
            🚀 Why Choose Us?
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent animate-fadeIn"></span>
          </h2>
          <ul className="max-w-3xl mx-auto space-y-4 text-lg list-disc list-inside font-sans">
            <li>No coding or technical skills needed</li>
            <li>Launch your token in under 60 seconds</li>
            <li>Safe, secure, and decentralized on Ethereum</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
