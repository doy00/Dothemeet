'use client';

import { useEffect } from 'react';
// Tanstack-Query
import IntersectionObserver from '@/libs/home/intersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';
// Store
import { useFavoriteStore } from '@/stores/home/favoriteStore';
import { useFilterStore } from '@/stores/home/filterStore';
// Components
import { IMoim } from '@/types/home/i-moim';
import { fetchMoims } from '@/utils/home/fetchMoims';
import HomeCard from './HomeCard';

export default function HomeCards() {
  const { moimType,region, moimStatus, sortOrder } = useFilterStore();

  const { fetchFavorites } = useFavoriteStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    { data: IMoim[]; pagination: { current_page: number; total_pages: number } },
    Error
  >({
    queryKey: ['moims', moimType, region, moimStatus, sortOrder],
    queryFn: ({ pageParam = 1 }) =>
      fetchMoims({
        page: pageParam, 
        moimType,
        region: region.length > 0 ? region.join(',') : 'all',
        moimStatus,
        sortOrder,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined,
    initialPageParam: 1,
  });

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <div className="px-4 pt-[14px] space-y-4">
      {data?.pages.map((page) =>
          page.data.map((item) => <HomeCard key={item.moimId} data={item} />)
        )}
        {isFetchingNextPage && <p className="text-center">Loading more...</p>}
      </div>
      <IntersectionObserver onIntersect={handleIntersect} />
    </>
  );
}
