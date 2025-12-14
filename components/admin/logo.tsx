import { Meow_Script } from "next/font/google"
import Image from "next/image";

const meowScript = Meow_Script({
  subsets: ["latin"],
  weight: "400",
})

export function Logo() {
  return (
    <div className={`${meowScript.className} text-4xl text-[#C5A48E] flex flex-row items-center gap-3`}>
      <Image alt="logo" src="/brands/logo.png" width={40} height={40} />
      SilkyTouch
    </div>
  );
}
