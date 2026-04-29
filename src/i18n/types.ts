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
    cssAnimationsCta: {
      title: string;
      body: string;
      linkLabel: string;
    };
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
    "json-formatter": {
      name: string;
      description: string;
      ogSubtitle: string;
      tags: string[];
    };
    "image-converter": {
      name: string;
      description: string;
      ogSubtitle: string;
      tags: string[];
    };
    "css-animations": {
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
    "json-formatter": {
      cardTitle: string;
      labelInput: string;
      labelOutput: string;
      placeholderInput: string;
      placeholderOutput: string;
      format: string;
      minify: string;
      copy: string;
      clear: string;
      copyHintOk: string;
      copyHintFail: string;
      errTooLong: string;
      errParse: string;
    };
    "image-converter": {
      cardTitle: string;
      dropzoneTitle: string;
      dropzoneBody: string;
      pickFiles: string;
      labelFormat: string;
      labelQuality: string;
      labelScale: string;
      summaryFiles: string;
      summarySize: string;
      summaryDone: string;
      emptyQueue: string;
      statusPending: string;
      statusConverting: string;
      statusDone: string;
      convertAll: string;
      downloadZip: string;
      clear: string;
      errInvalidZip: string;
      errTooManyFiles: string;
      errTooLargeTotal: string;
      errConvertFailed: string;
      errZipBuild: string;
      noticeNoSupportedFiles: string;
      noticeZipNoImages: string;
      disclaimerGif: string;
      disclaimerSvg: string;
    };
  };
  metadata: {
    titleTemplate: string;
    defaultDescription: string;
  };
  cssAnimations: {
    metadata: {
      titleTemplate: string;
      hubTitle: string;
      hubDescription: string;
    };
    hub: {
      eyebrow: string;
      sub: string;
      browseCategories: string;
    };
    categories: {
      loaders: { title: string; description: string; open: string };
      "hover-buttons": { title: string; description: string; open: string };
      text: { title: string; description: string; open: string };
      cards: { title: string; description: string; open: string };
      inputs: { title: string; description: string; open: string };
      "reveal-masks": { title: string; description: string; open: string };
      "ambient-backgrounds": { title: string; description: string; open: string };
      "scroll-cues": { title: string; description: string; open: string };
    };
    ui: {
      copy: string;
      copyHtml: string;
      copyCss: string;
      reset: string;
      previewAria: string;
      htmlLabel: string;
      cssLabel: string;
      paramSpeed: string;
      paramColor: string;
      paramSize: string;
      copyOk: string;
      copyFail: string;
      relatedHeading: string;
      controlsTitle: string;
    };
    /** Keys: `category/slug` e.g. `loaders/dot-pulse` */
    items: Record<
      string,
      {
        title: string;
        description: string;
        ogSubtitle: string;
        breadcrumb: string;
      }
    >;
  };
};
