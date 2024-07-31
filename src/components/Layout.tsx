export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen min-w-full pt-6  bg-slate-900 ">
      <main>{children}</main>
    </div>
  );
}
