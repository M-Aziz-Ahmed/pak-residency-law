import LawyerLogin from "@/app/components/port/Lawyerlogin";

export default async function Page({ params }) {
    const { param } = await params;
    return (
        <div>
            <LawyerLogin />
        </div>

    );
}