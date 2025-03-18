const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </>
  );
};

export default RootLayout;
