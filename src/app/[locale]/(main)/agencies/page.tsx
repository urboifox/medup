import Image from "next/image";
import { CiMail } from "react-icons/ci";

export default function AgenciesPage() {
    return (
        <div className="container flex flex-col gap-10 py-20">
            <h1 className="text-4xl text-center font-semibold">Hire An Agency</h1>

            <section className="flex flex-col gap-10 p-5 rounded-2xl shadow-lg">
                <div className="flex flex-col gap-4" dir="rtl">
                    <h2 className="text-2xl font-semibold">
                        خدمة : خبير يسافر اليك دوليا او محليا
                    </h2>
                    <ul className="list-disc list-inside text-gray-500">
                        <li>اختار المجال أو المهارة التي تريد ان تتعلمها سواء كنت فرد او مجموعة</li>
                        <li>اختار او دختار لك الخبير المناسب </li>
                        <li>
                            نحن ننسق لك سفر الخبير لك أو للمجموعة ونتسق الاقامة عند وصول الخبير اليك
                            كل ماعليك تجهيز ادواتك لبدأ التعلم .
                        </li>
                        <li>سيصل الخبير الي موقعك لتقديم الاستشاره او التدريب المطلوب</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Expert service at Your Doorstep</h2>
                    <ul className="list-disc list-inside text-gray-500">
                        <li>Select the field or skill you need.</li>
                        <li>We find the right expert for you.</li>
                        <li>We coordinate travel and accommodation (if needed).</li>
                        <li>
                            The expert arrives at your location to provide the required consultation
                            or training.
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-2">
                    <CiMail />
                    <a className="underline text-primary-main" href="mailto:iuhtrn@gmail.com">
                        iuhtrn@gmail.com
                    </a>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="flex flex-col gap-6 bg-white rounded-2xl p-6 shadow-lg">
                    <div className="h-48 w-full rounded-2xl overflow-hidden relative p-6 flex items-end">
                        <span className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-[1px] z-10" />
                        <Image
                            fill
                            src="/images/agency.png"
                            alt="Agency"
                            className="object-cover"
                        />
                        <h3 className="relative z-20 font-semibold capitalize text-white text-3xl">
                            Apply as a Agency
                        </h3>
                    </div>
                    <div className="flex flex-col gap-2" dir="rtl">
                        <h3 className="font-medium">
                            هل تبحث عن الكفاءات الطبية التي ستحدث فارقا في مؤسستك؟
                        </h3>
                        <p className="text-dark-300">
                            نحن نمتلك اكثر من 10000 سيرة ذاتية نحن نوفر لك أفضل المواهب في جميع
                            التخصصات الطبية، من الأطباء والممرضين والصيادلة وطب الاسنان إلى
                            الكيميائين و الفنيين في الاشاعة والمعامل والعلاج الطبيعي
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-medium">
                            Are you seeking highly skilled medical professionals to enhance your
                            organization?
                        </h3>
                        <p className="text-dark-300">
                            We offer a vast pool of over 10,000 CVs, featuring top talents in
                            diverse medical fields such as doctors, nurses, chemists, and
                            technicians in radiology, laboratories, and physical therapy. Our
                            expertise ensures you'll find the perfect candidates for your needs..
                        </p>
                    </div>
                    <p className="font-semibold">Just contact us</p>
                    <div className="flex items-center gap-2">
                        <CiMail />
                        <a className="underline text-primary-main" href="mailto:iuhtrn@gmail.com">
                            iuhtrn@gmail.com
                        </a>
                    </div>
                </article>
                <article className="flex flex-col gap-6 bg-white rounded-2xl p-6 shadow-lg">
                    <div className="h-48 w-full rounded-2xl overflow-hidden relative p-6 flex items-end">
                        <span className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-[1px] z-10" />
                        <Image
                            fill
                            src="/images/doctor.png"
                            alt="Doctor"
                            className="object-cover"
                        />
                        <h3 className="relative z-20 font-semibold capitalize text-white text-3xl">
                            Apply as a Doctor
                        </h3>
                    </div>
                    <div className="flex flex-col gap-2" dir="rtl">
                        <h3 className="font-medium">اذا كنت فرد تبحث عن وظيفه؟</h3>
                        <p className="text-dark-300">
                            نحن نوفر لك أفضل القرص في جميع التخصصات الطبية، سواء كنت الأطباء
                            والممرضين والصيادلة وطب الاسنان إلى الكيميائين والفنيين في الاشاعة
                            والمعامل والعلاج الطبيعي .
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-medium">
                            Are you looking for a unique career opportunity in the medical field?
                        </h3>
                        <p className="text-dark-300">
                            we provide you with the best career opportunities in all medical specialties, whether
                            you are doctors, nurses, pharmacists, and dentists, to chemists and
                            technicians in radiology, laboratories, and physical therapy.
                        </p>
                    </div>
                    <p className="font-semibold">Just contact us</p>
                    <div className="flex items-center gap-2">
                        <CiMail />
                        <a className="underline text-primary-main" href="mailto:iuhtrn@gmail.com">
                            iuhtrn@gmail.com
                        </a>
                    </div>
                </article>
            </section>
        </div>
    );
}
