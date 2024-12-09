import { twMerge } from 'tailwind-merge';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingIcon({ size = 'sm' }: Props) {
  return (
    <div data-testid="loading-icon" className={twMerge("w-4 h-4 border-2 current-color border-t-transparent rounded-full animate-spin", size === 'sm' && 'w-4 h-4', size === 'md' && 'w-6 h-6', size === 'lg' && 'w-8 h-8')} >
      <span className="sr-only">Loading icon</span>
    </div>
  );
}
