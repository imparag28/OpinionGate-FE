import feedbackService from "@/services/feedback-service/feedback.service";
import { TrashIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface FeedbackContainerProps {
  allFeedback: Array<{
    customerName: string;
    _id: string;
    feedback: string;
  }>;
  getFeedback: Function;
}

const FeedbackContainer: FC<FeedbackContainerProps> = ({
  allFeedback,
  getFeedback,
}) => {
  const params = useParams();

  const handleOnClick = (_id: string) => {
    const queryParm: any = {
      feedbackId: _id,
      userId: params?.userID,
    };
    feedbackService.deleteFeedback(queryParm).then((res: any) => {
      if (res.data.statusCode === 202) {
        toast.success("feedback delete successfully");
        getFeedback();
        return;
      } else {
        toast.success("Smothering went wrong");
      }
    });
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {allFeedback.map(({ customerName, _id, feedback }) => (
        <li
          key={_id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-4">
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {customerName}
            </h3>
            {/* <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {person.role}
                </span>
              </dd>
            </dl> */}
          </div>
          <div>
            <span className="text-sm font-medium text-gray-900">Feedback</span>
            <h3 className="text-ls font-medium text-gray-900 overflow-hidden  m-1 p-1">
              {feedback}
            </h3>
          </div>

          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  Update feedback
                </button>
              </div>

              <div className="-ml-px flex w-0 flex-1">
                <button
                  onClick={() => handleOnClick(_id)}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <TrashIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FeedbackContainer;
