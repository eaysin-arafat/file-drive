import { NavItem } from '@/types';

export const TYPE_OPTIONS = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'image',
    label: 'Image'
  },
  {
    value: 'csv',
    label: 'Csv'
  },
  {
    value: 'pdf',
    label: 'Pdf'
  }
];

export const navItems: NavItem[] = [
  {
    title: 'All Files',
    url: '/dashboard/files',
    icon: 'files',
    shortcut: ['f', 'f'],
    isActive: false
  },
  {
    title: 'Favorite',
    url: '/dashboard/favorite',
    icon: 'favorite',
    shortcut: ['f', 'f'],
    isActive: false
  },
  {
    title: 'Trash',
    url: '/dashboard/trash',
    icon: 'trash',
    shortcut: ['t', 't'],
    isActive: false
  }
];
