/**
 * AdSidebar Component
 * Sticky sidebar container for vertical ad units
 * Designed for desktop layouts (hidden on mobile)
 */

import AdUnit from './AdUnit';

interface AdSidebarProps {
  className?: string;
}

export default function AdSidebar({ className = '' }: AdSidebarProps) {
  return (
    <aside
      className={`hidden lg:block sticky top-4 space-y-6 ${className}`}
      aria-label="Sidebar Advertisements"
    >
      {/* Primary Vertical Ad */}
      <AdUnit
        format="vertical"
        slotId="sidebar-primary"
      />

      {/* Optional: Second Ad Unit (uncomment if needed) */}
      {/* <AdUnit
        format="square"
        slotId="sidebar-secondary"
      /> */}
    </aside>
  );
}
