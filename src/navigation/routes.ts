export const ROUTES = {
    AUTH: {
        LOGIN: "/(auth)/login",
        REGISTER: "/(auth)/register",
    },
    TABS: {
        HOME: "/(tabs)/home",
        PROFILE: "/(tabs)/profile",
        DETAILS: "/(tabs)/home/details/" as const, // literal type
    },
} as const;