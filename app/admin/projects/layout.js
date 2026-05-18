import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

// Server-side auth guard — only protects /admin/projects routes,
// leaving /admin/login accessible without a redirect loop.
export default async function AdminProjectsLayout({ children }) {
  const session = await getServerSession(authOptions);

  // redirect() in App Router throws internally — do NOT wrap in try/catch.
  if (!session) redirect('/admin/login');

  return <>{children}</>;
}
