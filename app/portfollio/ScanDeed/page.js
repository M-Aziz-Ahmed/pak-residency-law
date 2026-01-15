import ScanDeed from "@/app/components/port/ScanDeed";

export default async function Page({ params }) {
    const { param } = await params;
    return (
        <div>
            <ScanDeed/>
        </div>
    );
}