import AiChat from "@/app/components/port/AiChat";

export default async function Page({ params }) {
    const { param } = await params;
    return (
        <div>
            <AiChat />
        </div>
    );
}