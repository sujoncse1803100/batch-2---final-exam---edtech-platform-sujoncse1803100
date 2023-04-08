import Nav from "../../Navbar/Nav";
import { useEffect, useState } from "react";
import Player from "./Player";
import SingleVideo from "./SingleVideo";
import { useGetAllVideoQuery } from "../../../features/videos/videoApi";

const CoursePlayer = () => {
  const { data: videos, isSuccess } = useGetAllVideoQuery();

  const [allVideos, setAllVideos] = useState({});
  const [video, setVideo] = useState({});
  useEffect(() => {
    document.title = "Player";
  }, []);

  useEffect(() => {
    isSuccess && setAllVideos(videos);
    isSuccess && setVideo(videos[0] ? videos[0] : {});
  }, [isSuccess, videos]);

  const parentFunction = (id) => {
    const myVideo = allVideos?.find((v) => v.id === id) || {};
    setVideo(myVideo);
  };

  return (
    <div>
      <Nav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            {Object.keys(video).length > 0 && <Player video={video} />}
            <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
              {allVideos?.length &&
                allVideos.map((v, i) => (
                  <SingleVideo
                    childFunction={parentFunction}
                    video={v}
                    key={i}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursePlayer;
