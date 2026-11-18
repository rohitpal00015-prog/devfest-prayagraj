export type TrackKey = 'ai' | 'cloud' | 'web' | 'build';

export interface TrackPillar {
  id: TrackKey;
  code: string;
  short: string;
  title: string;
  hall: string;
  color: string;
  pastel: string;
  halftone: string;
  tagline: string;
  description: string;
  topics: string[];
}

export interface Session {
  id: string;
  time: string;
  endTime: string;
  slotIndex: number;
  title: string;
  speaker: string;
  speakerRole: string;
  track: TrackKey;
  hall: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  type: 'Keynote' | 'Talk' | 'Workshop' | 'Panel' | 'Networking';
  summary: string;
  tags: string[];
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  badge: string;
  track: TrackKey;
  color: string;
  pastel: string;
  initials: string;
  photo: string;
  talkTitle: string;
  bio: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'Keynotes' | 'Workshops' | 'Community' | 'Swag';
  year: string;
  span?: 'wide' | 'tall' | 'normal';
  color: string;
}

export interface PolaroidMemory {
  id: string;
  image: string;
  caption: string;
  date: string;
  tag: string;
  color: string;
  initialX: number;
  initialY: number;
  initialRotate: number;
}

export const EVENT_META = {
  name: "DevFest Prayagraj '26",
  city: 'Prayagraj',
  year: '2026',
  tagline: 'Where Code Meets Culture',
  subTagline:
    'A community-led annual developer conference by GDG Prayagraj bringing together engineers, students, designers, and founders to learn, build, and connect.',
  dateDisplay: 'December 12, 2026',
  timeDisplay: '09:00 AM – 06:00 PM IST',
  targetDateISO: '2026-12-12T09:00:00+05:30',
  venueName: 'Civil Lines Convention Center, Prayagraj',
  venueShort: 'Civil Lines, Prayagraj',
  chapterName: 'GDG Prayagraj',
  email: 'hello@gdgprayagraj.dev',
};

export const TRACKS: TrackPillar[] = [
  {
    id: 'ai',
    code: '01',
    short: 'AI',
    title: 'Artificial Intelligence',
    hall: 'Main Stage · Hall 1',
    color: '#4285F4',
    pastel: '#C3ECF6',
    halftone: '#57CAFF',
    tagline: 'Gemini, Agents & Applied GenAI',
    description:
      'Explore multimodal Gemini APIs, agentic workflows, on-device Gemma models, and practical GenAI architectures ready for production.',
    topics: ['Gemini 2.5', 'AI Agents', 'Vertex AI', 'Gemma', 'Prompt Engineering'],
  },
  {
    id: 'cloud',
    code: '02',
    short: 'Cloud',
    title: 'Google Cloud',
    hall: 'Cloud Lab · Hall 2',
    color: '#EA4335',
    pastel: '#F8D8D8',
    halftone: '#FF7DAF',
    tagline: 'Cloud Native, Kubernetes & Scale',
    description:
      'Build resilient distributed systems with Cloud Run GPUs, GKE, Firebase, Terraform, and modern DevSecOps practices.',
    topics: ['Cloud Run', 'Kubernetes', 'Firebase', 'DevSecOps', 'Observability'],
  },
  {
    id: 'web',
    code: '03',
    short: 'Web',
    title: 'Web Development',
    hall: 'Web Hall · Hall 3',
    color: '#F9AB00',
    pastel: '#FFE7A5',
    halftone: '#FFD427',
    tagline: 'Modern Web, Mobile & Performance',
    description:
      'Deep dives into Angular, React, Flutter cross-platform apps, high-craft UI motion, Web AI, and Core Web Vitals optimization.',
    topics: ['React & Vite', 'Angular', 'Flutter', 'Web Performance', 'UI Motion'],
  },
  {
    id: 'build',
    code: '04',
    short: 'Build',
    title: 'Developer Community',
    hall: 'Community Lounge · Hall 4',
    color: '#34A853',
    pastel: '#CCF6C5',
    halftone: '#5CDB6D',
    tagline: 'Open Source, Careers & Live Demos',
    description:
      'Hands-on lightning demos, open-source contribution clinics, founder fireside chats, and peer networking with Prayagraj’s tech ecosystem.',
    topics: ['Open Source', 'GSoC & Careers', 'Startups', 'Lightning Demos', 'Networking'],
  },
];

export const OFFICIAL_BADGES = [
  {
    title: 'Attendee',
    desc: 'Join 1,500+ developers, students & builders for a full day of talks and labs.',
    image: '/assets/devfest/official/badge-1.png',
    bg: '#C3ECF6',
  },
  {
    title: 'Speaker',
    desc: 'Learn directly from Google Developer Experts, staff engineers & tech leads.',
    image: '/assets/devfest/official/badge-2.png',
    bg: '#CCF6C5',
  },
  {
    title: 'Organizer',
    desc: 'Volunteer-driven by GDG Prayagraj core team & campus developer clubs.',
    image: '/assets/devfest/official/badge-3.png',
    bg: '#F8D8D8',
  },
  {
    title: 'Stay Updated',
    desc: 'Register early to get CFP alerts, workshop seats & official DevFest ’26 swag.',
    image: '/assets/devfest/official/badge-4.png',
    bg: '#FFE7A5',
  },
];

export const STATS = [
  { label: 'Expected Attendees', value: 1500, suffix: '+', color: '#4285F4', pastel: '#C3ECF6' },
  { label: 'Speakers & GDEs', value: 25, suffix: '+', color: '#EA4335', pastel: '#F8D8D8' },
  { label: 'Focused Tracks', value: 4, suffix: '', color: '#F9AB00', pastel: '#FFE7A5' },
  { label: 'Hands-on Sessions', value: 18, suffix: '+', color: '#34A853', pastel: '#CCF6C5' },
];

export const SCHEDULE_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:15 AM',
  '12:30 PM',
  '02:30 PM',
  '03:45 PM',
  '05:00 PM',
];

export const SESSIONS: Session[] = [
  {
    id: 's1',
    time: '09:00 AM',
    endTime: '10:00 AM',
    slotIndex: 0,
    title: 'Registration, Swag Kit Pickup & Morning Networking',
    speaker: 'GDG Prayagraj Team',
    speakerRole: 'Event Organizers',
    track: 'build',
    hall: 'Community Lounge',
    level: 'All Levels',
    type: 'Networking',
    summary:
      'Collect your DevFest Prayagraj ’26 badge, official sticker pack, and grab morning tea/coffee before the opening keynote.',
    tags: ['Check-in', 'Swag', 'Networking'],
  },
  {
    id: 's2',
    time: '10:00 AM',
    endTime: '11:00 AM',
    slotIndex: 1,
    title: 'Opening Keynote: Building with AI & The Future of Developer Ecosystems',
    speaker: 'Dr. Ananya Sharma',
    speakerRole: 'Principal AI Architect · GDE',
    track: 'ai',
    hall: 'Main Stage',
    level: 'All Levels',
    type: 'Keynote',
    summary:
      'An inspiring keynote covering Google’s latest breakthroughs across Gemini, Cloud, and Web — and how community builders in Prayagraj are shipping global products.',
    tags: ['Keynote', 'Gemini', 'Developer Ecosystem'],
  },
  {
    id: 's3',
    time: '11:15 AM',
    endTime: '12:15 PM',
    slotIndex: 2,
    title: 'Production Multi-Agent Workflows with Gemini Live API',
    speaker: 'Rohan Tripathi',
    speakerRole: 'Staff AI Engineer · MNNIT Alumnus',
    track: 'ai',
    hall: 'Main Stage',
    level: 'Intermediate',
    type: 'Talk',
    summary:
      'Design real-time voice and vision agents with tool calling, structured schemas, and reliable evaluation pipelines.',
    tags: ['Gemini Live', 'Agents', 'TypeScript'],
  },
  {
    id: 's4',
    time: '11:15 AM',
    endTime: '12:15 PM',
    slotIndex: 2,
    title: 'High-Craft Web Motion: GSAP, Lenis & 60fps Accessibility',
    speaker: 'Meera Kulkarni',
    speakerRole: 'Staff Design Engineer · Web GDE',
    track: 'web',
    hall: 'Web Hall',
    level: 'Intermediate',
    type: 'Talk',
    summary:
      'Practical techniques for smooth scroll choreography, spring micro-interactions, and maintaining strong Core Web Vitals on mobile devices.',
    tags: ['GSAP', 'Motion', 'Web Perf'],
  },
  {
    id: 's5',
    time: '11:15 AM',
    endTime: '12:15 PM',
    slotIndex: 2,
    title: 'Hands-On Codelab: Deploying Serverless GPUs on Google Cloud Run',
    speaker: 'Siddharth Verma',
    speakerRole: 'Cloud Architect · GCP Champion',
    track: 'cloud',
    hall: 'Cloud Lab',
    level: 'Intermediate',
    type: 'Workshop',
    summary:
      'Bring your laptop to containerize and deploy an open-weight Gemma inference endpoint on Cloud Run with autoscaling GPUs.',
    tags: ['Cloud Run', 'GPU', 'Hands-On'],
  },
  {
    id: 's6',
    time: '12:30 PM',
    endTime: '01:30 PM',
    slotIndex: 3,
    title: 'Flutter + Firebase Data Connect: Full-Stack Apps in 45 Minutes',
    speaker: 'Pranav Mishra',
    speakerRole: 'Lead Mobile Engineer · IIIT-A Alumnus',
    track: 'web',
    hall: 'Web Hall',
    level: 'Beginner',
    type: 'Workshop',
    summary:
      'Build a real-time cross-platform app using Flutter, Firebase Genkit, and type-safe PostgreSQL queries.',
    tags: ['Flutter', 'Firebase', 'Mobile'],
  },
  {
    id: 's7',
    time: '12:30 PM',
    endTime: '01:30 PM',
    slotIndex: 3,
    title: 'Kubernetes in Production: Practical Debugging & eBPF Observability',
    speaker: 'Neha Agarwal',
    speakerRole: 'Senior Staff SRE · CNCF Ambassador',
    track: 'cloud',
    hall: 'Cloud Lab',
    level: 'Advanced',
    type: 'Talk',
    summary:
      'Real-world lessons from scaling GKE clusters, diagnosing latency spikes with eBPF, and building resilient incident workflows.',
    tags: ['GKE', 'SRE', 'Observability'],
  },
  {
    id: 's8',
    time: '12:30 PM',
    endTime: '01:30 PM',
    slotIndex: 3,
    title: 'Panel: Open Source, GSoC & Breaking Into Global Engineering Roles',
    speaker: 'Aditya Srivastava & Community Leads',
    speakerRole: 'Founders & GSoC Mentors',
    track: 'build',
    hall: 'Community Lounge',
    level: 'All Levels',
    type: 'Panel',
    summary:
      'Honest advice for students and early-career engineers in Prayagraj on open-source contributions, portfolios, and building startups.',
    tags: ['Open Source', 'GSoC', 'Career'],
  },
  {
    id: 's9',
    time: '02:30 PM',
    endTime: '03:30 PM',
    slotIndex: 4,
    title: 'Build With AI Live Workshop: From Prompt to Deployed App',
    speaker: 'Vikramaditya Singh',
    speakerRole: 'AI Product Engineer · GDE GenAI',
    track: 'ai',
    hall: 'Main Stage',
    level: 'All Levels',
    type: 'Workshop',
    summary:
      'Interactive live coding session architecting, testing, and deploying a full-stack Gemini web application from scratch.',
    tags: ['Live Coding', 'Gemini API', 'Full-Stack'],
  },
  {
    id: 's10',
    time: '02:30 PM',
    endTime: '03:30 PM',
    slotIndex: 4,
    title: 'Modern Frontend Reactivity: Angular Signals & React Compiler Deep Dive',
    speaker: 'Priyanka Chatterjee',
    speakerRole: 'Principal Frontend Engineer',
    track: 'web',
    hall: 'Web Hall',
    level: 'Advanced',
    type: 'Talk',
    summary:
      'Compare fine-grained reactivity models, hydration strategies, and bundle optimization patterns for 2026 web apps.',
    tags: ['Angular', 'React', 'Architecture'],
  },
  {
    id: 's11',
    time: '03:45 PM',
    endTime: '04:45 PM',
    slotIndex: 5,
    title: 'Securing Generative AI Applications on Google Cloud',
    speaker: 'Arjun Deshmukh',
    speakerRole: 'Cloud Security Lead',
    track: 'cloud',
    hall: 'Cloud Lab',
    level: 'Intermediate',
    type: 'Talk',
    summary:
      'Practical defenses against prompt injection, data leakage, and misconfigured IAM policies using Model Armor and Cloud security primitives.',
    tags: ['Security', 'GCP', 'LLM Safety'],
  },
  {
    id: 's12',
    time: '03:45 PM',
    endTime: '04:45 PM',
    slotIndex: 5,
    title: 'Community Lightning Demos: Prayagraj Builders Showcase',
    speaker: 'Kavya Nair & Local Builders',
    speakerRole: 'MNNIT · IIIT-A · AU · Indie Builders',
    track: 'build',
    hall: 'Community Lounge',
    level: 'All Levels',
    type: 'Networking',
    summary:
      'Five-minute live project demos from local builders showcasing AI tools, developer utilities, and community open-source work.',
    tags: ['Demos', 'Community', 'Showcase'],
  },
  {
    id: 's13',
    time: '05:00 PM',
    endTime: '06:00 PM',
    slotIndex: 6,
    title: 'Closing Keynote, Community Quiz, Swag Awards & Group Photo',
    speaker: 'GDG Prayagraj & All Speakers',
    speakerRole: 'Closing Session',
    track: 'build',
    hall: 'Main Stage',
    level: 'All Levels',
    type: 'Networking',
    summary:
      'Wrap up DevFest Prayagraj ’26 with a live interactive tech quiz, swag giveaways, and our annual community photo.',
    tags: ['Finale', 'Quiz', 'Group Photo'],
  },
];

export const SPEAKERS: Speaker[] = [
  {
    id: 'sp1',
    name: 'Dr. Ananya Sharma',
    role: 'Principal AI Architect',
    company: 'Google Cloud · GDE',
    badge: 'GDE AI',
    track: 'ai',
    color: '#4285F4',
    pastel: '#C3ECF6',
    initials: 'AS',
    photo: '/speakers/sp1.jpg',
    talkTitle: 'Opening Keynote: Building with AI & Developer Ecosystems',
    bio: 'Leads multimodal generative AI architecture at scale, mentoring 50+ startups across India and speaking globally on Gemini and responsible AI.',
  },
  {
    id: 'sp2',
    name: 'Rohan Tripathi',
    role: 'Staff AI Engineer',
    company: 'DeepScale · MNNIT Alumnus',
    badge: 'MNNIT Alum',
    track: 'ai',
    color: '#4285F4',
    pastel: '#C3ECF6',
    initials: 'RT',
    photo: '/speakers/sp2.jpg',
    talkTitle: 'Production Multi-Agent Workflows with Gemini Live API',
    bio: 'Prayagraj native and MNNIT alumnus building low-latency voice and vision agent runtimes serving millions of daily queries.',
  },
  {
    id: 'sp3',
    name: 'Siddharth Verma',
    role: 'Lead Cloud Architect',
    company: 'CloudScale · GCP Champion',
    badge: 'GCP Champ',
    track: 'cloud',
    color: '#EA4335',
    pastel: '#F8D8D8',
    initials: 'SV',
    photo: '/speakers/sp3.jpg',
    talkTitle: 'Hands-On Codelab: Serverless GPUs on Google Cloud Run',
    bio: 'Google Cloud Champion Innovator specializing in Kubernetes, Terraform, and cost-efficient serverless AI infrastructure.',
  },
  {
    id: 'sp4',
    name: 'Pranav Mishra',
    role: 'Principal Mobile Engineer',
    company: 'FlutterFlow · IIIT-A Alumnus',
    badge: 'IIIT-A Alum',
    track: 'web',
    color: '#F9AB00',
    pastel: '#FFE7A5',
    initials: 'PM',
    photo: '/speakers/sp4.jpg',
    talkTitle: 'Flutter + Firebase Data Connect: Full-Stack Apps',
    bio: 'IIIT-Allahabad graduate, open-source Dart package author, and advocate for smooth cross-platform mobile and web experiences.',
  },
  {
    id: 'sp5',
    name: 'Meera Kulkarni',
    role: 'Staff Design Engineer',
    company: 'PixelCraft · Web GDE',
    badge: 'Web GDE',
    track: 'web',
    color: '#F9AB00',
    pastel: '#FFE7A5',
    initials: 'MK',
    photo: '/speakers/sp5.jpg',
    talkTitle: 'High-Craft Web Motion: GSAP, Lenis & 60fps Accessibility',
    bio: 'Specializes in interactive web animations, design systems, and frontend engineering that balances visual delight with performance.',
  },
  {
    id: 'sp6',
    name: 'Neha Agarwal',
    role: 'Senior Staff SRE',
    company: 'CNCF Ambassador',
    badge: 'CNCF Amb.',
    track: 'cloud',
    color: '#EA4335',
    pastel: '#F8D8D8',
    initials: 'NA',
    photo: '/speakers/sp6.jpg',
    talkTitle: 'Kubernetes in Production: Debugging & eBPF Observability',
    bio: 'Cloud Native Computing Foundation Ambassador helping engineering teams master observability, reliability, and resilient infrastructure.',
  },
  {
    id: 'sp7',
    name: 'Aditya Srivastava',
    role: 'Founder & Maintainer',
    company: 'OpenTech Labs',
    badge: 'GSoC Mentor',
    track: 'build',
    color: '#34A853',
    pastel: '#CCF6C5',
    initials: 'AS',
    photo: '/speakers/sp7.jpg',
    talkTitle: 'Panel: Open Source, GSoC & Global Engineering Careers',
    bio: 'Two-time GSoC mentor and founder helping student engineers across Uttar Pradesh ship production open-source software.',
  },
  {
    id: 'sp8',
    name: 'Kavya Nair',
    role: 'Developer Advocate',
    company: 'DevRel India · WTM Lead',
    badge: 'WTM Amb.',
    track: 'build',
    color: '#34A853',
    pastel: '#CCF6C5',
    initials: 'KN',
    photo: '/speakers/sp8.jpg',
    talkTitle: 'Community Lightning Demos & Inclusive Tech Leadership',
    bio: 'Women Techmakers Ambassador building developer communities across North India and mentoring first-time conference speakers.',
  },
  {
    id: 'sp9',
    name: 'Vikramaditya Singh',
    role: 'AI Product Engineer',
    company: 'Google Developer Expert',
    badge: 'GDE GenAI',
    track: 'ai',
    color: '#4285F4',
    pastel: '#C3ECF6',
    initials: 'VS',
    photo: '/speakers/sp9.jpg',
    talkTitle: 'Build With AI Live Workshop: Prompt to Production',
    bio: 'Focused on rapid AI prototyping, Gemini tool calling, and turning community product ideas into live web applications.',
  },
  {
    id: 'sp10',
    name: 'Priyanka Chatterjee',
    role: 'Principal Frontend Engineer',
    company: 'WebCore · Angular GDE',
    badge: 'Angular GDE',
    track: 'web',
    color: '#F9AB00',
    pastel: '#FFE7A5',
    initials: 'PC',
    photo: '/speakers/sp10.jpg',
    talkTitle: 'Modern Frontend Reactivity: Angular Signals & React Compiler',
    bio: 'Frontend architect passionate about fine-grained reactivity, compiler optimizations, and scalable enterprise web platforms.',
  },
  {
    id: 'sp11',
    name: 'Arjun Deshmukh',
    role: 'Cloud Security Lead',
    company: 'ShieldCloud · GCP Security',
    badge: 'Security Lead',
    track: 'cloud',
    color: '#EA4335',
    pastel: '#F8D8D8',
    initials: 'AD',
    photo: '/speakers/sp11.jpg',
    talkTitle: 'Securing Generative AI Applications on Google Cloud',
    bio: 'Specializes in cloud-native security, AI red-teaming, IAM architecture, and building safe enterprise LLM guardrails.',
  },
  {
    id: 'sp12',
    name: 'Anupama Rao',
    role: 'Staff ML Researcher',
    company: 'OnDevice AI · Gemma Contributor',
    badge: 'ML Research',
    track: 'ai',
    color: '#34A853',
    pastel: '#CCF6C5',
    initials: 'AR',
    photo: '/speakers/sp12.jpg',
    talkTitle: 'Running Quantized Gemma Models on Consumer Mobile Hardware',
    bio: 'Works on edge inference optimization, MediaPipe LLM pipelines, and privacy-first on-device AI experiences for Indian languages.',
  },
];

export const LAST_YEAR_GALLERY: GalleryPhoto[] = [
  {
    id: 'g1',
    src: '/gallery/keynote-stage.png',
    title: 'Opening Keynote · Full House Auditorium',
    caption: 'Over 1,200 developers packed the main hall for the DevFest Prayagraj ’25 opening keynote.',
    category: 'Keynotes',
    year: 'DevFest ’25',
    span: 'wide',
    color: '#4285F4',
  },
  {
    id: 'g2',
    src: '/gallery/hands-on-workshop.png',
    title: 'Build With AI · Hands-On Codelab',
    caption: 'Students and engineers building live Gemini & Cloud projects side-by-side in our workshop hall.',
    category: 'Workshops',
    year: 'DevFest ’25',
    span: 'normal',
    color: '#EA4335',
  },
  {
    id: 'g3',
    src: '/gallery/swag-networking.png',
    title: 'Swag Drop & Hallway Track',
    caption: 'Custom DevFest stickers, lanyards, and nonstop conversations during the networking break.',
    category: 'Swag',
    year: 'DevFest ’25',
    span: 'normal',
    color: '#F9AB00',
  },
  {
    id: 'g4',
    src: '/gallery/community-group.png',
    title: 'GDG Prayagraj Family Photo',
    caption: 'Speakers, volunteers, campus leads, and attendees wrapping up an unforgettable day together.',
    category: 'Community',
    year: 'DevFest ’25',
    span: 'wide',
    color: '#34A853',
  },
  {
    id: 'g5',
    src: '/media/naini-bridge.jpeg',
    title: 'Evening in Host City Prayagraj',
    caption: 'After-party vibes in Prayagraj with speakers & community organizers.',
    category: 'Community',
    year: 'DevFest ’25',
    span: 'normal',
    color: '#4285F4',
  },
  {
    id: 'g6',
    src: '/assets/devfest/official/stickers-bold.png',
    title: 'DevFest Official Sticker Wall',
    caption: 'Fresh geometric code glyphs and limited-edition laptop stickers collected by attendees.',
    category: 'Swag',
    year: 'DevFest ’26 Preview',
    span: 'normal',
    color: '#F9AB00',
  },
];

export const POLAROID_MEMORIES: PolaroidMemory[] = [
  {
    id: 'p1',
    image: '/gallery/keynote-stage.png',
    caption: 'Packed auditorium during last year’s DevFest Prayagraj keynote!',
    date: 'DEVFEST 2025',
    tag: '#Keynote',
    color: '#4285F4',
    initialX: -215,
    initialY: -18,
    initialRotate: -7,
  },
  {
    id: 'p2',
    image: '/gallery/hands-on-workshop.png',
    caption: 'Hands-on AI & Cloud codelabs — laptops open, shipping live.',
    date: 'WORKSHOPS',
    tag: '#BuildWithAI',
    color: '#34A853',
    initialX: -20,
    initialY: 16,
    initialRotate: 4,
  },
  {
    id: 'p3',
    image: '/gallery/community-group.png',
    caption: 'The GDG Prayagraj community spirit — 1,200+ builders strong!',
    date: 'COMMUNITY',
    tag: '#GDGPrayagraj',
    color: '#F9AB00',
    initialX: 185,
    initialY: -14,
    initialRotate: 8,
  },
  {
    id: 'p4',
    image: '/gallery/swag-networking.png',
    caption: 'Fresh stickers, badges & hallway conversations at DevFest.',
    date: 'SWAG & VIBE',
    tag: '#DevFest26',
    color: '#EA4335',
    initialX: -95,
    initialY: 58,
    initialRotate: -4,
  },
];

export const FAQS = [
  {
    q: 'What is DevFest Prayagraj ’26?',
    a: 'DevFest is Google Developer Groups’ flagship annual community-led developer conference. DevFest Prayagraj ’26 brings together 1,500+ developers, students, designers, and founders for a full day of talks, hands-on workshops, and networking across AI, Cloud, Web, and Community tracks.',
  },
  {
    q: 'When and where is the event taking place?',
    a: 'December 12, 2026 from 09:00 AM to 06:00 PM IST at Civil Lines, Prayagraj (10–15 minutes from Prayagraj Junction and ~25 minutes from Prayagraj Airport).',
  },
  {
    q: 'Who can attend? Is it beginner-friendly?',
    a: 'Yes! Whether you are a college student exploring your first project, a working software engineer, or a startup founder, sessions are clearly labeled Beginner, Intermediate, Advanced, and All Levels.',
  },
  {
    q: 'What is included with my registration pass?',
    a: 'Your pass covers full-day access to all 4 tracks, hands-on workshops, lunch, tea/coffee breaks, and the official DevFest Prayagraj ’26 swag & sticker kit.',
  },
  {
    q: 'Should I bring a laptop?',
    a: 'If you plan to attend the Cloud Lab (Cloud Run GPU) or Web Hall (Flutter + Firebase) hands-on workshops, please bring a charged laptop. Power strips and venue Wi-Fi will be available.',
  },
  {
    q: 'How can I apply to speak, volunteer, or sponsor?',
    a: 'You can reach out to the GDG Prayagraj organizing team at hello@gdgprayagraj.dev or click "Become a Sponsor / Partner" in the Partners section below.',
  },
];

export const SPONSORS = [
  { name: 'Google for Developers', tier: 'Global Ecosystem', color: '#4285F4', pastel: '#C3ECF6' },
  { name: 'GDG Prayagraj', tier: 'Host Chapter', color: '#34A853', pastel: '#CCF6C5' },
  { name: 'MNNIT Tech Club', tier: 'Campus Partner', color: '#F9AB00', pastel: '#FFE7A5' },
  { name: 'IIIT-A GeekHaven', tier: 'Campus Partner', color: '#EA4335', pastel: '#F8D8D8' },
  { name: 'CloudScale India', tier: 'Gold Sponsor', color: '#4285F4', pastel: '#C3ECF6' },
  { name: 'DevTools Studio', tier: 'Silver Sponsor', color: '#34A853', pastel: '#CCF6C5' },
  { name: 'AU Coding Society', tier: 'Campus Partner', color: '#F9AB00', pastel: '#FFE7A5' },
  { name: 'UP OpenSource Guild', tier: 'Community Partner', color: '#EA4335', pastel: '#F8D8D8' },
];
