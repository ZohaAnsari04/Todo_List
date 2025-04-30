
import React, { useState } from 'react';
import { Music } from 'lucide-react';

const MusicLink: React.FC = () => {
  const [musicLink, setMusicLink] = useState<string>('');
  const [musicName, setMusicName] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInput(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music size={20} className="text-mindful-primary" />
          <h3 className="font-semibold text-gray-700">Today's Playlist</h3>
        </div>
        
        <button 
          onClick={() => setShowInput(!showInput)}
          className="text-xs text-mindful-primary hover:text-mindful-secondary transition-colors"
        >
          {musicLink ? 'Edit' : 'Add'}
        </button>
      </div>
      
      {showInput ? (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={musicName}
              onChange={(e) => setMusicName(e.target.value)}
              placeholder="Playlist name"
              className="w-full p-2 text-sm bg-gray-50 rounded-md border border-gray-200 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none"
            />
            <input
              type="url"
              value={musicLink}
              onChange={(e) => setMusicLink(e.target.value)}
              placeholder="Paste Spotify, YouTube, or other music link"
              className="w-full p-2 text-sm bg-gray-50 rounded-md border border-gray-200 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none"
            />
            <div className="flex gap-2 justify-end mt-1">
              <button 
                type="button" 
                onClick={() => setShowInput(false)}
                className="px-3 py-1 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-3 py-1 text-xs text-white bg-mindful-primary hover:bg-mindful-secondary rounded-md transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mt-2">
          {musicLink ? (
            <div className="flex items-center gap-2">
              <div className="bg-mindful-accent/30 text-mindful-primary p-1 rounded">
                <Music size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{musicName}</p>
                <a 
                  href={musicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-mindful-primary hover:underline"
                >
                  Listen now
                </a>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic text-center py-1">
              Add a productivity playlist for today
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MusicLink;
