import { useUser } from "@clerk/clerk-react";
import AddResume from "./components/AddResume";
import GlobalAPI from "@/service/GlobalAPI";
import { useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  const GetResumeList = () => {
    GlobalAPI.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setResumeList(resp.data.data);
      }
    );
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p className="text-lg font-medium py-4 text-orange-900">
        <span className="inline-block animate-up-down">Start</span>{" "}
        <span className="inline-block animate-down-up">Creating</span>{" "}
        <span className="inline-block animate-up-down">AI</span>{" "}
        <span className="inline-block animate-down-up">resume</span>{" "}
        <span className="inline-block animate-up-down">for</span>{" "}
        <span className="inline-block animate-down-up">your</span>{" "}
        <span className="inline-block animate-up-down">next</span>{" "}
        <span className="inline-block animate-down-up">Job</span>{" "}
        <span className="inline-block animate-up-down">Role</span>
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-4">
        <AddResume refreshData={GetResumeList} />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeItem
              key={index}
              resume={resume}
              refreshData={GetResumeList}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
