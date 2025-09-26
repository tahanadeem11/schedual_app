'use client';

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from '@/components/layout/Layout';
import { CreatePost } from '@/components/create/CreatePost';

export default function CreatePostPage() {
  return (
    <SessionProvider>
      <AuthProvider>
        <Layout>
          <CreatePost />
        </Layout>
      </AuthProvider>
    </SessionProvider>
  );
}
