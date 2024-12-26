import en from "./messages/en.json";
import ar from "./messages/ar.json";

type Messages = typeof en & typeof ar;

declare global {
    // Use type safe message keys with `next-intl`
    interface IntlMessages extends Messages {}
}
