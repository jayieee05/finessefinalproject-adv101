'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function DashboardPage() {
  const { user, isAuthenticated, isOwner, getToken } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState(null);

  useEffect(() => {
    // Wait for auth to load
    if (user === null && isAuthenticated() === false) {
      router.push('/login');
      return;
    }

    // Check if user is loaded and is owner
    if (user && !isOwner()) {
      router.push('/');
      return;
    }

    // Load dashboard data if user is owner
    if (user && isOwner()) {
      loadDashboardData();
    }
  }, [user, router]);

  // Trigger page animation when component mounts
  useEffect(() => {
    if (user && isOwner() && !loading) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setPageLoaded(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [user, isOwner, loading]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      
      if (!token) {
        console.error('No token available');
        setLoading(false);
        return;
      }
      
      // Load stats
      const statsResponse = await fetch(`${API_URL}/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (statsData.success) {
          setStats(statsData.stats);
        } else {
          console.error('Stats API error:', statsData.error);
        }
      } else {
        const errorData = await statsResponse.json().catch(() => ({}));
        console.error('Stats API failed:', statsResponse.status, errorData);
      }

      // Load orders
      const ordersResponse = await fetch(`${API_URL}/admin/orders?limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        if (ordersData.success) {
          setOrders(ordersData.orders);
        } else {
          console.error('Orders API error:', ordersData.error);
        }
      } else {
        const errorData = await ordersResponse.json().catch(() => ({}));
        console.error('Orders API failed:', ordersResponse.status, errorData);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
      'processing': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      'shipped': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      'delivered': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      'cancelled': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
    };
    return colors[status] || colors['pending'];
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(prev => ({ ...prev, [orderId]: true }));
      const token = getToken();
      
      if (!token) {
        alert('Authentication required');
        return;
      }

      const response = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update the order in the local state
          setOrders(prevOrders => 
            prevOrders.map(order => 
              order.id === orderId 
                ? { ...order, status: newStatus }
                : order
            )
          );
        } else {
          alert('Failed to update order status');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('An error occurred while updating the order status');
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleDeleteOrder = async (orderId, orderNumber) => {
    // Confirm deletion
    const confirmed = window.confirm(
      `Are you sure you want to delete order ${orderNumber}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    // Ensure orderId is a number
    const numericOrderId = Number(orderId);
    if (isNaN(numericOrderId) || numericOrderId <= 0) {
      alert('Invalid order ID');
      return;
    }

    setDeletingOrder(numericOrderId);
    
    try {
      const token = getToken();
      
      if (!token) {
        alert('Authentication required');
        setDeletingOrder(null);
        return;
      }

      console.log('Deleting order:', numericOrderId, 'Type:', typeof numericOrderId);
      console.log('Delete URL:', `${API_URL}/admin/orders/${numericOrderId}`);
      
      const response = await fetch(`${API_URL}/admin/orders/${numericOrderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response status:', response.status);
      console.log('Delete response headers:', Object.fromEntries(response.headers.entries()));

      // Read response once
      const responseText = await response.text();
      let responseData = null;
      
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
        } catch (e) {
          console.error('Failed to parse response as JSON:', responseText);
        }
      }

      if (response.ok) {
        if (responseData && responseData.success) {
          console.log('Delete response data:', responseData);
          // Remove the order from the local state
          setOrders(prevOrders => prevOrders.filter(order => Number(order.id) !== numericOrderId));
          // Reload dashboard data to update stats
          loadDashboardData();
        } else {
          const errorMsg = responseData?.error || 'Failed to delete order';
          console.error('Delete failed:', responseData);
          alert(errorMsg);
        }
      } else {
        let errorMessage = `Failed to delete order. Status: ${response.status}`;
        if (responseData && responseData.error) {
          errorMessage = responseData.error;
        } else if (responseText && responseText.includes('Cannot DELETE')) {
          errorMessage = 'Delete route not found. Please restart the server.';
        }
        console.error('Delete error response:', responseData || responseText);
        console.error('Response status:', response.status);
        console.error('Response statusText:', response.statusText);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert(`An error occurred while deleting the order: ${error.message}`);
    } finally {
      setDeletingOrder(null);
    }
  };

  // Show loading or access denied
  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col dashboard-container">
        <Header />
        <main className="flex-grow flex items-center justify-center dashboard-loading">
          <div className="text-center">
            <div className="dashboard-spinner"></div>
            <p className="dashboard-loading-text">Loading dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  // Check if user is owner
  if (!isOwner()) {
    return (
      <div className="min-h-screen flex flex-col dashboard-container">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center dashboard-access-denied">
            <div className="dashboard-access-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h1 className="dashboard-access-title">Access Denied</h1>
            <p className="dashboard-access-message">You need owner privileges to access this page.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col dashboard-container ${pageLoaded ? 'dashboard-page-loaded' : ''}`}>
      <Header />
      <main className={`flex-grow dashboard-main ${pageLoaded ? 'dashboard-main-loaded' : ''}`}>
        <div className={`dashboard-wrapper ${pageLoaded ? 'dashboard-content-loaded' : ''}`}>
          {/* Header Section */}
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">Owner Dashboard</h1>
            </div>
            <div className="dashboard-header-actions">
              <button 
                onClick={loadDashboardData}
                className="dashboard-refresh-btn"
                title="Refresh data"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"/>
                  <polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card dashboard-stat-card-users">
                <div className="dashboard-stat-icon-wrapper dashboard-stat-icon-users">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="dashboard-stat-content">
                  <p className="dashboard-stat-label">Total Users</p>
                  <p className="dashboard-stat-value">{stats.totalUsers}</p>
                  <p className="dashboard-stat-change">Active customers</p>
                </div>
              </div>

              <div className="dashboard-stat-card dashboard-stat-card-orders">
                <div className="dashboard-stat-icon-wrapper dashboard-stat-icon-orders">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 11V7a4 4 0 0 0-8 0v4"/>
                    <rect x="5" y="11" width="14" height="10" rx="2" ry="2"/>
                  </svg>
                </div>
                <div className="dashboard-stat-content">
                  <p className="dashboard-stat-label">Total Orders</p>
                  <p className="dashboard-stat-value">{stats.totalOrders}</p>
                  <p className="dashboard-stat-change">All time orders</p>
                </div>
              </div>

              <div className="dashboard-stat-card dashboard-stat-card-revenue">
                <div className="dashboard-stat-icon-wrapper dashboard-stat-icon-revenue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="dashboard-stat-content">
                  <p className="dashboard-stat-label">Total Revenue</p>
                  <p className="dashboard-stat-value">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="dashboard-stat-change">From paid orders</p>
                </div>
              </div>

              <div className="dashboard-stat-card dashboard-stat-card-products">
                <div className="dashboard-stat-icon-wrapper dashboard-stat-icon-products">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </div>
                <div className="dashboard-stat-content">
                  <p className="dashboard-stat-label">Total Products</p>
                  <p className="dashboard-stat-value">{stats.totalProducts}</p>
                  <p className="dashboard-stat-change">Active products</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Orders Section */}
          <div className="dashboard-orders-section">
            <div className="dashboard-section-header">
              <div>
                <h2 className="dashboard-section-title">Recent Orders</h2>
                <p className="dashboard-section-subtitle">Latest customer orders and their status</p>
              </div>
            </div>
            
            <div className="dashboard-orders-card">
              {orders.length > 0 ? (
                <div className="dashboard-table-container">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => {
                        const statusColors = getStatusColor(order.status);
                        return (
                          <tr key={order.id} className="dashboard-table-row">
                            <td>
                              <span className="dashboard-order-number">{order.order_number}</span>
                            </td>
                            <td>
                              <div className="dashboard-customer-info">
                                <p className="dashboard-customer-name">{order.user_name || order.shipping_full_name}</p>
                                <p className="dashboard-customer-email">{order.user_email || order.shipping_email}</p>
                              </div>
                            </td>
                            <td>
                              <span className="dashboard-order-amount">{formatCurrency(order.total_amount)}</span>
                            </td>
                            <td>
                              <div className="dashboard-status-select-wrapper">
                                <select
                                  value={order.status}
                                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                  disabled={updatingStatus[order.id]}
                                  className={`dashboard-status-select ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}
                                >
                                  {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                {updatingStatus[order.id] && (
                                  <span className="dashboard-status-updating">Updating...</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className="dashboard-order-date">{formatDate(order.created_at)}</span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleDeleteOrder(order.id, order.order_number)}
                                disabled={deletingOrder === order.id}
                                className="dashboard-delete-btn"
                                title="Delete order"
                              >
                                {deletingOrder === order.id ? (
                                  <span className="dashboard-delete-loading">Deleting...</span>
                                ) : (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                  </svg>
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="dashboard-empty-state">
                  <div className="dashboard-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 11V7a4 4 0 0 0-8 0v4"/>
                      <rect x="5" y="11" width="14" height="10" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <h3 className="dashboard-empty-title">No orders yet</h3>
                  <p className="dashboard-empty-message">Orders will appear here once customers start placing them.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
