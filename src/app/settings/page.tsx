'use client';

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from '@/components/layout/Layout';
import { Settings } from '@/components/settings/Settings';

export default function SettingsPage() {
  return (
    <SessionProvider>
      <AuthProvider>
        <Layout>
          <Settings />
        </Layout>
      </AuthProvider>
    </SessionProvider>
  );
}
