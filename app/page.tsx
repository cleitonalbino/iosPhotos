import { redirect } from 'next/navigation';
import imagesData from '../data/images.json';

export default function Home() {
  // Redireciona para uma imagem aleatória
  const randomImage = imagesData[Math.floor(Math.random() * imagesData.length)];
  redirect(`/${randomImage.id}`);
}
