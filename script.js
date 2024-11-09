function updatePreview() {
  const code = document.getElementById("codeInput").value;
  const previewFrame = document.getElementById("previewFrame").contentDocument || document.getElementById("previewFrame").contentWindow.document;
  previewFrame.open();
  previewFrame.write(code);
  previewFrame.close();
}

async function downloadFile(type) {
  const code = document.getElementById("codeInput").value;
  let mimeType = "text/plain";
  let extension = type;

  if (type === "zip") {
    // Create a .zip file using JSZip
    const zip = new JSZip();
    zip.file("code.html", code);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "code.zip";
    link.click();
    URL.revokeObjectURL(url);
    return;
  }

  switch(type) {
    case "html":
      mimeType = "text/html";
      break;
    case "txt":
      mimeType = "text/plain";
      break;
    case "doc":
    case "docx":
      mimeType = "application/msword";
      break;
    case "rtf":
      mimeType = "application/rtf";
      break;
  }

  const blob = new Blob([code], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `code.${extension}`;
  link.click();
  URL.revokeObjectURL(url);
}
