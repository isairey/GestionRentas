"use client";
import { Loader2, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Update } from "@/app/types/data";

const Page = () => {
  const [form, setForm] = useState({
    update: "",
    description: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [res, setRes] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<Update[]>([]);
  const [fetching, setFetching] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRes(null);

    try {
      const response = await axios.post("/api/updates", form);
      setRes(response.data.message || "Update sent successfully!");

      setTimeout(() => {
        setRes(null);
      }, 2000);

      setError(null);

      setForm({ update: "", description: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to send update");
      } else {
        setError("An unexpected error occurred");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdates = async () => {
    setFetching(true);
    try {
      const fetches = await fetch("/api/updates", { cache: "no-store" });

      if (!fetches.ok) {
        throw new Error("Failed to fetch announcements");
      }

      const data: Update[] = await fetches.json();
      setAnnouncement(data);
    } catch (error) {
      console.error("Error fetching updates", error);
      setError("Could not load announcements");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  return (
    <div className="min-h-screen bg-[#060219] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Send Announcements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg space-y-4 bg-gray-900 p-6 rounded-xl border h-fit border-gray-700"
        >
          <input
            name="update"
            value={form.update}
            onChange={handleChange}
            placeholder="Update"
            required
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description..."
            rows={4}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed py-2 rounded font-semibold transition-colors flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Send"}
          </button>

          {error && <span className="text-red-500">{error}</span>}

          {res && (
            <p className="mt-2 text-sm text-center bg-green-600 p-3 rounded border border-gray-700">
              {res}
            </p>
          )}
        </form>
        <div>
          <h2 className="text-xl font-semibold text-center pb-3">
            Previously send updates
          </h2>
          {fetching ? (
            <div className="flex justify-center items-center gap-2 py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-gray-400 text-sm">
                Fetching announcements...
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {announcement.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900 rounded-lg p-2 hover:bg-gray-800 transition-colors duration-200 border border-gray-800"
                >
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white truncate">
                          {item.update}
                        </h4>
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <EllipsisVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      {item.description && (
                        <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      <div className="mt-3 border-t border-gray-800 pt-2">
                        <span className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                          {", "}
                          {new Date(item.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
