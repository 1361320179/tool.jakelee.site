export type ToolsSiteDictionary = {
  site: {
    title: string;
    description: string;
    shortName: string;
    mainSiteLink: string;
  };
  nav: {
    tools: string;
    mainSite: string;
    languageSwitcher: string;
    ariaMain: string;
  };
  footer: {
    rights: string;
  };
  home: {
    eyebrow: string;
    heroBody: string;
    allTools: string;
  };
  toolPage: {
    breadcrumbTools: string;
    backToMain: string;
    share: {
      sectionTitle: string;
      copyLink: string;
      systemShare: string;
      copyOk: string;
      copyFail: string;
      platforms: {
        x: string;
        facebook: string;
        linkedin: string;
        reddit: string;
        telegram: string;
        whatsapp: string;
        weibo: string;
      };
    };
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
  theme: {
    switchToLight: string;
    switchToDark: string;
  };
  tools: {
    base64: {
      name: string;
      description: string;
      ogSubtitle: string;
      tags: string[];
    };
    uuid: {
      name: string;
      description: string;
      ogSubtitle: string;
      tags: string[];
    };
  };
  toolUi: {
    base64: {
      cardTitle: string;
      labelPlain: string;
      labelB64: string;
      placeholderPlain: string;
      placeholderB64: string;
      encode: string;
      decode: string;
      swap: string;
      copy: string;
      clear: string;
      copyHintOk: string;
      copyHintFail: string;
      errTooLong: string;
      errEncode: string;
      errDecode: string;
      errInvalid: string;
    };
    uuid: {
      cardTitle: string;
      labelCount: string;
      regen: string;
      copyAll: string;
      copyHintOk: string;
      copyHintFail: string;
      errInt: string;
      errMin: string;
      errMax: string;
      errInvalid: string;
      listAria: string;
    };
  };
  metadata: {
    titleTemplate: string;
    defaultDescription: string;
  };
};
