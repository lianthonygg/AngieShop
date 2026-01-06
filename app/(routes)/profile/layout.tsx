import Footer from "@/src/features/profile/presentation/components/Footer";
import Header from "@/src/features/profile/presentation/components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100" />
      <div className="relative z-1 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
