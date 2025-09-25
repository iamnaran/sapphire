import { useEffect } from "react";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";
import { isUserLoggedIn } from "@/src/store/secure/secureStore";
import '../global.css'

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const loggedIn = await isUserLoggedIn();
            router.replace(loggedIn ? ROUTES.TABS.HOME : ROUTES.AUTH.LOGIN);
        };
        void checkAuth();
    }, [router]);

    return null; // just redirect, no UI
}