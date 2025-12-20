import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type DetailProductProps = {
  id: string;
  isOpen: boolean;
  toggleSheet: () => void;
};

function DetailProduct({ id, isOpen, toggleSheet }: DetailProductProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop con fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSheet}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }} // Sube completamente pero deja espacio para el handle
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Header con handle centrado y botón de cierre */}
            <div className="relative flex items-center justify-center py-4 border-b border-gray-200">
              {/* Handle indicadora (drag handle) */}
              <div className="absolute inset-x-0 top-4 flex justify-center pointer-events-none">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Botón de cierre en la esquina superior derecha */}
              <button
                onClick={toggleSheet}
                className="absolute top-12 right-4 -translate-y-12 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Contenido scrollable */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <h2 className="text-2xl font-bold mt-6 mb-4">
                Detalle del Producto
              </h2>
              <p className="text-gray-600 mb-4">ID: {id}</p>

              {/* Aquí coloca todo el detalle del producto */}
              {/* Ejemplo: imagen grande, título, precio, descripción, opciones, botón agregar al carrito, etc. */}
              <div className="space-y-6">
                {/* Imagen placeholder */}
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />

                <div>
                  <h3 className="text-xl font-semibold">Nombre del Producto</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    $99.99
                  </p>
                </div>

                <p className="text-gray-700">
                  Descripción detallada del producto. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>

                {/* Más secciones según necesites */}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DetailProduct;
