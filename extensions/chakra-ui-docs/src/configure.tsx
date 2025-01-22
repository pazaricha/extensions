// configure the extension chakra ui version

import { openExtensionPreferences } from "@raycast/api";
import { useEffect } from "react";

export default function Command() {
  useEffect(() => {
    openExtensionPreferences();
  }, []);

  return null;
}
