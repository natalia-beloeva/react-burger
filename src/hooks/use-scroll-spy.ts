import { useState } from 'react';

type TScrollSpySection<T> = {
  id: T;
  ref: React.RefObject<HTMLElement | null>;
};

type TUseScrollSpy<T> = {
  activeSection: T;
  handleScroll: () => void;
  scrollToSection: (id: T) => void;
};

export const useScrollSpy = <T extends string>(
  containerRef: React.RefObject<HTMLElement | null>,
  sections: TScrollSpySection<T>[],
  initialSection: T
): TUseScrollSpy<T> => {
  const [activeSection, setActiveSection] = useState(initialSection);

  const handleScroll = (): void => {
    if (!containerRef.current) {
      return;
    }

    const containerTop = containerRef.current.getBoundingClientRect().top;

    let closestSection = activeSection;
    let closestDistance = Infinity;

    for (const { id, ref } of sections) {
      if (!ref.current) {
        continue;
      }

      const distance = Math.abs(ref.current.getBoundingClientRect().top - containerTop);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = id;
      }
    }

    setActiveSection(closestSection);
  };

  const scrollToSection = (id: T): void => {
    setActiveSection(id);
    sections
      .find((section) => section.id === id)
      ?.ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return { activeSection, handleScroll, scrollToSection };
};
