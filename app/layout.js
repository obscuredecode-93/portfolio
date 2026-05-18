import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata = {
  title: 'Anurag Lakshminarayan | Senior Full Stack Engineer',
  description:
    'Senior Full Stack JavaScript Engineer specialising in React, Node.js, and AI/LLM integrations. Building scalable web applications and intelligent systems.',
  keywords: 'Full Stack Engineer, React, Node.js, Next.js, AI, LLM, MongoDB, JavaScript',
  authors: [{ name: 'Anurag Lakshminarayan' }],
  openGraph: {
    title: 'Anurag Lakshminarayan | Senior Full Stack Engineer',
    description: 'Senior Full Stack JS Engineer — React, Node.js, AI/LLM',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} scroll-smooth`}>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
