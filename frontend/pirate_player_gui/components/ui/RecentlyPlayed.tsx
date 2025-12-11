'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Track } from '@/types/music';

interface RecentlyPlayedProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
}

export default function RecentlyPlayed({ tracks, onTrackSelect }: RecentlyPlayedProps) {
  return (
    <Card className="bg-gradient-to-r from-green-400 to-green-500 border-none">
      <CardContent className="p-6">
        <h3 className="text-white text-lg font-semibold mb-3">Recently Listening</h3>
        <div className="space-y-2">
          {tracks.map((track, index) => (
            <div
              key={index}
              onClick={() => onTrackSelect(track)}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-lg cursor-pointer hover:bg-white/30 transition"
            >
              <div className="text-white font-medium">{track.title}</div>
              <div className="text-white/80 text-sm">{track.artist}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}