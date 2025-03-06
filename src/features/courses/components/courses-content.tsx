import { SearchParams } from "next/dist/server/request/search-params";
import { sanitizeObject } from "@/utils/sanitize-object";
import NoResults from "@/components/ui/no-results";
import { getCourses } from "../services";
import CourseCard from "./course-card";

export default async function CoursesContent({ searchParams }: { searchParams: SearchParams }) {
    const { data: courses } = await getCourses({
        params: sanitizeObject({
            specialities: searchParams?.specialities ? (searchParams?.specialities as string) : ""
        }),
        next: {
            revalidate: 60
        }
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
            {courses?.length === 0 && <NoResults />}
            {courses?.slice(0, 4)?.map((course) => {
                return <CourseCard key={course.id} course={course} />;
            })}
        </div>
    );
}
