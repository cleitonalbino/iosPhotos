import Link from 'next/link';
import Logo from '../components/Logo';

export const metadata = {
  title: 'About Us - iPhone Wallpapers',
  description: 'Learn more about our mission to provide high-quality, free iPhone wallpapers for everyone.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      {/* Header */}
      <header className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-400 mb-16">
            Our mission is to provide premium iPhone wallpapers, completely free.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-medium mb-4">Who We Are</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                iPhone Wallpapers is a dedicated platform for iPhone enthusiasts who want to
                personalize their devices with stunning, high-quality wallpapers. We believe that
                everyone deserves access to beautiful designs without cost barriers or complicated
                downloads.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our team consists of design enthusiasts and iPhone users who understand the
                importance of a great wallpaper. We carefully curate each image to ensure it meets
                our high standards for quality, resolution, and compatibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">What We Do</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We provide a constantly updated collection of premium wallpapers optimized
                specifically for iPhone devices. Every wallpaper in our collection is:
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Available in high-resolution 4K quality</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Optimized for iOS 26 and all iPhone models</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Tested for compatibility with lock screens and home screens</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Compatible with widgets and Dynamic Island</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>100% free to download and use</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">Our Commitment</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We are committed to maintaining the highest standards of quality and accessibility.
                Our platform is designed to be simple, fast, and user-friendly, ensuring you can
                find and download your perfect wallpaper in seconds.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We regularly update our collection with fresh designs and trending styles, so
                there's always something new to discover. Our goal is to become your go-to
                destination for iPhone wallpapers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">Why Free?</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We believe that personalizing your device should be accessible to everyone. While
                many platforms charge for premium wallpapers or require subscriptions, we've chosen
                a different path.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our service is supported by ethical advertising, which allows us to provide all
                wallpapers completely free while continuing to grow and improve our collection. We
                never compromise on quality or user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">Get in Touch</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We love hearing from our users! Whether you have feedback, suggestions, or just
                want to share how you're using our wallpapers, we'd love to hear from you.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-sm text-gray-400 mb-2">Contact us at:</p>
                <a
                  href="mailto:contact@ios-wallpapers.app"
                  className="text-lg text-white hover:text-gray-300 transition-colors"
                >
                  contact@ios-wallpapers.app
                </a>
              </div>
            </section>

            <section className="pt-8 border-t border-white/5">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Browse our collection
              </Link>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              © 2025 iPhone Wallpapers. All wallpapers are free to download and use.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
