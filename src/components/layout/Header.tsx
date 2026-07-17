'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">Aventra Logistics</div>
      <nav>
        <Link href="/auth/login" className="mr-4 text-gray-600 hover:text-gray-900">
          Login
        </Link>
        <Link href="/auth/register" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Register
        </Link>
      </nav>
    </header>
  );
}
