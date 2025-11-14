import Link from 'next/link';
import Logo from '../components/Logo';

export const metadata = {
  title: 'Terms of Use - iPhone Wallpapers',
  description: 'Terms of use and conditions for using iPhone Wallpapers service.',
};

export default function TermsPage() {
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
            Terms of Use
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            Last updated: January 2025
          </p>
          <p className="text-xl text-gray-400 mb-16">
            Please read these terms carefully before using our service.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-medium mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                By accessing and using iPhone Wallpapers ("the Service"), you accept and agree to
                be bound by the terms and provisions of this agreement. If you do not agree to
                these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">2. Use of Service</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                iPhone Wallpapers provides free access to high-quality wallpapers optimized for
                iPhone devices. You may:
              </p>
              <ul className="space-y-3 text-gray-400 mb-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Download wallpapers for personal use on your iPhone</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Use wallpapers as lock screen or home screen backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Share links to wallpapers with others</span>
                </li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                You may not redistribute, sell, or claim ownership of the wallpapers provided
                through this Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">3. Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                The wallpapers available on this Service are provided for personal use only. While
                you may download and use them on your devices, all intellectual property rights
                remain with their respective owners.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The iPhone Wallpapers website design, logo, and content are protected by copyright
                and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">4. Prohibited Uses</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You agree not to use the Service for any of the following purposes:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-white">•</span>
                  <span>Commercial redistribution or sale of wallpapers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">•</span>
                  <span>Automated scraping or bulk downloading</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">•</span>
                  <span>Modification and redistribution as your own work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">•</span>
                  <span>Any illegal or unauthorized purpose</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">•</span>
                  <span>Attempting to gain unauthorized access to the Service</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                The Service is provided "as is" and "as available" without warranties of any kind,
                either express or implied. We do not guarantee that:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-white">•</span>
                  <span>The Service will be uninterrupted or error-free</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">•</span>
                  <span>All wallpapers will be available at all times</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">•</span>
                  <span>The quality of wallpapers will meet your specific requirements</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">
                In no event shall iPhone Wallpapers be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your use or inability
                to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">7. Advertising</h2>
              <p className="text-gray-400 leading-relaxed">
                The Service is supported by advertising. By using the Service, you agree to the
                display of advertisements. We use ethical advertising practices and work with
                reputable ad networks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">8. Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective
                immediately upon posting to the website. Your continued use of the Service after
                any changes constitutes acceptance of those changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">9. Privacy</h2>
              <p className="text-gray-400 leading-relaxed">
                We respect your privacy and are committed to protecting your personal information.
                We do not collect personal information beyond what is necessary to provide the
                Service and display advertisements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">10. Termination</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to terminate or suspend access to the Service immediately,
                without prior notice, for any reason, including breach of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">11. Governing Law</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-4">12. Contact Information</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <a
                  href="mailto:contact@ios-wallpapers.app"
                  className="text-lg text-white hover:text-gray-300 transition-colors"
                >
                  contact@ios-wallpapers.app
                </a>
              </div>
            </section>

            <section className="pt-8 border-t border-white/5">
              <p className="text-gray-400 text-sm mb-6">
                By using iPhone Wallpapers, you acknowledge that you have read, understood, and
                agree to be bound by these Terms of Use.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Back to Home
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
