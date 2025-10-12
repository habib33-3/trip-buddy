import type { ChangeEvent } from "react";
import { useRef, useState } from "react";

import { RefreshCcw, Upload } from "lucide-react";

import useChangeAvatar from "@/hooks/user/useChangeAvatar";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

const ChangeAvatar = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { changeAvatar, isLoading } = useChangeAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleChangeAvatar = () => {
    if (file) {
      changeAvatar(file);
      setFile(null);
      setPreviewImage(null);
    }
  };

  return (
    <Card
      id="change-avatar"
      className="rounded-2xl border border-white/10 bg-slate-800/80 shadow-2xl backdrop-blur-md"
    >
      <CardHeader>
        <h2 className="text-2xl font-bold tracking-tight text-gray-300">
          Change Avatar
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Upload a new profile picture to personalize your account.
        </p>
      </CardHeader>

      <CardContent className="pt-4">
        {previewImage ? (
          <div className="relative flex h-[300px] w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-600 bg-slate-900/40">
            <img
              src={previewImage}
              alt="Uploaded"
              className="h-full w-full rounded-lg object-cover"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-4 bottom-4 flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1 text-sm text-white shadow-md transition duration-200 hover:scale-105 hover:bg-blue-700"
            >
              <RefreshCcw className="size-4" />
              <span>Change</span>
            </Button>
          </div>
        ) : (
          <Label
            htmlFor="image"
            className="relative flex h-[300px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-600 bg-slate-900/40 text-lg transition hover:bg-slate-800/60"
          >
            <Upload className="h-8 w-8 text-slate-400" />
            <span className="text-slate-400">Choose a file</span>
            <div className="absolute bottom-4 px-4 text-center text-xs text-slate-500">
              Recommended: High-quality JPG, less than 20 MB
            </div>
          </Label>
        )}

        <Input
          id="image"
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleUploadImage}
        />

        <Button
          onClick={handleChangeAvatar}
          disabled={!file}
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-blue-700"
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChangeAvatar;
