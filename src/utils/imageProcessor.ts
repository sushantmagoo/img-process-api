import sharp from 'sharp';

export default async (
  filepath: string,
  height: number,
  width: number
): Promise<Buffer> => {
  try {
    return await sharp(filepath).resize({ height, width }).toBuffer();
  } catch (e) {
    console.log(e);
    throw new Error('failed to process image');
  }
};
