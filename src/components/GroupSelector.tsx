import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const allGroups = [['A', 'B', 'C', 'D', 'E'], ['F', 'G', 'H', 'I', 'J']];

export default function GroupSelector() {
  const [page, setPage] = useState(0);

  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">{page === 0 ? 'Phase 1' : 'Phase 2'}</h2>
      </div>
      <div className="flex flex-row items-center justify-center w-full">
        <div className="w-10 flex justify-center">
          {page === 1 && (
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setPage(0)}
            >
              <FaArrowLeft size={24} />
            </button>
          )}
        </div>
        <div className="relative w-full min-h-[480px] overflow-hidden">
          <div
            className="absolute top-0 left-0 flex w-[200%] transition-transform duration-500"
            style={{ transform: `translateX(-${page * 50}%)` }}
          >
            {allGroups.map((groupSet, i) => (
              <div key={i} className="w-full flex flex-col items-center justify-center pb-4">
                {groupSet.map(group => (
                  <Link key={group} to={`/group/${group}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded my-1">
                      Groupe {group}
                    </button>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-10 flex justify-center">
          {page === 0 && (
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setPage(1)}
            >
              <FaArrowRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}