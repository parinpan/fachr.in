import { CONTACT_ICONS, APPEARANCE_ICONS, getAppearanceIcon } from '@/lib/icon-maps';
import { Mail, Linkedin, Github, Twitter, Play, Mic, FileText } from 'lucide-react';

describe('CONTACT_ICONS', () => {
  it('maps email to Mail icon', () => {
    expect(CONTACT_ICONS.email).toBe(Mail);
  });

  it('maps linkedin to Linkedin icon', () => {
    expect(CONTACT_ICONS.linkedin).toBe(Linkedin);
  });

  it('maps github to Github icon', () => {
    expect(CONTACT_ICONS.github).toBe(Github);
  });

  it('maps twitter to Twitter icon', () => {
    expect(CONTACT_ICONS.twitter).toBe(Twitter);
  });
});

describe('APPEARANCE_ICONS', () => {
  it('maps video to Play icon', () => {
    expect(APPEARANCE_ICONS.video).toBe(Play);
  });

  it('maps talk to Mic icon', () => {
    expect(APPEARANCE_ICONS.talk).toBe(Mic);
  });

  it('maps flyer to FileText icon', () => {
    expect(APPEARANCE_ICONS.flyer).toBe(FileText);
  });
});

describe('getAppearanceIcon', () => {
  it('returns Play icon for video type', () => {
    expect(getAppearanceIcon('video')).toBe(Play);
  });

  it('returns Mic icon for talk type', () => {
    expect(getAppearanceIcon('talk')).toBe(Mic);
  });

  it('returns FileText icon for flyer type', () => {
    expect(getAppearanceIcon('flyer')).toBe(FileText);
  });
});
