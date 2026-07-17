'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <div>
      <h1>Welcome to Aventra Logistics</h1>
      <Link
        href="/auth/register"
        className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
      >
        Get Started
      </Link>
      <Link
        href="/auth/login"
        className="inline-block rounded-md border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
      >
        Login
      </Link>
    </div>
  );
}
