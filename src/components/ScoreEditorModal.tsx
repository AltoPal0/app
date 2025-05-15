import { useState } from 'react';
import type { MatchEntry } from '../types';

interface Props {
  match: MatchEntry;
  onConfirm: (leftScore: string, rightScore: string) => void;
  onCancel: () => void;
}

export default function ScoreEditorModal({ match, onConfirm, onCancel }: Props) {
  const [selectedWinner, setSelectedWinner] = useState<'left' | 'right' | null>(null);
  const [leftScore, setLeftScore] = useState('');
  const [rightScore, setRightScore] = useState('');

  const handleConfirm = () => {
    if (leftScore !== '' && rightScore !== '') {
      onConfirm(leftScore, rightScore);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-xl shadow-xl w-full max-w-md">
        {/* Title Section */}
        <div className={`text-center text-xl font-bold p-4 border-b border-gray-300 rounded-t-xl ${leftScore && rightScore ? 'bg-red-100' : ''}`}>
          {leftScore && rightScore ? (
            <button onClick={onCancel} className="text-red-700 hover:underline">Annuler</button>
          ) : (
            'Qui a gagné ?'
          )}
        </div>

        {/* Teams Selection Section */}
        <div className="flex divide-x divide-gray-300">
          {/* Left Team */}
          <div
            className={`flex-1 p-6 text-center cursor-pointer transition ${
              selectedWinner === 'left' ? 'bg-green-500 text-white font-bold' : ''
            }`}
            onClick={() => selectedWinner === null && setSelectedWinner('left')}
          >
            <div className="text-lg whitespace-pre-line">
              {match.leftTeam.split('/').join('\n')}
            </div>
            <input
              type="number"
              inputMode="numeric"
              pattern="\d*"
              value={leftScore}
              onChange={(e) => setLeftScore(e.target.value)}
              className={`mt-4 w-12 h-12 rounded bg-white text-center text-lg font-bold text-black border border-gray-300 transition-opacity duration-200 ${
                selectedWinner ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            />
          </div>

          {/* Right Team */}
          <div
            className={`flex-1 p-6 text-center cursor-pointer transition ${
              selectedWinner === 'right' ? 'bg-green-500 text-white font-bold' : ''
            }`}
            onClick={() => selectedWinner === null && setSelectedWinner('right')}
          >
            <div className="text-lg whitespace-pre-line">
              {match.rightTeam.split('/').join('\n')}
            </div>
            <input
              type="number"
              inputMode="numeric"
              pattern="\d*"
              value={rightScore}
              onChange={(e) => setRightScore(e.target.value)}
              className={`mt-4 w-12 h-12 rounded bg-white text-center text-lg font-bold text-black border border-gray-300 transition-opacity duration-200 ${
                selectedWinner ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className={`flex justify-center p-4 border-t border-gray-300 rounded-b-xl ${leftScore && rightScore ? 'bg-green-100' : 'bg-gray-100'}`}>
          {leftScore && rightScore ? (
            <button
              onClick={handleConfirm}
              className="px-6 py-3 rounded-full bg-green-100 hover:bg-green-600 text-black text-lg font-semibold transition"
            >
              CONFIRMER ✅
            </button>
          ) : (
            <div className="h-12" /> // placeholder to preserve height
          )}
        </div>
      </div>
    </div>
  );
}
