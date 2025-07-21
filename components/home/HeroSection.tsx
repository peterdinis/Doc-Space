'use client';

import { FeatureItemProps, ParallaxImgProps } from "@/types/HeroTypes";
import { ReactLenis } from "@studio-freight/react-lenis";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import { FiEdit2, FiUsers, FiCloud } from 'react-icons/fi';

const SECTION_HEIGHT = 1500;

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950 text-white">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
        <Features />
      </ReactLenis>
    </div>
  );
};

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['170%', '100%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full flex items-center justify-center"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          'url(https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2670&auto=format&fit=crop)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold text-white drop-shadow-xl text-center px-4"
      >
        Welcome to <span className="text-blue-400">doc-space</span> ✨
      </motion.h1>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1587613755373-4ecb3f7dba6c?q=80&w=2670&auto=format&fit=crop"
        alt="Writing"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1532619675605-1cde6e668a91?q=80&w=2670&auto=format&fit=crop"
        alt="Collaboration"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1612832021044-4205ba4fa6cc?q=80&w=2370&auto=format&fit=crop"
        alt="Editor"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
        alt="Documents"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${-end}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Features = () => {
  return (
    <section
      id="features"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h2
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75 }}
        className="mb-20 text-4xl font-black text-zinc-50 text-center"
      >
        Why use <span className="text-blue-400">doc-space</span>?
      </motion.h2>
      <FeatureItem
        title="Real-time Collaboration"
        description="Work with your team in real-time with seamless updates and typing indicators."
        icon={<FiUsers />}
      />
      <FeatureItem
        title="Powerful Rich Text Editor"
        description="Write documents with formatting, images, code blocks, and more."
        icon={<FiEdit2 />}
      />
      <FeatureItem
        title="Cloud Sync"
        description="All your documents are auto-saved and available anywhere."
        icon={<FiCloud />}
      />
    </section>
  );
};

const FeatureItem = ({ title, description, icon }: FeatureItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      className="mb-12 flex items-start gap-4 border-b border-zinc-800 pb-8"
    >
      <div className="text-blue-400 text-2xl">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-zinc-50">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </motion.div>
  );
};