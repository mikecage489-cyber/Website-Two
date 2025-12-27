import { useEffect } from 'react';

interface AdProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export default function Ad({ slot, format = 'auto', className = '' }: AdProps) {
  useEffect(() => {
    try {
      // Push ad to AdSense
      if (typeof window !== 'undefined' && (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle) {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Only render if we have the AdSense client ID from environment
  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  
  if (!adsenseClientId) {
    return null; // Don't show ads in development without client ID
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
