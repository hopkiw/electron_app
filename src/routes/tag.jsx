import { useEffect } from "react";
import { 
  redirect,
  useNavigation,
  useSubmit,
  useLoaderData,
  Link, 
} from "react-router-dom";

import tagList from '../db/fakey';
import './tag.css';

export async function action() {
  console.log('tag.action called');

  return redirect(`/`);
}

export async function loader({ request, params }) {
  console.log('tag.loader called');
  const tag = tagList[params.tagId];

  return { tag };
}

export default function Tag() {
  const { tag } = useLoaderData();

  return (
    <>
      <p>
        Data about one tag goes here: number of files affected, groups tags it's
        a part of, etc.
      </p>
      <Link to="/">Home</Link>
    </>
  );
}


