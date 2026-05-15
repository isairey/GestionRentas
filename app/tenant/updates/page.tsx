"use client";

import { useEffect, useState } from "react";
import type { Update } from "@/app/types/data";

const Updates = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUpdates = async () => {
    try {
      const response = await fetch("/api/updates", {
        cache: "no-store",
      });

      if (!response.ok) { 
        throw new Error("Failed to fetch updates");
      }

      const data: Update[] = await response.json();
      setUpdates(data);
    } catch (err) {
      console.error("Error fetching updates", err);
      setError("Could not load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No announcements yet</p>
        <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="sticky top-0 bg-gray-950 z-10 pb-2">
        <h3 className="text-lg font-semibold text-white px-1">
          Announcements
        </h3>
        <p className="text-xs text-gray-400 px-1">
          Updates from your landlord
        </p>
      </div>

      <div className="space-y-3">
        {updates.map((item) => (
          <div
            key={item._id}
            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-200 border border-gray-800"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate">
                  {item.update}
                </h4>
                {item.description && (
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {", "}
                    {new Date(item.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;