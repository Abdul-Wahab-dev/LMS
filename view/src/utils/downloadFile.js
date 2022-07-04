const downloadFile = (id, fileName) => {
  const parentElement = document.getElementById(`${id}`);
  const link = document.createElement("a");
  // link.href = "app-debug.apk";
  link.href = `https://deefile.s3.amazonaws.com/${fileName}`;
  link.setAttribute("download", "e-kart.apk");
  parentElement.appendChild(link);

  link.click();

  link.parentNode.removeChild(link);
};
export default downloadFile;
