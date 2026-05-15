type StatCardProps = {
  title: string
  value: string | number
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="p-4 rounded-xl bg-gray-900 ">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}
export default StatCard