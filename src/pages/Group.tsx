import { useParams } from 'react-router-dom';
import GroupView from '../components/GroupView';
import { useEffect, useState } from 'react';
import { fetchRankings, fetchMatches } from '../services/googleSheets';
import type { RankingEntry, MatchEntry } from '../types';

export default function Group() {
  const { id } = useParams();
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [matches, setMatches] = useState<MatchEntry[]>([]);

  useEffect(() => {
    if (id) {
      fetchRankings(id).then(setRankings);
      fetchMatches(id).then(setMatches);
    }
  }, [id]);

  return <GroupView rankings={rankings} matches={matches} />;
}