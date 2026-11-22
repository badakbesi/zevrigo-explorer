'use client';

import React, { Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/app/providers';
import { usePoll } from '@/hooks/use-poll';
import { fetchBlocks } from '@/lib/api';
import { formatInt } from '@/lib/amount';
import { isValidHeight, routes } from '@/lib/route';
import {
  Alert,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/primitives';
import {
  ApiStateView,
  BlockRowsView,
  TableSkeleton,
} from '@/components/explorer/shared';

function BlocksListContent() {
  const { lang, t } = useApp();
  const searchParams = useSearchParams();
  const rawBefore = searchParams.get('before');

  const isParamValid = rawBefore === null || isValidHeight(rawBefore);
  const beforeHeight =
    rawBefore !== null && isParamValid ? Number(rawBefore) : undefined;

  const fetcher = useCallback(() => {
    if (!isParamValid) {
      return Promise.resolve({
        ok: false as const,
        failure: { kind: 'http' as const, status: 400, error: 'bad_request' },
      });
    }
    return fetchBlocks(beforeHeight);
  }, [beforeHeight, isParamValid]);

  const { data, failure, isLoading, nowUnix, reload } = usePoll(fetcher, [
    beforeHeight,
    isParamValid,
  ]);

  if (!isParamValid) {
    return (
      <ApiStateView
        failure={{ kind: 'http', status: 400, error: 'bad_request' }}
      />
    );
  }

  const blocks = data?.blocks ?? [];
  const highestShown = blocks.length > 0 ? blocks[0].height : null;
  const lowestShown = blocks.length > 0 ? blocks[blocks.length - 1].height : null;

  // Newer button: if `before` is set, go to `before + 20` or `/blocks/`
  const hasNewer = beforeHeight !== undefined;
  const newerBefore =
    highestShown !== null ? highestShown + 21 : undefined;
  const hasOlder = lowestShown !== null && lowestShown > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t('blocksPageTitle')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('blocksPageSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasNewer ? (
            <Button variant="outline" size="sm" asChild>
              <Link
              href={
                newerBefore !== undefined && beforeHeight !== undefined && beforeHeight <= 100
                  ? routes.blocks(newerBefore)
                  : routes.blocks()
              }
            >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>{t('paginationNewer')}</span>
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>{t('paginationNewer')}</span>
            </Button>
          )}

          {hasOlder && lowestShown !== null ? (
            <Button variant="outline" size="sm" asChild>
              <Link href={routes.blocks(lowestShown)}>
                <span>{t('paginationOlder')}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <span>{t('paginationOlder')}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {failure && !data && <ApiStateView failure={failure} onRetry={reload} />}

      <Card>
        <CardHeader>
          <CardTitle>
            {highestShown !== null && lowestShown !== null
              ? `#${formatInt(highestShown, lang)} – #${formatInt(lowestShown, lang)}`
              : t('blocksPageTitle')}
          </CardTitle>
          <CardDescription>{t('blocksPageSubtitle')}</CardDescription>
        </CardHeader>

        {isLoading && blocks.length === 0 ? (
          <TableSkeleton rows={12} />
        ) : blocks.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
            {t('emptyBlocksList')}
          </div>
        ) : (
          <BlockRowsView blocks={blocks} nowUnix={nowUnix} startChars={12} endChars={10} />
        )}
      </Card>
    </div>
  );
}

export default function BlocksPage() {
  return (
    <Suspense fallback={<TableSkeleton rows={10} />}>
      <BlocksListContent />
    </Suspense>
  );
}
