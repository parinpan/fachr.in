/**
 * Command Action Handlers
 * Extracted helper functions for CommandMenu actions
 */

/**
 * Navigate to a path or scroll to an element on the home page
 */
export function handleNavigationAction(
  item: { path?: string; id?: string },
  router: { push: (path: string) => void },
  onComplete: () => void
) {
  if (item.path) {
    onComplete();
    router.push(item.path);
  } else if (item.id) {
    onComplete();
    // If we're not on home page, go there first
    if (window.location.pathname !== '/') {
      router.push('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const el = document.getElementById(item.id!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      const el = document.getElementById(item.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
