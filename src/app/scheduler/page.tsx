'use client';

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from '@/components/layout/Layout';
import { Scheduler } from '@/components/scheduler/Scheduler';

export default function SchedulerPage() {
  return (
    <SessionProvider>
      <AuthProvider>
        <Layout>
          <Scheduler />
        </Layout>
      </AuthProvider>
    </SessionProvider>
  );
}
