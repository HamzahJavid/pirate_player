'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track } from '@/types/music';
import { formatTime } from '@/lib/utils';

interface PlayerControlsProps {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onTimeChange: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

export default function PlayerControls({
  currentTrack,
  isPlaying,
  currentTime,
  volume,
  onPlayPause,
  onNext,
  onPrevious,
  onTimeChange,
  onVolumeChange
}: PlayerControlsProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentTrack.title}</h2>
          <p className="text-gray-600 text-lg">{currentTrack.artist}</p>
        </div>

        <div className="mb-6">
          <Slider
            value={[currentTime]}
            max={currentTrack.duration}
            step={1}
            onValueChange={([value]) => onTimeChange(value)}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            onClick={onPrevious}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            onClick={onPlayPause}
            size="icon"
            className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>
          <Button
            onClick={onNext}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 className="w-5 h-5 text-gray-600" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={([value]) => onVolumeChange(value)}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 w-12">{volume}%</span>
        </div>
      </CardContent>
    </Card>
  );
}