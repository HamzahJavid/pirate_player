'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, X, List, Clock } from 'lucide-react';
import { Track, Playlist } from '@/types/music';
import { formatTime } from '@/lib/utils';

interface PlaylistSectionProps {
  playlists: Playlist[];
  selectedPlaylist: Playlist;
  playlistTracks: Track[];
  currentTrack: Track;
  onPlaylistSelect: (playlist: Playlist) => void;
  onTrackSelect: (track: Track) => void;
  onCreatePlaylist: (name: string) => void;
  onDeletePlaylist: (playlistId: number) => void;
}

export default function PlaylistSection({
  playlists,
  selectedPlaylist,
  playlistTracks,
  currentTrack,
  onPlaylistSelect,
  onTrackSelect,
  onCreatePlaylist,
  onDeletePlaylist
}: PlaylistSectionProps) {
  const [showPlaylists, setShowPlaylists] = useState(true);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName);
      setNewPlaylistName('');
      setShowNewPlaylist(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-pink-400 to-pink-500 border-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowPlaylists(!showPlaylists)}
              className="text-white font-semibold flex items-center gap-2"
            >
              <List className="w-5 h-5" />
              Playlists
            </button>
            <Button
              onClick={() => setShowNewPlaylist(true)}
              size="sm"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-none"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {showNewPlaylist && (
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="New playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
              />
              <Button onClick={handleCreatePlaylist} size="sm">
                Create
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showPlaylists && (
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <Card
              key={playlist.id}
              className={`cursor-pointer transition-all ${
                selectedPlaylist.id === playlist.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-white hover:shadow-md'
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <button
                  onClick={() => onPlaylistSelect(playlist)}
                  className="flex-1 text-left"
                >
                  <div className="font-medium">{playlist.name}</div>
                  <div className={`text-sm ${selectedPlaylist.id === playlist.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {playlist.tracks.length} tracks
                  </div>
                </button>
                {playlists.length > 1 && (
                  <Button
                    onClick={() => onDeletePlaylist(playlist.id)}
                    size="sm"
                    variant="ghost"
                    className="hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {selectedPlaylist.name}
          </h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {playlistTracks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tracks in this playlist</p>
              ) : (
                playlistTracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => onTrackSelect(track)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      currentTrack.id === track.id
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{track.title}</div>
                    <div className="text-sm text-gray-600 flex justify-between mt-1">
                      <span>{track.artist}</span>
                      <span>{formatTime(track.duration)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
