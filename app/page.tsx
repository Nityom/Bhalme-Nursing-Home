"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Root / redirects directly to OPD dashboard */
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/opd");
  }, [router]);
  return null;
}
