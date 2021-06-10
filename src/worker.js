import heicConvert from "heic-convert";

export async function heicToJpg(file) {
  const buffer = await file.arrayBuffer();
  try {
    const outputBuffer = await heicConvert({
      buffer: Buffer.from(buffer), // the HEIC file buffer
      format: "JPEG", // output format
      quality: 1, // the jpeg compression quality, between 0 and 1
    });
    return outputBuffer;
  } catch (error) {
    console.log({ ...error });
  }
}
