import { useState } from 'react';
import { FaUser, FaUserCheck } from 'react-icons/fa6';

interface Props {
    teams: string[];
    selectedTeam: string | null;
    onSelect: (team: string | null) => void;
}

export default function TeamSelector({ teams, selectedTeam, onSelect }: Props) {
    const [open, setOpen] = useState(false);

    const handleClick = (team: string | null) => {
        onSelect(team);
        localStorage.setItem('selectedTeam', team || '');
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="w-10 h-10 bg-gray-300 text-gray-700 rounded flex items-center justify-center hover:bg-gray-400"
                title="Filtrer par équipe"
            >
                {selectedTeam ? (
                    <FaUserCheck className="w-5 h-5 text-green-600" />
                ) : (
                    <FaUser className="w-5 h-5" />
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg max-h-60 overflow-auto z-50">
                    <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase border-b">
                        Filtre:
                    </div>

                    {/* TOUS option */}
                    <button
                        onClick={() => handleClick(null)}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedTeam === null ? 'bg-blue-100 font-bold' : ''
                            }`}
                    >
                        TOUS
                    </button>

                    {/* Team options */}
                    {teams.map(team => (
                        <button
                            key={team}
                            onClick={() => handleClick(team)}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedTeam === team ? 'bg-blue-100 font-bold' : ''
                                }`}
                        >
                            {team}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}