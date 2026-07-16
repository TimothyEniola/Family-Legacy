import { createContext, useContext, useMemo, useState } from 'react';

const FamilyContext = createContext(null);

const initialMembers = [
  {
    id: 'david-johnson',
    name: 'David Johnson',
    role: 'Family Head',
    status: 'Alive',
    birthDate: '1973-05-14',
    deathDate: null,
    birthPlace: 'Lagos, Nigeria',
    bio: 'Community organizer and family historian.',
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
    role: 'Grandfather',
    status: 'Alive',
    birthDate: '1948-11-03',
    deathDate: null,
    birthPlace: 'Ibadan, Nigeria',
    bio: 'Retired teacher and storyteller.',
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
    role: 'Grandmother',
    status: 'Alive',
    birthDate: '1950-09-21',
    deathDate: null,
    birthPlace: 'Abeokuta, Nigeria',
    bio: 'A passionate community volunteer.',
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
    role: 'Great Grandfather',
    status: 'Deceased',
    birthDate: '1920-01-10',
    deathDate: '1998-04-19',
    birthPlace: 'Edinburgh, Scotland',
    bio: 'One of the original founders of the family legacy archive.',
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
    role: 'Great Grandmother',
    status: 'Deceased',
    birthDate: '1922-02-14',
    deathDate: '2001-08-11',
    birthPlace: 'Kano, Nigeria',
    bio: 'Known for preserving family recipes and oral history.',
    occupation: 'Homemaker',
    spouseId: 'robert-johnson',
    marriageYear: 1940,
    childrenIds: ['william-johnson'],
    achievements: ['Best cook in the county, 1965'],
    lifeLessons: [],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800',
    parentId: null
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
  const [members, setMembers] = useState(initialMembers);
  const [events] = useState(initialEvents);
  const [activeMemberId, setActiveMemberId] = useState(initialMembers[0].id);
  const [tributes, setTributes] = useState(initialTributes);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [activeChannelId, setActiveChannelId] = useState('general');

  const activeMember = useMemo(
    () => members.find((member) => member.id === activeMemberId) || members[0],
    [members, activeMemberId]
  );

  const addMember = (member) => {
    const newMember = {
      id: `${member.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: member.name,
      role: member.role || 'Family Member',
      status: member.status || 'Alive',
      birthDate: member.birthDate || '',
      deathDate: member.deathDate || null,
      bio: member.bio || 'Newly added family member.',
      avatar: member.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      parentId: member.parentId || null,
      childrenIds: []
    };

    setMembers((prev) => [...prev, newMember]);
    setActiveMemberId(newMember.id);
  };

  const getMemberById = (id) => members.find((member) => member.id === id) || null;

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

  const addChatMessage = (channelId, content) => {
    setChatMessages((prev) => ({
      ...prev,
      [channelId]: [
        ...(prev[channelId] || []),
        {
          id: Date.now(),
          senderName: 'You',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        }
      ]
    }));
  };

  const value = useMemo(
    () => ({
      members,
      events,
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
      addChatMessage
    }),
    [members, events, activeMember, activeMemberId, tributes, chatMessages, activeChannelId]
  );

  return <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>;
}

export function useFamily() {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
}
