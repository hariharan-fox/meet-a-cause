'use client';

import { useEffect } from 'react';
import { Languages } from 'lucide-react';

export function GoogleTranslateWidget() {
  useEffect(() => {
    // Ensure the translate element initialises after mount
    const interval = setInterval(() => {
      const el = document.getElementById('google_translate_element');
      if (el && el.children.length > 0) {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <Languages className="h-4 w-4 text-muted-foreground shrink-0" />
      <div id="google_translate_element" />
    </div>
  );
}
