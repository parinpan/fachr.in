import { Mail, Linkedin, Github, Twitter, Play, Mic, FileText } from 'lucide-react';

/**
 * Contact Icon Mappings
 * Maps contact types to their respective Lucide icons
 */
export const CONTACT_ICONS = {
    email: Mail,
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
} as const;

export type ContactType = keyof typeof CONTACT_ICONS;

/**
 * Appearance Icon Mappings
 * Maps appearance types (video, talk, flyer) to their respective icons
 */
export const APPEARANCE_ICONS = {
    video: Play,
    talk: Mic,
    flyer: FileText,
} as const;

export type AppearanceType = keyof typeof APPEARANCE_ICONS;

/**
 * Get icon component for appearance type
 * Eliminates nested ternaries in components
 */
export function getAppearanceIcon(type: AppearanceType) {
    return APPEARANCE_ICONS[type] || FileText;
}
