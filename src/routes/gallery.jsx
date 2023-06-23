import { Col, Row, Image } from 'antd';
import { Link, useLoaderData } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';

import Dropdown from '../components/dropdown';
// import catList from '../db/index.cjs';
import './gallery.css';

export async function action() {
  console.log('gallery.action called');

  // return redirect(`/`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const res = await fetch("http://localhost:3000/api/files")
  const data = await res.json();

  return { data, q };
}

function onmouseover(e) {
  if (e.target.src.includes(".gif")) {
    e.target.src = e.target.src.replace("-static.gif", ".gif");
  }
}
function onmouseleave(e) {
  if (e.target.src.includes(".gif")) {
    e.target.src = e.target.src.replace(".gif", "-static.gif");
  }
}

export default function Gallery() {
  const { data, q } = useLoaderData();
  console.log("data is", data);
  const cols = [];

  data.result.map((cat) => {
    const path = (cat.name.includes(".gif") ? cat.name.replace(".gif", "-static.gif") : cat.name)
    cols.push(
      <Col key={cat.id.toString()} span={3} >
        <Link to={"/files/" + cat.id} >
          <Image
            preview={false}
            height={200}
            width={200}
            src={encodeURIComponent(path)}
            onMouseOver={onmouseover}
            onMouseLeave={onmouseleave}
            placeholder={ <SmileOutlined width={200} height={200} /> }
          />
        </Link>
      </Col>,
    );
  });

  // TODO: is this where dropdown goes?
  return (
    <>
      <Dropdown />
      <div className="gallery">
        <Row gutter={[6, 6]}>
          {cols}
        </Row>
      </div>
    </>
  )
}
