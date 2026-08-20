import { useLoaderData } from "react-router-dom";

type PlaceholderLoaderData = {
  title: string;
};

export default function PlaceholderPage() {
  const { title } = useLoaderData() as PlaceholderLoaderData;

  return (
    <div className="px-5 py-16 text-center lg:px-20">
      <h1 className="typo-heading2 text-foreground">{title}</h1>
    </div>
  );
}
