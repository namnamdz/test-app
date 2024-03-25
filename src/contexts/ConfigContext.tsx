// THIRD PARTY
import { createContext, ReactNode } from "react";

// PROJECT IMPORT
import defaultConfig from "config";
import useLocalStorage from "hooks/useLocalStorage";

const initialState: any = {
  ...defaultConfig,
  onChangeLocale: () => {},
};

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage("config", {
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    outlinedFilled: initialState.outlinedFilled,
    presetColor: initialState.presetColor,
    locale: initialState.locale,
    rtlLayout: initialState.rtlLayout,
  });

  const onChangeLocale = (locale: string) => {
    setConfig({
      ...config,
      locale,
    });
  };
  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLocale,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
