"use client";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Toggle({
  mediaType,
  currentSearch,
}: {
  mediaType: "movie" | "tv";
  currentSearch: string;
}) {
  const router = useRouter();
  const [toggleMediaType, setToggleMediaType] = useState(mediaType);
  const toggleRadio = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
  ];
  const handleToggleChange = (e) => {
    const newValue = e.target.value;
    router.push(`/search/${newValue}/${currentSearch}`);
    setToggleMediaType(newValue as "movie" | "tv");
  };

  return (
    <div className="flex border rounded-full mb-8">
      <RadioButtonGroup
        contents={toggleRadio}
        onChange={handleToggleChange}
        checkedFunction={toggleMediaType}
      />
    </div>
  );
}
