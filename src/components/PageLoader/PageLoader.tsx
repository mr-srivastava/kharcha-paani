import { Spinner } from 'react-bootstrap';

export function PageLoader({ page }: any) {
  return (
    <div className="page-loader d-flex flex-column align-items-center justify-content-center vh-100">
      <Spinner className="mb-2" animation="border" role="status" />
      <div>{`Loading ${page}...`}</div>
    </div>
  );
}
