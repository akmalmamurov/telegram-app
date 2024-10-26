import { loadingImg } from "@/assets/images";

const Loading = () => {
  return (
    <div className="h-screen">
      <img
        src={loadingImg}
        alt="Loading..."
        className="loading-image w-full h-full"
      />
    </div>
  );
};

export default Loading;
