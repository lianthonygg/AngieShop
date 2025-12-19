export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropState {
  x: number;
  y: number;
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(image));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: PixelCrop,
  circular: boolean = false
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const diameter = Math.min(pixelCrop.width, pixelCrop.height);
  canvas.width = diameter;
  canvas.height = diameter;

  if (circular) {
    ctx.beginPath();
    ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    diameter,
    diameter
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        throw new Error("Canvas to Blob conversion failed");
      }
    }, "image/png");
  });
};

export function isFile(value: unknown): value is File {
  return (
    value instanceof File ||
    (typeof value === "object" &&
      value !== null &&
      "name" in value &&
      "size" in value &&
      "type" in value)
  );
}
