import {router} from "expo-router";
import {ROUTES} from "@/src/navigation/routes";

/**
 * Navigate to login screen
 */
export const navigateToLogin = () => {
    // Reset navigation stack so user cannot go back to home after logout
    router.replace(ROUTES.AUTH.LOGIN);
};

export const navigateToHome = () => {
    // Reset stack so login screen is not in the back stack
    router.replace(ROUTES.TABS.HOME);
};

export const navigateToProductDetail = (productId: string) => {
    router.push(`${ROUTES.TABS.DETAILS}/${productId}`)
};

export const goBack = () => {
    router.back();
};
