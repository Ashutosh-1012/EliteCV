import { Loader2, PlusSquare } from "lucide-react";
import {v4 as uuidv4} from 'uuid'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useUser } from "@clerk/clerk-react";
import GlobalAPI from '../../service/GlobalAPI'
import { useNavigate } from "react-router";


function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const {user}=useUser();
  const navigation=useNavigate();

  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setLoading(true)
    console.log(user.fullName)
    const uuid=uuidv4();
    const data={
        data:{
            title:resumeTitle,
            resumeid:uuid,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName
        }
    }

    GlobalAPI.CreateNewResume(data).then(resp=>{
        console.log(resp);
        if(resp)
        {
            setLoading(false);
            navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit");
        }
    },(error)=>{
        console.log(error);
        setLoading(false);
    })
    console.log(resumeTitle,uuid);
    


    
  };
  return (
    <div>
      <div
        className="p-14 py-24 border 
        items-center flex 
        justify-center bg-secondary
         h-[260px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed bg-zinc-300 rounded-2xl"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input className="my-2" 
                placeholder="Ex.Full Stack resume"
                onChange={(e)=>setResumeTitle(e.target.value)}  
                />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
