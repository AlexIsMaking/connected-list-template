import { getPreferenceValues } from "@raycast/api";

const preferences = getPreferenceValues();
export const { apiKey } = preferences;
