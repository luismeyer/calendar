import { Skeleton } from "@/components/ui/skeleton";
import { ClerkLoading, SignUp } from "@clerk/nextjs";

import { Illustration } from "../../components/illustrations";

export default function Page() {
  return (
    <div className="relative h-sceen w-screen">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <ClerkLoading>
          <Skeleton className="rounded-xl w-[400px] h-[270px]" />
        </ClerkLoading>

        <SignUp />
      </div>

      <Illustration />
    </div>
  );
}
