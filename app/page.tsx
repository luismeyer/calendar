import { UserButton } from "@clerk/nextjs";
import { Day } from "./components/day";

export default function Home() {
  return (
    <main className="grid grid-cols-5 gap-4 w-screen h-screen p-4">
      <Day index={0} />

      <Day index={1} />

      <Day index={2} />

      <Day index={3} />

      <Day index={4} />
    </main>
  );
}
