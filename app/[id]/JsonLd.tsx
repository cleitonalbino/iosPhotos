"use client";

import { useEffect } from "react";

interface JsonLdProps {
  data: object;
}

export default function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.id = "json-ld-script";

    // Remove script anterior se existir
    const existingScript = document.getElementById("json-ld-script");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("json-ld-script");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
}
