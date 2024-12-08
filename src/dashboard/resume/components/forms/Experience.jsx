import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalAPI from '@/service/GlobalAPI';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const Experience = () => {
    const [experienceList, setExperienceList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    // Populate experienceList from resumeInfo when resumeInfo changes
    useEffect(() => {
        if (Array.isArray(resumeInfo?.Experience) && resumeInfo.Experience.length > 0) {
            setExperienceList(resumeInfo.Experience);
        }
    }, [resumeInfo]);

    // Handle input field changes
    const handleChange = (index, event) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    // Add a new experience entry
    const addNewExperience = () => {
        setExperienceList([
            ...experienceList,
            {
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                workSummary: '',
            },
        ]);
    };

    // Remove the last experience entry
    const removeExperience = () => {
        setExperienceList((prevList) => prevList.slice(0, -1));
    };

    // Handle Rich Text Editor changes
    const handleRichTextEditor = (event, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = event.target.value;
        setExperienceList(newEntries);
    };

    // Update resumeInfo whenever experienceList changes
    useEffect(() => {
        setResumeInfo((prevInfo) => ({
            ...prevInfo,
            Experience: experienceList,
        }));
    }, [experienceList, setResumeInfo]);

    // Save experience details to the server
    const onSave = () => {
        setLoading(true);

        const data = {
            data: {
                Experience: experienceList.map(({ id, ...rest }) => rest),
            },
        };

        GlobalAPI.UpdateResumeDetail(params?.resumeId, data)
            .then((res) => {
                setLoading(false);
                toast('Details updated!');
            })
            .catch((error) => {
                setLoading(false);
                toast.error('Failed to update details.');
            });
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p>Add your previous job experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                <div>
                                    <label className="text-xs">Position Title</label>
                                    <Input
                                        name="title"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.title || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Company Name</label>
                                    <Input
                                        name="companyName"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.companyName || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">City</label>
                                    <Input
                                        name="city"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.city || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">State</label>
                                    <Input
                                        name="state"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.state || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Start Date</label>
                                    <Input
                                        type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.startDate || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">End Date</label>
                                    <Input
                                        type="date"
                                        name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        value={item?.endDate || ''}
                                    />
                                </div>
                                <div className="col-span-2">
                                    {/* Work Summary */}
                                    <RichTextEditor
                                        index={index}
                                        value={item?.workSummary || ''}
                                        onRichTextEditorChange={(event) =>
                                            handleRichTextEditor(event, 'workSummary', index)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={addNewExperience} className="text-primary">
                            + Add More Experience
                        </Button>
                        <Button variant="outline" onClick={removeExperience} className="text-primary">
                            - Remove
                        </Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Experience;
