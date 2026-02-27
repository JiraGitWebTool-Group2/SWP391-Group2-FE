import { useParams } from "react-router-dom";

const SrsReviewPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Review SRS #{id}</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-700">
          This is review mode. Editing is disabled.
        </p>

        <div className="mt-4 space-y-2">
          <div className="border p-3 rounded">
            <h3 className="font-semibold">Introduction</h3>
            <p>Project overview content...</p>
          </div>

          <div className="border p-3 rounded">
            <h3 className="font-semibold">System Features</h3>
            <p>Feature description...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SrsReviewPage;
