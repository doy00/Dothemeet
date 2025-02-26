import { Header } from '../detail/Header';
import { GatheringSkeleton } from '../mypage/gatheringCard/GatheringCard';
import { motion } from 'framer-motion';

export const MyLikeSkeleton = () => {
  return (
    <div className="w-full min-h-screen mx-auto px-4 md:px-20 bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg" aria-label="찜한 모임 목록을 불러오는 중" role="status" aria-live="polite">
      <Header />
      <h1 className="sr-only">찜한 모임 목록 로딩 중</h1>
      <motion.div
        className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <GatheringSkeleton />
        <GatheringSkeleton />
      </motion.div>
    </div>
  );
};
