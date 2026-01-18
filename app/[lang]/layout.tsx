import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';
import {isValidLanguage, languages} from '@/lib/i18n';

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{lang: string}>;
}

export function generateStaticParams() {
  return languages.map((lang) => ({lang}));
}

export default async function LangLayout({children, params}: LangLayoutProps) {
  const {lang} = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  return <>{children}</>;
}
