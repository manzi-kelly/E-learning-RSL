import Image from "next/image";
import CertificatesPage from "@/src/features/admin/Certificates/CertificatesPage/CertificatesPage";

export const metadata = { title: "Certificates Management · Admin Preview | RSL-ELP" };

export default function Page() {
  return <CertificatesPage logo={<Image src="/logo.jpeg" alt="RSL-ELP platform logo" width={64} height={64} />} />;
}
