import Image from 'next/image'

interface EmploymentCardProps {
  organization: string
  organizationFullName?: string
  jobTitle: string
  jobType: string
  dateString: string
  orgLogoSrc?: string
}

const EmploymentCard = (props: EmploymentCardProps) => {
  const { organization, jobTitle, dateString, jobType, orgLogoSrc, organizationFullName } = props

  return (
    <div className="flex w-full flex-col gap-y-2 rounded-md border border-gray-200 bg-white shadow-sm dark:bg-gray-800">
      <div className="text-normal px-4.5 flex w-full items-center justify-between gap-x-2.5 overflow-hidden overflow-x-auto whitespace-nowrap border-b border-gray-200 py-2.5 font-medium tracking-wide text-gray-700  dark:text-white">
        <div className="flex items-center gap-x-2">
          {orgLogoSrc && (
            <Image
              src={orgLogoSrc}
              height={24}
              width={24}
              alt={`${organization} logo`}
              className="rounded-full border bg-white "
            />
          )}
          <p>{organization}</p>
        </div>
        <label className="rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
          {jobType}
        </label>
      </div>
      <div className="px-4.5 flex items-center justify-between gap-x-2.5 overflow-hidden overflow-x-auto whitespace-nowrap pb-2.5 pt-1">
        <div className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
          <p>{jobTitle}</p>
        </div>
        <div className="flex flex-col items-start gap-x-2.5 gap-y-2 text-xs font-medium text-gray-500 lg:items-center">
          {dateString}
        </div>
      </div>
      {organizationFullName && (
        <div className="px-4.5 -mt-[8px] flex items-center border-t border-gray-200 py-1.5 ">
          <p className="text-sm text-gray-500 dark:text-gray-400">{organizationFullName}</p>
        </div>
      )}
    </div>
  )
}

export default EmploymentCard
