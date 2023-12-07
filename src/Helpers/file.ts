export function srcToFile(src: string, fileName: string, mimeType: string) {
    return fetch(src)
        .then((res) => { return res.arrayBuffer(); })
        .then((buf) => { return new File([buf], fileName, { type: mimeType }); });
}