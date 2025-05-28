import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container max-w-4xl px-4 pt-8 mx-auto">{children}</div>
  );
}
