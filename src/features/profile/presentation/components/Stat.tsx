import { ReactNode } from "react";

interface StatProps {
  icon: ReactNode;
  className: string;
  label: string;
  value: string;
}

const Stat = ({ icon: Icon, className, label, value }: StatProps) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${className}`}
    >
      <div className="shrink-0 py-3 px-2 bg-indigo-100 rounded-2xl">{Icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>

        <p className="text-sm font-medium text-gray-900 truncate" title={value}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default Stat;
