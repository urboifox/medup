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
            <section className="flex flex-col gap-8 container py-20">
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

            <section className="py-20 lg:py-32 bg-light-200">
                <div className="container flex flex-col gap-8">
                    <h2 className="text-4xl font-semibold">{t("ourStory")}</h2>
                    <div className="relative flex justify-end">
                        <div className="lg:absolute bg-primary-main flex flex-col gap-4 lg:max-w-xl text-white px-6 py-10 rounded-xl left-0 top-1/2 lg:-translate-y-1/2">
                            <h2 className="text-2xl font-semibold">What is Lorem Ipsum?</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book. It has survived not
                                only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s
                                with the release of Letraset sheets containing Lorem It was
                                popularised in the 1960s with the release of Letraset sheets
                                containing Lorem Ipsum passages, and more recently with desktop
                                publishing software It was popularised in the 1960s with the release
                                of Letraset sheets containing Lorem Ipsum passages, and more
                                recently with desktop publishing software
                            </p>
                        </div>
                        <Image
                            src={images[0]}
                            alt="Image"
                            width={600}
                            height={600}
                            className="self-end object-cover w-[70%] aspect-video rounded-xl max-lg:hidden"
                        />
                    </div>
                </div>
            </section>

            <section className="container py-20 lg:py-32 flex-col flex gap-8">
                <div className="flex items-center flex-col lg:flex-row gap-4 justify-between">
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className="text-3xl font-semibold">Work Team</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the{" "}
                        </p>
                    </div>
                    <Image
                        src={images[0]}
                        alt="image"
                        width={500}
                        height={500}
                        className="aspect-video rounded-2xl flex-1 w-full"
                    />
                </div>
                <div className="flex items-center flex-col lg:flex-row gap-4 justify-between">
                    <Image
                        src={images[0]}
                        alt="image"
                        width={500}
                        height={500}
                        className="aspect-video rounded-2xl flex-1 w-full"
                    />
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className="text-3xl font-semibold">Work Team</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the{" "}
                        </p>
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-20 container py-20 lg:py-32">
                <h2 className="text-center max-w-2xl mx-auto text-4xl font-semibold">
                    Experience our proven success in medical education.
                </h2>
                <section className="flex items-stretch justify-around container gap-2 text-primary-main">
                    <div className="flex flex-col items-center gap-2 py-10">
                        <h2 className="text-5xl font-semibold">40K+</h2>
                        <p>Doctors</p>
                    </div>
                    <span className="w-[2px] bg-gradient-to-b from-transparent via-primary-100"></span>
                    <div className="flex flex-col items-center gap-2 py-10">
                        <h2 className="text-5xl font-semibold">40K+</h2>
                        <p>Doctors</p>
                    </div>
                    <span className="w-[2px] bg-gradient-to-b from-transparent via-primary-100"></span>
                    <div className="flex flex-col items-center gap-2 py-10">
                        <h2 className="text-5xl font-semibold">40K+</h2>
                        <p>Doctors</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
