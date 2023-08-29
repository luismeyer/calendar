import { SignUp } from "@clerk/nextjs";
import { Illustration } from "../../components/illustrations";

export default function Page() {
  return (
    <div className="relative h-sceen w-screen">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignUp />
      </div>

      <Illustration />
    </div>
  );
}
