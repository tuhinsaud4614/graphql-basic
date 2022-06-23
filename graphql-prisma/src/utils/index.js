import { GraphQLYogaError } from '@graphql-yoga/node';
import fs from 'fs';
import imageSize from 'image-size';
import jwt from 'jsonwebtoken';
import path from 'path';
import { promisify } from 'util';

export * from './constants';

export const AsyncImageSize = promisify(imageSize);
export const maxFileSize = (mb) => mb * 1000000;

export const convertFile = (file) => ({
  name: file.name,
  type: file.type,
  size: file.size,
  arrayBuffer: file.arrayBuffer,
  lastModified: file.lastModified,
  slice: file.slice,
  stream: file.stream,
  text: file.text,
  webkitRelativePath: file.webkitRelativePath
});

export async function fileUpload(file, { dest, name, filterFunction }) {
  const newFile = convertFile(file);

  const cb = (error, isValid) => {
    if (error !== null) {
      throw error;
    } else if (isValid === false) {
      throw new GraphQLYogaError('Invalid file type');
    }
  };

  try {
    filterFunction(file, cb);
    const newDest = dest || path.join(process.cwd(), 'files');
    fs.mkdirSync(newDest, { recursive: true });

    const newName = name ? name + path.extname(file.name) : file.name;
    const filePath = path.join(dest, newName);

    await fs.promises.writeFile(filePath, file.stream());

    return { ...newFile, name: newName, ext: path.extname(newName), filePath };
  } catch (error) {
    throw new GraphQLYogaError(error || 'Failed to upload file');
  }
}

export function isLoggedIn(request) {
  const authorization = request.headers.get('Authorization');

  if (!authorization) {
    return new GraphQLYogaError('Authentication required');
  }

  const token = authorization.split(' ')[1];

  const payload = jwt.verify(token, process.env.PRIVATE_KEY);

  return payload.id;
}
