import Nav from "../../Navbar/Nav";
import { useEffect } from "react";
import SingleVideo from "./SingleVideo";
import { useGetAllVideoQuery } from "../../../features/videos/videoApi";
import { Link } from "react-router-dom";

const Videos = () => {
  const { data: videos } = useGetAllVideoQuery();
  useEffect(() => {
    document.title = "Videos";
  }, []);

  useEffect(() => {
    // console.log(videos);
    // console.log(videos);
  }, [videos]);

  return (
    <div>
      <Nav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <Link to="/admin/videos/add">
              <div className="w-full flex">
                <button className="btn ml-auto">Add Video</button>
              </div>
            </Link>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {videos?.length &&
                    videos.map((video, index) => (
                      <SingleVideo video={video} key={index} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
