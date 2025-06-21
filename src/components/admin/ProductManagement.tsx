import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { API_BASE_URL } from "@/config/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  image_url: string;
  features: string[];
  is_featured: boolean | number;
  is_active: boolean | number;
  rating: number;
  reviews_count: number;
  created_at: string;
}

// Category configuration
const CATEGORIES = {
  bucket: "Bucket Wisuda",
  balon: "Dekorasi Balon", 
  pernikahan: "Dekorasi Pernikahan"
} as const;

type CategoryKey = keyof typeof CATEGORIES;

const ProductManagement: React.FC = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categoryStats, setCategoryStats] = useState<{[key: string]: number}>({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "bucket",
    features: [] as string[],
    is_featured: false,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategoryStats();
  }, []);

  const fetchCategoryStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/categories/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const stats: {[key: string]: number} = {};
        data.data.forEach((stat: any) => {
          stats[stat.category] = stat.count;
        });
        setCategoryStats(stats);
      }
    } catch (err) {
      console.error("Error fetching category stats:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = `${API_BASE_URL}/api/products/admin/all`;
      const params = new URLSearchParams();
      
      if (selectedCategory && selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data produk");
      }

      const data = await response.json();
      
      // Convert is_featured from number to boolean
      const productsWithBooleanFeatured = data.data.map((product: any) => ({
        ...product,
        is_featured: Boolean(product.is_featured),
        is_active: Boolean(product.is_active)
      }));
      
      setProducts(productsWithBooleanFeatured);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refetch products when category filter changes
  useEffect(() => {
    if (!loading) {
      fetchProducts();
    }
  }, [selectedCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("original_price", formData.original_price);
      
      // Only send category if it's not empty
      if (formData.category && formData.category.trim() !== "") {
        formDataToSend.append("category", formData.category);
      }
      
      formDataToSend.append("is_featured", formData.is_featured.toString());
      
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      const url = editingProduct 
        ? `${API_BASE_URL}/api/products/${editingProduct.id}`
        : `${API_BASE_URL}/api/products`;
      
      const method = editingProduct ? "PUT" : "POST";

      // Set headers for FormData
      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(url, {
        method,
        headers,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        
        // Handle validation errors
        if (errorData.details && Array.isArray(errorData.details)) {
          const errorMessages = errorData.details.map((err: any) => {
            const field = err.field || err.path || 'unknown';
            const message = err.message || err.msg || 'Unknown error';
            return `${field}: ${message}`;
          }).join(', ');
          throw new Error(`Validasi gagal: ${errorMessages}`);
        }
        
        throw new Error(errorData.message || errorData.error || "Gagal menyimpan produk");
      }

      const result = await response.json();
      console.log("Success:", result);

      resetForm();
      setIsDialogOpen(false);
      fetchProducts();
      fetchCategoryStats();
    } catch (err: any) {
      console.error("Error in handleSubmit:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || "",
      category: product.category || "bucket",
      features: product.features,
      is_featured: Boolean(product.is_featured),
    });
    setImagePreview(product.image_url ? 
      (product.image_url.startsWith('http') ? product.image_url : `${API_BASE_URL}${product.image_url}`) 
      : null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus produk");
      }

      fetchProducts();
      fetchCategoryStats();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleFeatured = async (productId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}/toggle-featured`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengubah status unggulan");
      }

      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleActive = async (productId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}/toggle-active`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengubah status aktif");
      }

      fetchProducts();
      fetchCategoryStats();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCleanupImages = async () => {
    if (!confirm("Apakah Anda yakin ingin membersihkan gambar yang tidak terpakai? Tindakan ini tidak dapat dibatalkan.")) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/products/cleanup-images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal membersihkan gambar");
      }

      const data = await response.json();
      alert(`Cleanup berhasil! ${data.data.deleted_count} gambar dihapus, ${data.data.error_count} error.`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      original_price: "",
      category: "bucket",
      features: [],
      is_featured: false,
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingProduct(null);
  };

  const openNewProductDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading && products.length === 0) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manajemen Produk</h2>
          <p className="text-gray-600">Kelola produk bucket wisuda dan dekorasi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCleanupImages} disabled={loading}>
            {loading ? "Membersihkan..." : "Bersihkan Gambar"}
          </Button>
          <Button onClick={openNewProductDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <Label htmlFor="category-filter">Filter Kategori:</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {Object.entries(CATEGORIES).map(([key, name]) => (
              <SelectItem key={key} value={key}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500">
          {products.length} produk ditemukan
        </span>
      </div>

      {/* Category Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(CATEGORIES).map(([key, name]) => (
          <Card key={key} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{name}</p>
                <p className="text-2xl font-bold">{categoryStats[key] || 0}</p>
              </div>
              <Badge 
                variant={
                  key === "bucket" ? "default" : 
                  key === "balon" ? "secondary" : 
                  key === "pernikahan" ? "outline" : "secondary"
                }
              >
                {name}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className={`${!product.is_active ? 'opacity-60' : ''}`}>
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src={product.image_url ? 
                  (product.image_url.startsWith('http') ? product.image_url : `${API_BASE_URL}${product.image_url}`) 
                  : "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{product.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <Badge 
                  variant={
                    product.category === "bucket" ? "default" : 
                    product.category === "balon" ? "secondary" : 
                    product.category === "pernikahan" ? "outline" : "secondary"
                  }
                >
                  {CATEGORIES[product.category as CategoryKey] || product.category}
                </Badge>
                {product.is_featured && (
                  <Badge variant="outline">Unggulan</Badge>
                )}
                {!product.is_active && (
                  <Badge variant="destructive">Nonaktif</Badge>
                )}
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-bold text-lg">Rp{product.price.toLocaleString()}</span>
                  {product.original_price && (
                    <span className="text-gray-500 line-through ml-2">
                      Rp{product.original_price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleFeatured(product.id)}
                >
                  {product.is_featured ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleActive(product.id)}
                >
                  {product.is_active ? "Nonaktif" : "Aktif"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct ? "Edit informasi produk" : "Tambahkan produk baru ke katalog"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORIES).map(([key, name]) => (
                      <SelectItem key={key} value={key}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="original_price">Harga Asli (Opsional)</Label>
                <Input
                  id="original_price"
                  name="original_price"
                  type="number"
                  value={formData.original_price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Gambar Produk</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
              />
              <Label htmlFor="is_featured">Tampilkan sebagai unggulan</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : editingProduct ? "Update" : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;