import {
  cardStyles,
  buttonStyles,
  sectionStyles,
  textStyles,
  badgeStyles,
  modalStyles,
  inputStyles,
  gridStyles,
  animationStyles,
  patterns,
} from '@/styles/components';

describe('styles/components', () => {
  describe('cardStyles', () => {
    it('should have base style', () => {
      expect(cardStyles.base).toContain('rounded-xl');
      expect(cardStyles.base).toContain('shadow-sm');
    });

    it('should have elevated style', () => {
      expect(cardStyles.elevated).toContain('rounded-2xl');
      expect(cardStyles.elevated).toContain('shadow-md');
    });

    it('should have interactive style with hover effects', () => {
      expect(cardStyles.interactive).toContain('hover:shadow-md');
      expect(cardStyles.interactive).toContain('cursor-pointer');
    });
  });

  describe('buttonStyles', () => {
    it('should have primary style', () => {
      expect(buttonStyles.primary).toContain('inline-flex');
      expect(buttonStyles.primary).toContain('items-center');
      expect(buttonStyles.primary).toContain('rounded-lg');
    });

    it('should have secondary style', () => {
      expect(buttonStyles.secondary).toContain('p-2');
      expect(buttonStyles.secondary).toContain('rounded-full');
    });

    it('should have icon style', () => {
      expect(buttonStyles.icon).toContain('p-2');
      expect(buttonStyles.icon).toContain('rounded-lg');
    });

    it('should have nav style', () => {
      expect(buttonStyles.nav).toContain('rounded-full');
      expect(buttonStyles.nav).toContain('text-sm');
    });

    it('should have navActive style', () => {
      expect(buttonStyles.navActive).toContain('shadow-md');
    });

    it('should have navInactive style', () => {
      expect(buttonStyles.navInactive).toContain('hover:bg-');
    });
  });

  describe('sectionStyles', () => {
    it('should have container style', () => {
      expect(sectionStyles.container).toBe('mb-12');
    });

    it('should have heading style', () => {
      expect(sectionStyles.heading).toContain('text-2xl');
      expect(sectionStyles.heading).toContain('font-bold');
    });

    it('should have subheading style', () => {
      expect(sectionStyles.subheading).toContain('text-xl');
    });
  });

  describe('textStyles', () => {
    it('should have title style', () => {
      expect(textStyles.title).toContain('text-3xl');
      expect(textStyles.title).toContain('font-extrabold');
    });

    it('should have subtitle style', () => {
      expect(textStyles.subtitle).toContain('text-xl');
    });

    it('should have body style', () => {
      expect(textStyles.body).toContain('text-lg');
      expect(textStyles.body).toContain('leading-relaxed');
    });

    it('should have muted style', () => {
      expect(textStyles.muted).toContain('text-sm');
    });

    it('should have label style', () => {
      expect(textStyles.label).toContain('text-sm');
      expect(textStyles.label).toContain('uppercase');
    });
  });

  describe('badgeStyles', () => {
    it('should have base style', () => {
      expect(badgeStyles.base).toContain('inline-flex');
      expect(badgeStyles.base).toContain('rounded-full');
    });

    it('should have default style', () => {
      expect(badgeStyles.default).toContain('bg-neutral-100');
    });

    it('should have tech style', () => {
      expect(badgeStyles.tech).toContain('bg-[var(--color-badge-bg)]');
    });

    it('should have pill style', () => {
      expect(badgeStyles.pill).toContain('px-3');
      expect(badgeStyles.pill).toContain('rounded-full');
    });
  });

  describe('modalStyles', () => {
    it('should have overlay style', () => {
      expect(modalStyles.overlay).toContain('fixed');
      expect(modalStyles.overlay).toContain('inset-0');
      expect(modalStyles.overlay).toContain('z-50');
    });

    it('should have backdrop style', () => {
      expect(modalStyles.backdrop).toContain('absolute');
      expect(modalStyles.backdrop).toContain('bg-black/60');
      expect(modalStyles.backdrop).toContain('backdrop-blur-sm');
    });

    it('should have content style', () => {
      expect(modalStyles.content).toContain('relative');
      expect(modalStyles.content).toContain('rounded-2xl');
      expect(modalStyles.content).toContain('shadow-2xl');
    });

    it('should have closeButton style', () => {
      expect(modalStyles.closeButton).toContain('absolute');
      expect(modalStyles.closeButton).toContain('rounded-full');
    });
  });

  describe('inputStyles', () => {
    it('should have base style', () => {
      expect(inputStyles.base).toContain('w-full');
      expect(inputStyles.base).toContain('outline-none');
      expect(inputStyles.base).toContain('bg-transparent');
    });

    it('should have search style', () => {
      expect(inputStyles.search).toContain('w-full');
      expect(inputStyles.search).toContain('h-14');
      expect(inputStyles.search).toContain('text-lg');
    });
  });

  describe('gridStyles', () => {
    it('should have twoColumn style', () => {
      expect(gridStyles.twoColumn).toContain('grid');
      expect(gridStyles.twoColumn).toContain('md:grid-cols-2');
    });

    it('should have threeColumn style', () => {
      expect(gridStyles.threeColumn).toContain('grid');
      expect(gridStyles.threeColumn).toContain('lg:grid-cols-3');
    });

    it('should have responsive style', () => {
      expect(gridStyles.responsive).toContain('flex');
      expect(gridStyles.responsive).toContain('md:flex-row');
    });
  });

  describe('animationStyles', () => {
    it('should have fadeIn style', () => {
      expect(animationStyles.fadeIn).toContain('animate-in');
      expect(animationStyles.fadeIn).toContain('fade-in');
    });

    it('should have slideUp style', () => {
      expect(animationStyles.slideUp).toContain('animate-in');
      expect(animationStyles.slideUp).toContain('slide-in-from-bottom');
    });

    it('should have zoomIn style', () => {
      expect(animationStyles.zoomIn).toContain('animate-in');
      expect(animationStyles.zoomIn).toContain('zoom-in');
    });

    it('should have scaleHover style', () => {
      expect(animationStyles.scaleHover).toContain('transition-transform');
      expect(animationStyles.scaleHover).toContain('group-hover:scale-105');
    });
  });

  describe('patterns', () => {
    it('should have contactCard pattern', () => {
      expect(patterns.contactCard).toContain('flex');
      expect(patterns.contactCard).toContain('items-center');
      expect(patterns.contactCard).toContain('rounded-xl');
    });

    it('should have experienceCard pattern', () => {
      expect(patterns.experienceCard).toContain('relative');
      expect(patterns.experienceCard).toContain('rounded-2xl');
    });

    it('should have metadataBadge pattern', () => {
      expect(patterns.metadataBadge).toContain('flex');
      expect(patterns.metadataBadge).toContain('rounded-lg');
    });
  });
});
