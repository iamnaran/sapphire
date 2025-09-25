import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";

type LoginButtonProps = {
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    text: string;
    className?: string;
};

const LoginButton: React.FC<LoginButtonProps> = ({
                                                     onPress,
                                                     disabled,
                                                     loading,
                                                     text,
                                                     className,
                                                 }) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className={`
        w-full min-h-[48px] flex-row items-center justify-center rounded-xl 
        ${disabled ? "bg-gray-400" : "bg-blue-600"} 
        ${className || ""}
      `}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text className="text-white text-lg font-semibold flex">{text}</Text>
            )}
        </Pressable>
    );
};

export default LoginButton;