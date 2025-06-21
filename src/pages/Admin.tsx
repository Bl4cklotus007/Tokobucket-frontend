import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart3, 
  Package, 
  Users, 
  MessageSquare, 
  Star, 
  LogOut,
  Settings,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ProductManagement from "@/components/admin/ProductManagement";
import { API_BASE_URL } from "@/config/api";

const Admin: React.FC = () => {
  const { user, token, logout, isAuthenticated, loading } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    if (isAuthenticated) {
      fetchDashboard();
    }
  }, [isAuthenticated, loading, navigate]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Gagal mengambil data dashboard");
      const data = await res.json();
      setDashboard(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Selamat datang, {user?.username}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline">{user?.role}</Badge>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produk
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Pesanan
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Testimoni
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Pesan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {dashboardLoading ? (
              <div className="text-center py-8">Loading dashboard...</div>
            ) : (
              dashboard && (
                <>
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboard.orders.total_orders}</div>
                        <p className="text-xs text-muted-foreground">
                          Pendapatan: Rp{dashboard.orders.total_revenue?.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Produk</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboard.products.total_products}</div>
                        <p className="text-xs text-muted-foreground">
                          {dashboard.products.featured_products} unggulan
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Testimoni</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboard.testimonials.total_testimonials}</div>
                        <p className="text-xs text-muted-foreground">
                          Rating: {typeof dashboard.testimonials.average_rating === 'number' ? dashboard.testimonials.average_rating.toFixed(1) : '0.0'}/5
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pesan Kontak</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboard.contact.total_messages}</div>
                        <p className="text-xs text-muted-foreground">
                          {dashboard.contact.unread_messages} belum dibaca
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pesanan Terbaru</CardTitle>
                      <CardDescription>
                        Daftar pesanan yang baru masuk
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">No. Order</th>
                              <th className="text-left py-2">Nama</th>
                              <th className="text-left py-2">Produk</th>
                              <th className="text-left py-2">Status</th>
                              <th className="text-left py-2">Total</th>
                              <th className="text-left py-2">Tanggal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dashboard.recent_orders.map((order: any) => (
                              <tr key={order.id} className="border-b">
                                <td className="py-2">{order.order_number}</td>
                                <td className="py-2">{order.customer_name}</td>
                                <td className="py-2">{order.product_name}</td>
                                <td className="py-2">
                                  <Badge variant={
                                    order.status === 'completed' ? 'default' :
                                    order.status === 'pending' ? 'secondary' :
                                    'outline'
                                  }>
                                    {order.status}
                                  </Badge>
                                </td>
                                <td className="py-2">Rp{order.total_price?.toLocaleString()}</td>
                                <td className="py-2">{order.created_at?.slice(0, 10)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Monthly Revenue */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tren Pendapatan Bulanan</CardTitle>
                      <CardDescription>
                        Pendapatan 6 bulan terakhir
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Bulan</th>
                              <th className="text-left py-2">Jumlah Pesanan</th>
                              <th className="text-left py-2">Pendapatan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dashboard.monthly_revenue.map((row: any) => (
                              <tr key={row.month} className="border-b">
                                <td className="py-2">{row.month}</td>
                                <td className="py-2">{row.order_count}</td>
                                <td className="py-2">Rp{row.revenue?.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )
            )}
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pesanan</CardTitle>
                <CardDescription>
                  Kelola pesanan pelanggan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fitur manajemen pesanan akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Testimoni</CardTitle>
                <CardDescription>
                  Kelola testimoni pelanggan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fitur manajemen testimoni akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Pesan Kontak</CardTitle>
                <CardDescription>
                  Kelola pesan dari pelanggan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fitur manajemen pesan akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin; 