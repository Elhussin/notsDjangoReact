import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to Dark Mode in Next.js</h1>
      <ThemeToggle />
    </div>
  );
}
