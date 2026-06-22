
import React from 'react';
import { 
    NextjsIcon, 
    VercelIcon, 
    NuxtIcon, 
    AstroIcon, 
    SvelteKitIcon, 
    RemixIcon,
    ShadcnIcon, 
    TypeScriptIcon, 
    ReactIcon,
    QwikIcon,
    SlidevIcon,
    VitepressIcon
} from './icons';

const techIcons = [
  { component: <NextjsIcon />, name: 'Next.js' },
  { component: <VercelIcon />, name: 'Vercel' },
  { component: <NuxtIcon />, name: 'Nuxt.js' },
  { component: <AstroIcon />, name: 'Astro' },
  { component: <SvelteKitIcon />, name: 'SvelteKit' },
  { component: <VitepressIcon />, name: 'VitePress' },
  { component: <ShadcnIcon />, name: 'shadcn/ui' },
  { component: <RemixIcon />, name: 'Remix' },
  { component: <TypeScriptIcon />, name: 'TypeScript' },
  { component: <ReactIcon />, name: 'React' },
  { component: <QwikIcon />, name: 'Qwik' },
  { component: <SlidevIcon />, name: 'Slidev' },
];

const TechStack: React.FC = () => {
    return (
        <div className="mt-16 w-full max-w-2xl flex flex-col items-center">
            <p className="text-gray-500 text-sm">
                or start a blank app with your favorite stack
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-6">
                {techIcons.map((tech, index) => (
                    <a href="#" key={index} aria-label={tech.name} className="text-gray-600 hover:text-white transition-colors duration-200">
                      {React.cloneElement(tech.component, { className: "h-7 w-7" })}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TechStack;
