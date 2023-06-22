import { useEffect } from "react";
import { 
  redirect,
  useNavigation,
  useSubmit,
  useLoaderData,
  Link, 
} from "react-router-dom";

import tagList from '../db/fakey';
import './tags.css';

export async function action() {
  console.log('tag.action called');

  return redirect(`/`);
}

export async function loader({ request, params }) {
  console.log('tags.loader called');

  return { tagList };
}

export default function Tags() {
  const { tagList } = useLoaderData();

  return (
    <>
      <p>All the tags go here</p>
      <Link to="/">Home</Link>
    </>
  );
}
