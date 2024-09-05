export function dataURLToFile(dataURL, filename) {
    const [header, data] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(array)], {
        type: mime,
    });
    console.log(mime);
    const extension = mime.split("/")[1] || "jpeg";
    return new File([file], `${filename}.${extension}`, { type: mime });
}