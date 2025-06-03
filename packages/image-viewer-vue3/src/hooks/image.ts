import imageType, { ImageTypeResult} from 'image-type';

export const getImageType = (imageUrl:string = '') => {
    return new Promise<ImageTypeResult>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', imageUrl);
        xhr.responseType = 'arraybuffer';

        xhr.onload = () => {
            (async () => {
            const result = await imageType(new Uint8Array(xhr.response));
            resolve(result as ImageTypeResult)
            })();
        };

        xhr.send();
    })
}