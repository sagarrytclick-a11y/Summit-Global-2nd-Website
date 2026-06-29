// src/site-identity/assets.ts
// Asset paths and configurations for site identity

export const SITE_ASSETS = {
  // Logo variants
  logo: {
    main: "/logo.svg",
    favicon: "/favicon.png",
    appleTouchIcon: "/favicon.png",
  },

  icons: {
    icon192: "/favicon.png",
    icon512: "/favicon.png",
  },


  // Hero images
  hero: {
    main: "/Hero/hero.jpg",
  },

  // Utility icons (not part of brand identity but used in components)
  utility: {
    globe: "/globe.svg",
    file: "/file.svg",
    window: "/window.svg",
  },

  // Framework assets
  framework: {
    next: "/next.svg",
    vercel: "/vercel.svg",
  },
} as const;

// Helper functions for asset management
export const getAssetPath = (category: keyof typeof SITE_ASSETS, asset: string) => {
  const categoryAssets = SITE_ASSETS[category] as Record<string, string>;
  return categoryAssets[asset] || null;
};

export const getLogoUrl = (variant: keyof typeof SITE_ASSETS.logo = 'main') =>
  SITE_ASSETS.logo[variant];
  

// Asset validation (for development)
export const validateAssets = () => {
  const requiredAssets = [
    SITE_ASSETS.logo.main,
    SITE_ASSETS.logo.favicon,
    SITE_ASSETS.logo.appleTouchIcon,
  ];

  const missingAssets = requiredAssets.filter(asset => {
    // In a real implementation, you might check if files exist
    return false; // Placeholder - would need file system access
  });

  if (missingAssets.length > 0) {
    console.warn('Missing required site identity assets:', missingAssets);
  }
};
