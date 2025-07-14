import { init, setEnv } from 'kawkab';
import configuration from './app/configuration';

setEnv(import.meta.env);

init({
    apiBaseUrl: configuration.api.baseUrl,
    socketUrl: configuration.socket.url,
    storageType: configuration.storage.type as "localStorage" | "sessionStorage",
    auth: {
        tokenKey: configuration.auth.tokenKey,
    },
});