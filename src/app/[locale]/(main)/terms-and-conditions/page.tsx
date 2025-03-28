import { useTranslations } from "next-intl";

export default function TermsAndConditionsPage() {
    const t = useTranslations("terms");

    const sections = [
        {
            titleKey: "section1Title",
            points: ["section1Point1", "section1Point2", "section1Point3"]
        },
        {
            titleKey: "section2Title",
            points: ["section2Point1", "section2Point2", "section2Point3", "section2Point4"]
        },
        {
            titleKey: "section3Title",
            points: ["section3Point1", "section3Point2", "section3Point3"]
        },
        {
            titleKey: "section4Title",
            points: ["section4Point1", "section4Point2", "section4Point3", "section4Point4"]
        },
        {
            titleKey: "section5Title",
            points: ["section5Point1", "section5Point2", "section5Point3"]
        },
        {
            titleKey: "section6Title",
            points: ["section6Point1", "section6Point2", "section6Point3"]
        },
        {
            titleKey: "section7Title",
            points: ["section7Point1", "section7Point2"]
        },
        {
            titleKey: "section8Title",
            points: ["section8Point1", "section8Point2", "section8Point3"]
        },
        {
            titleKey: "section9Title",
            points: ["section9Point1", "section9Point2", "section9Point3"]
        },
        {
            titleKey: "section10Title",
            points: ["section10Point1", "section10Point2"]
        },
        {
            titleKey: "section11Title",
            points: ["section11Point1", "section11Point2"]
        },
        {
            titleKey: "section12Title",
            points: ["section12Point1", "section12Point2"]
        },
        {
            titleKey: "section13Title",
            points: ["section13Point1", "section13Point2"]
        },
        {
            titleKey: "section14Title",
            points: ["section14Point1", "section14Point2"]
        },
        {
            titleKey: "section15Title",
            points: ["section15Point1", "section15Point2"]
        },
        {
            titleKey: "section16Title",
            points: ["section16Point1", "section16Point2"]
        }
    ] as const;

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-4">{t("pageTitle")}</h1>
            {sections.map((section, index) => (
                <section key={index} className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t(section.titleKey)}</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        {section.points.map((pointKey, idx) => (
                            <li key={idx}>{t(pointKey)}</li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
