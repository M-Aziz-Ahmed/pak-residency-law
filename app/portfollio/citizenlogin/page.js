import CitizenLogin from "@/app/components/port/citizenlogin";

export default async function Page({ params }) {
    const { param } = await params;
    return (
        <div>
            <CitizenLogin />
        </div>
    );
}