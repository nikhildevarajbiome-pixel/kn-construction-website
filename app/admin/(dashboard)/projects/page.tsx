import { requireAdmin } from "@/lib/auth";
import { images } from "@/config/images";

export const metadata = { title: "Projects" };

export default async function AdminProjects() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-4xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-grey">The project gallery is controlled by <code>config/images.ts</code>. Add a photograph to <code>public/images</code> and update its entry; no component changes are needed. These are placeholders, not completed projects.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.gallery.map((g) => (
          <li key={g.src} className="border border-navy/10 p-4 text-sm"><p className="font-semibold">{g.category}</p><p className="text-grey">{g.src}</p></li>
        ))}
      </ul>
    </div>
  );
}
