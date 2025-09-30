import React, { useEffect, useRef } from 'react';
import { AD_CLIENT } from '../config';

export default function AdSenseAd({ client = AD_CLIENT, slot = '0000000000', style = { display: 'block' }, format = 'auto', test = true }) {
  const adRef = useRef(null);

  const pushAd = () => {
    if (typeof window === 'undefined') return;
    if (!window.adsbygoogle) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // ignore in dev
    }
  };

  useEffect(() => {
    pushAd();

    // Refresh ad after SPA navigation events (custom event dispatched by App)
    const handler = () => pushAd();
    window.addEventListener('spa:navigate', handler);
    return () => window.removeEventListener('spa:navigate', handler);
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      {...(test ? { 'data-adtest': 'on' } : {})}
      ref={adRef}
    />
  );
}
