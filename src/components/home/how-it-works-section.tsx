import { useTranslations } from "next-intl";

export default function HowItWorksSection() {
    const t = useTranslations();

    const cards = [
        {
            title: t("home.how.firstTitle"),
            description: t("home.how.firstDescription"),
            icon: (
                <svg
                    width="76"
                    height="75"
                    viewBox="0 0 76 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M39.5625 14.0625C39.5625 15.7812 38.9505 17.2526 37.7266 18.4766C36.5026 19.7005 35.0312 20.3125 33.3125 20.3125C32.6354 20.3125 32.0104 20.2214 31.4375 20.0391C30.8646 19.8568 30.2917 19.5573 29.7188 19.1406C28.4688 19.5573 27.4661 20.3125 26.7109 21.4062C25.9557 22.5 25.5781 23.6979 25.5781 25H66.125L63 46.875H47.6875V40.625H57.6094C57.8698 39.0625 58.0911 37.5 58.2734 35.9375C58.4557 34.375 58.6771 32.8125 58.9375 31.25H17.0625C17.3229 32.8125 17.5443 34.375 17.7266 35.9375C17.9089 37.5 18.1302 39.0625 18.3906 40.625H28.3125V46.875H13L9.875 25H19.25C19.25 22.4479 19.9531 20.1302 21.3594 18.0469C22.7656 15.9635 24.6667 14.4271 27.0625 13.4375C27.2188 11.8229 27.8958 10.4818 29.0938 9.41406C30.2917 8.34635 31.6979 7.8125 33.3125 7.8125C35.0312 7.8125 36.5026 8.42448 37.7266 9.64844C38.9505 10.8724 39.5625 12.3437 39.5625 14.0625ZM31.0469 59.375H44.9531L46.75 40.625H29.25L31.0469 59.375ZM25.5 65.625L23.1562 41.25C22.9479 39.4271 23.4688 37.8255 24.7188 36.4453C25.9688 35.0651 27.5052 34.375 29.3281 34.375H46.6719C48.4948 34.375 50.0312 35.0651 51.2812 36.4453C52.5312 37.8255 53.0521 39.4271 52.8438 41.25L50.5 65.625H25.5Z"
                        fill="#108A00"
                    />
                </svg>
            )
        },
        {
            title: t("home.how.secondTitle"),
            description: t("home.how.secondDescription"),
            icon: (
                <svg
                    width="76"
                    height="75"
                    viewBox="0 0 76 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M55.3438 37.5L44.25 26.4062L48.7031 22.0312L55.3438 28.6719L68.625 15.3906L73 19.8437L55.3438 37.5ZM28.625 37.5C25.1875 37.5 22.2448 36.276 19.7969 33.8281C17.349 31.3802 16.125 28.4375 16.125 25C16.125 21.5625 17.349 18.6198 19.7969 16.1719C22.2448 13.724 25.1875 12.5 28.625 12.5C32.0625 12.5 35.0052 13.724 37.4531 16.1719C39.901 18.6198 41.125 21.5625 41.125 25C41.125 28.4375 39.901 31.3802 37.4531 33.8281C35.0052 36.276 32.0625 37.5 28.625 37.5ZM3.625 62.5V53.75C3.625 51.9792 4.08073 50.3516 4.99219 48.8672C5.90365 47.3828 7.11458 46.25 8.625 45.4687C11.8542 43.8542 15.1354 42.6432 18.4688 41.8359C21.8021 41.0286 25.1875 40.625 28.625 40.625C32.0625 40.625 35.4479 41.0286 38.7813 41.8359C42.1146 42.6432 45.3958 43.8542 48.625 45.4687C50.1354 46.25 51.3464 47.3828 52.2578 48.8672C53.1693 50.3516 53.625 51.9792 53.625 53.75V62.5H3.625ZM9.875 56.25H47.375V53.75C47.375 53.1771 47.2318 52.6562 46.9453 52.1875C46.6589 51.7187 46.2813 51.3542 45.8125 51.0937C43 49.6875 40.1615 48.6328 37.2969 47.9297C34.4323 47.2266 31.5417 46.875 28.625 46.875C25.7083 46.875 22.8177 47.2266 19.9531 47.9297C17.0885 48.6328 14.25 49.6875 11.4375 51.0937C10.9688 51.3542 10.5911 51.7187 10.3047 52.1875C10.0182 52.6562 9.875 53.1771 9.875 53.75V56.25ZM28.625 31.25C30.3438 31.25 31.8151 30.638 33.0391 29.4141C34.263 28.1901 34.875 26.7187 34.875 25C34.875 23.2812 34.263 21.8099 33.0391 20.5859C31.8151 19.362 30.3438 18.75 28.625 18.75C26.9063 18.75 25.4349 19.362 24.2109 20.5859C22.987 21.8099 22.375 23.2812 22.375 25C22.375 26.7187 22.987 28.1901 24.2109 29.4141C25.4349 30.638 26.9063 31.25 28.625 31.25Z"
                        fill="#108A00"
                    />
                </svg>
            )
        },
        {
            title: t("home.how.thirdTitle"),
            description: t("home.how.thirdDescription"),
            icon: (
                <svg
                    width="76"
                    height="75"
                    viewBox="0 0 76 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M28.625 28.125V21.875H56.75V28.125H28.625ZM28.625 37.5V31.25H56.75V37.5H28.625ZM38 68.75H19.25C16.6458 68.75 14.4323 67.8385 12.6094 66.0156C10.7865 64.1927 9.875 61.9792 9.875 59.375V50H19.25V6.25H66.125V34.4531C65.0833 34.349 64.0286 34.388 62.9609 34.5703C61.8932 34.7526 60.8646 35.0781 59.875 35.5469V12.5H25.5V50H44.25L38 56.25H16.125V59.375C16.125 60.2604 16.4245 61.0026 17.0234 61.6016C17.6224 62.2005 18.3646 62.5 19.25 62.5H38V68.75ZM44.25 68.75V59.1406L61.5156 41.9531C61.9844 41.4844 62.5052 41.1458 63.0781 40.9375C63.651 40.7292 64.2239 40.625 64.7969 40.625C65.4219 40.625 66.0208 40.7422 66.5937 40.9766C67.1667 41.2109 67.6875 41.5625 68.1562 42.0313L71.0469 44.9219C71.4635 45.3906 71.7891 45.9115 72.0234 46.4844C72.2578 47.0573 72.375 47.6302 72.375 48.2031C72.375 48.776 72.2708 49.362 72.0625 49.9609C71.8542 50.5599 71.5156 51.0938 71.0469 51.5625L53.8594 68.75H44.25ZM48.9375 64.0625H51.9062L61.3594 54.5313L59.9531 53.0469L58.4687 51.6406L48.9375 61.0938V64.0625ZM59.9531 53.0469L58.4687 51.6406L61.3594 54.5313L59.9531 53.0469Z"
                        fill="#108A00"
                    />
                </svg>
            )
        },
        {
            title: t("home.how.fourthTitle"),
            description: t("home.how.fourthDescription"),
            icon: (
                <svg
                    width="76"
                    height="75"
                    viewBox="0 0 76 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M38 71.875C32.1667 71.875 26.8021 70.5469 21.9063 67.8906C17.0104 65.2344 13 61.6927 9.875 57.2656V65.625H3.625V46.875H22.375V53.125H14.6406C17.1406 56.875 20.4349 59.8958 24.5234 62.1875C28.612 64.4792 33.1042 65.625 38 65.625C41.9063 65.625 45.5651 64.8828 48.9766 63.3984C52.388 61.9141 55.3568 59.9089 57.8828 57.3828C60.4089 54.8568 62.4141 51.888 63.8984 48.4766C65.3828 45.0651 66.125 41.4062 66.125 37.5H72.375C72.375 42.2396 71.4766 46.6927 69.6797 50.8594C67.8828 55.026 65.4219 58.6719 62.2969 61.7969C59.1719 64.9219 55.5261 67.3828 51.3594 69.1797C47.1927 70.9766 42.7396 71.875 38 71.875ZM35.1875 59.375V55.3125C32.7396 54.7396 30.7474 53.6849 29.2109 52.1484C27.6745 50.612 26.5417 48.5938 25.8125 46.0938L30.9688 44.0625C31.5938 46.1979 32.5703 47.7995 33.8984 48.8672C35.2266 49.9349 36.75 50.4688 38.4688 50.4688C40.1875 50.4688 41.6589 50.0651 42.8828 49.2578C44.1068 48.4505 44.7188 47.1875 44.7188 45.4688C44.7188 43.9583 44.0807 42.7344 42.8047 41.7969C41.5287 40.8594 39.25 39.7917 35.9688 38.5938C32.8958 37.5 30.6432 36.1979 29.2109 34.6875C27.7787 33.1771 27.0625 31.1979 27.0625 28.75C27.0625 26.6146 27.8047 24.6745 29.2891 22.9297C30.7734 21.1849 32.7917 20.0521 35.3438 19.5312V15.625H40.8125V19.5312C42.6875 19.6875 44.3932 20.4427 45.9297 21.7969C47.4662 23.151 48.5208 24.7396 49.0938 26.5625L44.0938 28.5938C43.6771 27.3958 43 26.3932 42.0625 25.5859C41.125 24.7786 39.8229 24.375 38.1563 24.375C36.3333 24.375 34.9401 24.7656 33.9766 25.5469C33.013 26.3281 32.5313 27.3958 32.5313 28.75C32.5313 30.1042 33.1302 31.1719 34.3281 31.9531C35.526 32.7344 37.6875 33.6458 40.8125 34.6875C44.5625 36.0417 47.0625 37.6302 48.3125 39.4531C49.5625 41.276 50.1875 43.2812 50.1875 45.4688C50.1875 46.9792 49.9271 48.3073 49.4063 49.4531C48.8854 50.599 48.1953 51.5755 47.3359 52.3828C46.4766 53.1901 45.474 53.8411 44.3281 54.3359C43.1823 54.8307 41.9583 55.2083 40.6563 55.4688V59.375H35.1875ZM3.625 37.5C3.625 32.7604 4.52344 28.3073 6.32031 24.1406C8.11719 19.974 10.5781 16.3281 13.7031 13.2031C16.8281 10.0781 20.474 7.61719 24.6406 5.82031C28.8073 4.02344 33.2604 3.125 38 3.125C43.8333 3.125 49.1979 4.45312 54.0938 7.10938C58.9896 9.76562 63 13.3073 66.125 17.7344V9.375H72.375V28.125H53.625V21.875H61.3594C58.8594 18.125 55.5651 15.1042 51.4766 12.8125C47.388 10.5208 42.8958 9.375 38 9.375C34.0938 9.375 30.4349 10.1172 27.0234 11.6016C23.612 13.0859 20.6432 15.0911 18.1172 17.6172C15.5911 20.1432 13.5859 23.112 12.1016 26.5234C10.6172 29.9349 9.875 33.5938 9.875 37.5H3.625Z"
                        fill="#108A00"
                    />
                </svg>
            )
        }
    ];

    return (
        <section className="bg-light-200 py-20 lg:py-32 my-10 lg:my-20">
            <div className="container flex flex-col gap-20 items-center">
                <h2 className="text-4xl font-semibold foreground-200">{t("home.how.title")}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
                    {cards.map((card, i) => {
                        return (
                            <div
                                key={i}
                                className="flex flex-col gap-10 items-center bg-white rounded-lg rounded-t-full px-10 pt-40 pb-20 shadow-lg"
                            >
                                {card.icon}
                                <div className="flex flex-col gap-4 items-center text-center">
                                    <h3 className="text-2xl font-medium">{card.title}</h3>
                                    <p className="text-foreground-100">{card.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
