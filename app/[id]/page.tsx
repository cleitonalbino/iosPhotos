import { notFound } from "next/navigation";
import imagesData from "../../data/images.json";
import PhotoViewer from "./PhotoViewer";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Gera todas as páginas estáticas no build (EXCELENTE para SEO!)
export async function generateStaticParams() {
  return imagesData.map((image) => ({
    id: image.id,
  }));
}

export default async function PhotoPage({ params }: PageProps) {
  const { id } = await params;

  // Buscar a imagem atual no servidor
  const currentImage = imagesData.find((img) => img.id === id);

  // Se a imagem não existir, retorna 404
  if (!currentImage) {
    notFound();
  }

  // Renderiza o componente client-side com a imagem inicial (SSR)
  return <PhotoViewer initialImage={currentImage} />;
}
