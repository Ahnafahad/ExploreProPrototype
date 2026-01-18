// Design System Constants for ExplorePro
// Provides consistent styling values across all screens

// Border Radius System (reduced from 8 to 4 values)
export const RADIUS = {
  sm: '10px',      // inputs, small buttons
  md: '16px',      // standard cards
  lg: '20px',      // large cards, sections
  xl: '24px',      // bottom sheets, modals
  full: '9999px'   // pills, circular buttons
} as const;

// Spacing System
export const SPACING = {
  screenPadding: 'px-5',     // Standard screen horizontal padding
  cardPadding: 'p-4',        // Standard card padding
  sectionGap: 'space-y-4',   // Gap between list items
  screenGap: 'mb-8'          // Gap between screen sections
} as const;

// Button Heights (for consistency)
export const BUTTON_SIZE = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12'
} as const;

// Helper functions for Tailwind classes
export const getRadius = (size: keyof typeof RADIUS) => {
  return `rounded-[${RADIUS[size]}]`;
};

export const getButtonHeight = (size: keyof typeof BUTTON_SIZE) => {
  return BUTTON_SIZE[size];
};
