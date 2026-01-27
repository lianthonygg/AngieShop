import { Product } from "@/src/features/common/domain/types/common.types";

const SearchCard = ({
  product,
  onToggle,
}: {
  product: Product;
  onToggle: () => void;
}) => {
  return (
    <div
      key={product.id}
      onClick={onToggle}
      className="flex items-center justify-between p-4 rounded-2xl bg-white border shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all"
    >
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {product.name}
        </span>

        <span className="text-xs text-gray-500 mt-1">Disponible</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-gray-900">
          ${product.price}
        </span>
      </div>
    </div>
  );
};

export default SearchCard;
