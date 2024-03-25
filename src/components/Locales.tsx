// THIRD-PARTY
import React, { ReactNode, useEffect, useState } from "react";
import { IntlProvider, MessageFormatElement } from "react-intl";

// PROJECT IMPORTS
import useConfig from "hooks/useConfig";

const loadLocalesData = (locales: string) => {
  switch (locales) {
    case "vi": {
      return import("locales/vi.json");
    }
    case "en": {
      return import("locales/en.json");
    }
    default:
      return import("locales/vi.json");
  }
};

interface ILocales {
  children: ReactNode;
}
const Locales = ({ children }: ILocales) => {
  const { locale } = useConfig();
  const [message, setMessage] = useState<
    Record<string, string> | Record<string, MessageFormatElement[]> | undefined
  >();
  useEffect(() => {
    loadLocalesData(locale).then(
      (d: {
        default:
          | Record<string, string>
          | Record<string, MessageFormatElement[]>
          | undefined
          | any;
      }) => {
        setMessage(d.default);
      }
    );
  }, [locale]);
  return (
    <>
      {message && (
        <IntlProvider locale={locale} defaultLocale="vi" messages={message}>
          {children}
        </IntlProvider>
      )}
    </>
  );
};
export default Locales;
