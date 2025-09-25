import {Icon, Label, NativeTabs} from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="home"
                                options={{
                                    title: "Home",
                                }}>
                <Label>Home</Label>
                <Icon sf="house.fill" drawable="custom_android_drawable"/>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="profile">
                <Icon sf="brain.head.profile.fill" drawable="custom_profile_drawable"/>
                <Label>Profile</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="notification">
                <Icon sf="bell.and.waveform.fill" drawable="custom_notification_drawable"/>
                <Label>Notification</Label>
            </NativeTabs.Trigger>

        </NativeTabs>

    )
        ;
}