import React from 'react';

interface SocialIconsProps {
  className?: string;
  iconClassName?: string;
  onSocialClick?: (platform: string) => void;
}

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.93-4.52V8.62a8.28 8.28 0 0 0 4.84 1.56V6.69z" />
  </svg>
);

export const XTwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    {/* Stylized circle with X as seen in modern topbars */}
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.846 14.167h-1.84l-3.328-4.35-2.222 4.35H6.608l3.14-5.69-2.92-3.81h1.84l3.13 4.093 2.062-4.093h1.848l-2.977 5.4 3.012 4.1zm-4.71-3.535l-.475-.68-3.003-4.298h1.272l2.36 3.38.474.68 3.15 4.509h-1.272l-2.506-3.59z" />
  </svg>
);

export const SocialIcons: React.FC<SocialIconsProps> = ({
  className = 'flex items-center gap-3 text-neutral-300',
  iconClassName = 'w-3.5 h-3.5 transition-colors duration-150 hover:text-white',
  onSocialClick,
}) => {
  const socials = [
    { name: 'Facebook', icon: FacebookIcon, url: 'https://facebook.com' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://instagram.com' },
    { name: 'YouTube', icon: YouTubeIcon, url: 'https://youtube.com' },
    { name: 'TikTok', icon: TikTokIcon, url: 'https://tiktok.com' },
    { name: 'X', icon: XTwitterIcon, url: 'https://x.com' },
  ];

  return (
    <div className={className} aria-label="Social media links">
      {socials.map((social) => {
        const IconComponent = social.icon;
        return (
          <button
            key={social.name}
            type="button"
            onClick={() => onSocialClick?.(social.name)}
            title={`Follow us on ${social.name}`}
            className="group relative flex items-center justify-center p-0.5 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 cursor-pointer"
          >
            <IconComponent className={iconClassName} />
            <span className="sr-only">{social.name}</span>
          </button>
        );
      })}
    </div>
  );
};
