import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Cropper, { Point, Area } from "react-easy-crop";
import {
  CropState,
  getCroppedImg,
  isFile,
  PixelCrop,
} from "../utils/imageUtils";
import { Pencil, User, X } from "lucide-react";

interface ProfileImageUploaderProps<T extends FieldValues>
  extends UseControllerProps<T> {
  name: Path<T>;
  control: Control<T>;
  rules?: any;
}

export const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ProfilePictureUploader = <T extends Record<string, any>>({
  name,
  control,
  rules = {},
}: ProfileImageUploaderProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState<boolean>(false);
  const [crop, setCrop] = useState<CropState>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  const { error } = fieldState;

  useEffect(() => {
    const value = field.value;

    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    if (
      typeof value === "object" &&
      value !== null &&
      "size" in value &&
      "type" in value
    ) {
      const potentialFile = value as File;
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(potentialFile);
    }
  }, [field.value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño máximo
    if (file.size > MAX_FILE_SIZE) {
      alert(
        `El archivo es demasiado grande (máx. ${MAX_FILE_SIZE / 1024 / 1024}MB)`
      );
      return;
    }

    // Validar tipo de imagen
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Formato de imagen no válido. Use JPEG, PNG, GIF o WEBP.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const onCropComplete = (_: Area, croppedAreaPixels: PixelCrop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropDone = async () => {
    if (!originalImage || !croppedAreaPixels) return;

    setIsLoading(true);

    try {
      // Crear imagen recortada
      const croppedImage = await getCroppedImg(
        originalImage,
        croppedAreaPixels,
        true // circular
      );

      // Crear objeto File para react-hook-form
      const file = new File([croppedImage], "profile-image.png", {
        type: "image/png",
        lastModified: Date.now(),
      });

      // Actualizar campo del formulario
      field.onChange(file);

      // Crear vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsLoading(false);
        setCropModalOpen(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error al recortar la imagen:", error);
      alert("Error al procesar la imagen. Intente con otra.");
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    field.onChange(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full h-30 flex justify-center items-center ">
        <div className="relative w-30 h-30 rounded-full overflow-hidden border-4 border-white shadow-md">
          {preview ? (
            <img
              src={preview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={"/UploadPhoto.svg"}
              alt="Profile preview"
              className="w-full h-full object-cover"
              width={25}
              height={25}
            />
          )}
        </div>
        <div className="absolute top-3 -right-8 flex flex-col gap-4 justify-center">
          {/* Botón editar */}
          <button
            type="button"
            onClick={handleEditClick}
            className="top-0 right-7 inset-0 z-50 bg-white rounded-full p-1.5 hover:bg-gray-200 shadow"
            title="Cambiar imagen"
          >
            <Pencil className="h-3 w-3 text-gray-700" />
          </button>

          {/* Botón eliminar */}
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="bottom-0 right-7 inset-0 z-50 bg-red-500 rounded-full p-1.5 hover:bg-red-600 shadow"
              title="Eliminar imagen"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/gif, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {cropModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 bg-gray-800 text-white">
              <h2 className="text-xl font-bold">Recortar imagen de perfil</h2>
              <p className="text-sm text-gray-300">
                Ajusta la imagen dentro del círculo
              </p>
            </div>

            <div className="p-4">
              <div className="relative w-full h-96">
                <Cropper
                  image={originalImage || undefined}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="round"
                  showGrid={false}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zoom: {Math.round(zoom * 100)}%
                </label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setCropModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCropDone}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  "Aplicar recorte"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error.message}</p>
      )}
    </div>
  );
};

export default ProfilePictureUploader;
