import Link from "next/link";

export const metadata = {
  title: "Términos y Condiciones - Angie Shop",
  description: "Términos de uso de Angie Shop",
};

export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Términos y Condiciones de Uso
      </h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p className="text-sm text-gray-500 text-right">Última actualización: 29 de diciembre de 2025</p>

        <p>
          Bienvenido a <strong>Angie Shop</strong>. Al usar esta tienda aceptas estos términos.
        </p>

        <h2>1. Uso del sitio</h2>
        <p>
          Puedes navegar, agregar productos al carrito y enviar pedidos por WhatsApp. No está permitido usar bots ni copiar contenido sin permiso.
        </p>

        <h2>2. Proceso de compra</h2>
        <p>
          Los pedidos se completan por WhatsApp. La tienda solo facilita el contacto con el vendedor. El contrato de venta se realiza directamente entre tú y el vendedor.
        </p>

        <h2>3. Precios y disponibilidad</h2>
        <p>
          Los precios mostrados son referenciales y pueden variar. La disponibilidad no está garantizada hasta confirmar por WhatsApp.
        </p>

        <h2>4. Responsabilidad</h2>
        <p>
          Angie Shop no se responsabiliza por retrasos, errores en el envío o calidad del producto. Esa responsabilidad es del vendedor.
        </p>

        <h2>5. Propiedad intelectual</h2>
        <p>
          Todas las imágenes y textos son propiedad de Angie Shop o sus proveedores.
        </p>

        <h2>6. Cambios en los términos</h2>
        <p>
          Podemos modificar estos términos. El uso continuo implica aceptación.
        </p>

        <h2>7. Contacto</h2>
        <p>
          Para cualquier consulta: Email [angieshopcuba@gmail.com].
        </p>

        <p className="text-center mt-12">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Volver a la tienda
          </Link>
        </p>
      </div>
    </main>
  );
}