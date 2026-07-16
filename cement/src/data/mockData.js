export const CURRENT_USER = {
  name: 'David Johnson',
  role: 'Family Archivist',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
};

export const RECENT_ACTIVITIES = [
  {
    id: 1,
    user: 'Amina',
    action: 'added a new photo to the family album.',
    detail: 'Grandma’s 1962 portrait',
    time: '5m ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 2,
    user: 'Kofi',
    action: 'left a tribute for Robert Johnson.',
    detail: 'A memory of his guidance',
    time: '1h ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export const LANDING_FAQS = [
  {
    q: 'What is Family Legacy?',
    a: 'It is a private digital archive for preserving family stories, photos, and milestones.'
  },
  {
    q: 'Can I invite my relatives?',
    a: 'Yes. The community area is designed for close-knit family collaboration.'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Grandma at the Market',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=600',
    date: '1984'
  },
  {
    id: 2,
    title: 'Wedding Day',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
    date: '1975'
  }
];

export const LIFE_TIMELINES = [
  {
    year: '1948',
    title: 'Birth of William Johnson',
    description: 'The family story began with a new generation.'
  },
  {
    year: '1973',
    title: 'David joins the family archive',
    description: 'A new chapter of preserving family history began.'
  }
];

export const COMMUNITY_CHANNELS = {
  text: [
    { id: 'general', name: 'general-chat', description: 'Main family discussion area.' },
    { id: 'announcements', name: 'announcements', description: 'Official family news.' },
    { id: 'history', name: 'history-vault', description: 'Discussing our roots.' },
  ],
  voice: [
    { id: 'lounge', name: 'Family Lounge' },
    { id: 'roots', name: 'Roots & Wisdom' },
  ]
};
