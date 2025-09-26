'use client';

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from '@/components/layout/Layout';
import { History } from '@/components/history/History';

export default function HistoryPage() {
  return (
    <SessionProvider>
      <AuthProvider>
        <Layout>
          <History />
        </Layout>
      </AuthProvider>
    </SessionProvider>
  );
}
