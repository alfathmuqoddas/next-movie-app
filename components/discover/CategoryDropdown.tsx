"use client";

import { useRouter, useParams } from "next/navigation";

export default function CategoryDropdown({ categoryData }) {
  const router = useRouter();
  const params = useParams<{ categoryId: string; mediaType: string }>();

  return (
    <div className="flex gap-8">
      <select
        name="categoryId"
        id="categoryId"
        className="select select-sm"
        onChange={(e) => {
          const newCategoryId = e.target.value;
          router.push(`/discover/${params?.mediaType}/${newCategoryId}/1`);
        }}
      >
        {categoryData.map((category) => (
          <option
            key={category.id}
            value={category.id}
            defaultValue={params?.categoryId}
            selected={category.id === Number(params?.categoryId)}
          >
            {category.name}
          </option>
        ))}
      </select>
      <select
        name="media_type"
        id="media_type"
        className="select select-sm"
        onChange={(e) => {
          const newMediaType = e.target.value;
          router.push(`/discover/${newMediaType}`);
        }}
      >
        <option value="movie" selected={params?.mediaType === "movie"}>
          Movies
        </option>
        <option value="tv" selected={params?.mediaType === "tv"}>
          TV Series
        </option>
      </select>
    </div>
  );
}
