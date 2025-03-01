import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="">{children}</main>
    </div>
  );
}
