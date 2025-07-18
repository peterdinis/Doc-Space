"use client";

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { FC } from "react";

const features = [
  {
    Icon: FileTextIcon,
    name: "Auto Save",
    description: "All your changes are saved in real-time as you type.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="/images/autosave-bg.png"
        alt="Auto Save Background"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Smart Search",
    description: "Find documents instantly with full-text and keyword search.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="/images/search-bg.png"
        alt="Search Background"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Cross-Language Support",
    description: "Write and collaborate in over 100+ languages.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="/images/multilingual-bg.png"
        alt="Multilingual Background"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Version History",
    description: "Easily navigate and restore previous versions of a document.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="/images/calendar-bg.png"
        alt="Version History Background"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Real-Time Notifications",
    description: "Get alerts when someone edits or shares a document with you.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="/images/notifications-bg.png"
        alt="Notifications Background"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

const Features: FC = () => {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default Features
