import { Frown } from "lucide-react";
import { ReactNode } from "react";

interface ErrorProps {
  header: ReactNode;
}

const ErrorSection = ({ header }: ErrorProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-t from-[var(--angie-soft-start)] to-[var(--angie-white)]">
      {header}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
          <Frown className="w-8 h-8 text-pink-500" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Algo salió mal
        </h2>

        <p className="text-gray-500 text-sm">Inténtalo de nuevo más tarde.</p>
      </section>
    </div>
  );
};

export default ErrorSection;
