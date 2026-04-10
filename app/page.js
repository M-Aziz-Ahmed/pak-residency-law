import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const cookieStore = await cookies();
    const raw = cookieStore.get("user")?.value;

    if (!raw) {
        redirect("/login");
    }
    else{
        redirect("/portfollio");
    }
}
