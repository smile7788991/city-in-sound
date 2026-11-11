/* ============================================================
   听见城市 CITY IN SOUND — Mock Data & API Stubs
   统一模拟数据，保证各页面内容前后一致
   ============================================================ */

// --- Sound categories ---
const CATEGORIES = {
  nature:  { key: 'nature',  label: '自然',     cls: 'nature' },
  city:    { key: 'city',    label: '城市生活', cls: 'city' },
  culture: { key: 'culture', label: '人文',     cls: 'culture' }
};

// --- Sound library (6 items per spec) ---
const SOUNDS = [
  {
    id: 's1',
    name: '西湖的清晨',
    location: '福州西湖公园',
    category: 'nature',
    duration: 38,
    cover: 'images/西湖公园.jpg',
    audio: 'audio/s1.m4a',
    recorder: '城市记录者·阿榕',
    recordTime: '2024-09-12 06:20',
    desc: '清晨的鸟鸣与水声交织在一起，湖面上还浮着淡淡的雾气，偶尔有晨练的脚步声远远传来。'
  },
  {
    id: 's2',
    name: '巷子里的脚步声',
    location: '三坊七巷',
    category: 'city',
    duration: 42,
    cover: 'images/三坊七巷.jpg',
    recorder: '匿名访客',
    recordTime: '2024-10-03 14:10',
    desc: '青石板路上，来往游客的脚步声错落有致，间或有自行车铃和商贩的吆喝。'
  },
  {
    id: 's3',
    name: '闽江的风',
    location: '闽江沿岸',
    category: 'nature',
    duration: 35,
    cover: 'images/中洲岛.jpg',
    recorder: '江风爱好者',
    recordTime: '2024-08-21 17:45',
    desc: '傍晚的江风掠过耳畔，带着水汽和远处货轮低沉的鸣笛声。'
  },
  {
    id: 's4',
    name: '早市开始了',
    location: '街边市场',
    category: 'city',
    duration: 50,
    cover: 'images/先锋市场.jpg',
    recorder: '早起的市民',
    recordTime: '2024-09-28 06:50',
    desc: '摊贩的叫卖声、讨价还价的福州话、电子秤的提示音，构成热闹的市井交响。'
  },
  {
    id: 's6',
    name: '雨落屋檐',
    location: '福州街巷',
    category: 'nature',
    duration: 30,
    cover: 'images/镇海楼.jpg',
    audio: 'audio/s6.m4a',
    recorder: '听雨人',
    recordTime: '2024-07-09 19:30',
    desc: '梅雨时节，雨滴打在老式屋檐的瓦片上，滴答成一首安静的夜曲。'
  }
];

// --- Wander routes (3 items) ---
const ROUTES = [
  {
    id: 'r1',
    name: '福州的清晨',
    desc: '从西湖公园到闽江岸，跟着晨光走过最温柔的福州。',
    cover: 'images/西湖公园林园山水.jpg',
    soundCount: 3,
    duration: '约 12 分钟',
    sounds: ['s1', 's4', 's3']
  },
  {
    id: 'r2',
    name: '沿着江风走',
    desc: '沿着闽江一路前行，听风、听水、听城市慢慢醒来。',
    cover: 'images/中洲岛全景.jpg',
    soundCount: 3,
    duration: '约 9 分钟',
    sounds: ['s3', 's2', 's6']
  },
  {
    id: 'r3',
    name: '街巷里的日常',
    desc: '钻进三坊七巷的深处，听见最地道的福州生活。',
    cover: 'images/三坊七巷-舞龙舞狮.jpg',
    soundCount: 3,
    duration: '约 10 分钟',
    sounds: ['s2', 's4', 's6']
  }
];

// --- User profile ---
const USER = {
  name: '榕城听客',
  bio: '用耳朵记录这座城的日常',
  avatar: '榕',
  stats: {
    submitted: 12,
    collected: 8,
    favorites: 15
  }
};

// --- My recordings (with status) ---
const MY_RECORDINGS = [
  { id: 'm1', name: '西湖的清晨',   location: '福州西湖公园', category: 'nature',  status: 'published' },
  { id: 'm2', name: '巷子里的脚步声', location: '三坊七巷',     category: 'city',    status: 'published' },
  { id: 'm3', name: '闽江的风',       location: '闽江沿岸',     category: 'nature',  status: 'reviewing' },
  { id: 'm4', name: '雨落屋檐',       location: '福州街巷',     category: 'nature',  status: 'draft' }
];

// --- Favorites ---
const FAVORITES = ['s1', 's3'];

// --- API stub layer ---
const api = {
  getSounds: () => Promise.resolve([...SOUNDS]),
  getSoundById: (id) => Promise.resolve(SOUNDS.find(s => s.id === id) || null),
  getSoundsByCategory: (cat) => Promise.resolve(
    cat === 'all' ? [...SOUNDS] : SOUNDS.filter(s => s.category === cat)
  ),
  getRoutes: () => Promise.resolve([...ROUTES]),
  getRouteById: (id) => Promise.resolve(ROUTES.find(r => r.id === id) || null),
  getUser: () => Promise.resolve({ ...USER }),
  getMyRecordings: () => Promise.resolve([...MY_RECORDINGS]),
  getFavorites: () => Promise.resolve([...FAVORITES]),
  toggleFavorite: (id) => {
    const idx = FAVORITES.indexOf(id);
    if (idx >= 0) FAVORITES.splice(idx, 1); else FAVORITES.push(id);
    return Promise.resolve(idx < 0);
  },
  submitRecording: (data) => {
    MY_RECORDINGS.unshift({
      id: 'm' + Date.now(),
      name: data.name || '未命名声音',
      location: data.location || '未知地点',
      category: data.category || 'city',
      status: 'reviewing'
    });
    return Promise.resolve({ ok: true });
  }
};

// expose to global
window.SOUNDS = SOUNDS;
window.ROUTES = ROUTES;
window.CATEGORIES = CATEGORIES;
window.USER = USER;
window.MY_RECORDINGS = MY_RECORDINGS;
window.FAVORITES = FAVORITES;
window.api = api;
