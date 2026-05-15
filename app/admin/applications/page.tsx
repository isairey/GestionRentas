import Link from "next/link";

const page = () => {
  return (
    <div>
      <p className="mb-10">Yuo will see booked applications from here</p>
      <i className="text-gray-500 pt-10">No applications yet</i> <br />
      <i className="text-gray-400">
        have a vacant, click{" "}
        <Link
          href="/admin/rooms"
          className="text-blue-500 underline cursor pointer"
        >
          here
        </Link>{" "}
        to advertise
      </i>
    </div>
  );
};

export default page;
