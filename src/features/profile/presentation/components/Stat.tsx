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
      className={`flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r ${className}`}
    >
      <div className="py-3 px-2 bg-indigo-100 rounded-2xl">{Icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default Stat;
