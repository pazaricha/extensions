import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  version: string;
}

export interface DocItem {
  url: string;
  title: string;
}

export type DocSection = Record<string, DocItem[]>;

export function getVersionedUrl(url: string): string {
  const preferences = getPreferenceValues<Preferences>();
  const version = preferences.version?.trim();

  if (!version || version === "Latest") {
    return url;
  }

  // Remove any trailing slash from version
  const cleanVersion = version.replace(/\/$/, "");

  // Replace the base URL with the versioned one
  return url.replace("https://chakra-ui.com", `https://${cleanVersion}.chakra-ui.com`);
}

export function processUrls(obj: DocSection): DocSection {
  const result: DocSection = {};

  for (const [key, items] of Object.entries(obj)) {
    result[key] = items.map(item => ({
      ...item,
      url: getVersionedUrl(item.url),
    }));
  }

  return result;
}
