"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";


export default function page() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");


    const onSubmit = async () => {
        signIn("credentials", {
            email: data.email,
            callbackUrl: callbackUrl ?? "/Member",
        });
    };
    return (
        <div className="sm:w-[20%] w-full mx-auto flex flex-col gap-2">
            <button
                className="w-full bg-[#24292f] text-white text-sm py-3 px-4 rounded-lg"
                variant="outline"
                type="button"
                onClick={() =>
                    signIn("github", { callbackUrl: callbackUrl ?? "/" })
                }
            >
                Continue with Github
            </button>
            <button
                className="w-full bg-black text-white text-sm py-3 px-4 rounded-lg"
                variant="outline"
                type="button"
                onClick={() =>
                    signIn("google", { callbackUrl: callbackUrl ?? "/" })
                }
            >
                Continue with Google
            </button>
            <button
                className="w-full bg-[#5865F2] text-white text-sm py-3 px-4 rounded-lg"
                variant="outline"
                type="button"
                onClick={() =>
                    signIn("discord", { callbackUrl: callbackUrl ?? "/" })
                }
            >
                Continue with Discord
            </button>
        </div>
    )
}
