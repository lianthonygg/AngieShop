import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad | Angie Shop",
  description: "Política de privacidad de Angie Shop",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Política de Privacidad
      </h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p className="text-sm text-gray-500 text-right">Última actualización: 29 de diciembre de 2025</p>

        <p>
          En <strong>Angie Shop</strong> nos tomamos muy en serio tu privacidad. Esta Política de Privacidad explica qué información recopilamos, cómo la usamos y tus derechos.
        </p>

        <h2>1. Información que recopilamos</h2>
        <ul>
          <li><strong>Información de cuenta:</strong> Cuando inicias sesión con Google, recibimos tu nombre, correo electrónico y foto de perfil.</li>
          <li><strong>Datos del carrito:</strong> Productos que agregas, cantidades y fecha de navegación (solo mientras estás logueado).</li>
          <li><strong>Datos de contacto:</strong> Cuando completas la compra por WhatsApp, el mensaje incluye tu pedido (productos y cantidades).</li>
        </ul>

        <h2>2. Cómo usamos tu información</h2>
        <p>
          Solo usamos tus datos para:
          <ul>
            <li>Permitirte iniciar sesión y guardar tu carrito.</li>
            <li>Preparar y enviarte tu pedido por WhatsApp.</li>
            <li>Mejorar la experiencia en la tienda.</li>
          </ul>
        </p>

        <h2>3. No compartimos tus datos</h2>
        <p>
          Tus datos personales <strong>no se venden ni comparten</strong> con terceros, salvo:
          <ul>
            <li>Con Google para el inicio de sesión (según su propia política).</li>
            <li>Con el vendedor vía WhatsApp para procesar tu pedido.</li>
          </ul>
        </p>

        <h2>4. Almacenamiento y seguridad</h2>
        <p>
          Tus datos se almacenan de forma segura en Supabase (base de datos con encriptación). Solo el administrador de la tienda tiene acceso.
        </p>

        <h2>5. Tus derechos</h2>
        <p>
          Puedes solicitar la eliminación de tus datos enviando un mensaje a nuestro WhatsApp o por correo a [tu-email@ejemplo.com].
        </p>

        <h2>6. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política. Te avisaremos de cambios importantes.
        </p>

        <h2>7. Contacto</h2>
        <p>
          Si tienes dudas, contáctanos por email [angieshopcuba@gmail.com].
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