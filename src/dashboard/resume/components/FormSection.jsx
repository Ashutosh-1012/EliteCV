import { Button } from "@/components/ui/button"
import { Education } from "./forms/Education"
import Experience from "./forms/Experience"
import PersonalDetail from "./forms/PersonalDetail"
import Skill from "./forms/Skill"
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react"
import { useState } from "react"
import Summary from "./forms/Summary"


const FormSection = () => {

  const [activeFormIndex ,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext] = useState(true);


  return (

    <div>

    <div className="flex justify-between items-center" >
      <Button varient="outline" className="bg-slate-500 flex gap-2  text-white" size="sm" > <LayoutGrid/> Theme</Button>
      <div className="flex gap-2" >
        {activeFormIndex>1 && <Button className="flex gap-2 bg-orange-400" size="sm" onClick={()=>setActiveFormIndex(activeFormIndex-1)} > <ArrowLeft/>Previous </Button>}
        <Button disabled={!enableNext} className="flex gap-2 bg-orange-400" size="sm" onClick={()=>setActiveFormIndex(activeFormIndex+1)} >Next <ArrowRight/></Button>
        
      </div>
    </div>
      {activeFormIndex==1 ? <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />:null}
      {activeFormIndex==2 ? <Summary enabledNext={(v)=>setEnableNext(v)} /> :null}
      {activeFormIndex==3 ? <Experience enabledNext={(v)=>setEnableNext(v)} />:null}
      {activeFormIndex==4 ? <Skill/> :null}
      {activeFormIndex==5 ? <Education/> :null}
    </div>
  )
}

export default FormSection