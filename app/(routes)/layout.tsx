import BottomBar from "@/src/features/common/presentation/components/BottomBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <BottomBar />
    </div>
  );
}