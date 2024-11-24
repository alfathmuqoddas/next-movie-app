import { useRouter } from "next/router";

const ButtonSearchToggle = ({ mediaType, string, label }) => {
  const router = useRouter();

  const handleToggle = (mediaType, string) => {
    router.push(`/search/${mediaType}/${string}`);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="btn btn-primary mb-8"
        onClick={() => handleToggle(mediaType, string)}
      >
        {label}
      </button>
    </div>
  );
};

export default ButtonSearchToggle;
