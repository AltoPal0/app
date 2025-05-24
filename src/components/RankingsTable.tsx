import type { RankingEntry } from '../types';

interface Props {
  data: RankingEntry[];
  selectedTeam: string | null;
}

export default function RankingsTable({ data , selectedTeam }: Props) {
  return (
    <div className="w-full" >
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-lg text-center ">
         <thead className="bg-gray-100 border-b-2 border-gray-300"> 
            <tr>
              <th className="w-[60%] px-1 py-1">Classement</th>
              <th className="w-[10%] px-1 py-1">#</th>
              <th className="w-[10%] px-1 py-1">V</th>
              <th className="w-[10%] px-1 py-1">+/-</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => (
              <tr
              key={idx}
              className={`${
                entry.team === selectedTeam ? 'bg-white' : idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'
              }`}
            >
                <td className="px-1 py-1">{entry.team}</td>
                <td className="px-1 py-1">{entry.gamesPlayed}</td>
                <td className="px-1 py-1">{entry.wins}</td>
                <td className="px-1 py-1 text-sm">{entry.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}