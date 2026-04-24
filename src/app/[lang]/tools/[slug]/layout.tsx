import { notFound } from "next/navigation";
import { getLocaleDictionary } from "@/i18n/server";
import { getToolBySlug } from "@/lib/tools/registry";
import { ToolPageShell } from "@/components/shell/tool-page-shell";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
};

export default async function ToolSlugLayout({ children, params }: Props) {
  const { lang, slug } = await params;
  const { dictionary } = await getLocaleDictionary(lang);
  const tool = getToolBySlug(dictionary, slug);
  if (!tool) {
    notFound();
  }
  const summary = {
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    tags: tool.tags,
  };
  return <ToolPageShell tool={summary}>{children}</ToolPageShell>;
}
