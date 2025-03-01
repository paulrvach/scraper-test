"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ContentBlock } from "../api/test-scraper/route";

interface DataContextProps {
  url: string | null;
  children: React.ReactNode;
}

interface DataContextValue {
  data: { data: ContentBlock[] } | null;
  isLoading: boolean;
  error: Error | null;
  setUrl: (url: string | null) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ url: initialUrl, children }: DataContextProps) {
  const [data, setData] = useState<{ data: ContentBlock[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [url, setInternalUrl] = useState<string | null>(initialUrl);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setData(null);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/test-scraper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: { data: ContentBlock[] } = await response.json();
        setData(jsonData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unexpected error occurred."));
        }
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const setUrl = (newUrl: string | null) => {
    setInternalUrl(newUrl);
  };

  const value: DataContextValue = {
    data,
    isLoading,
    error,
    setUrl,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
