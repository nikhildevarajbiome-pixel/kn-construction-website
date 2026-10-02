import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section container-x text-center">
      <h1 className="text-5xl">Page not found</h1>
      <p className="mt-4 text-grey">The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-navy mt-8">Back to home</Link>
    </section>
  );
}
