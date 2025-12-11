/**
 * CLS-Safe Ad Container
 * CRITICAL: Must have rigid dimensions to prevent Cumulative Layout Shift
 */

interface AdContainerProps {
  slot: 'sidebar' | 'mobile' | 'mobile-secondary' | 'footer';
  className?: string;
}

export default function AdContainer({ slot, className = '' }: AdContainerProps) {
  // CLS-preventing dimensions and styles based on slot type
  const getSlotStyles = () => {
    switch (slot) {
      case 'sidebar':
        return {
          className: 'w-[300px] min-h-[600px] mx-auto',
          label: 'Advertisement'
        };
      case 'mobile':
      case 'mobile-secondary':
        return {
          className: 'w-full min-h-[250px]',
          label: 'Advertisement'
        };
      case 'footer':
        return {
          className: 'w-full min-h-[50px]',
          label: 'Advertisement'
        };
    }
  };

  const styles = getSlotStyles();

  return (
    <div
      className={`flex items-center justify-center bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 ${styles.className} ${className}`}
      role="complementary"
      aria-label={styles.label}
    >
      <span className="text-xs text-gray-400 dark:text-gray-500 select-none">
        {styles.label}
      </span>
    </div>
  );
}
