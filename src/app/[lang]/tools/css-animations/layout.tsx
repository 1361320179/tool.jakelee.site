import { getLocaleDictionary } from "@/i18n/server";
import { ToolPageShell } from "@/components/shell/tool-page-shell";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function CssAnimationsToolLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;
  const { dictionary } = await getLocaleDictionary(lang);
  const tool = dictionary.tools["css-animations"];

  return (
    <ToolPageShell
      tool={{
        slug: "css-animations",
        name: tool.name,
        description: tool.description,
        tags: tool.tags,
      }}
    >
      {children}
    </ToolPageShell>
  );
}
