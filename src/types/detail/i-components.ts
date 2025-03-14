// 컴포넌트 관련 타입
export interface IImageBox {
  image: string 
  | null;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export interface IChipSmallSquircle {
  text: string;
  variant: 'light' | 'dark' | 'success' | 'tag' | 'emotion' | 'cardTag' | 'end';
  className?: string;
}

export interface IChipSmallRound {
  text: string;
  variant: 'gray' | 'soso' | 'good' | 'recommend';
  className?: string;
}