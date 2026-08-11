import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFormSchema, type NotionFormSchema } from "@/api";
import { NotionFormRenderer } from "./NotionFormRenderer";

export default function NotionFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const [schema, setSchema] = useState<NotionFormSchema | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setSchema(null);
    setError(null);

    fetchFormSchema(slug)
      .then((result) => {
        if (!cancelled) setSchema(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "폼을 불러오지 못했어요");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        <p className="typo-subheading text-primary-950">{error}</p>
      </div>
    );
  }

  if (!schema) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        <p className="typo-subheading text-gray-400">불러오는 중이에요…</p>
      </div>
    );
  }

  return <NotionFormRenderer schema={schema} />;
}
