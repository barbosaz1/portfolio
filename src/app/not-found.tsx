import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="nf">
      <p className="lbl muted">Page not found</p>
      <p className="nf__code" aria-hidden="true">
        404
      </p>
      <div>
        <Link className="pill pill--solid" href="/">
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
