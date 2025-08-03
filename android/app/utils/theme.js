export const colors = {
    primary: "#FF00E6",
    secondary: "#F3C4F3",
    backgroundLight: "#F8E4F6",
    white: "#fff",
    black: "#000",
};

export const fonts = {
    regular: "RobotoRegular",
    medium: "RobotoMedium",
    bold: "RobotoBold",
};

export const fontSizes = {
    small: 14,
    medium: 16,
    large: 24,
};

export const textStyles = {
    heading: {
        fontFamily: fonts.bold,
        fontSize: fontSizes.large,
    },
    title: {
        fontFamily: fonts.medium,
        fontSize: fontSizes.medium,
    },
    body: {
        fontFamily: fonts.regular,
        fontSize: fontSizes.small,
    },
};

export const globalStyles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: colors.white,
        gap: 8,
    },
    taskItem: {
        height: 150,
        flex: 1,
        borderRadius: 18,
        backgroundColor: colors.secondary,
        padding: 10,
        margin: 5,
        gap: 8,
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: fontSizes.medium,
    },
    button: {
        backgroundColor: colors.primary,
        flex: 1 / 3,
        borderRadius: 999,
        alignItems: 'center',
        padding: 7,
    },
    buttonBorder: {
        borderColor: colors.primary,
        borderWidth: 2,
        flex: 1 / 3,
        borderRadius: 999,
        alignItems: 'center',
        padding: 7,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    textContainer: {
        backgroundColor: colors.backgroundLight,
        borderRadius: 8,
        paddingVertical: 11,
        paddingHorizontal: 5,
        gap: 2
    },
    validateTask: {
        height: 100,
        backgroundColor: colors.secondary,
        padding: 10,
        margin: 5,
        borderRadius: 18
    },
    label: {
        marginBottom: 8,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: colors.backgroundLight,
        borderRadius: 6,
        padding: 10,
        marginBottom: 20
    },
    pickerWrapper: {
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    picker: {
        backgroundColor: "#FFF",
        fontFamily: fonts.medium,
        height: 50,
    },
};