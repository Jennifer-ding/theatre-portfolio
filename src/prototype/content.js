// Eight Acts prototype content. Empty strings/arrays are intentional placeholders.
// Enter only Jennifer's approved material. Photos: { src: '/images/file.jpg', alt: 'description' }.
// Act II: the first entry in each production’s photos array is its card cover.
// Add only verified photos of that production; do not reuse the homepage collage.
// Empty date, credits and photos values intentionally show editable placeholders.
// PDF and videos: local public-file paths or HTTPS URLs to the actual media files.
// Video URLs must be playable media files, not YouTube/Vimeo watch-page links.
export const acts = [
  { id: 'I', letter: 'J', name: 'Journey', subtitle: 'The Prologue', description: 'Personal introduction, portrait, biography & life timeline.' },
  { id: 'II', letter: 'E', name: 'Experience', subtitle: 'The Repertoire', description: 'Six productions. A repertoire of experiences.' },
  { id: 'III', letter: 'N', name: 'Narratives', subtitle: 'The Stories I Wrote', description: 'Two completely original plays. Their stories take centre stage.' },
  { id: 'IV', letter: 'N', name: 'Notes', subtitle: 'Behind the Curtain', description: 'Two director’s notebooks. From first impulse to final reflection.' },
  { id: 'V', letter: 'I', name: 'Imagination', subtitle: 'Beyond the Stage', description: 'Fine art, Chinese calligraphy & visual exploration.' },
  { id: 'VI', letter: 'F', name: 'Fortitude', subtitle: 'The Other Arena', description: 'Volleyball, squash & the practice of teamwork.' },
  { id: 'VII', letter: 'E', name: 'Essence', subtitle: 'The Person Between the Acts', description: 'Personality, interests, contradictions & everyday observations.' },
  { id: 'VIII', letter: 'R', name: 'Reimagination', subtitle: 'The Unwritten Act', description: 'Future theatrical questions & potential experiments.' }
];
const notebook = () => ({ origin: '', motivation: '', research: '', direction: '', design: '', reflection: '', outlook: '' });
const productionPhotos = (filename, title) => [{ src: `/images/experience/${filename}`, alt: `${title} — original production photograph` }];
const original = (id, title, duration, filename) => ({ id, title, original: true, date: '', credits: '', synopsis: '', motivation: '', scenes: [], photos: productionPhotos(filename, title), script: '', fullVideo: '', shortVideo: '', duration, notebook: notebook() });
export const productions = [
  original('a-wan', 'A WAN', 3, 'awan-cover大.jpeg'),
  { ...original('friendship', 'The Things I Called Friendship', 5, 'friendship-cover大.jpeg'), comparisons: [] },
  { id: 'normal', title: 'I Just Want to Be Normal', date: '', credits: '', photos: productionPhotos('normal-cover大.jpeg', 'I Just Want to Be Normal') },
  { id: 'marigolds', title: 'The Effect of Gamma Rays on Man-in-the-Moon Marigolds', date: '', credits: '', photos: productionPhotos('gamma-rays-cover大.jpeg', 'The Effect of Gamma Rays on Man-in-the-Moon Marigolds') },
  { id: 'hamilton', title: 'Hamilton: Alexander Hamilton', date: '', credits: '', photos: productionPhotos('hamilton-cover大.jpeg', 'Hamilton: Alexander Hamilton') },
  { id: 'lion-king', title: 'The Lion King (Adaptation)', date: '', credits: '', photos: productionPhotos('lion-king-cover.JPG', 'The Lion King (Adaptation)') }
];
export const personal = {
  introduction: '', biography: '', portrait: '', portraitAlt: '', timeline: [],
  painting: '', calligraphy: '', artTraining: '', artworks: [], exhibitions: '',
  volleyball: '', squash: '', athleticPhotos: [], training: '', teamwork: '', achievements: '',
  personality: '', interests: '', contradictions: '', values: '', observations: '',
  questions: '', directions: '', experiments: ''
};
