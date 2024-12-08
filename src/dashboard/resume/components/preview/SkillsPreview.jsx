/* eslint-disable react/prop-types */

function SkillsPreview({ resumeInfo }) {
    return (
      <div className="my-6">
        {/* Heading */}
        <h2
          className="text-center font-bold text-sm mb-2"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          Skills
        </h2>
        <hr
          style={{
            borderColor: resumeInfo?.themeColor,
          }}
        />
  
        {/* Skills */}
        <div className="grid grid-cols-2 gap-3 my-4">
          {resumeInfo?.skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              {/* Skill Name */}
              <h2 className="text-xs text-gray-600">{skill.name}</h2>
              {/* Skill Bar */}
              <div className="relative w-[120px] h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full"
                  style={{
                    backgroundColor: resumeInfo?.themeColor,
                    width: `${skill?.rating}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default SkillsPreview;
  