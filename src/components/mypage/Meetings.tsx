import { GatheringCard, GatheringSkeleton } from '@/components/mypage/gatheringCard/GatheringCard';
import Image from 'next/image';
import Link from 'next/link';
import emptyDudu from '@public/images/mypage/dudu-empty.svg';
import { useParticipatedMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import { useMemo } from 'react';

export default function Meetings({
  filter,
  isConfirmed,
}: {
  filter: string;
  isConfirmed: boolean;
}) {
  const { data, isLoading, refetch } = useParticipatedMoimQuery();

  const filteredData = useMemo(() => {
    if (!data) return data;

    return data.filter((moim) => {
      if (isConfirmed && !moim.isConfirmed) return false;

      if (filter === '전체') return true;
      if (filter === '모집중') return moim?.isConfirmed === false;
      if (filter === '모집완료') return moim?.maxParticipants === moim?.participants;
      if (filter === '종료') return moim.status === 'END';
      return true;
    });
  }, [data, filter, isConfirmed]);

  if (isLoading) {
    return <GatheringSkeleton />;
  }

  console.log(data);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src={emptyDudu} alt="empty" width={180} height={180} priority />
          <p className="text-body-2-reading text-gray300">아직 내 모임이 없어요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        {filteredData?.map((moim) => (
          <div key={moim.moimId}>
            <GatheringCard moim={moim} refetch={refetch} />
          </div>
        ))}
      </div>
    </div>
  );
}
