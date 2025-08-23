import React from 'react';
import { Header } from '../components/shared/Header';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Add sidebar here if needed */}
        {children}
      </main>
    </div>
  )
}