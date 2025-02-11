import { useTranslations } from "next-intl";
import Button from "../ui/button";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import images from "@/lib/images";

export default function ContactSection() {
    const t = useTranslations();

    return (
        <section className="py-20">
            <div className="flex flex-col gap-10 container items-center">
                <div className="flex flex-col gap-8 max-w-3xl flex-1 text-center">
                    <h2 className="text-4xl font-semibold foreground-200">
                        {t("home.contact.title")}
                    </h2>
                    <p className="text-foreground-50 font-medium">
                        {t("home.contact.description")}
                    </p>
                </div>

                <div className="relative py-20 rounded-lg overflow-hidden w-full">
                    <Image
                        src={images.contactSection}
                        fill
                        alt="Contact Section"
                        className="object-cover z-10"
                        quality={100}
                    />
                    <div className="absolute inset-0 w-full h-full bg-black/50 z-10" />

                    <div className="flex gap-20 flex-col items-center justify-center z-20 relative h-full">
                        <div className="flex items-center gap-10 justify-around flex-wrap text-white text-2xl text-center font-semibold w-full">
                            <div className="flex flex-col gap-4 items-center">
                                <svg
                                    width="51"
                                    height="50"
                                    viewBox="0 0 51 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M23.2166 1.71875C21.6345 2.00195 19.8962 2.71484 18.4705 3.66211C17.5232 4.29688 15.7947 6.00586 15.1795 6.93359C14.1736 8.4375 13.5193 10.0098 13.1873 11.7383C12.9041 13.2031 12.9334 15.3516 13.2556 16.8652L13.324 17.1875H11.9568C10.9998 17.1875 10.4334 17.2363 10.0623 17.3438C8.62672 17.7637 7.44508 18.916 6.9568 20.3809C6.75172 20.9766 6.75172 21.1328 6.75172 30.2148V39.4336L6.41969 39.6387C5.99 39.9023 5.59937 40.4297 5.37476 41.0254C5.09156 41.7578 5.11109 44.3848 5.3943 45.2441C5.88258 46.709 7.06422 47.8613 8.49976 48.2812C8.97828 48.418 10.7556 48.4375 25.5212 48.4375C41.9568 48.4375 42.0154 48.4375 42.6209 48.2324C44.0857 47.7441 45.238 46.5625 45.658 45.127C45.8923 44.3164 45.8826 41.6699 45.6287 41.0254C45.4041 40.4297 45.0134 39.9023 44.5837 39.6387L44.2517 39.4336V30.2246C44.2517 21.4551 44.242 20.9863 44.0662 20.4199C43.617 18.9844 42.3865 17.7637 40.9412 17.3438C40.5701 17.2363 40.0037 17.1875 39.0466 17.1875H37.6892L37.7478 16.8652C38.0505 15.4297 38.0896 13.3594 37.8455 11.9043C37.406 9.31641 36.2341 7.09961 34.3005 5.17578C32.3962 3.28125 30.2478 2.1582 27.6892 1.70898C26.6248 1.52344 24.2615 1.5332 23.2166 1.71875ZM27.7478 5.03906C31.5857 6.00586 34.4666 9.38477 34.7595 13.2715C34.9939 16.2305 34.0076 18.8574 31.9373 20.8594C30.7459 21.9922 29.5935 22.6758 28.0603 23.1445C27.699 23.2617 27.3377 23.3984 27.2595 23.4668C27.1716 23.5352 26.7615 24.0039 26.3416 24.5117C25.9216 25.0195 25.5408 25.4395 25.5017 25.4395C25.4627 25.4395 25.199 25.1562 24.9158 24.8047C23.8806 23.5449 23.656 23.3496 22.9431 23.1348C20.4431 22.3926 18.3337 20.625 17.1619 18.291C15.9314 15.8301 15.8923 12.7051 17.0447 10.2051C18.9295 6.12305 23.4314 3.95508 27.7478 5.03906ZM15.0232 21.0645C16.4978 23.3203 18.6755 25.0586 21.1658 25.9668L21.8689 26.2207L23.1482 27.8125C23.8611 28.6816 24.5642 29.4629 24.7205 29.541C25.0818 29.7266 25.9216 29.7266 26.283 29.541C26.4392 29.4629 27.1423 28.6816 27.8552 27.8125L29.1345 26.2207L29.8377 25.9668C32.3279 25.0586 34.5056 23.3203 35.9802 21.0645L36.488 20.293L38.197 20.332C39.6912 20.3613 39.9451 20.3809 40.238 20.5566C40.6677 20.8105 40.9216 21.1621 41.0291 21.6406C41.0877 21.8555 41.1267 25.7812 41.1267 30.5371V39.0625H25.5017H9.86695L9.89625 30.293C9.92555 21.7383 9.92555 21.5234 10.1209 21.2012C10.365 20.791 10.7263 20.5078 11.156 20.4102C11.3416 20.3711 12.1716 20.332 13.0115 20.3223L14.5349 20.3125L15.0232 21.0645ZM20.8142 42.4512C20.8142 42.8223 21.1365 43.3203 21.5173 43.5547C21.8201 43.7402 22.0154 43.75 25.5017 43.75C28.988 43.75 29.1834 43.7402 29.4861 43.5547C29.867 43.3203 30.1892 42.8223 30.1892 42.4512V42.1875H36.449H42.7185L42.6697 43.1543C42.6013 44.4824 42.2791 45.0098 41.3611 45.2148C40.8533 45.332 10.1502 45.332 9.64234 45.2148C8.72437 45.0098 8.40211 44.4824 8.33375 43.1543L8.28492 42.1875H14.5545H20.8142V42.4512Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M19.9531 12.6953C19.4844 12.9883 19.25 13.4277 19.25 14.0625C19.25 15.0391 19.8359 15.625 20.8125 15.625C21.7891 15.625 22.375 15.0391 22.375 14.0625C22.375 13.0859 21.7891 12.5 20.8125 12.5C20.4512 12.5 20.168 12.5586 19.9531 12.6953Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M24.6406 12.6953C24.1719 12.9883 23.9375 13.4277 23.9375 14.0625C23.9375 15.0391 24.5234 15.625 25.5 15.625C26.4766 15.625 27.0625 15.0391 27.0625 14.0625C27.0625 13.0859 26.4766 12.5 25.5 12.5C25.1387 12.5 24.8555 12.5586 24.6406 12.6953Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M29.3281 12.6953C28.8594 12.9883 28.625 13.4277 28.625 14.0625C28.625 15.0391 29.2109 15.625 30.1875 15.625C31.1641 15.625 31.75 15.0391 31.75 14.0625C31.75 13.0859 31.1641 12.5 30.1875 12.5C29.8262 12.5 29.543 12.5586 29.3281 12.6953Z"
                                        fill="white"
                                    />
                                </svg>
                                <p>Create an online consultation</p>
                                <p>ابداء استشاره اونلاين</p>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <svg
                                    width="61"
                                    height="60"
                                    viewBox="0 0 61 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M40.3438 3.7629C37.3204 3.97384 34.3321 5.00509 31.672 6.77462C30.254 7.71212 27.9337 10.0559 26.9493 11.5442C25.2267 14.1574 24.1954 17.1457 23.9845 20.1223L23.9024 21.1653L22.9532 20.9543C20.8907 20.4973 17.797 20.4856 15.6759 20.9192C12.2423 21.6223 9.20712 23.2629 6.64071 25.8293C4.08602 28.384 2.56259 31.1731 1.76571 34.7004C1.53134 35.7668 1.49618 36.2238 1.49618 38.4387C1.49618 40.4543 1.54306 41.1574 1.71884 41.9543C2.21103 44.2395 3.08993 46.3723 4.30868 48.2356C4.67196 48.7981 4.94149 49.3137 4.91806 49.384C4.8829 49.4543 4.08602 50.7199 3.14852 52.2082C1.40243 54.9621 1.25009 55.3254 1.55478 55.8996C1.84774 56.4387 2.10556 56.4153 6.76962 55.3723L11.1759 54.3996L12.1954 54.8567C15.6173 56.3567 19.9063 56.7082 23.6095 55.7707C26.9376 54.9387 29.7618 53.2746 32.211 50.7082C35.0001 47.7903 36.7931 43.8059 37.0274 39.9856C37.086 39.0481 37.1329 38.7903 37.2501 38.8371C38.586 39.3528 43.2618 39.5051 45.1485 39.1067C46.5782 38.802 48.0079 38.3567 48.9806 37.9113L49.8243 37.5246L54.0196 38.4504C58.086 39.3528 58.7423 39.4582 59.1524 39.3059C59.422 39.2004 59.7149 38.5793 59.6329 38.2512C59.586 38.0988 58.8243 36.8215 57.9337 35.4035C57.0313 33.9856 56.2345 32.7199 56.1642 32.591C56.0587 32.3918 56.1056 32.2512 56.4337 31.7942C58.7071 28.5949 59.9142 24.1301 59.5743 20.1809C59.1759 15.6809 57.4649 11.9777 54.3243 8.87228C50.586 5.16916 45.7227 3.3879 40.3438 3.7629ZM43.4727 5.80196C43.9415 5.84884 44.8556 6.00118 45.5001 6.16525C48.8282 6.96212 51.8985 8.90744 54.0079 11.5324C55.5548 13.4543 56.586 15.5168 57.1837 17.8957C57.4884 19.0676 57.5118 19.3371 57.5118 21.5637C57.5118 23.8254 57.4884 24.0363 57.1837 25.2551C56.5977 27.5051 55.7892 29.2278 54.4884 30.9738C53.9962 31.6301 53.797 32.0168 53.7852 32.2863C53.7735 32.5793 54.0899 33.1535 55.086 34.7473C55.8126 35.8957 56.3868 36.8449 56.3751 36.8684C56.3517 36.8801 54.922 36.5871 53.1876 36.2004C51.4532 35.8254 49.8712 35.509 49.6602 35.509C49.4493 35.509 48.8399 35.7199 48.3009 35.966C45.2306 37.4074 41.5392 37.759 38.0587 36.9621C37.6134 36.8567 37.1915 36.7278 37.1446 36.6809C37.086 36.634 36.9454 36.0129 36.8282 35.3215C35.8907 29.8488 32.2931 25.0207 27.254 22.4895L25.8243 21.7629L25.8829 20.8723C26.1642 16.7004 27.7227 13.1965 30.5587 10.3723C33.2306 7.70041 36.6056 6.10665 40.3438 5.75509C41.3165 5.66134 41.7501 5.66134 43.4727 5.80196ZM20.7735 22.6653C24.6759 22.9231 28.9181 25.1848 31.5079 28.4074C33.0548 30.3293 34.086 32.3918 34.6837 34.7707C34.9884 35.9426 35.0118 36.2004 35.0118 38.4387C35.0118 40.5598 34.9767 40.9699 34.7306 41.9543C33.1368 48.4231 28.0626 53.1106 21.5352 54.1418C20.3751 54.3293 17.8438 54.2942 16.6368 54.0832C15.3712 53.8606 13.6485 53.3215 12.5352 52.7824C12.0548 52.5598 11.5157 52.384 11.2813 52.384C11.0587 52.384 9.47665 52.7004 7.76571 53.0754C6.05478 53.4504 4.64852 53.7551 4.62509 53.7317C4.60165 53.7199 5.18759 52.759 5.90243 51.6106C6.86337 50.1106 7.22665 49.4309 7.22665 49.1731C7.22665 48.9153 7.00399 48.5168 6.50009 47.8137C5.04696 45.8098 3.99227 43.3137 3.59384 40.9113C3.31259 39.1535 3.40634 36.3645 3.82821 34.7121C5.29306 28.8996 9.79306 24.4113 15.5704 23.0168C16.7306 22.7356 18.8165 22.5012 19.4845 22.5715C19.6485 22.5949 20.2227 22.6301 20.7735 22.6653Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M34.25 15.9375V16.875H41.75H49.25V15.9375V15H41.75H34.25V15.9375Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M34.25 21.5625V22.5H41.75H49.25V21.5625V20.625H41.75H34.25V21.5625Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M38 27.1875V28.125H43.625H49.25V27.1875V26.25H43.625H38V27.1875Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M17.7617 29.2266C16.0977 29.7656 14.7383 31.3945 14.5977 33.0352L14.5273 33.75H15.5469C16.543 33.75 16.5547 33.75 16.5547 33.457C16.5547 33.0117 16.8711 32.332 17.293 31.8867C18.3477 30.7734 20.1523 30.7734 21.207 31.8867C22.2383 32.9766 22.1914 34.6758 21.1133 35.707C20.6445 36.1523 20.1055 36.3867 19.332 36.4922C18.3125 36.6445 18.3125 36.6562 18.3125 39.6094V42.1875H19.25H20.1875L20.2109 40.3008L20.2461 38.4023L20.7383 38.2617C21.8867 37.9219 22.9648 36.9609 23.5625 35.7422C23.8555 35.1562 23.8789 34.9805 23.8789 33.75C23.8789 32.4961 23.8555 32.3555 23.5391 31.6992C23.0937 30.7969 22.2031 29.9062 21.3008 29.4727C20.6914 29.168 20.457 29.1211 19.4258 29.0977C18.6758 29.0742 18.0781 29.1211 17.7617 29.2266Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M18.2422 44.4609C17.8906 44.8125 17.8438 44.9297 17.8438 45.4688C17.8438 46.0078 17.8906 46.125 18.2422 46.4766C18.5938 46.8281 18.7109 46.875 19.25 46.875C19.7891 46.875 19.9062 46.8281 20.2578 46.4766C20.6094 46.125 20.6562 46.0078 20.6562 45.4688C20.6562 44.9297 20.6094 44.8125 20.2578 44.4609C19.9062 44.1094 19.7891 44.0625 19.25 44.0625C18.7109 44.0625 18.5938 44.1094 18.2422 44.4609Z"
                                        fill="white"
                                    />
                                </svg>
                                <p>Consult an expert</p>
                                <p>استشير خبير</p>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <svg
                                    width="51"
                                    height="50"
                                    viewBox="0 0 51 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_1876_34123)">
                                        <path
                                            d="M22.668 0.105755C17.0919 0.769817 12.1114 3.1331 8.12703 6.98075C4.16219 10.8186 1.74031 15.428 0.763752 20.9944C0.470783 22.6741 0.451252 27.0979 0.724689 28.7581C1.12508 31.1702 1.75985 33.2893 2.69735 35.3792C3.23445 36.5706 4.19149 38.2796 4.73836 39.0315L5.05086 39.4612L4.19149 42.6546C3.72274 44.4124 3.33211 46.014 3.33211 46.219C3.33211 46.7366 3.75203 47.1663 4.25985 47.1663C4.45516 47.1663 6.00789 46.7952 7.71688 46.3362C9.42586 45.8772 10.8809 45.5061 10.9493 45.5061C11.0177 45.5061 11.4766 45.7698 11.9747 46.0823C14.797 47.9183 17.8634 49.0901 21.4473 49.7151C22.9415 49.9788 26.4376 50.0765 28.0587 49.9104C33.6544 49.3245 38.7911 46.9417 42.8048 43.0745C45.422 40.555 47.3263 37.7815 48.6446 34.5686C49.543 32.3714 50.1388 30.0276 50.3927 27.7132C50.5489 26.3069 50.5294 23.2503 50.3536 21.9026C49.8555 18.1624 48.7032 14.8811 46.7696 11.7659C46.047 10.6038 45.8223 10.3987 45.2657 10.3987C44.7188 10.3987 44.3575 10.7308 44.2891 11.2874C44.2403 11.6292 44.3087 11.7757 44.8946 12.6936C46.545 15.2913 47.668 18.2503 48.2149 21.385C48.4591 22.8304 48.5079 26.219 48.3028 27.8401C47.1212 37.1956 40.3341 44.8811 31.213 47.2151C29.045 47.7718 27.9708 47.8987 25.4513 47.8987C22.6973 47.889 21.3106 47.7034 18.9376 47.0101C16.8575 46.4046 14.504 45.2913 12.6192 44.0218C11.7403 43.4261 11.5255 43.3284 11.1934 43.3382C10.9786 43.3479 9.67977 43.6604 8.31258 44.0315C6.94539 44.4026 5.81258 44.7054 5.80281 44.6956C5.80281 44.6858 6.09578 43.553 6.46688 42.1858C6.83797 40.8186 7.15047 39.5198 7.16024 39.305C7.17 38.9729 7.06258 38.7581 6.47664 37.8792C4.55281 35.0179 3.34188 31.9026 2.77547 28.3675C2.53133 26.8343 2.53133 23.2308 2.78524 21.678C4.29891 12.0882 11.1739 4.6956 20.5684 2.54716C23.5665 1.86357 27.2872 1.86357 30.4805 2.54716C32.7559 3.03544 35.5587 4.19755 37.6583 5.52568C38.547 6.08232 38.8009 6.1995 39.1427 6.1995C39.7286 6.1995 40.0997 5.82841 40.0997 5.22294C40.0997 4.64677 39.8555 4.40263 38.293 3.4749C35.6075 1.87333 32.7755 0.838177 29.5626 0.27177C28.6153 0.11552 27.8829 0.0666924 25.8907 0.0373955C24.5235 0.0276299 23.0684 0.0569267 22.668 0.105755Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M41.7902 7.27457C41.2726 7.79215 41.4093 8.67105 42.0441 8.93473C42.7667 9.23746 43.4698 8.79801 43.4698 8.03629C43.4698 7.68473 43.4112 7.54801 43.1866 7.31363C42.796 6.93277 42.1515 6.91324 41.7902 7.27457Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M24.3775 8.94447C22.4732 9.20814 21.106 9.71596 19.729 10.6535C18.1079 11.7472 16.6431 13.671 16.0376 15.4972C15.6177 16.757 15.8716 17.9191 16.7505 18.8078C17.4439 19.4913 18.1568 19.7648 19.1528 19.7062C20.4712 19.6281 21.2525 19.0421 21.9263 17.6261C22.1607 17.1281 22.4927 16.5714 22.6587 16.3761C23.3716 15.5656 24.6607 15.0578 25.6568 15.1847C26.8091 15.3214 28.0103 16.2394 28.5669 17.382C28.8306 17.9288 28.8696 18.1242 28.8696 18.798C28.8696 20.2238 28.2349 21.1613 26.6236 22.1183C23.8599 23.7492 22.2876 26.3273 22.2486 29.296C22.229 30.214 22.2583 30.38 22.4829 30.8683C22.8052 31.5617 23.3325 32.089 24.0259 32.4113C24.8169 32.7824 25.9107 32.7726 26.6919 32.3917C27.7075 31.8937 28.2837 31.0246 28.4302 29.7746C28.5864 28.4562 28.8599 28.0753 30.2954 27.2355C31.9654 26.2687 33.4986 24.5597 34.2896 22.8019C35.0025 21.2394 35.315 19.1007 35.0806 17.4699C34.7583 15.3117 33.8892 13.5734 32.2974 11.9328C30.4907 10.0675 28.2349 9.04213 25.7153 8.94447C25.1392 8.92494 24.5435 8.92494 24.3775 8.94447ZM27.2388 11.2296C28.8892 11.6886 30.4224 12.7531 31.4966 14.1593C32.1118 14.9601 32.395 15.507 32.7466 16.5226C33.0298 17.3624 33.0591 17.5285 33.0591 18.7003C33.0591 19.7257 33.02 20.1163 32.8443 20.7316C32.2876 22.6847 30.9204 24.4816 29.3091 25.3898C27.3853 26.4835 26.5845 27.548 26.4185 29.2667C26.3501 30.0285 26.2134 30.3019 25.7837 30.5265C25.3736 30.7316 24.9243 30.6339 24.563 30.2628C24.3091 29.9894 24.2798 29.9113 24.2896 29.3156C24.3384 27.1183 25.5982 25.1456 27.7759 23.8566C28.3423 23.5148 29.0064 23.046 29.2505 22.8117C31.8384 20.2921 31.4185 16.1027 28.3814 14.0714C26.1255 12.5675 23.2739 12.8507 21.3403 14.7843C20.7837 15.341 20.5591 15.6632 20.188 16.4249C19.8462 17.1378 19.6607 17.421 19.4458 17.5285C19.0064 17.7531 18.6157 17.714 18.2544 17.3917C17.7954 16.9816 17.8052 16.4249 18.3032 15.4288C19.4849 13.046 21.6528 11.4445 24.231 11.0343C25.0122 10.9074 26.4185 10.9953 27.2388 11.2296Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M24.3301 35.0089C23.5879 35.2531 22.9629 35.8097 22.5723 36.5617C22.2695 37.1574 22.2305 37.3136 22.2305 37.9777C22.2402 39.2472 22.8848 40.2628 24.0371 40.8097C24.8281 41.1808 25.9219 41.171 26.6934 40.7902C27.3867 40.4484 27.9629 39.8038 28.2461 39.0714C28.5195 38.3488 28.4707 37.2746 28.1484 36.6203C27.8457 36.0246 27.3086 35.4777 26.7227 35.1749C26.1172 34.8722 25.0039 34.7843 24.3301 35.0089ZM26.1172 37.3038C26.9961 38.2902 25.5215 39.6574 24.5937 38.6906C24.2422 38.3195 24.1836 37.9777 24.3789 37.548C24.7207 36.8449 25.5898 36.7179 26.1172 37.3038Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1876_34123">
                                            <rect
                                                width="50"
                                                height="50"
                                                fill="white"
                                                transform="translate(0.5)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Ask the expert and learn</p>
                                <p>اسأل الخبير و تعلم</p>
                            </div>
                        </div>
                        <Link href="/experts">
                            <Button>{t("common.consultNow")}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
