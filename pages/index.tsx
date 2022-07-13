import Head from 'next/head';
import axios from 'axios';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { BASE_URL } from '../utils';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div>
      <Head>
        <title>BatsToK</title>
        <meta
          name='description'
          content='A tiktok clone in React + Next.js + sanity backend'
        />
        <link rel='icon' href='/penis.svg' />
      </Head>
      <div className='flex flex-col gap-5 videos h-full md:items-center sm:items-center lg:items-start xs:items-center'>
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResults text={'no videos found'} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: { videos: response.data },
  };
};

export default Home;
