"use client";

import { useRouter, useParams } from "next/navigation";

export default function CategoryDropdown({ categoryData }) {
  const router = useRouter();
  const params = useParams<{ categoryId: string; mediaType: string }>();

  return (
    <select
      name="categoryId"
      id="categoryId"
      className="select select-sm"
      onChange={(e) => {
        const newCategoryId = e.target.value;
        router.push(`/discover/${params?.mediaType}/${newCategoryId}/1`);
      }}
    >
      <option value="" selected={categoryData.id === ""}>
        All Categories
      </option>
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
  );
}
