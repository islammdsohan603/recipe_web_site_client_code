import { Users, BookOpen, Crown, AlertTriangle } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
  <div
    className={`p-6 rounded-2xl bg-[#1a0f0c] border border-orange-900/30 flex items-center gap-4`}
  >
    <div className={`p-4 rounded-xl ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <p className="text-sm text-orange-200/60">{title}</p>
    </div>
  </div>
);

export default StatsCard;
