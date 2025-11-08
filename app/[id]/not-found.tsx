import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-6xl font-bold mb-4">404</h1>
        <h2 className="text-white text-2xl mb-8">Photo Not Found</h2>
        <Link
          href="/"
          className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
