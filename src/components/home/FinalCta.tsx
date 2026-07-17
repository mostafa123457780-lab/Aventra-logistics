'use client';
import Link from 'next/link';

export default function FinalCta() {
  return (
    <div className="text-center">
      <h2>Ready to start?</h2>
      <Link
        href="/auth/register"
        className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
      >
        Get Started
      </Link>
    </div>
  );
}
