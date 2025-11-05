import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AddOrUpdateNews() {
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Soạn thảo bài viết</h2>

      <CKEditor
        editor={ClassicEditor}
        data="<p>Nội dung ban đầu...</p>"
        onChange={(_, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />

      <div className="mt-4">
        <h3 className="font-semibold">Xem trước:</h3>
        <div
          className="border p-2 rounded bg-gray-50"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
