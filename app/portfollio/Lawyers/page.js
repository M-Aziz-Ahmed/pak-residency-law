import Lawyer from "@/app/components/port/Lawyer";

export default async function Page({ params }) {
    const { param } = await params;
    return (
        <div>
            <Lawyer />
        </div>
    );
}