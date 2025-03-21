'use client';
// React && NEXT
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Coponents
import PlusIcon from './icons/PlusIcon';

export default function HomeHeader() {
  const router = useRouter();

  const handlePlusClick = () => {
    router.push('/make');
  };

  return (
    <header className="px-5 py-4 h-14 flex justify-between items-center 2xl:hidden">
      <div>
        <Image src="/svgs/img_logo-text.svg" alt="img-logo-text" width={120} height={16} priority />
      </div>
      <div className="flex items-center gap-x-3">
        <div className="cursor-pointer" onClick={handlePlusClick}>
          <PlusIcon className="fill-orange200" />
        </div>
      </div>
    </header>
  );
}
