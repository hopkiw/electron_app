import { Col, Row, Image } from 'antd';
import { Link } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';

import Dropdown from '../components/dropdown';
// import catList from '../db/index.cjs';
import './gallery.css';

export async function action() {
  console.log('gallery.action called');

  // return redirect(`/`);
}

export async function loader({ request }) {
  console.log('gallery.loader called');
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const res = fetch("/api/images")

  return { data, q };
}

export default function Gallery() {
  const cols = [];

  catList.map((cat, i) => {
    cols.push(
      <Col key={i.toString()} span={3} >
        <Link to={"/files/" + i} >
          <Image
            preview={false}
            height={200}
            width={200}
            src={"/photos/" + cat.path}
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
