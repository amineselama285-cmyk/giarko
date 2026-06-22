import React from 'react';

interface IconProps {
  className?: string;
}

export const XIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 16 16" className={className}>
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-1.78 13h2.807L4.339 2.15H1.515l9.308 11.6Z" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

export const DiscordIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 127.14 96.36" className={className}>
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6,.54,80.21A105.73,105.73,0,0,0,32.38,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.21-6.64,80.27,80.27,0,0,1-5.34-4.5,69.24,69.24,0,0,1-3-3.95c-.2-.33-.4-.63-.56-.92-.19-.32-.38-.64-.56-1s-.34-.7-.5-1.07a76.34,76.34,0,0,1-2.45-8.19c-.23-.9-.45-1.8-.66-2.71s-.4-1.83-.59-2.74a83.53,83.53,0,0,1-.5-3.17,67.83,67.83,0,0,1,.44-11.51,62.09,62.09,0,0,1,1.7-7.29,61.13,61.13,0,0,1,2.51-6.42,65.6,65.6,0,0,1,16.59-19.1,65.6,65.6,0,0,1,21.43-8.58,69.17,69.17,0,0,1,2.83-.34,70.55,70.55,0,0,1,15.54,0,70.55,70.55,0,0,1,15.54,0,69.17,69.17,0,0,1,2.83.34,65.6,65.6,0,0,1,21.43,8.58,61.13,61.13,0,0,1,2.51,6.42,62.09,62.09,0,0,1,1.7,7.29,67.83,67.83,0,0,1,.44,11.51,83.53,83.53,0,0,1-.5,3.17c-.19.91-.39,1.83-.59,2.74s-.43,1.81-.66,2.71a76.34,76.34,0,0,1-2.45,8.19c-.16.37-.33.72-.5,1.07s-.37.71-.56,1-.37.59-.56.92a69.24,69.24,0,0,1-3,3.95,80.27,80.27,0,0,1-5.34,4.5,68.42,68.42,0,0,1-10.21,6.64,77.7,77.7,0,0,0,7.22,11.11A105.73,105.73,0,0,0,126.6,80.21C128.85,56.6,124.35,32.65,107.7,8.07ZM42.45,65.69C36.65,65.69,32,60,32,53s4.65-12.69,10.45-12.69,10.45,5.69,10.45,12.69S48.25,65.69,42.45,65.69Zm42.24,0C78.89,65.69,74.2,60,74.2,53s4.69-12.69,10.49-12.69,10.49,5.69,10.49,12.69S90.49,65.69,84.69,65.69Z" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

export const WandIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.62-3.385m-1.75 1.039a7.5 7.5 0 00-11.852-11.852H5.25a2.25 2.25 0 00-2.25 2.25v.834a2.25 2.25 0 002.25 2.25h.834a2.25 2.25 0 002.25-2.25v-.834a2.25 2.25 0 00-1.125-1.951 7.5 7.5 0 1010.51-10.51a7.5 7.5 0 00-1.951-1.125h-.834a2.25 2.25 0 00-2.25 2.25v.834a2.25 2.25 0 002.25 2.25h.834a2.25 2.25 0 002.25-2.25z" />
    </svg>
);

export const LocationLightbulbIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" viewBox="0 0 24 24" className={className}>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.398 10.878a2.122 2.122 0 10-2.398-2.398 2.122 2.122 0 002.398 2.398z"></path>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15a6.002 6.002 0 004.9-8.9A6 6 0 007.1 3.1 6.002 6.002 0 0012 15z"></path>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v1.278m0 4.722v-1.18m-1.18-3.542h-3.542m9.444 0h-3.542m-1.18 3.542l-2.504-2.504m7.513 0l-2.505 2.505m-2.504-7.513l-2.504 2.505m7.513 0l-2.505-2.504"></path>
    </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.85l3.25-3.138C18.189 1.186 15.479 0 12.24 0 5.49 0 0 5.49 0 12s5.49 12 12.24 12c6.957 0 11.99-4.866 11.99-12.133 0-.776-.068-1.546-.19-2.308h-11.8z" />
    </svg>
);

export const FigmaIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" viewBox="0 0 16 24" className={className}>
        <path fill="#F24E1E" d="M8 16a4 4 0 004-4H8v4z"></path>
        <path fill="#FF7262" d="M8 8a4 4 0 00-4 4h8a4 4 0 00-4-4z"></path>
        <path fill="#A259FF" d="M4 8a4 4 0 004-4v8a4 4 0 00-4-4z"></path>
        <path fill="#1ABCFE" d="M12 8a4 4 0 10-4 4h4V8z"></path>
        <path fill="#0ACF83" d="M8 16a4 4 0 100 8 4 4 0 000-8z"></path>
    </svg>
);

export const NextjsIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="currentColor" d="M64 128C99.346 128 128 99.346 128 64C128 28.654 99.346 0 64 0C28.654 0 0 28.654 0 64C0 99.346 28.654 128 64 128Z" />
      <path fill="#fff" d="M95.706 32L64 81.733L32.294 32H95.706ZM64 96L37.818 42.182H28.727V96H40.909V59.455L64 96Z" />
    </svg>
);

export const VercelIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 256 222" className={className}>
        <path d="m128 0 128 221.705H0z"></path>
    </svg>
);

export const NuxtIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" viewBox="0 0 120 120" className={className}>
        <path fill="#00DC82" d="M96.41 23.59a36.88 36.88 0 0 0-52.16 0L23.59 44.25a36.88 36.88 0 0 0 52.16 52.16l20.66-20.66a36.88 36.88 0 0 0 0-52.16Z"></path>
        <path fill="#00C58E" d="m85.45 34.55-4.8-4.8-15.5 15.5v18.9l-18.9 18.9 4.8 4.8L85.45 53.05a18.44 18.44 0 0 0 0-18.5Z"></path>
        <path fill="#153543" d="m60 74.85-6.55-6.55-9.45 9.45 6.55 6.55 9.45-9.45Zm-25.1-9.45L23.59 54.1v11.3Z"></path>
    </svg>
);

export const AstroIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 256 256" className={className}>
        <path d="M192.3 158.3c-28.2 0-51 22.8-51 51s22.8 51 51 51 51-22.8 51-51-22.8-51-51-51zm-5.4 67.8c-1.3 1.3-3 2-4.8 2-1.8 0-3.5-.7-4.8-2-2.7-2.7-2.7-7 0-9.7l22.4-22.4c2.7-2.7 7-2.7 9.7 0s2.7 7 0 9.7l-22.5 22.4zm1.9-52.5c2.7-2.7 7-2.7 9.7 0s2.7 7 0 9.7l-35.7 35.7c-2.7 2.7-7 2.7-9.7 0-2.7-2.7-2.7-7 0-9.7l35.7-35.7zM79.7 0C35.7 0 0 35.7 0 79.7c0 23.4 10.1 44.5 26.5 58.7-3.9 11.2-12.7 31.3-15.5 37-1.3 2.7-.4 6 2.3 7.3 1.1.5 2.3.8 3.5.8 1.8 0 3.5-.7 4.8-2l36.5-36.5c13.7 10.3 30.9 16.4 49.6 16.4 44 0 79.7-35.7 79.7-79.7S123.7 0 79.7 0zm0 137.9c-32.1 0-58.2-26.1-58.2-58.2S47.6 21.5 79.7 21.5s58.2 26.1 58.2 58.2-26.1 58.2-58.2 58.2z"></path>
    </svg>
);

export const SvelteKitIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M16.134 3.73a3.46 3.46 0 0 0-.82-1.554 3.498 3.498 0 0 0-4.953 0L7.866 4.67a3.46 3.46 0 0 0-.82 1.555L3.38 15.53a3.499 3.499 0 0 0 1.957 4.354 3.46 3.46 0 0 0 1.554.417h.001a3.498 3.498 0 0 0 3.25-2.071l1.867-3.733 1.866 3.733a3.498 3.498 0 0 0 3.25 2.07h.001c.54 0 1.07-.14 1.554-.416a3.498 3.498 0 0 0 1.957-4.354L16.134 3.73zM12 11.41l-2.316 4.633a.5.5 0 0 1-.465.29H9.2c-.39 0-.64-.42-.464-.764L12 8.588l3.264 6.98a.5.5 0 0 1-.464.765h-.02a.5.5 0 0 1-.465-.29L12 11.411z"></path>
    </svg>
);

export const RemixIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M12 0C7.514 0 4.32 2.62 3.193 6.309.11 6.364 0 7.398 0 8.286c0 1.15.584 2.122 1.487 2.65L.5 13.5v.001c0 3.259 2.64 5.9 5.9 5.9 2.825 0 5.187-1.99 5.76-4.634.025-.11.04-.22.04-.333v-2.067l-3.328-.01-2.022-3.19H5.75l1.37-2.147h3.336L8.8 9.804l4.288-.01L12 8.253l-1.087-.003.88-1.378h5.275l2.022 3.189-1.992.011v2.067c0 3.26 2.641 5.9 5.9 5.9 3.26 0 5.9-2.64 5.9-5.901V13.5l-1.066-2.583c.903-.527 1.487-1.499 1.487-2.65 0-.888-.11-1.922-1.193-1.977C19.68 2.62 16.486 0 12 0Zm-5.46 8.25h1.336L6.5 9.804l1.04-.002-1.37 2.148H3.34l2.022-3.19h.178Zm10.92 0h.178l2.022 3.19H13.63l-1.37-2.148 1.04.002 1.336-1.554Z"></path>
    </svg>
);

export const ShadcnIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 256 256" className={className}>
      <path d="M64.6 24.3c-2.4-5.2-7.8-8.7-13.7-8.7s-11.3 3.5-13.7 8.7L2.3 80.9c-2.9 6.2 1.1 13.3 7.8 13.3h24.2c4.3 0 8.2-2.7 9.8-6.7L64.6 24.3zm67.1 193.3c-2.4 5.2-7.8 8.7-13.7 8.7s-11.3-3.5-13.7-8.7L39.4 110.9c-2.9-6.2 1.1-13.3 7.8-13.3h24.2c4.3 0 8.2-2.7 9.8 6.7l50.4 106.6zM245.9 80.9l-34.9-56.6c-2.4-5.2-7.8-8.7-13.7-8.7s-11.3 3.5-13.7 8.7l-64.9 106.6c-2.4 5.2-7.8 8.7-13.7 8.7s-11.3-3.5-13.7-8.7L25.5 24.3c-2.4-5.2-7.8-8.7-13.7-8.7S.5 19.1 0 25.1L120.6 238c2.4 5.2 7.8 8.7 13.7 8.7s11.3-3.5 13.7-8.7L254 94.2c2.9-6.2-1-13.3-7.8-13.3h-.3z"></path>
    </svg>
);

export const TypeScriptIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 128 128" className={className}>
        <path d="M0 0h128v128H0V0Zm31.33 96.67V31.33h20.33V85h34.67v11.67H31.33Z"></path>
        <path fill="#fff" d="m81.05 42.4-2.82 8.73h17.15l-2.82-8.73h-11.5Zm13.25 24.08-3.09-9.58h-18.1l-3.09 9.58h-12.3l21-65.17h10.02l21 65.17h-12.3Z"></path>
    </svg>
);

export const ReactIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 113.43 101.07" className={className}>
        <g>
            <circle cx="56.71" cy="50.53" r="10.87"></circle>
            <path d="M110.16 38.33a50.81 50.81 0 0 0-41.22-38C52.42.06 37.12 7.18 26.28 18.66-2.5 48.43-8.23 93.3 14.33 100c17.13 5.06 35-11.53 47.5-23.75 14.17-14.17 26.47-33.8 28.5-49.37s-2.81-25.13-3.27-28.55M56.71 90.67A40.13 40.13 0 1 1 96.85 50.53a40.18 40.18 0 0 1-40.14 40.14"></path>
            <path d="M68.45 10.8a50.76 50.76 0 0 0-23.47 0c-18.42 7.86-31.13 28.3-29.13 50.21C18 82.58 35.83 95.6 52.3 99.4c17.5 4 35.33-7.58 45.45-21.68 12.38-17.17 12.68-38.83 8.35-57.17a50.83 50.83 0 0 0-37.65-9.75M56.71 90.67A40.13 40.13 0 1 1 96.85 50.53a40.18 40.18 0 0 1-40.14 40.14"></path>
            <path d="M2.5 61.18a50.76 50.76 0 0 0 41.22 38c16.52.27 31.82-6.84 42.66-18.33C115.17 51.08 120.9 6.2 98.34 1.13c-17.13-5.06-35 11.53-47.5 23.75C36.67 39.05 24.37 58.67 22.34 74.22c-2.03 15.55 2.81 25.13 3.27 28.55M56.71 90.67A40.13 40.13 0 1 1 96.85 50.53a40.18 40.18 0 0 1-40.14 40.14"></path>
        </g>
    </svg>
);

export const QwikIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 256 256" className={className}>
        <path d="M128.051.107c-25.292 0-48.47 10.22-64.88 26.63C3.652 50.55-.41 87.21 9.408 119.897l52.68 99.102a12.18 12.18 0 0 0 21.606 0L136.37 119.8l-18.664 36.634c-2.34 4.58-8.15 6.45-12.72 4.1-4.57-2.34-6.44-8.15-4.1-12.72l28.69-56.315c2.34-4.58 8.15-6.45 12.72-4.1s6.44 8.15 4.1 12.72l-10.98 21.57 32.72 61.64a12.18 12.18 0 0 0 21.607 0l52.68-99.103c9.817-32.686 5.757-69.347-13.76-93.16C176.52 10.327 153.34.108 128.05.108zm-82.57 66.275c6.53-6.52 14.8-10.42 24.3-10.42s17.77 3.9 24.3 10.42c6.52 6.53 10.42 14.8 10.42 24.3s-3.9 17.77-10.42 24.3c-6.53 6.52-14.8 10.42-24.3 10.42s-17.77-3.9-24.3-10.42c-6.52-6.53-10.42-14.8-10.42-24.3s3.9-17.77 10.42-24.3z"></path>
    </svg>
);

export const SlidevIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M6 3.75A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6Zm11.25 6h-9a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5Z M8.25 15a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"></path>
    </svg>
);

export const VitepressIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" viewBox="0 0 256 256" className={className}>
        <path fill="#41B883" d="M204.8 33.364l-76.8 132.8-76.8-132.8h46.08l30.72 53.248 30.72-53.248z"></path>
        <path fill="#34495E" d="M128 166.164l-30.72-53.248H51.2l76.8 132.8 76.8-132.8h-46.08z"></path>
    </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 20 20" className={className}>
    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 18a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0110 18zM10 5a5 5 0 100 10 5 5 0 000-10zm0-1.5a6.5 6.5 0 110 13 6.5 6.5 0 010-13z" clipRule="evenodd" fillRule="evenodd" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.995 12.995l8-10-1.01 6.01h5.015l-8 10 1.01-6.01H3.995z" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const IntegrationsIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

export const DeployIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const MoreHorizontalIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01" />
  </svg>
);

export const FilePlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.05a2.25 2.25 0 01-1.27.65l-2.708.812a.75.75 0 01-.864-.864l.812-2.708a2.25 2.25 0 01.65-1.27L16.862 4.487z" />
  </svg>
);

export const FileCodeIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
);

export const BoltBIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M14.73,18.39H10.27V12.12H14.73V10.16H10.27V5.61H15.11V7.57H16.76V4H8.62V12.12H7.27V10.16H5.62V12.12H4V13.77H5.62V20h1.65V13.77h1.35v6.23H15.11V18.39Z" />
  </svg>
);

export const HelpCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const FilesIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const FolderIcon: React.FC<IconProps & { isOpen?: boolean }> = ({ className, isOpen }) => (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
        {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 0A2.25 2.25 0 015.25 7.5h5.379a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18.75a2.25 2.25 0 012.25 2.25v6.75A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V9.75z" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75M2.25 12.75a2.25 2.25 0 010-1.5V6.75A2.25 2.25 0 014.5 4.5h15A2.25 2.25 0 0121.75 6.75v1.5" />
        )}
    </svg>
);

export const FileIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m9 12.75a3 3 0 01-3 3H9.75a3 3 0 01-3-3m12-8.25v8.25M9.75 16.5a3 3 0 00-3-3M3.75 4.5a3 3 0 013-3h6a3 3 0 013 3v12a3 3 0 01-3 3h-6a3 3 0 01-3-3V4.5z" />
    </svg>
);


export const TerminalIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);