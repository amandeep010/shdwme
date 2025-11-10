"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Video } from "lucide-react";
import { CATEGORY, SIZE } from "@prisma/client";
import { createProduct } from "@/lib/api/product.service";

export default function AddProductDialog({ mutate }: { mutate: any }) {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: CATEGORY.OVERSIZED_HOODIE,
    size: SIZE.M,
    detail: "",
  });

  // handle form text changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle multiple images
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // handle multiple videos
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setVideos(files);
    setVideoPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));

      // append multiple images
      images.forEach((file) => form.append("images", file));
      // append multiple videos
      videos.forEach((file) => form.append("videos", file));

      const res = await createProduct(form);
      if (res) {
        mutate();
        setOpen(false);
        toast.success("Product saved successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Can't save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((old) => !old)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ImagePlus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill out product details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* IMAGES */}
          <div className="grid gap-2">
            <Label htmlFor="images">Product Images</Label>
            <Input type="file" id="images" accept="image/*" multiple onChange={handleImageChange} />
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3 bg-gray-50 p-2 rounded-lg shadow-inner">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`image-${idx}`}
                    className="w-20 h-20 rounded-md object-cover shadow-sm border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* VIDEOS */}
          <div className="grid gap-2">
            <Label htmlFor="videos">Product Videos</Label>
            <Input type="file" id="videos" accept="video/*" multiple onChange={handleVideoChange} />
            {videoPreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3 bg-gray-50 p-2 rounded-lg shadow-inner">
                {videoPreviews.map((src, idx) => (
                  <video
                    key={idx}
                    src={src}
                    controls
                    className="w-32 h-24 rounded-lg shadow-sm border object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* TEXT INPUTS */}
          <div className="grid gap-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select id="category" name="category" className="border rounded-md p-2" value={formData.category} onChange={handleChange}>
              {Object.values(CATEGORY).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="size">Size</Label>
            <select id="size" name="size" className="border rounded-md p-2" value={formData.size} onChange={handleChange}>
              {Object.values(SIZE).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="detail">Details</Label>
            <Input id="detail" name="detail" value={formData.detail} onChange={handleChange} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
