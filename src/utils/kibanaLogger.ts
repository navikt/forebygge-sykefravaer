const logKibanaFriendly = (level: string, message: string) => {
    console.log(
        JSON.stringify({
            level,
            message,
        })
    );
};

const createKibanaLogger = () => {
    return {
        info(message: string) {
            logKibanaFriendly("Info", message);
        },
        warning(message: string) {
            logKibanaFriendly("Warning", message);
        },
        error(message: string) {
            logKibanaFriendly("Error", message);
        },
    };
};

export const logger = createKibanaLogger();
