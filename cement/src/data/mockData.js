export const CURRENT_USER = {
  name: 'David Johnson',
  role: 'Family Archivist',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
};

export const FAMILY_GROUPS = [
  {
    id: 'johnson-family',
    name: 'Johnson Family',
    surname: 'Johnson',
    country: 'Nigeria',
    state: 'Lagos',
    town: 'Ikeja',
    logo: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=200',
    motto: 'Our roots, our future.',
    about: 'A multigenerational family of educators, storytellers, and community organizers preserving our legacy together.',
    memberIds: ['david-johnson', 'william-johnson', 'linda-johnson', 'robert-johnson', 'mary-johnson', 'olivia-johnson'],
    publicMembersCount: 6,
    isPublic: true
  },
  {
    id: 'adaeze-family',
    name: 'Adaeze Family',
    surname: 'Adaeze',
    country: 'Ghana',
    state: 'Greater Accra',
    town: 'Accra',
    logo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    motto: 'Strength in shared stories.',
    about: 'A growing family network focused on tradition, education, and the power of collective memory.',
    memberIds: [],
    publicMembersCount: 3,
    isPublic: true
  }
];

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

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    familyId: 'johnson-family',
    familyName: 'Johnson Family',
    title: 'Family Reunion 2026',
    date: 'June 15, 2026',
    type: 'Reunion',
    priority: 'High',
    content: 'We are thrilled to announce that the biennial Johnson family reunion will be held in Lagos this year. Mark your calendars for July 20-25!',
    icon: 'Calendar',
    color: 'bg-orange-500'
  },
  {
    id: 2,
    familyId: 'johnson-family',
    familyName: 'Johnson Family',
    title: 'New Baby Welcome',
    date: 'June 10, 2026',
    type: 'New Baby',
    priority: 'Medium',
    content: 'Welcome baby Ayo to the family! Share your messages of love and blessings in the family hub.',
    icon: 'Baby',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    familyId: 'johnson-family',
    familyName: 'Johnson Family',
    title: 'Emergency Response Drill',
    date: 'June 05, 2026',
    type: 'Emergency Notice',
    priority: 'Normal',
    content: 'The family emergency response plan has been updated. Please review the new procedures in the emergency section.',
    icon: 'ShieldCheck',
    color: 'bg-red-500'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'announcement',
    title: 'New family announcement posted',
    message: 'Family Reunion 2026 has been published for the Johnson Family.',
    date: 'Just now',
    read: false,
    route: '/announcements'
  },
  {
    id: 2,
    type: 'match',
    title: 'Possible face match found',
    message: 'A photo upload may match Olivia Johnson. Review the match in Search.',
    date: '5m ago',
    read: false,
    route: '/search'
  }
];

export const LANDING_FAQS = [
  {
    question: 'What is Family Legacy?',
    answer: 'Family Legacy is a secure digital archive for preserving family stories, photos, documents, and genealogy. It helps families keep records organized and accessible across generations.'
  },
  {
    question: 'How do I get started?',
    answer: 'Create a free account, start a family tree, upload photos and documents, then invite relatives so they can contribute stories and memories.'
  },
  {
    question: 'Can relatives contribute to the archive?',
    answer: 'Yes, relatives can join a family group, add memories, share photos, and update timelines while access controls keep the archive private.'
  },
  {
    question: 'Is my family data private?',
    answer: 'Absolutely. Family Legacy is designed around privacy and secure sharing, with permission controls for documents, media, and family connections.'
  },
  {
    question: 'What features are included?',
    answer: 'You get family tree building, timeline creation, memorial walls, AI image search, community chat, and secure document storage in one platform.'
  },
  {
    question: 'Where can I find help?',
    answer: 'Use the FAQ page for common questions, or reach out via the footer links for support, privacy, and account assistance.'
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
