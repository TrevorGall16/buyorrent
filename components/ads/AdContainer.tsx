import AdUnit from './AdUnit';

interface AdContainerProps {
  slot: 'sidebar' | 'mobile' | 'mobile-secondary' | 'footer';
  className?: string;
}

export default function AdContainer({ slot, className = '' }: AdContainerProps) {
  // Map the old "slot" names to the new "format" names
  const getFormat = () => {
    switch (slot) {
      case 'sidebar':
        return 'vertical';
      case 'mobile':
      case 'mobile-secondary':
        return 'square';
      case 'footer':
        return 'banner';
      default:
        return 'square';
    }
  };

  return (
    <div className={className}>
      <AdUnit format={getFormat()} />
    </div>
  );
}