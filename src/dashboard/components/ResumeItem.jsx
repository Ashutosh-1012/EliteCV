/* eslint-disable react/prop-types */
import { Loader2Icon, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from "../../service/GlobalAPI";
import { toast } from "sonner";

function ResumeItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14 bg-gradient-to-b from-blue-300 via-purple-200 to-orange-300 h-[200px] rounded-t-lg border-t-8  hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
          style={{
            borderColor: resume?.themeColor || "gray",
          }}
        >
          <div className="flex items-center justify-center h-[180px]">
            <img src="/cv.png" alt="Resume Thumbnail" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor || "gray",
        }}
      >
        <h2 className="text-lg ">{resume.title || "Untitled Resume"}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeItem;
