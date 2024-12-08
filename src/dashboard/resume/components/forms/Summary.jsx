/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import GlobalAPI from "@/service/GlobalAPI";
import { toast } from "sonner";
import { useParams } from "react-router";
import { AIChatSession } from "@/service/AIModal";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

const Summary = ({ enabledNext }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState();
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      summary: summary || "",
    });
  }, [summary]);

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalAPI.UpdateResumeDetail(params?.resumeid, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };
  const GenerateSummaryFromAI = async () => {
    try {
      setLoading(true);

      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle || "");
      console.log("Prompt sent to AI:", PROMPT);

      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      console.log("Raw response from AI:", responseText);

      const parsedResponse = JSON.parse(responseText);

      if (Array.isArray(parsedResponse)) {
        setAiGenerateSummaryList(parsedResponse);
      } else {
        throw new Error("Expected an array, but received something else.");
      }
    } catch (error) {
      console.error("Error generating summary from AI:", error);
      toast.error("Failed to generate summary. Please try again.");
      setAiGenerateSummaryList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10 h-96">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7 " onSubmit={onSave}>
          <div className="flex justify-between items-end ">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummaryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5 h-40"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" className="bg-slate-500" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && aiGeneratedSummaryList.length > 0 ? (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="my-5 text-gray-500">
          No AI-generated suggestions available.
        </p>
      )}
    </div>
  );
};

export default Summary;
