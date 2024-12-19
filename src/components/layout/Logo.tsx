import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/home" className="flex items-center">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-2xl font-bold text-white">P</span>
      </div>
      <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        aiCentre
      </span>
    </Link>
  );
}