/**
 * Utility functions for classname merging
 * This is a placeholder for UI component utilities
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
