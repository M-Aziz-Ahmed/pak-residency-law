import LawSearch from "@/app/components/port/Law-search";

export default async function Page({ params }) {
    const { param } = await params;
    return (
        <div>
            <LawSearch />
        </div>
    );
}