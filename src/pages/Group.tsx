import { useParams } from 'react-router-dom';
import GroupView from '../components/GroupView';
import { useEffect, useState } from 'react';
import { fetchRankings, fetchMatches } from '../services/googleSheets';
import type { RankingEntry, MatchEntry } from '../types';
import TeamSelector from '../components/TeamSelector';

export default function Group() {
  const { id } = useParams();
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [matches, setMatches] = useState<MatchEntry[]>([]);

  const [selectedTeam, setSelectedTeam] = useState<string | null>(() => {
    return localStorage.getItem('selectedTeam') || null;
  });

  const [lastTeam, setLastTeam] = useState<string | null>(selectedTeam);

  const handleSelectTeam = (team: string | null) => {
    if (team) {
      setSelectedTeam(team);
      setLastTeam(team);
      localStorage.setItem('selectedTeam', team);
    } else {
      setSelectedTeam(null);
      localStorage.removeItem('selectedTeam');
    }
  };

  // const toggleFilter = () => {
  //   if (selectedTeam) {
  //     // Turn filter off
  //     setSelectedTeam(null);
  //     localStorage.removeItem('selectedTeam');
  //   } else if (lastTeam) {
  //     // Restore last filter
  //     setSelectedTeam(lastTeam);
  //     localStorage.setItem('selectedTeam', lastTeam);
  //   }
  // };

  const teamList = Array.from(new Set([
    ...rankings.map(r => r.team),
    ...matches.map(m => m.leftTeam),
    ...matches.map(m => m.rightTeam),
  ])).filter(Boolean);

  useEffect(() => {
    if (id) {
      fetchRankings(id).then(newRankings => {
        fetchMatches(id).then(newMatches => {
          setRankings(newRankings);
          setMatches(newMatches);

          const allTeams = Array.from(new Set([
            ...newRankings.map(r => r.team),
            ...newMatches.map(m => m.leftTeam),
            ...newMatches.map(m => m.rightTeam),
          ])).filter(Boolean);

          setLastTeam(prev => prev ?? selectedTeam);

          // Validate selectedTeam against new list
          if (selectedTeam && !allTeams.includes(selectedTeam)) {
            setSelectedTeam(null);
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  

  return (

    <div className="w-full max-w-5xl bg-blue-900 shadow-md overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
        {/* Back Button (Logo) */}
        <a
          href="/"
          className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center border border-gray-300 hover:shadow"
        >
          <img
            src="/logo-tournoi.jpg"
            alt="Back to selection"
            className="w-full h-full object-cover"
          />
        </a>

        {/* Center: Group Label */}
        <a
          href="/"
          className="text-xl font-extrabold tracking-tight text-white hover:text-blue-800"
        >
          Groupe {(id && ['F','G','H','I','J'].includes(id.toUpperCase())) ? (['F','G','H','I','J'].indexOf(id.toUpperCase()) + 1) : id?.toUpperCase()}
        </a>

        {/* Right: Team Selector */}
        <TeamSelector
          teams={teamList}
          selectedTeam={selectedTeam}
          onSelect={handleSelectTeam}
        />
      </div>

      {/* Optional selected team banner */}
      {/* {selectedTeam && (
        <div className="flex justify-end px-4 py-2 bg-blue-50 border-b border-blue-100">
          <button
            onClick={() => setSelectedTeam(null)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
          >
            Show all
          </button>
        </div>
      )} */}

      {/* Group Content */}
      <div className="px-4 py-4">
        <GroupView
          rankings={rankings}
          matches={matches}
          selectedTeam={selectedTeam}
          lastTeam={lastTeam}
          onScoreUpdated={() => {
            if (id) {
              fetchMatches(id).then(setMatches);
              fetchRankings(id).then(setRankings);
            }
          }}
        />
      </div>
    </div>

  );
}