import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ onChange, name, value }) => {
	return (
		<CKEditor
			name={name}
			editor={ClassicEditor}
			data={value}
			config={{
				ckfinder: { uploadUrl: "http://localhost:5000/upload" },
				mediaEmbed: {
					previewsInData: true,
				},
			}}
			onChange={(event, editor) => {
				const data = editor.getData();
				onChange(data);
			}}
		/>
	);
};

export default Editor;
