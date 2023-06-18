import Dropdown from '../components/dropdown';
import Gallery from '../components/gallery';

export function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");
  console.log('q is', searchTerm);

  const data = { some: "thing" };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
}

export default function Root() {
  return (
    <>
      <Dropdown />
      <Gallery />
    </>
  );
}
