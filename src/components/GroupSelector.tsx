import { Link } from 'react-router-dom';

const groups = ['A', 'B', 'C', 'D', 'E'];

export default function GroupSelector() {
  return (
    <div className="flex flex-col items-center mt-10">
      {groups.map(group => (
        <Link key={group} to={`/group/${group}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded m-2">
            Groupe {group}
          </button>
        </Link>
      ))}
    </div>
  );
}