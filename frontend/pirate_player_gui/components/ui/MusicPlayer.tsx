'use client';

import React, { useState, useEffect } from 'react';
import PlayerControls from './PlayerControls';
import PlaylistSection from './PlaylistSection';
import RecentlyPlayed from './RecentlyPlayed';
import AddTrackCard from './AddTrackCard';
import { Track, Playlist } from '@/types/music';

const SAMPLE_TRACKS: Track[] = [
  { id: 1, title: 'Summer Vibes', artist: 'Artist One', duration: 234, url: '' },
  { id: 2, title: 'Midnight Dreams', artist: 'Artist Two', duration: 198, url: '' },
  { id: 3, title: 'Ocean Waves', artist: 'Artist Three', duration: 267, url: '' },
  { id: 4, title: 'City Lights', artist: 'Artist Four', duration: 201, url: '' },
  { id: 5, title: 'Mountain Echo', artist: 'Artist Five', duration: 289, url: '' }
];

const INITIAL_PLAYLISTS: Playlist[] = [
  { id: 1, name: 'Playlist 1', tracks: [1, 2, 3] },
  { id: 2, name: 'Playlist 2', tracks: [3, 4, 5] }
];

export default function MusicPlayer() {
  const [tracks] = useState<Track[]>(SAMPLE_TRACKS);
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>(playlists[0]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([tracks[0], tracks[1]]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!recentlyPlayed.find(t => t.id === currentTrack.id)) {
      setRecentlyPlayed([currentTrack, ...recentlyPlayed.slice(0, 4)]);
    }
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
    if (!recentlyPlayed.find(t => t.id === track.id)) {
      setRecentlyPlayed([track, ...recentlyPlayed.slice(0, 4)]);
    }
  };

  const handleNext = () => {
    const playlistTracks = selectedPlaylist.tracks
      .map(id => tracks.find(t => t.id === id))
      .filter((t): t is Track => t !== undefined);
    const currentIndex = playlistTracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex < playlistTracks.length - 1) {
      handleTrackSelect(playlistTracks[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const playlistTracks = selectedPlaylist.tracks
      .map(id => tracks.find(t => t.id === id))
      .filter((t): t is Track => t !== undefined);
    const currentIndex = playlistTracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      handleTrackSelect(playlistTracks[currentIndex - 1]);
    }
  };

  const handleCreatePlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: playlists.length + 1,
      name,
      tracks: []
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const handleDeletePlaylist = (playlistId: number) => {
    setPlaylists(playlists.filter(p => p.id !== playlistId));
    if (selectedPlaylist.id === playlistId && playlists.length > 1) {
      const newSelected = playlists.find(p => p.id !== playlistId);
      if (newSelected) setSelectedPlaylist(newSelected);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const playlistTracks = selectedPlaylist.tracks
    .map(id => tracks.find(t => t.id === id))
    .filter((t): t is Track => t !== undefined);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Music Player</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AddTrackCard />
            <PlayerControls
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              currentTime={currentTime}
              volume={volume}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onTimeChange={setCurrentTime}
              onVolumeChange={setVolume}
            />
            <RecentlyPlayed 
              tracks={recentlyPlayed} 
              onTrackSelect={handleTrackSelect}
            />
          </div>

          <div>
            <PlaylistSection
              playlists={playlists}
              selectedPlaylist={selectedPlaylist}
              playlistTracks={playlistTracks}
              currentTrack={currentTrack}
              onPlaylistSelect={setSelectedPlaylist}
              onTrackSelect={handleTrackSelect}
              onCreatePlaylist={handleCreatePlaylist}
              onDeletePlaylist={handleDeletePlaylist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
