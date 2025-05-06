import type { MatchEntry } from '../types';

interface Props {
  data: MatchEntry[];
}

export default function MatchesTable({ data }: Props) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">Matches & Schedule</h2>
      <table className="table-auto w-full border border-gray-300 rounded shadow-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2">Time</th>
            <th className="px-3 py-2">Team 1</th>
            <th className="px-3 py-2">Score</th>
            <th className="px-3 py-2">vs</th>
            <th className="px-3 py-2">Score</th>
            <th className="px-3 py-2">Team 2</th>
            <th className="px-3 py-2">Court</th>
          </tr>
        </thead>
        <tbody>
          {data.map((match, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-3 py-2">{match.startTime}</td>
              <td className="px-3 py-2">{match.leftTeam}</td>
              <td className="px-3 py-2">{match.leftScore}</td>
              <td className="px-3 py-2">vs.</td>
              <td className="px-3 py-2">{match.rightScore}</td>
              <td className="px-3 py-2">{match.rightTeam}</td>
              <td className="px-3 py-2">{match.court}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}