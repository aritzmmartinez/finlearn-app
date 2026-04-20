import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

/**
 * Resize + compress image and return base64 string.
 * We cap at 1600px wide to keep the Claude Vision request under ~1MB.
 */
export async function imageToBase64(uri: string): Promise<{
  base64: string;
  mimeType: "image/jpeg" | "image/png";
}> {
  const imageRef = await ImageManipulator.manipulate(uri)
    .resize({ width: 1600 })
    .renderAsync();

  const result = await imageRef.saveAsync({
    compress: 0.85,
    format: SaveFormat.JPEG,
    base64: true,
  });

  return { base64: result.base64!, mimeType: "image/jpeg" };
}
