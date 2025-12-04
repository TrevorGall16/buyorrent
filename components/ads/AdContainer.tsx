/**
 * CLS-Safe Ad Container
 * CRITICAL: Must have rigid dimensions to prevent Cumulative Layout Shift
 */

interface AdContainerProps {
  slot: 'sidebar' | 'mobile' | 'mobile-secondary' | 'footer';
  className?: string;
}

export default function AdContainer({ slot, className = '' }: AdContainerProps) {
  // Determine dimensions based on slot type
  const slotStyles = {
    sidebar: 'ad-slot-sidebar',          // 300x600px
    mobile: 'ad-slot-mobile',            // 100% x 250px
    'mobile-secondary': 'ad-slot-mobile', // 100% x 250px (same as mobile)
    footer: 'ad-slot-footer',            // 100% x 50px
  };

  return (
    <div
      className={`ad-slot ${slotStyles[slot]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Placeholder text - Replace with actual ad code */}
      <span className="text-xs text-gray-400 select-none">
        Advertisement
      </span>
    </div>
  );
}
