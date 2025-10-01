import Image from "next/image";
import { Landing } from "@/components/Landing";
export default function Home() {
  return (
    <div className="flex font-suse items-center justify-items-center min-h-screen">
      <Landing/>
    </div>
  );
}
