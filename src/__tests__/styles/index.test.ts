import * as stylesIndex from '@/styles';
import * as componentsExports from '@/styles/components';

describe('styles/index', () => {
  it('should re-export all styles from components', () => {
    // Check that all exports from components are available in index
    expect(stylesIndex.cardStyles).toBe(componentsExports.cardStyles);
    expect(stylesIndex.buttonStyles).toBe(componentsExports.buttonStyles);
    expect(stylesIndex.sectionStyles).toBe(componentsExports.sectionStyles);
    expect(stylesIndex.textStyles).toBe(componentsExports.textStyles);
    expect(stylesIndex.badgeStyles).toBe(componentsExports.badgeStyles);
    expect(stylesIndex.modalStyles).toBe(componentsExports.modalStyles);
    expect(stylesIndex.inputStyles).toBe(componentsExports.inputStyles);
    expect(stylesIndex.gridStyles).toBe(componentsExports.gridStyles);
    expect(stylesIndex.animationStyles).toBe(componentsExports.animationStyles);
    expect(stylesIndex.patterns).toBe(componentsExports.patterns);
  });
});
