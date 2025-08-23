import React from 'react';
import { Header } from '../components/shared/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
         {/* Maybe a different sidebar/nav for admin */}
        {children}
      </main>
    </div>
  )
}