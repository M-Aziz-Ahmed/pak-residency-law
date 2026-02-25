import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const cookieStore = await cookies();
    const user = cookieStore.get("user");

    if (!user) {
        redirect("/login");
    }

    const parsedUser = JSON.parse(user.value);

    if (parsedUser.role === "citizen") {
        redirect("/portfollio");
    }

    if (parsedUser.role === "lawyer") {
        redirect("/lawyer");
    }

    return <div></div>;
}
