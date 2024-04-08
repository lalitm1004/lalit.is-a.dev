import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memento Mori",
  description: "Remember you must die",
  authors: [{name: "Lalit M", url: "https://github.com/lalitm1004"}]
};

export default function MoriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}