import { t } from "@lingui/macro";

export type HeaderProps = {
  isDark?: boolean;
  isLight?: boolean;
  withoutScrollSideEffects?: boolean;
};

export const useNavigationList = () => {
  return [
    {
      lang: t`Products`,
      action: () => {},
    },
    {
      lang: t`About`,
      action: () => {},
    },
    {
      lang: t`Career`,
      action: () => {},
    },
    {
      lang: t`Support`,
      action: () => {},
    },
  ];
};
