const AUDIO = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
];

export const artists = [
  {
    id: "a1",
    name: "The Weeknd",
    gradient: ["#a13028", "#1a0505"],
    followers: "89.423.116",
    genre: "R&B/Pop",
  },
  {
    id: "a2",
    name: "Drake",
    gradient: ["#8d67ab", "#1a0e2e"],
    followers: "75.312.008",
    genre: "Hip-Hop",
  },
  {
    id: "a3",
    name: "Kendrick Lamar",
    gradient: ["#2d46b9", "#0d1b4e"],
    followers: "61.004.500",
    genre: "Hip-Hop",
  },
  {
    id: "a4",
    name: "Taylor Swift",
    gradient: ["#c8a4b0", "#3a2030"],
    followers: "102.874.213",
    genre: "Pop",
  },
  {
    id: "a5",
    name: "Bad Bunny",
    gradient: ["#f5a623", "#7a4e00"],
    followers: "95.611.400",
    genre: "Latin",
  },
  {
    id: "a6",
    name: "Doja Cat",
    gradient: ["#dc148c", "#3a0020"],
    followers: "48.220.000",
    genre: "Pop/R&B",
  },
  {
    id: "a7",
    name: "Foo Fighters",
    gradient: ["#c0392b", "#4a0a0a"],
    followers: "22.104.330",
    genre: "Rock",
  },
  {
    id: "a8",
    name: "Supercombo",
    gradient: ["#1a6b3a", "#0a2a18"],
    followers: "3.841.200",
    genre: "Rock Brasileiro",
  },
  {
    id: "a9",
    name: "Bemvirá",
    gradient: ["#7b2d8b", "#2a0a30"],
    followers: "980.500",
    genre: "Indie Rock Brasileiro",
  },
  {
    id: "a10",
    name: "Tópaz",
    gradient: ["#1a3a6b", "#0a1a30"],
    followers: "1.230.000",
    genre: "Indie",
  },
  {
    id: "a11",
    name: "Vice-Herói",
    gradient: ["#8b1a1a", "#300a0a"],
    followers: "540.000",
    genre: "Rock Brasileiro",
  },
  {
    id: "a12",
    name: "Twin Pumpkin",
    gradient: ["#6b3a1a", "#2a1508"],
    followers: "320.000",
    genre: "Indie Pop",
  },
  {
    id: "a13",
    name: "Personas",
    gradient: ["#1a4a6b", "#081520"],
    followers: "870.000",
    genre: "Pop Rock",
  },
  {
    id: "a14",
    name: "Zero to Hero",
    gradient: ["#2a6b1a", "#0a2008"],
    followers: "210.000",
    genre: "Rock",
  },
];

export const albums = [
  {
    id: "al1",
    name: "After Hours",
    artistId: "a1",
    year: 2020,
    gradient: ["#a13028", "#1a0505"],
  },
  {
    id: "al2",
    name: "Dawn FM",
    artistId: "a1",
    year: 2022,
    gradient: ["#3b3b98", "#1a1a4e"],
  },
  {
    id: "al3",
    name: "Scorpion",
    artistId: "a2",
    year: 2018,
    gradient: ["#8d67ab", "#1a0e2e"],
  },
  {
    id: "al4",
    name: "DAMN.",
    artistId: "a3",
    year: 2017,
    gradient: ["#2d46b9", "#0d1b4e"],
  },
  {
    id: "al5",
    name: "Midnights",
    artistId: "a4",
    year: 2022,
    gradient: ["#232d4b", "#0a0e1a"],
  },
  {
    id: "al6",
    name: "Un Verano Sin Ti",
    artistId: "a5",
    year: 2022,
    gradient: ["#f5a623", "#7a4e00"],
  },
  {
    id: "al7",
    name: "But Here We Are",
    artistId: "a7",
    year: 2023,
    gradient: ["#c0392b", "#4a0a0a"],
  },
  {
    id: "al8",
    name: "Supercombo",
    artistId: "a8",
    year: 2020,
    gradient: ["#1a6b3a", "#0a2a18"],
  },
  {
    id: "al9",
    name: "Bemvirá",
    artistId: "a9",
    year: 2022,
    gradient: ["#7b2d8b", "#2a0a30"],
  },
  {
    id: "al10",
    name: "Tópaz",
    artistId: "a10",
    year: 2021,
    gradient: ["#1a3a6b", "#0a1a30"],
  },
  {
    id: "al11",
    name: "Vice-Herói",
    artistId: "a11",
    year: 2022,
    gradient: ["#8b1a1a", "#300a0a"],
  },
  {
    id: "al12",
    name: "Twin Pumpkin",
    artistId: "a12",
    year: 2023,
    gradient: ["#6b3a1a", "#2a1508"],
  },
  {
    id: "al13",
    name: "Personas",
    artistId: "a13",
    year: 2021,
    gradient: ["#1a4a6b", "#081520"],
  },
  {
    id: "al14",
    name: "Zero to Hero",
    artistId: "a14",
    year: 2022,
    gradient: ["#2a6b1a", "#0a2008"],
  },
];

export const tracks = [
  {
    id: "t1",
    title: "Blinding Lights",
    artistId: "a1",
    albumId: "al1",
    duration: 200,
    audioUrl: AUDIO[0],
    plays: "3.842.134.501",
  },
  {
    id: "t2",
    title: "Save Your Tears",
    artistId: "a1",
    albumId: "al1",
    duration: 215,
    audioUrl: AUDIO[1],
    plays: "2.101.443.200",
  },
  {
    id: "t3",
    title: "Starboy",
    artistId: "a1",
    albumId: "al2",
    duration: 230,
    audioUrl: AUDIO[2],
    plays: "1.982.004.100",
  },
  {
    id: "t4",
    title: "Die For You",
    artistId: "a1",
    albumId: "al2",
    duration: 260,
    audioUrl: AUDIO[3],
    plays: "1.840.000.000",
  },
  {
    id: "t5",
    title: "God's Plan",
    artistId: "a2",
    albumId: "al3",
    duration: 198,
    audioUrl: AUDIO[4],
    plays: "2.200.000.000",
  },
  {
    id: "t6",
    title: "One Dance",
    artistId: "a2",
    albumId: "al3",
    duration: 173,
    audioUrl: AUDIO[5],
    plays: "1.890.000.000",
  },
  {
    id: "t7",
    title: "HUMBLE.",
    artistId: "a3",
    albumId: "al4",
    duration: 177,
    audioUrl: AUDIO[6],
    plays: "1.550.000.000",
  },
  {
    id: "t8",
    title: "DNA.",
    artistId: "a3",
    albumId: "al4",
    duration: 185,
    audioUrl: AUDIO[7],
    plays: "1.210.000.000",
  },
  {
    id: "t9",
    title: "Anti-Hero",
    artistId: "a4",
    albumId: "al5",
    duration: 200,
    audioUrl: AUDIO[0],
    plays: "2.800.000.000",
  },
  {
    id: "t10",
    title: "Lavender Haze",
    artistId: "a4",
    albumId: "al5",
    duration: 202,
    audioUrl: AUDIO[1],
    plays: "1.300.000.000",
  },
  {
    id: "t11",
    title: "Titi Me Pregunto",
    artistId: "a5",
    albumId: "al6",
    duration: 247,
    audioUrl: AUDIO[2],
    plays: "1.100.000.000",
  },
  {
    id: "t12",
    title: "Me Porto Bonito",
    artistId: "a5",
    albumId: "al6",
    duration: 178,
    audioUrl: AUDIO[3],
    plays: "998.000.000",
  },
  {
    id: "t13",
    title: "The Teacher",
    artistId: "a7",
    albumId: "al7",
    duration: 253,
    audioUrl: AUDIO[4],
    plays: "42.000.000",
  },
  {
    id: "t14",
    title: "Rescued",
    artistId: "a7",
    albumId: "al7",
    duration: 229,
    audioUrl: AUDIO[5],
    plays: "38.000.000",
  },
  {
    id: "t15",
    title: "Dia de Sorte",
    artistId: "a8",
    albumId: "al8",
    duration: 198,
    audioUrl: AUDIO[6],
    plays: "18.500.000",
  },
  {
    id: "t16",
    title: "Clichê",
    artistId: "a8",
    albumId: "al8",
    duration: 212,
    audioUrl: AUDIO[7],
    plays: "14.200.000",
  },
  {
    id: "t17",
    title: "Flores",
    artistId: "a9",
    albumId: "al9",
    duration: 187,
    audioUrl: AUDIO[0],
    plays: "9.800.000",
  },
  {
    id: "t18",
    title: "Leveza",
    artistId: "a9",
    albumId: "al9",
    duration: 201,
    audioUrl: AUDIO[1],
    plays: "7.300.000",
  },
  {
    id: "t19",
    title: "Azul",
    artistId: "a10",
    albumId: "al10",
    duration: 214,
    audioUrl: AUDIO[2],
    plays: "5.600.000",
  },
  {
    id: "t20",
    title: "Deriva",
    artistId: "a10",
    albumId: "al10",
    duration: 223,
    audioUrl: AUDIO[3],
    plays: "4.100.000",
  },
  {
    id: "t21",
    title: "Herói do Dia",
    artistId: "a11",
    albumId: "al11",
    duration: 195,
    audioUrl: AUDIO[4],
    plays: "3.200.000",
  },
  {
    id: "t22",
    title: "Cicatriz",
    artistId: "a11",
    albumId: "al11",
    duration: 208,
    audioUrl: AUDIO[5],
    plays: "2.800.000",
  },
  {
    id: "t23",
    title: "Colheita",
    artistId: "a12",
    albumId: "al12",
    duration: 191,
    audioUrl: AUDIO[6],
    plays: "1.900.000",
  },
  {
    id: "t24",
    title: "Outono",
    artistId: "a12",
    albumId: "al12",
    duration: 217,
    audioUrl: AUDIO[7],
    plays: "1.600.000",
  },
  {
    id: "t25",
    title: "Máscara",
    artistId: "a13",
    albumId: "al13",
    duration: 203,
    audioUrl: AUDIO[0],
    plays: "4.500.000",
  },
  {
    id: "t26",
    title: "Identidade",
    artistId: "a13",
    albumId: "al13",
    duration: 218,
    audioUrl: AUDIO[1],
    plays: "3.800.000",
  },
  {
    id: "t27",
    title: "Começo",
    artistId: "a14",
    albumId: "al14",
    duration: 196,
    audioUrl: AUDIO[2],
    plays: "2.100.000",
  },
  {
    id: "t28",
    title: "Ascensão",
    artistId: "a14",
    albumId: "al14",
    duration: 225,
    audioUrl: AUDIO[3],
    plays: "1.700.000",
  },
];

export const playlists = [
  {
    id: "pl1",
    name: "Chill Hits",
    description: "Relaxa e aproveita as melhores faixas.",
    gradient: ["#4773a5", "#1a2a3d"],
    trackIds: ["t1", "t2", "t9", "t10", "t3", "t4"],
    owner: "Spotify",
    followers: "22.386.549",
  },
  {
    id: "pl2",
    name: "Beast Mode",
    description: "Hip-hop e rock pesado para os treinos.",
    gradient: ["#e91429", "#5f1010"],
    trackIds: ["t5", "t6", "t7", "t8", "t13", "t14"],
    owner: "Spotify",
    followers: "4.821.903",
  },
  {
    id: "pl3",
    name: "Happy Hits!",
    description: "Hits para animar o seu dia.",
    gradient: ["#f5a623", "#773b04"],
    trackIds: ["t9", "t10", "t1", "t5", "t11", "t3"],
    owner: "Spotify",
    followers: "10.234.112",
  },
  {
    id: "pl4",
    name: "Indie Brasil",
    description: "O melhor do indie nacional.",
    gradient: ["#1a6b3a", "#0a2a18"],
    trackIds: ["t15", "t16", "t17", "t18", "t19", "t20"],
    owner: "Spotify",
    followers: "3.412.009",
  },
  {
    id: "pl5",
    name: "Late Night Drive",
    description: "A banda sonora para uma corrida noturna.",
    gradient: ["#2d46b9", "#0d1b52"],
    trackIds: ["t3", "t4", "t1", "t2", "t9", "t10"],
    owner: "Spotify",
    followers: "8.990.341",
  },
  {
    id: "pl6",
    name: "Rock Nacional",
    description: "O rock brasileiro em todo o seu peso.",
    gradient: ["#8b1a1a", "#300a0a"],
    trackIds: ["t21", "t22", "t23", "t24", "t25", "t27"],
    owner: "Spotify",
    followers: "6.420.000",
  },
];

export const madeForYou = [
  {
    id: "mix1",
    name: "Daily Mix 1",
    description: "The Weeknd, Drake e mais",
    gradient: ["#e91429", "#c62a6a"],
    trackIds: ["t1", "t2", "t5", "t6", "t3"],
  },
  {
    id: "mix2",
    name: "Daily Mix 2",
    description: "Kendrick Lamar, Foo Fighters e mais",
    gradient: ["#1e3264", "#4b917d"],
    trackIds: ["t7", "t8", "t13", "t14"],
  },
  {
    id: "mix3",
    name: "Daily Mix 3",
    description: "Taylor Swift, Doja Cat e mais",
    gradient: ["#4b917d", "#e2d96e"],
    trackIds: ["t9", "t10", "t1", "t2"],
  },
  {
    id: "mix4",
    name: "Daily Mix 4",
    description: "Bad Bunny, Supercombo e mais",
    gradient: ["#f59b23", "#e61e32"],
    trackIds: ["t11", "t12", "t15", "t16"],
  },
  {
    id: "mix5",
    name: "Daily Mix 5",
    description: "Indie Brasil — Topaz, Bemvirá e mais",
    gradient: ["#2d46b9", "#f074b4"],
    trackIds: ["t19", "t20", "t25", "t26", "t17"],
  },
  {
    id: "rr",
    name: "Release Radar",
    description: "Novidades dos artistas que voce segue",
    gradient: ["#1e3264", "#e91429"],
    trackIds: ["t15", "t17", "t21", "t23", "t25", "t27"],
  },
];

export const recentlyPlayed = [
  { id: "pl1", type: "playlist" },
  { id: "pl2", type: "playlist" },
  { id: "a1", type: "artist" },
  { id: "pl4", type: "playlist" },
  { id: "a8", type: "artist" },
  { id: "pl6", type: "playlist" },
];

export const categories = [
  { id: "c1", name: "Podcasts", color: "#6400f4" },
  { id: "c2", name: "Para voce", color: "#e61e32" },
  { id: "c3", name: "Lancamentos", color: "#1e3264" },
  { id: "c4", name: "Sertanejo", color: "#218a16" },
  { id: "c5", name: "Samba e pagode", color: "#e3640c" },
  { id: "c6", name: "Funk", color: "#8d67ab" },
  { id: "c7", name: "Pop", color: "#dc148c" },
  { id: "c8", name: "Rock", color: "#ba5d07" },
  { id: "c9", name: "Hip Hop", color: "#477d95" },
  { id: "c10", name: "MPB", color: "#1e8a45" },
  { id: "c11", name: "Indie", color: "#6b21a8" },
  { id: "c12", name: "Eletronica", color: "#148a08" },
  { id: "c13", name: "Jazz", color: "#0d73ec" },
  { id: "c14", name: "Classica", color: "#a0522d" },
  { id: "c15", name: "R&B", color: "#6400f4" },
  { id: "c16", name: "Latin", color: "#e61e32" },
  { id: "c17", name: "K-Pop", color: "#dc148c" },
  { id: "c18", name: "Para Treinar", color: "#e8b400" },
  { id: "c19", name: "Relax", color: "#4776a8" },
  { id: "c20", name: "Festas", color: "#e91429" },
];

export const userPlaylists = [
  { id: "u1", name: "Minhas Favoritas", trackIds: ["t1", "t2", "t9"] },
  { id: "u2", name: "Tarde Relaxante", trackIds: ["t3", "t4", "t10"] },
  { id: "u3", name: "Treino", trackIds: ["t5", "t6", "t7", "t8", "t13"] },
  {
    id: "u4",
    name: "Indie Brasil",
    trackIds: ["t15", "t17", "t19", "t21", "t23", "t25"],
  },
  { id: "u5", name: "Trabalho Focado", trackIds: ["t3", "t4", "t2"] },
  { id: "u6", name: "Sad Hours", trackIds: ["t4", "t2", "t10", "t18"] },
];

export function getTrackById(id) {
  return tracks.find((t) => t.id === id);
}
export function getArtistById(id) {
  return artists.find((a) => a.id === id);
}
export function getAlbumById(id) {
  return albums.find((a) => a.id === id);
}
export function getPlaylistById(id) {
  return (
    playlists.find((p) => p.id === id) ||
    madeForYou.find((p) => p.id === id) ||
    userPlaylists.find((p) => p.id === id)
  );
}
export function getTracksForPlaylist(playlist) {
  return (playlist.trackIds || [])
    .map((id) => getTrackById(id))
    .filter(Boolean);
}
export function getTopTracksForArtist(artistId) {
  return tracks.filter((t) => t.artistId === artistId);
}
export function getAlbumsForArtist(artistId) {
  return albums.filter((a) => a.artistId === artistId);
}
export function searchAll(query) {
  const q = query.toLowerCase();
  return {
    artists: artists.filter((a) => a.name.toLowerCase().includes(q)),
    playlists: [...playlists, ...madeForYou].filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q),
    ),
    tracks: tracks.filter((t) => {
      const artist = getArtistById(t.artistId);
      return (
        t.title.toLowerCase().includes(q) ||
        artist?.name.toLowerCase().includes(q)
      );
    }),
    albums: albums.filter((a) => {
      const artist = getArtistById(a.artistId);
      return (
        a.name.toLowerCase().includes(q) ||
        artist?.name.toLowerCase().includes(q)
      );
    }),
  };
}
