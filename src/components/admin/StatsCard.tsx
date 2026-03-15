type StatsCardProps = {
  title: string;
  value: number;
  icon?: never;
  colorIndex: number;
};

const colorClasses = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600", 
  "from-amber-400 to-amber-500",
  "from-violet-500 to-violet-600",
  "from-pink-500 to-pink-600",
  "from-cyan-500 to-cyan-600",
  "from-rose-500 to-rose-600",
  "from-indigo-500 to-indigo-600",
  "from-orange-500 to-orange-600",
  "from-teal-500 to-teal-600",
];

const textColorClasses = [
  "text-blue-100",
  "text-emerald-100",
  "text-amber-100",
  "text-violet-100",
  "text-pink-100",
  "text-cyan-100",
  "text-rose-100",
  "text-indigo-100",
  "text-orange-100",
  "text-teal-100",
];

export function StatsCard({ title, value, icon: Icon, colorIndex }: StatsCardProps) {
  const colorClass = colorClasses[colorIndex % colorClasses.length];
  const textColor = textColorClasses[colorIndex % textColorClasses.length];

  return (
    <div className={`bg-gradient-to-br ${colorClass} text-white border-0 rounded-xl`}>
      <div className="p-4">
        <p className={`text-xs font-semibold uppercase ${textColor}`}>{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}
