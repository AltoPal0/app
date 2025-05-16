import { updateMatchScore } from '../services/googleSheets';
import { useState } from 'react';
import type { MatchEntry } from '../types';
import ScoreEditorModal from './ScoreEditorModal'; // import the modal component

interface Props {
  data: MatchEntry[];
  selectedTeam: string | null;
  highlightTeam: string | null;
  onScoreUpdated?: () => void; // ✅ optional
}



export default function MatchesTable({ data, selectedTeam, highlightTeam, onScoreUpdated }: Props) {
  const [editingMatch, setEditingMatch] = useState<MatchEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filteredMatches = selectedTeam
      ? data.filter(match => {
          if (!selectedTeam.includes('/')) {
            // Americana case: match if selected player is part of any team
            return match.leftTeam.split('/').some(name => name.trim() === selectedTeam) ||
                   match.rightTeam.split('/').some(name => name.trim() === selectedTeam);
          }
          return match.leftTeam === selectedTeam || match.rightTeam === selectedTeam;
        })
      : data;

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-xs text-center">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="w-[38%] px-1 py-1 text-left"></th>
              <th className="w-[24%] px-1 py-1 text-center text-lg">MATCHES</th>
              <th className="w-[38%] px-1 py-1 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map((match, idx) => {
              const hasScores = match.leftScore !== '' && match.rightScore !== '';
              const left = Number(match.leftScore);
              const right = Number(match.rightScore);
              const [hour, minute] = (match.startTime || '').split('h');

              const leftNames = match.leftTeam.split('/').map(n => n.trim());
              const rightNames = match.rightTeam.split('/').map(n => n.trim());

              return (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {/* Left team (2 lines) */}
                  <td className={`px-2 py-2 text-lg text-left leading-tight ${match.leftTeam === selectedTeam ? 'font-bold' : ''
                    }`}>
                    {leftNames.map((n, i) => (
                      <div
                        key={i}
                        className={
                          n === selectedTeam
                            ? 'font-bold text-pink-400'
                            : highlightTeam && match.leftTeam === highlightTeam
                              ? 'font-bold'
                              : ''
                        }
                      >
                        {n}
                      </div>
                    ))}
                  </td>

                  {/* Scores or time as 3 parts */}
                  <td className="px-0 py-2 text-center cursor-pointer" onClick={() => setEditingMatch(match)}>
                    {hasScores ? (
                      <div className="flex justify-center items-center gap-1 py-0">
                        <span className={`flex aspect-square w-12 items-center justify-center rounded text-white font-bold text-base ${left > right ? 'bg-green-500' : 'bg-gray-300 text-gray-800'}`}>
                          {match.leftScore}
                        </span>
                        <span className={`flex aspect-square w-12 items-center justify-center rounded text-white font-bold text-base ${right > left ? 'bg-green-500' : 'bg-gray-300 text-gray-800'}`}>
                          {match.rightScore}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-1">
                        <div className="text-base font-semibold">
                          {hour}h{minute}
                        </div>
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-600 text-white border border-white">
                          Piste {match.court}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Right team (2 lines) */}
                  <td className={`px-2 py-2 text-lg text-right leading-tight ${match.rightTeam === selectedTeam ? 'font-bold' : ''
                    }`}>
                    {rightNames.map((n, i) => (
                      <div
                        key={i}
                        className={
                          n === selectedTeam
                            ? 'font-bold text-pink-400'
                            : highlightTeam && match.rightTeam === highlightTeam
                              ? 'font-bold'
                              : ''
                        }
                      >
                        {n}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {editingMatch && (
        <ScoreEditorModal
          match={editingMatch}
          onCancel={() => setEditingMatch(null)}
          onConfirm={async (leftScore, rightScore) => {
            if (editingMatch) {
              try {
                setIsSaving(true);
                const groupMatch = editingMatch.group; // assumes match has a 'group' property
                const matchIndex = data.findIndex(
                  m => m.leftTeam === editingMatch.leftTeam && m.rightTeam === editingMatch.rightTeam
                );
                if (groupMatch && matchIndex !== -1) {
                  await updateMatchScore(groupMatch, matchIndex, leftScore, rightScore);
                  if (onScoreUpdated) onScoreUpdated(); // ✅ Trigger refresh
                }
              } catch (error) {
                console.error("Failed to update match score:", error);
              } finally {
                setIsSaving(false);
                setEditingMatch(null);
              }
            }
          }}
          loading={isSaving}
        />
      )}
    </div>
  );
}