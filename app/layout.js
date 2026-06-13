export const metadata = {
  title:       'Carraway Capital',
  description: 'Strategic business capital, brokered with intent.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
