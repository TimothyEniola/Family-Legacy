import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CURRENT_USER, DOCUMENT_CATEGORIES, FAMILY_GROUPS, INITIAL_ANNOUNCEMENTS, INITIAL_DOCUMENTS, INITIAL_FAMILY_POSTS, INITIAL_NOTIFICATIONS, isFamilyAdmin, RECENT_ACTIVITIES } from '../data/mockData';

const readStoredValue = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const FamilyContext = createContext(null);
const makeArchiveId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const initialMembers = [
  {
    id: 'david-johnson',
    name: 'David Johnson',
    nickname: 'DJ',
    familyId: 'johnson-family',
    publicProfile: true,
    publicBio: true,
    faceRecognitionOptIn: true,
    role: 'Family Head',
    status: 'Alive',
    birthDate: '1973-05-14',
    deathDate: null,
    birthPlace: 'Lagos, Nigeria',
    town: 'Ikeja',
    state: 'Lagos',
    country: 'Nigeria',
    bio: 'Community organizer and family historian.',
    shortBio: 'Community organizer and family historian.',
    occupation: 'Historian',
    marriageYear: 2000,
    childrenIds: [],
    achievements: ['Published "Our Family Story" book', 'Founded the local history club'],
    lifeLessons: ['Patience is a virtue.', 'Always listen more than you speak.'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800',
    parentId: 'william-johnson'
  },
  {
    id: 'william-johnson',
    name: 'William Johnson',
    nickname: 'Will',
    familyId: 'johnson-family',
    publicProfile: true,
    publicBio: true,
    faceRecognitionOptIn: true,
    role: 'Grandfather',
    status: 'Alive',
    birthDate: '1948-11-03',
    deathDate: null,
    birthPlace: 'Ibadan, Nigeria',
    town: 'Ibadan',
    state: 'Oyo',
    country: 'Nigeria',
    bio: 'Retired teacher and storyteller.',
    shortBio: 'Retired teacher and storyteller.',
    occupation: 'Teacher',
    spouseId: 'linda-johnson',
    marriageYear: 1970,
    childrenIds: ['david-johnson'],
    achievements: ['Teacher of the Year 1985', 'Community Service Award 1992'],
    lifeLessons: ['Knowledge is the key to freedom.'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800',
    parentId: 'robert-johnson'
  },
  {
    id: 'linda-johnson',
    name: 'Linda Johnson',
    nickname: 'Lindy',
    familyId: 'johnson-family',
    publicProfile: true,
    publicBio: true,
    faceRecognitionOptIn: false,
    role: 'Grandmother',
    status: 'Alive',
    birthDate: '1950-09-21',
    deathDate: null,
    birthPlace: 'Abeokuta, Nigeria',
    town: 'Abeokuta',
    state: 'Ogun',
    country: 'Nigeria',
    bio: 'A passionate community volunteer.',
    shortBio: 'A passionate community volunteer.',
    occupation: 'Volunteer',
    spouseId: 'william-johnson',
    marriageYear: 1970,
    childrenIds: ['david-johnson'],
    achievements: ['Red Cross Volunteer of the Decade'],
    lifeLessons: ['Kindness costs nothing.'],
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    parentId: 'mary-johnson'
  },
  {
    id: 'robert-johnson',
    name: 'Robert Johnson',
    nickname: 'Robert',
    familyId: 'johnson-family',
    publicProfile: true,
    publicBio: false,
    faceRecognitionOptIn: true,
    role: 'Great Grandfather',
    status: 'Deceased',
    birthDate: '1920-01-10',
    deathDate: '1998-04-19',
    birthPlace: 'Edinburgh, Scotland',
    town: 'Edinburgh',
    state: 'Scotland',
    country: 'United Kingdom',
    bio: 'One of the original founders of the family legacy archive.',
    shortBio: 'Founding family historian.',
    occupation: 'Businessman',
    spouseId: 'mary-johnson',
    marriageYear: 1940,
    childrenIds: ['william-johnson'],
    achievements: ['Founded Johnson & Sons Timber'],
    lifeLessons: [],
    avatar: 'https://images.unsplash.com/photo-1472417583565-62e7bdeda490?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?auto=format&fit=crop&q=80&w=800',
    parentId: null
  },
  {
    id: 'mary-johnson',
    name: 'Mary Johnson',
    nickname: 'Mama Mary',
    familyId: 'johnson-family',
    publicProfile: true,
    publicBio: true,
    faceRecognitionOptIn: false,
    role: 'Great Grandmother',
    status: 'Deceased',
    birthDate: '1922-02-14',
    deathDate: '2001-08-11',
    birthPlace: 'Kano, Nigeria',
    town: 'Kano',
    state: 'Kano',
    country: 'Nigeria',
    bio: 'Known for preserving family recipes and oral history.',
    shortBio: 'Keeper of recipes and oral history.',
    occupation: 'Homemaker',
    spouseId: 'robert-johnson',
    marriageYear: 1940,
    childrenIds: ['william-johnson'],
    achievements: ['Best cook in the county, 1965'],
    lifeLessons: [],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800',
    parentId: null
  },
  {
    id: 'olivia-johnson',
    name: 'Olivia Johnson',
    nickname: 'Liv',
    familyId: 'johnson-family',
    publicProfile: true,
    publicBio: true,
    faceRecognitionOptIn: false,
    role: 'Niece',
    status: 'Missing',
    birthDate: '2003-11-09',
    deathDate: null,
    birthPlace: 'Lagos, Nigeria',
    town: 'Ikeja',
    state: 'Lagos',
    country: 'Nigeria',
    bio: 'Young artist with a love for family stories.',
    shortBio: 'Young artist missing since 2025.',
    occupation: 'Art Student',
    childrenIds: [],
    achievements: ['City art exhibit participant'],
    lifeLessons: ['Trust the path before you.', 'Family always finds you.'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    parentId: 'linda-johnson'
  },
  {
    id: 'arthur-johnson', name: 'Arthur Johnson', nickname: 'Art', familyId: 'johnson-family', publicProfile: true, publicBio: true, faceRecognitionOptIn: false,
    role: 'Uncle', status: 'Alive', birthDate: '1966-08-20', deathDate: null, birthPlace: 'Lagos, Nigeria', town: 'Lagos', state: 'Lagos', country: 'Nigeria',
    bio: 'A generous uncle who kept the family close while working abroad.', shortBio: 'Uncle and ocean enthusiast.', occupation: 'Maritime Engineer', childrenIds: [], achievements: ['Supported the family migration archive'], lifeLessons: ['Stay curious.'],
    avatar: 'https://i.pravatar.cc/200?u=arthur-johnson', coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800', parentId: 'william-johnson'
  },
  {
    id: 'helen-johnson', name: 'Helen Johnson', nickname: 'Helen', familyId: 'johnson-family', publicProfile: true, publicBio: true, faceRecognitionOptIn: false,
    role: 'Spouse', status: 'Alive', birthDate: '1974-04-02', deathDate: null, birthPlace: 'Ibadan, Nigeria', town: 'Ibadan', state: 'Oyo', country: 'Nigeria',
    bio: 'Artist and community volunteer who brings the family together.', shortBio: 'Artist and community volunteer.', occupation: 'Artist', spouseId: 'david-johnson', marriageYear: 2000, childrenIds: ['emma-johnson', 'liam-johnson', 'olivia-johnson'], achievements: [], lifeLessons: [],
    avatar: 'https://i.pravatar.cc/200?u=helen-johnson', coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800', parentId: null
  },
  {
    id: 'james-johnson', name: 'James Johnson', nickname: 'James', familyId: 'johnson-family', publicProfile: true, publicBio: true, faceRecognitionOptIn: false,
    role: 'Brother', status: 'Alive', birthDate: '1976-01-18', deathDate: null, birthPlace: 'Lagos, Nigeria', town: 'Lagos', state: 'Lagos', country: 'Nigeria',
    bio: 'A thoughtful brother and keeper of old family photographs.', shortBio: 'Family photographer.', occupation: 'Photographer', childrenIds: [], achievements: [], lifeLessons: [],
    avatar: 'https://i.pravatar.cc/200?u=james-johnson', coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800', parentId: 'william-johnson'
  },
  {
    id: 'sarah-johnson', name: 'Sarah Johnson', nickname: 'Sarah', familyId: 'johnson-family', publicProfile: true, publicBio: true, faceRecognitionOptIn: false,
    role: 'Sister', status: 'Alive', birthDate: '1971-06-12', deathDate: null, birthPlace: 'Lagos, Nigeria', town: 'Lagos', state: 'Lagos', country: 'Nigeria',
    bio: 'A teacher who loves collecting family stories.', shortBio: 'Teacher and story collector.', occupation: 'Teacher', childrenIds: [], achievements: [], lifeLessons: [],
    avatar: 'https://i.pravatar.cc/200?u=sarah-johnson', coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800', parentId: 'william-johnson'
  },
  {
    id: 'michael-johnson', name: 'Michael Johnson', nickname: 'Mike', familyId: 'johnson-family', publicProfile: true, publicBio: true, faceRecognitionOptIn: false,
    role: 'Brother', status: 'Alive', birthDate: '1978-10-30', deathDate: null, birthPlace: 'Ibadan, Nigeria', town: 'Ibadan', state: 'Oyo', country: 'Nigeria',
    bio: 'A family member who enjoys documenting reunions and birthdays.', shortBio: 'Family archivist.', occupation: 'Archivist', childrenIds: [], achievements: [], lifeLessons: [],
    avatar: 'https://i.pravatar.cc/200?u=michael-johnson', coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800', parentId: 'william-johnson'
  },
  {
    id: 'emma-johnson', name: 'Emma Johnson', nickname: 'Emma', familyId: 'johnson-family', publicProfile: true, publicBio: true, faceRecognitionOptIn: false,
    role: 'Daughter', status: 'Alive', birthDate: '2005-03-11', deathDate: null, birthPlace: 'Lagos, Nigeria', town: 'Lagos', state: 'Lagos', country: 'Nigeria',
    bio: 'A curious student who enjoys learning the family history.', shortBio: 'Student and family storyteller.', occupation: 'Student', childrenIds: [], achievements: [], lifeLessons: [],
    avatar: 'https://i.pravatar.cc/200?u=emma-johnson', coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800', parentId: 'david-johnson'
  },
  {
    id: 'liam-johnson', name: 'Liam Johnson', nickname: 'Liam', familyId: 'johnson-family', publicProfile: true, publicBio: true, faceRecognitionOptIn: false,
    role: 'Son', status: 'Alive', birthDate: '2008-09-05', deathDate: null, birthPlace: 'Lagos, Nigeria', town: 'Lagos', state: 'Lagos', country: 'Nigeria',
    bio: 'A young family member with a growing interest in family photographs.', shortBio: 'Young family historian.', occupation: 'Student', childrenIds: [], achievements: [], lifeLessons: [],
    avatar: 'https://i.pravatar.cc/200?u=liam-johnson', coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800', parentId: 'david-johnson'
  }
];

const initialEvents = [
  {
    id: 1,
    title: 'Family Reunion',
    date: 'June 28, 2026',
    location: 'Lagos, Nigeria',
    icon: 'gift'
  },
  {
    id: 2,
    title: 'Story Circle',
    date: 'July 4, 2026',
    location: 'Virtual',
    icon: 'calendar'
  }
];

const initialTributes = {
  'robert-johnson': [
    { author: 'Amina', date: 'May 10, 2026', text: 'Your wisdom still guides us every day.' }
  ]
};

const initialChatMessages = {
  general: [
    {
      id: 1,
      senderName: 'David',
      timestamp: '10:30',
      content: 'Welcome to the family hub.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    }
  ],
  announcements: []
};

export function FamilyProvider({ children }) {
  const [members, setMembers] = useState(() => readStoredValue('family-legacy-members', initialMembers));
  const [familyGroups, setFamilyGroups] = useState(() => readStoredValue('family-legacy-groups', FAMILY_GROUPS));
  const [events, setEvents] = useState(() => readStoredValue('family-legacy-events', initialEvents));
  const [notifications, setNotifications] = useState(() => readStoredValue('family-legacy-notifications', INITIAL_NOTIFICATIONS));
  const [announcements, setAnnouncements] = useState(() => readStoredValue('family-legacy-announcements', INITIAL_ANNOUNCEMENTS));
  const [activities, setActivities] = useState(() => readStoredValue('family-legacy-activities', RECENT_ACTIVITIES));
  const [documents, setDocuments] = useState(() => readStoredValue('family-legacy-documents', INITIAL_DOCUMENTS));
  const [activeMemberId, setActiveMemberId] = useState(initialMembers[0].id);
  const [tributes, setTributes] = useState(initialTributes);
  const [chatMessages, setChatMessages] = useState(() => readStoredValue('family-legacy-chat', initialChatMessages));
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [familyPosts, setFamilyPosts] = useState(() => readStoredValue('family-legacy-posts', INITIAL_FAMILY_POSTS));
  const [candleCounts, setCandleCounts] = useState(() => readStoredValue('family-legacy-candles', {
    'robert-johnson': 42,
    'mary-johnson': 38
  }));

  useEffect(() => {
    try {
      window.localStorage.setItem('family-legacy-members', JSON.stringify(members));
      window.localStorage.setItem('family-legacy-groups', JSON.stringify(familyGroups));
      window.localStorage.setItem('family-legacy-events', JSON.stringify(events));
      window.localStorage.setItem('family-legacy-notifications', JSON.stringify(notifications));
      window.localStorage.setItem('family-legacy-announcements', JSON.stringify(announcements));
      window.localStorage.setItem('family-legacy-activities', JSON.stringify(activities));
      window.localStorage.setItem('family-legacy-documents', JSON.stringify(documents));
    } catch {
      // Archive updates remain available for the current session if storage is unavailable.
    }
  }, [members, familyGroups, events, notifications, announcements, activities, documents]);

  useEffect(() => {
    try {
      const persistentMessages = Object.fromEntries(Object.entries(chatMessages).map(([channel, messages]) => [
        channel,
        messages.filter((message) => message.kind !== 'voice-note').map((message) => {
          if (!message.audioUrl) return message;
          const savedMessage = { ...message };
          delete savedMessage.audioUrl;
          return savedMessage;
        })
      ]));
      window.localStorage.setItem('family-legacy-chat', JSON.stringify(persistentMessages));
    } catch {
      // Chat announcements and text stay available for the current session if storage is unavailable.
    }
  }, [chatMessages]);

  useEffect(() => {
    try {
      window.localStorage.setItem('family-legacy-posts', JSON.stringify(familyPosts));
    } catch {
      // Keep the feed usable when storage is unavailable or full.
    }
  }, [familyPosts]);

  useEffect(() => {
    try {
      window.localStorage.setItem('family-legacy-candles', JSON.stringify(candleCounts));
    } catch {
      // Candle lighting remains available for the current session.
    }
  }, [candleCounts]);

  const activeMember = useMemo(
    () => members.find((member) => member.id === activeMemberId) || members[0],
    [members, activeMemberId]
  );

  const addMember = (member) => {
    const newMember = {
id: makeArchiveId(member.name.toLowerCase().replace(/\s+/g, '-')),
      name: member.name,
      familyId: member.familyId || 'johnson-family',
      publicProfile: true,
      publicBio: true,
      role: member.role || 'Family Member',
      status: member.status || 'Alive',
      birthDate: member.birthDate || '',
      deathDate: member.deathDate || null,
      birthPlace: member.birthPlace || 'Family archive',
      bio: member.bio || 'Newly added family member.',
      avatar: member.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      parentId: member.parentId || null,
      childrenIds: []
    };

    setMembers((prev) => [...prev, newMember]);
    setActiveMemberId(newMember.id);
    addActivity({ action: 'added a family member.', detail: newMember.name });
    return newMember.id;
  };

  const getMemberById = (id) => members.find((member) => member.id === id) || null;

  const addActivity = ({ action, detail }) => {
    setActivities((previous) => [{
      id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      user: CURRENT_USER.name,
      action,
      detail,
      time: 'Just now',
      avatar: CURRENT_USER.avatar
    }, ...previous]);
  };

  const addNotification = ({ title, message, route = '/announcements' }) => {
    setNotifications((previous) => [{
      id: `notification-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: 'announcement', title, message, date: 'Just now', read: false, route
    }, ...previous]);
  };

  const markNotificationRead = (notificationId) => {
    setNotifications((previous) => previous.map((notification) => notification.id === notificationId ? { ...notification, read: true } : notification));
  };

  const addFamilyGroup = (draft) => {
    const baseId = draft.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'family';
    const record = {
      id: `${baseId}-${Date.now().toString(36)}`,
      name: draft.name.trim(), surname: draft.name.trim().split(/\s+/).at(-1),
      country: draft.country.trim() || 'Not specified', state: draft.state.trim(), town: draft.town.trim(),
      logo: CURRENT_USER.avatar, motto: draft.motto?.trim() || 'Our roots, our future.',
      about: draft.about?.trim() || 'A family branch preserving its shared stories.', memberIds: [], publicMembersCount: 0,
      isPublic: true, createdAt: new Date().toISOString()
    };
    setFamilyGroups((previous) => [record, ...previous]);
    addActivity({ action: 'provisioned a new family branch.', detail: record.name });
    return record;
  };

  const addDocument = (document) => {
    const record = { id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...document, addedBy: CURRENT_USER.name };
    setDocuments((previous) => [record, ...previous]);
    addActivity({ action: 'added a document to the archive.', detail: record.name });
    return record;
  };

  const removeDocument = (documentId) => {
    const removed = documents.find((document) => document.id === documentId);
    setDocuments((previous) => previous.filter((document) => document.id !== documentId));
    if (removed) addActivity({ action: 'removed a document from the archive.', detail: removed.name });
  };

  const addEvent = (event) => {
    const record = { id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, attendees: 0, ...event };
    setEvents((previous) => [record, ...previous]);
    addActivity({ action: 'created a family event.', detail: record.title });
    return record;
  };

  const publishAnnouncement = (draft) => {
    const isAdmin = isFamilyAdmin();
    if (!isAdmin) throw new Error('Only a family administrator can publish official announcements.');
    if (!draft.title?.trim() || !draft.content?.trim()) throw new Error('Add an announcement title and message before publishing.');

    const family = draft.familyId === 'all' ? null : familyGroups.find((group) => group.id === draft.familyId);
    if (draft.familyId !== 'all' && !family) throw new Error('Choose a valid family audience.');
    const record = {
      id: makeArchiveId('announcement'),
      familyId: family?.id || 'all',
      familyName: family?.name || 'All families',
      title: draft.title.trim(),
      type: draft.type,
      priority: draft.priority || 'Normal',
      content: draft.content.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      author: CURRENT_USER.name,
      eventDate: draft.eventDate || '',
      location: draft.location?.trim() || ''
    };

    setAnnouncements((previous) => [record, ...previous]);
    addChatMessage('announcements', {
      kind: 'announcement',
      familyId: record.familyId,
      announcementId: record.id,
      content: `📣 ${record.type}: ${record.title}\n${record.content}`
    });
    addActivity({ action: 'published an official family announcement.', detail: `${record.type}: ${record.title}` });
    addNotification({ title: `New ${record.type.toLowerCase()} announcement`, message: `${record.title} · ${record.familyName}`, route: '/announcements' });

    if (draft.eventDate) {
      addEvent({
        title: record.title,
        date: new Date(`${draft.eventDate}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        time: draft.eventTime || 'Time to be confirmed',
        location: draft.location?.trim() || 'Location to be confirmed',
        category: record.type,
        familyId: record.familyId,
        attendees: 0,
        image: ''
      });
    }

    return record;
  };

  const addTribute = (memberId, text) => {
    setTributes((prev) => ({
      ...prev,
      [memberId]: [
        ...(prev[memberId] || []),
        {
          author: 'You',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          text
        }
      ]
    }));
  };

  const addChatMessage = (channelId, message) => {
    const messageData = typeof message === 'string' ? { kind: 'text', content: message } : message;
    setChatMessages((prev) => ({
      ...prev,
      [channelId]: [
        ...(prev[channelId] || []),
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          senderName: CURRENT_USER.name,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: CURRENT_USER.avatar,
          ...messageData
        }
      ]
    }));
  };

  const addFamilyPost = ({ body, kind = 'post', imageUrl = '', familyId = activeMember?.familyId || familyGroups[0]?.id }) => {
    const family = familyGroups.find((group) => group.id === familyId) || familyGroups[0];
    if (!family) return null;
    const newPost = {
      id: `post-${Date.now()}`,
      familyId: family.id,
      familyName: family.name,
      authorName: CURRENT_USER.name,
      authorAvatar: CURRENT_USER.avatar,
      kind,
      body: body.trim(),
      imageUrl,
      createdAt: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
      reactions: { heart: 0, comments: 0 }
    };
    setFamilyPosts((previous) => [newPost, ...previous]);
    return newPost;
  };

  const togglePostReaction = (postId) => {
    setFamilyPosts((previous) => previous.map((post) => {
      if (post.id !== postId) return post;
      const liked = Boolean(post.likedByCurrentUser);
      return {
        ...post,
        likedByCurrentUser: !liked,
        reactions: { ...post.reactions, heart: Math.max(0, (post.reactions?.heart || 0) + (liked ? -1 : 1)) }
      };
    }));
  };

  const addFamilyComment = (postId, body) => {
    setFamilyPosts((previous) => previous.map((post) => post.id === postId ? {
      ...post,
      comments: [...(post.comments || []), { id: `comment-${Date.now()}`, author: CURRENT_USER.name, body: body.trim() }],
      reactions: { ...post.reactions, comments: (post.reactions?.comments || 0) + 1 }
    } : post));
  };

  const lightCandle = (memberId) => {
    const rememberedMember = getMemberById(memberId);
    setCandleCounts((previous) => ({ ...previous, [memberId]: (previous[memberId] || 0) + 1 }));
    if (rememberedMember) addActivity({ action: 'lit a memorial candle for.', detail: rememberedMember.name });
  };

  const value = {
    members,
    familyGroups,
    events,
    announcements,
    notifications,
    activities,
    documents,
    documentCategories: DOCUMENT_CATEGORIES,
    addDocument,
    removeDocument,
    addEvent,
    addFamilyGroup,
    addActivity,
    addNotification,
    markNotificationRead,
    publishAnnouncement,
    activeMember,
    activeMemberId,
    setActiveMemberId,
    addMember,
    getMemberById,
    tributes,
    addTribute,
    chatMessages,
    activeChannelId,
    setActiveChannelId,
    addChatMessage,
    familyPosts,
    addFamilyPost,
    togglePostReaction,
    addFamilyComment,
    candleCounts,
    lightCandle
  };

  return <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFamily() {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
}
