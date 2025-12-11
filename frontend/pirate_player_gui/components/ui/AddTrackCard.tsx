'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function AddTrackCard() {
  const [showNewTrack, setShowNewTrack] = useState(false);

  return (
    <Card className="bg-gradient-to-r from-blue-400 to-blue-500 border-none">
      <CardContent className="p-6">
        <button
          onClick={() => setShowNewTrack(!showNewTrack)}
          className="w-full text-white text-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" />
          Add a new track
        </button>
        {showNewTrack && (
          <div className="mt-4 text-white text-sm">
            Feature coming soon: Upload tracks from your PC
          </div>
        )}
      </CardContent>
    </Card>
  );
}