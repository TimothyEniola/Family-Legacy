export const isFamilyAdmin = (user = CURRENT_USER) => user?.role === 'Super Admin' || user?.role === 'Family Founder';

export const CURRENT_USER = {
  name: 'David Johnson',
  role: 'Family Founder',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  email: 'david.johnson@familylegacy.example'
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

export const INITIAL_FAMILY_POSTS = [
  {
    id: 'post-johnson-reunion',
    familyId: 'johnson-family',
    familyName: 'Johnson Family',
    authorName: 'David Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    kind: 'status',
    body: 'The family reunion is coming together. I can’t wait to see everyone and hear the stories we have been collecting.',
    createdAt: 'Today · 9:42 AM',
    reactions: { heart: 18, comments: 4 }
  },
  {
    id: 'post-adaeze-market',
    familyId: 'adaeze-family',
    familyName: 'Adaeze Family',
    authorName: 'Ama Adaeze',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    kind: 'post',
    body: 'Sharing a little piece of our family’s Saturday market tradition. Three generations, one recipe notebook, and a lot of laughter.',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000',
    createdAt: 'Yesterday · 4:18 PM',
    reactions: { heart: 32, comments: 7 }
  },
  {
    id: 'post-johnson-memory',
    familyId: 'johnson-family',
    familyName: 'Johnson Family',
    authorName: 'Linda Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
    kind: 'memory',
    body: 'Found this note in Mother’s recipe book: “A meal tastes better when there is room at the table for one more.” Keeping that tradition alive.',
    createdAt: 'Monday · 11:06 AM',
    reactions: { heart: 24, comments: 3 }
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

export const DOCUMENT_CATEGORIES = [
  'Property Deeds',
  'Birth Certificates',
  'Death Certificates',
  'Marriage Records',
  'Historical Letters',
  'Family Tree',
  'Legal Records',
  'Medical Records',
  'Other'
];

export const INITIAL_DOCUMENTS = [
  { id: 'doc-deed-1952', name: '1952 Ebute Metta Deed', category: 'Property Deeds', sizeBytes: 12582912, date: '1952-06-15', type: 'PDF', description: 'An ancestral property record.' },
  { id: 'doc-marriage-1970', name: 'William & Linda Marriage', category: 'Marriage Records', sizeBytes: 2516582, date: '1970-09-21', type: 'JPG', description: 'Marriage record for William and Linda Johnson.' },
  { id: 'doc-letter-1944', name: 'Ancestral Letter — Robert', category: 'Historical Letters', sizeBytes: 870400, date: '1944-01-10', type: 'PDF', description: 'A letter preserved from the family archive.' },
  { id: 'doc-tree-vol-1', name: 'Family Tree Volume 1', category: 'Family Tree', sizeBytes: 47185920, date: '2023-12-20', type: 'EBOOK', description: 'First volume of the family tree archive.' }
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
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=600',
    type: 'photo',
    category: 'history',
    date: '1984'
  },
  {
    id: 2,
    title: 'Wedding Day',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
    type: 'photo',
    category: 'weddings',
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
