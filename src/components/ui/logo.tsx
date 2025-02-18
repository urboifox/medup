import images from "@/lib/images";
import Image from "next/image";

export default function Logo() {
    return <Image src={images.logo} alt="Logo" width={150} height={50} />;
}
// {/* <span className="text-2xl font-semibold text-[#18191c]"> */}
// {/*     Med<span className="text-primary-main">Up</span> */}
// {/* </span> */}
