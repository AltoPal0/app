import { useEffect, useState } from "react";

export default function FinalsView() {
  const [finals, setFinals] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFinals = async () => {
      try {
        const response = await fetch(
          "https://sheets.googleapis.com/v4/spreadsheets/1Ghxf5Adi2np5vN7mimAHIDWBWRpiWV8r28_1v9Kj0YE/values/TEAMS!J68:J85?key=AIzaSyAmMbrDB_sMbKvgQzYRlhfqYzTbhQ1ZMxM"
        );
        const data = await response.json();
        const values = data.values.map((row: string[]) => row[0]);
        setFinals({
          A_sf1: values[0],
          A_sf2: values[3],
          A_final: values[6],
          B_final: values[12],
          C_final: values[17],
        });
      } catch (err) {
        console.error("Failed to fetch final match data:", err);
      }
    };
    fetchFinals();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-2">
      <div className="w-full max-w-md bg-blue-900 rounded-xl shadow p-2">
        {/* <h2 className="text-xl font-bold mb-1 text-blue-700">Tournoi A</h2> */}
        <div className="mb-1">
          <h3 className="font-semibold text-sm text-white text-center mb-1">
            Tournoi A
          </h3>
          <h3 className="font-semibold text-sm text-white text-center mb-1">
            1/2 Finales
          </h3>
          <div className="bg-gray-100 p-2 rounded text-center font-medium mb-1">
            {finals["A_sf1"]}
          </div>
        </div>
        <div className="mb-1">
          <div className="bg-gray-100 p-2 rounded text-center font-medium mb-1">
            {finals["A_sf2"]}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-white text-center mb-1">
            🏆 Finale 🏆
          </h3>
          <div className="bg-gray-100 p-2 rounded text-center font-medium mb-1">
            {finals["A_final"]}
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-green-400 rounded-xl shadow p-2">
        {/* <h2 className="text-xl font-bold mb-1 text-pink-700">Tournoi B</h2> */}
        <h3 className="font-semibold text-sm text-white text-center mb-1">
            Tournoi B
          </h3>
        <h3 className="font-semibold text-sm text-white text-center mb-1">
          🏅 Finale 🏅
        </h3>
        <div className="bg-gray-100 p-2 rounded text-center font-medium mb-1">
          {finals["B_final"]}
        </div>
      </div>

      <div className="w-full max-w-md bg-pink-400 rounded-xl shadow p-2">
        {/* <h2 className="text-xl font-bold mb-1 text-green-700">Tournoi C</h2> */}
        <h3 className="font-semibold text-sm text-white text-center mb-1">
            Tournoi C
          </h3>
        <h3 className="font-semibold text-sm text-white text-center mb-1">
          🎾 Finale 🎾
        </h3>
        <div className="bg-gray-100 p-2 rounded text-center font-medium mb-1">
          {finals["C_final"]}
        </div>
      </div>
    </div>
  );
}
