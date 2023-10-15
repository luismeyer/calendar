import Image from "next/image";

export function Illustration() {
  const number = Math.floor(Math.random() * 13) + 1;

  return (
    <Image
      width={1000}
      height={1000}
      alt="Illustration"
      className="max-w-none h-screen w-screen"
      src={`/illustrations/${number}.svg`}
    />
  );
}
