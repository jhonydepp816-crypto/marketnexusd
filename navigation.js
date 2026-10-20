/** Primary navigation. `id` must match the `id` of the section element. */
export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'performance', label: 'Performance' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'journal', label: 'Journal' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const navSectionIds = navItems.map((item) => item.id);
