import Link from 'next/link';
import imagesData from '../data/images.json';
import Logo from './components/Logo';

export const metadata = {
  title: 'Premium iPhone Wallpapers - Free HD 4K Downloads for iOS 26',
  description: 'Discover our curated collection of high-quality iPhone wallpapers. Free downloads optimized for iOS 26, iPhone 16 Pro Max, iPhone 15 Pro, and all iPhone models. Lock screen and home screen ready.',
};

export default function Home() {
  // Seleciona imagem aleatória para começar
  const randomImage = imagesData[Math.floor(Math.random() * imagesData.length)];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      {/* Header */}
      <header className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <Link
            href={`/${randomImage.id}`}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Browse Collection →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Premium iPhone Wallpapers.
            <br />
            <span className="text-gray-400">Free to download.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            High-quality 4K wallpapers professionally optimized for iOS 26 and all iPhone models.
            Updated daily.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${randomImage.id}`}
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Start browsing
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Learn more
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-20 text-sm text-gray-400">
            <div>
              <span className="text-white font-semibold">{imagesData.length}+</span> wallpapers
            </div>
            <div>
              <span className="text-white font-semibold">4K</span> quality
            </div>
            <div>
              <span className="text-white font-semibold">100%</span> free
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Premium quality,
              <br />
              meticulously curated.
            </h2>
            <p className="text-lg text-gray-400">
              Every wallpaper in our collection is handpicked and optimized for the best experience on your iPhone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-3">Curated Selection</h3>
              <p className="text-gray-400 leading-relaxed">
                Welcome to the ultimate destination for premium iPhone wallpapers. Our collection
                features carefully curated, high-resolution images professionally optimized to
                showcase your iPhone's stunning display.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Quality Tested</h3>
              <p className="text-gray-400 leading-relaxed">
                Each wallpaper undergoes rigorous selection considering color balance, composition,
                resolution, and compatibility with iOS features like widgets and Dynamic Island.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Always Free</h3>
              <p className="text-gray-400 leading-relaxed">
                All wallpapers are completely free to download and use. We believe everyone should
                have access to high-quality personalization options without any cost barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-medium mb-4">4K High Resolution</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Every wallpaper is available in stunning 4K resolution, ensuring crystal-clear
                quality on even the highest-end iPhone displays. Colors remain vibrant, and
                details stay sharp, no matter your screen size.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Crystal-clear quality
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">iOS 26 Optimized</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                All wallpapers are specifically optimized for iOS 26, ensuring perfect
                compatibility with the latest features, widgets, and interface elements of
                Apple's newest operating system.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Perfect compatibility
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">Universal Compatibility</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Whether you have an iPhone 16 Pro Max (1320 x 2868 pixels), iPhone 15 Pro
                (1206 x 2622 pixels), or any older model, our wallpapers adapt perfectly to
                your device's specific dimensions and aspect ratio.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                All iPhone models
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-medium mb-4">Curated Collection</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Our team of design enthusiasts handpicks each wallpaper, ensuring a diverse
                collection that caters to all tastes while maintaining the highest quality
                standards.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Handpicked quality
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How-To Guide */}
      <section className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              How to set up your wallpaper
            </h2>
            <p className="text-lg text-gray-400 mb-12">
              Setting up a new wallpaper on your iPhone is quick and easy. Follow these simple steps:
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Download the wallpaper</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Browse our collection and click the download button on your chosen wallpaper.
                    The image will be saved directly to your iPhone's Photos app.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Open the Photos app</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Launch the Photos app on your iPhone and locate the downloaded wallpaper
                    in your recent photos or downloads folder.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Access wallpaper settings</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Tap the share icon (square with upward arrow) at the bottom left, then
                    scroll down and select "Use as Wallpaper" from the menu.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Position and apply</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Adjust the position by pinching to zoom or dragging the image. Choose
                    whether to set it as your Lock Screen, Home Screen, or both, then tap "Set."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Pro tips
            </h2>
            <p className="text-lg text-gray-400 mb-12">
              Get the most out of your iPhone wallpapers with these helpful tips.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Consider Your Home Screen Layout</h3>
                <p className="text-gray-400 leading-relaxed">
                  When choosing a wallpaper for your home screen, think about where your app icons
                  will be positioned. Wallpapers with clear or darker areas in the center work best,
                  as they allow your app icons to remain easily visible and readable.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Lock Screen Widget Compatibility</h3>
                <p className="text-gray-400 leading-relaxed">
                  iOS 26 supports customizable lock screen widgets. Choose wallpapers that
                  complement your widget style. If you use light-colored widgets, darker wallpapers
                  provide better contrast, and vice versa.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Battery Optimization</h3>
                <p className="text-gray-400 leading-relaxed">
                  For OLED iPhones (iPhone X and newer), using darker wallpapers can help save
                  battery life. OLED displays turn off individual pixels for true black colors,
                  consuming less power than lighter wallpapers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Regular Updates</h3>
                <p className="text-gray-400 leading-relaxed">
                  We regularly update our collection with fresh, trending wallpapers. Bookmark our
                  site and check back frequently to discover new designs that match your evolving
                  style and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Ready to transform your iPhone?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Start exploring our extensive collection of premium wallpapers.
            </p>
            <Link
              href={`/${randomImage.id}`}
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Browse collection
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center gap-6 mb-8">
            <Logo className="opacity-60" />
          </div>
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
              <a
                href="mailto:contact@ios-wallpapers.app"
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
