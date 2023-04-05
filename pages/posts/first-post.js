import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        Back to <Link href="/">main page</Link>
      </h2>
    </>
  );
}
