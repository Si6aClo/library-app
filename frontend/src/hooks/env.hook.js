export const useEnv = () => {
    const appHost = process.env.REACT_APP_APP_HOST;
    const apiPort = process.env.REACT_APP_API_PORT;

    return {appHost, apiPort}
}