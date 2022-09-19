import MainLayout from '../../components/MainLayout';

export default function Component({ prop }) {
  return (
    <MainLayout>
      <h2>Search perrito</h2>
    </MainLayout>
  );
}

export async function getServerSideProps() {}
