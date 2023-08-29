export function Illustration() {
  const number = Math.floor(Math.random() * 13) + 1;

  return (
    <img
      className="max-w-none h-screen w-screen"
      src={`/illustrations/${number}.svg`}
    />
  );
}
