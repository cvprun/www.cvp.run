import {ArrowLeft} from 'lucide-react';
import {Link} from 'react-router-dom';

import {Footer} from '@/components/footer';
import {TopBar} from '@/components/top-bar';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n';
import {paths} from '@/lib/site';

export function NotFoundPage() {
  const {t} = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-4 py-32 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t.notFound.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.notFound.description}</p>
        <Button asChild className="mt-8">
          <Link to={paths.home}>
            <ArrowLeft className="size-4" />
            {t.notFound.back}
          </Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
