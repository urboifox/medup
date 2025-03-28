import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutUsPage() {
    const t = useTranslations("about");

    const images = [
        "https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1742943679521-f4736500a471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    return (
        <div className="py-20 flex flex-col gap-10">
            <section className="flex flex-col gap-8 container">
                <div className="flex flex-col gap-4 items-center">
                    <h1 className="text-center text-4xl max-w-2xl font-semibold">{t("title")}</h1>
                    <p className="text-dark-300 text-center max-w-3xl">{t("description")}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:grid-cols-4">
                    {images.map((image, index) => (
                        <div key={index} className="h-96 rounded-lg relative overflow-hidden">
                            <Image src={image} fill alt="Image" className="object-cover" />
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 bg-light-200">
                <div className="container">
                    <h2 className="text-2xl font-semibold">{t("ourStory")}</h2>
                </div>
            </section>
        </div>
    );
}
