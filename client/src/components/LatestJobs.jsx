import { Link } from "react-router-dom";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            <span className="text-[#0f4298]">Top & New</span> Job Openings 🔍
          </h1>

          <Link to={"/jobs"}>
            <button className="text-black hover:underline">view all</button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 my-10">
          {allJobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <LatestJobCards key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
