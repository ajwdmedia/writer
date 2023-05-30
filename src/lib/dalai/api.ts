export const checkInstall = async () => {
    try {
        let result = await (await fetch("/api/check_install")).json();
        return result.has_alpaca as boolean || false;
    } catch (_err) {}

    return false;
};

export const doInstall = async () => {
    try {
        let result = await (await fetch("/api/do_install", { method: "POST" })).json();
        return result.installed as boolean || false;
    } catch (_err) {
        console.log(_err);
    }

    return false;
};