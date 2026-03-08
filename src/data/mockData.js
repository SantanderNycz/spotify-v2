// Gradient colors for playlist covers (simulating real album art colors)
export const GRADIENT_COLORS = [
  ['#450af5', '#c4efd9'],
  ['#8d67ab', '#e8d5b7'],
  ['#dc148c', '#e61e32'],
  ['#1e3264', '#4b917d'],
  ['#e8115b', '#f59b23'],
  ['#148a08', '#27856a'],
  ['#503750', '#e91429'],
  ['#477d95', '#e8d5b7'],
  ['#f02ab4', '#777777'],
  ['#8d67ab', '#340078'],
  ['#e61e32', '#f59b23'],
  ['#2d46b9', '#f074b4'],
];

export const recentlyPlayed = [
  { id: 1, name: 'Liked Songs', type: 'playlist', gradient: ['#4b367c', '#222'], icon: 'heart' },
  { id: 2, name: 'Daily Mix 1', type: 'playlist', gradient: ['#e91429', '#c62a6a'], icon: null },
  { id: 3, name: 'Daily Mix 2', type: 'playlist', gradient: ['#1e3264', '#4b917d'], icon: null },
  { id: 4, name: 'Daily Mix 3', type: 'playlist', gradient: ['#4b917d', '#e2d96e'], icon: null },
  { id: 5, name: 'Feitos para você', type: 'playlist', gradient: ['#503750', '#e91429'], icon: null },
  { id: 6, name: 'Release Radar', type: 'playlist', gradient: ['#1e3264', '#e91429'], icon: null },
];

export const featuredPlaylists = [
  {
    id: 1, name: 'Chill Hits', description: 'Relax and indulge with your favourite slow jams',
    gradient: ['#4773a5', '#374a5d'], plays: '22,386,549 curtidas',
  },
  {
    id: 2, name: 'Beast Mode', description: 'Get your beast mode on! Hard and heavy hip-hop',
    gradient: ['#e91429', '#5f1010'], plays: '4,821,903 curtidas',
  },
  {
    id: 3, name: 'Happy Hits!', description: 'Hits to boost your mood and fill your heart',
    gradient: ['#f5a623', '#773b04'], plays: '10,234,112 curtidas',
  },
  {
    id: 4, name: 'Vibe On', description: 'Unwind with the most popular tracks right now',
    gradient: ['#148a08', '#0f3006'], plays: '3,412,009 curtidas',
  },
  {
    id: 5, name: 'Late Night Drive', description: 'The perfect soundtrack for a late-night drive',
    gradient: ['#2d46b9', '#0d1b52'], plays: '8,990,341 curtidas',
  },
  {
    id: 6, name: 'Mega Hit Mix', description: 'A mega mix of the biggest hits',
    gradient: ['#7358ff', '#350979'], plays: '15,760,444 curtidas',
  },
];

export const madeForYou = [
  { id: 7, name: 'Daily Mix 1', description: 'The Weeknd, Drake, Post Malone e mais', gradient: ['#e91429', '#c62a6a'] },
  { id: 8, name: 'Daily Mix 2', description: 'Tame Impala, Arctic Monkeys, The Strokes e mais', gradient: ['#1e3264', '#4b917d'] },
  { id: 9, name: 'Daily Mix 3', description: 'Kendrick Lamar, J. Cole, Tyler The Creator e mais', gradient: ['#4b917d', '#e2d96e'] },
  { id: 10, name: 'Daily Mix 4', description: 'Bad Bunny, J Balvin, Ozuna e mais', gradient: ['#f59b23', '#e61e32'] },
  { id: 11, name: 'Daily Mix 5', description: 'Coldplay, Radiohead, Muse e mais', gradient: ['#2d46b9', '#f074b4'] },
  { id: 12, name: 'Release Radar', description: 'Catch all the latest music from artists you follow', gradient: ['#1e3264', '#e91429'] },
];

export const topArtists = [
  { id: 1, name: 'The Weeknd', type: 'Artista', gradient: ['#a13028', '#351010'] },
  { id: 2, name: 'Drake', type: 'Artista', gradient: ['#8d67ab', '#1a0e2e'] },
  { id: 3, name: 'Kendrick Lamar', type: 'Artista', gradient: ['#2d46b9', '#0d1b4e'] },
  { id: 4, name: 'Taylor Swift', type: 'Artista', gradient: ['#e8b4bc', '#7a3a46'] },
  { id: 5, name: 'Bad Bunny', type: 'Artista', gradient: ['#f5a623', '#7a4e00'] },
  { id: 6, name: 'Doja Cat', type: 'Artista', gradient: ['#dc148c', '#6a0040'] },
];

export const categories = [
  { id: 1, name: 'Podcasts', color: '#6400f4' },
  { id: 2, name: 'Para você', color: '#e61e32' },
  { id: 3, name: 'Lançamentos', color: '#1e3264' },
  { id: 4, name: 'Sertanejo', color: '#218a16' },
  { id: 5, name: 'Samba e pagode', color: '#e3640c' },
  { id: 6, name: 'Funk', color: '#8d67ab' },
  { id: 7, name: 'Pop', color: '#dc148c' },
  { id: 8, name: 'Rock', color: '#ba5d07' },
  { id: 9, name: 'Hip Hop', color: '#477d95' },
  { id: 10, name: 'MPB', color: '#1e8a45' },
  { id: 11, name: 'Indie', color: '#dc148c' },
  { id: 12, name: 'Eletrônica', color: '#148a08' },
  { id: 13, name: 'Jazz', color: '#0d73ec' },
  { id: 14, name: 'Classical', color: '#a0522d' },
  { id: 15, name: 'R&B', color: '#6400f4' },
  { id: 16, name: 'Latin', color: '#e61e32' },
  { id: 17, name: 'K-Pop', color: '#dc148c' },
  { id: 18, name: 'Para Treinar', color: '#e8b400' },
  { id: 19, name: 'Relax', color: '#4776a8' },
  { id: 20, name: 'Festas', color: '#e91429' },
];

export const mockTracks = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200 },
  { id: 2, title: 'God\'s Plan', artist: 'Drake', album: 'Scorpion', duration: 198 },
  { id: 3, title: 'HUMBLE.', artist: 'Kendrick Lamar', album: 'DAMN.', duration: 177 },
  { id: 4, title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', duration: 200 },
  { id: 5, title: 'Tití Me Preguntó', artist: 'Bad Bunny', album: 'Un Verano Sin Ti', duration: 247 },
  { id: 6, title: 'Kill Bill', artist: 'SZA', album: 'SOS', duration: 153 },
  { id: 7, title: 'As It Was', artist: 'Harry Styles', album: 'Harry\'s House', duration: 167 },
  { id: 8, title: 'About Damn Time', artist: 'Lizzo', album: 'Special', duration: 193 },
];

export const mockSearchResults = [
  { id: 1, name: 'The Weeknd', type: 'artist', gradient: ['#a13028', '#351010'] },
  { id: 2, name: 'Weekend Vibes', type: 'playlist', gradient: ['#4773a5', '#374a5d'] },
  { id: 3, name: 'After Hours', type: 'album', gradient: ['#cc2121', '#3b0a0a'] },
  { id: 4, name: 'The Weeknd Mix', type: 'playlist', gradient: ['#8d67ab', '#1a0e2e'] },
];

export const userPlaylists = [
  { id: 'p1', name: 'Minhas Favoritas' },
  { id: 'p2', name: 'Tarde Relaxante' },
  { id: 'p3', name: 'Treino 🏋️' },
  { id: 'p4', name: 'Road Trip' },
  { id: 'p5', name: 'Trabalho Focado' },
  { id: 'p6', name: 'Boas Festas 🎄' },
  { id: 'p7', name: 'Sad Hours' },
  { id: 'p8', name: 'Indie Vibes' },
];
