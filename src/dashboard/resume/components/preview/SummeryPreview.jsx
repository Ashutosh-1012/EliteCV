/* eslint-disable react/prop-types */


function SummeryPreview({resumeInfo}) {
  return (
    <p className='text-xs'>
        {resumeInfo?.summary}
    </p>
  )
}

export default SummeryPreview