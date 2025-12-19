import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
          {/* Fondo oscuro semitransparente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSheet}
          />

          {/* Contenedor de la ventana */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "20%" }} // 100% - 80% = 20%
            exit={{ y: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-xl"
            style={{ height: "80vh" }}
          >
            {/* Barra superior indicadora */}
            <div className="flex justify-center py-3">
              <div className="w-16 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            {/* Contenido personalizable */}
            <div className="p-6 overflow-y-auto h-[calc(100%-3rem)]">
              <h2 className="text-2xl font-bold mb-4">Título</h2>
              <p>{id}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DetailProduct;
