// Utilities
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Configurations
import general from "data/configs/general";

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!general.languages.includes(locale as any)) notFound();
    return {
        messages: (await import(`./data/translations/${locale}.json`)).default,
    };
});
