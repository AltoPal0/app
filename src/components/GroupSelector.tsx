import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const allGroups = [['A', 'B', 'C', 'D', 'E', 'Americana'], ['F', 'G', 'H', 'I', 'J', 'Americana']];

export default function GroupSelector() {
  const [page, setPage] = useState(0);

  return (
    <div className="flex flex-col items-center mt-0 w-full">
      {/* <div className="w-full max-w-5xl bg-white shadow-md overflow-hidden"> */}
        <div className="w-full">
          <img
            src="/bandeau.jpg"
            alt="Tournoi Header"
            className="w-full object-cover py-1 border-b border-gray-200"
          />
        {/* </div> */}
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">
          {page === 0 ? "Phase 1" : "Phase 2"}
        </h2>
      </div>
      <div className="flex flex-row items-center justify-center w-full min-h-[400px]">
        <div className="w-10 flex justify-center">
          {page === 1 && (
            <button
              className="bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 rounded-full p-4 shadow-md transition duration-300"
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
              <div
                key={i}
                className="w-full flex flex-col items-center justify-center gap-0 py-3"
              >
                {groupSet.map((group) => (
                  <Link key={group} to={`/group/${group === 'Americana' ? 'AMERICANA' : group}`}>
                    <button className={`text-white font-semibold py-4 px-10 rounded-lg shadow-md transition duration-300 ease-in-out my-2 w-40 text-center ${
                      group === 'Americana'
                        ? 'bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                    }`}>
                      {group === 'Americana' ? 'Americana' : `Groupe ${group}`}
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
              className="bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 rounded-full p-4 shadow-md transition duration-300"
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
