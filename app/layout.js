import "./globals.css";
export const metadata = {
  title: "Task Tracker App",
  description: "Created by George",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-center items-center mt-10">
          {children}
        </div>
      </body>
    </html>
  );
}
