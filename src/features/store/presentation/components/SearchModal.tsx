"use client";

import { useEffect, useState } from "react";
import { searchProducts } from "../../infrastructure/search-product";
import { ProductResponse } from "../../domain/types/store.types";
import SearchCard from "./SearchCard";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductResponse>({ data: {} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults({ data: {} });
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      const data = await searchProducts(query);
      setResults(data);
      setLoading(false);
    }, 350);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) return null;

  const handleNavigateTo = (url: string) => {
    router.prefetch(url);
    router.push(url);
  };

  return (
    <div className="min-h-60 px-3 md:px-0 fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg max-h-[80vh] rounded-xl p-5 shadow-xl flex flex-col">
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">Buscar producto</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe para buscar..."
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        {loading && <p className="text-sm">Buscando...</p>}

        <div className="flex-1 overflow-y-auto pr-1">
          {Object.entries(results?.data).length === 0 ? (
            <div>No se encontraron productos</div>
          ) : (
            Object.entries(results?.data).map(([categoria, productos]) => (
              <section key={categoria} className="mb-6">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  {categoria}
                </h2>

                <section className="space-y-3">
                  {productos.map((product) => (
                    <SearchCard
                      key={product.id}
                      product={product}
                      onToggle={() =>
                        handleNavigateTo(`/product/${product.slug}`)
                      }
                    />
                  ))}
                </section>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
