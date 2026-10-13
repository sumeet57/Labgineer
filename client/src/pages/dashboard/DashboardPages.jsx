import { useState } from "react";
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiShoppingBag,
  FiUser,
  FiDownload,
  FiLogOut,
  FiLock,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { userAPI } from "../../api/services";
import { useFetch } from "../../hooks/useApi";
import { Button, Input, Spinner, EmptyState } from "../../components/common/Ui";

const sidebarLinks = [
  { to: "/dashboard", end: true, icon: FiGrid, label: "Overview" },
  { to: "/dashboard/orders", icon: FiShoppingBag, label: "My Orders" },
  { to: "/dashboard/profile", icon: FiUser, label: "Profile" },
];

export function DashboardLayout() {
  const { isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={32} />
      </div>
    );
  if (!isAuthenticated)
    return (
      <Navigate
        to="/auth/login"
        state={{ from: { pathname: "/dashboard" } }}
        replace
      />
    );

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.info("Logged out.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-56 flex-shrink-0">
          <nav className="flex md:flex-col gap-1">
            {sidebarLinks.map(({ to, end, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-mono transition-all ${
                    isActive
                      ? "text-white font-bold"
                      : "text-muted hover:text-primary hover:bg-surface-alt"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "var(--color-highlight)" } : {}
                }
              >
                <Icon size={15} />
                <span className="hidden sm:block">{label}</span>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-mono text-muted hover:text-red-400 hover:bg-surface-alt transition-all md:mt-4"
            >
              <FiLogOut size={15} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ─── Overview ─────────────────────────────────────────
export function DashboardOverview() {
  const { user } = useAuth();
  const { data: ordersData } = useFetch("/user/orders");
  const orders = ordersData?.orders || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-black font-display text-primary mb-6">
        Hey, {user?.name?.split(" ")[0]} 👋
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Projects purchased", value: orders.length },
          {
            label: "Downloads available",
            value: orders.filter((o) => o.status === "completed").length,
          },
          {
            label: "Member since",
            value: new Date(user?.createdAt).toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
            }),
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-card border border-surface rounded-xl p-5"
          >
            <div className="text-2xl font-black font-mono text-accent mb-1">
              {value}
            </div>
            <div className="text-xs text-muted">{label}</div>
          </div>
        ))}
      </div>

      {orders.length > 0 && (
        <div>
          <h2 className="text-sm font-mono uppercase tracking-widest text-muted mb-4">
            Recent orders
          </h2>
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 bg-card border border-surface rounded-xl"
              >
                <div>
                  <p className="text-sm font-bold text-primary">
                    {order.product?.title}
                  </p>
                  <p className="text-xs text-muted font-mono mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="tag-pill">{order.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Orders ───────────────────────────────────────────
export function DashboardOrders() {
  const { data, loading } = useFetch("/user/orders");
  const orders = data?.orders || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-xl font-black font-display text-primary mb-6">
        My Orders
      </h2>
      {loading ? (
        <Spinner size={28} />
      ) : orders.length === 0 ? (
        <EmptyState
          icon="🛒"
          title="No orders yet"
          description="Purchase a project to see it here."
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-card border border-surface rounded-xl gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-alt flex-shrink-0 overflow-hidden">
                  {order.product?.thumbnail ? (
                    <img
                      src={order.product.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-alt" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">
                    {order.product?.title}
                  </p>
                  <p className="text-xs text-muted font-mono">
                    ₹{order.amount} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="tag-pill">{order.status}</span>
                {order.status === "completed" && (
                  <Button size="sm" variant="outline">
                    <FiDownload size={12} /> Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Profile ──────────────────────────────────────────
export function DashboardProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [passForm, setPassForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [saving, setSaving] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await userAPI.updateProfile(form);
      updateUser(res.data.user);
      console.log("Profile updated:", res.data.user);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passForm.newPass !== passForm.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await userAPI.changePassword({
        currentPassword: passForm.current,
        newPassword: passForm.newPass,
      });
      toast.success("Password changed!");
      setPassForm({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-xl font-black font-display text-primary mb-6">
          Profile
        </h2>
        <form
          onSubmit={handleProfileSave}
          className="bg-card border border-surface rounded-2xl p-6 space-y-4"
        >
          <Input
            label="Name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <Button type="submit" loading={saving}>
            Save changes
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
