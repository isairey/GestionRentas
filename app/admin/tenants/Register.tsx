 
"use client";

import { useState } from "react";
import axios from "axios";
import { X, User, Mail, Phone, Home, DollarSign, Calendar, Key, Loader2, EyeOff, Eye, Copy } from "lucide-react";

interface RegisterTenantFormProps {
  onClose: () => void;
  onSubmit: (tenant: {
    name: string;
    email: string;
    phone: string;
    roomNumber: string;
    rentAmount: number;
    moveInDate: string;
    gender: "male" | "female";
    lastPayment: string;
  }) => void;
}

const RegisterTenantForm = ({ onClose, onSubmit }: RegisterTenantFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomNumber: "",
    rentAmount: "",
    moveInDate: new Date().toISOString().split("T")[0],
    gender: "male" as "male" | "female",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copyPassword, setCopyPassword] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(formData.password);
      setCopyPassword(true);
      setTimeout(() => setCopyPassword(false), 3000);
    } catch (err) {
      console.log("failed to copy");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.roomNumber) newErrors.roomNumber = "Room number is required";
    if (!formData.rentAmount || Number(formData.rentAmount) <= 0)
      newErrors.rentAmount = "Valid rent amount is required";
    if (!formData.moveInDate) newErrors.moveInDate = "Move-in date is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
    
      const response = await axios.post("/api/real-tenant", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomNumber: formData.roomNumber,
        rentAmount: Number(formData.rentAmount),
        moveInDate: formData.moveInDate,
        gender: formData.gender,
        password: formData.password, 
      });

      console.log("Tenant created:", response.data);

       
      onSubmit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomNumber: formData.roomNumber,
        rentAmount: Number(formData.rentAmount),
        moveInDate: formData.moveInDate,
        gender: formData.gender as "male" | "female",
        lastPayment: new Date().toISOString().split("T")[0],
      });

       
      setFormData({
        name: "",
        email: "",
        phone: "",
        roomNumber: "",
        rentAmount: "",
        moveInDate: new Date().toISOString().split("T")[0],
        gender: "male" as "male" | "female",
        password: "",
        confirmPassword: "",
      });

      onClose();
    } catch (error) {
      console.error("TENANT CREATE ERROR:", error);
      setErrors({
        general: "Failed to create tenant"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({
      ...prev,
      password,
      confirmPassword: password,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#060219] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#060219] p-6 border-b border-gray-800">
          <div className="flex items-center justify-between z-70">
            <div>
              <h2 className="text-2xl font-bold">Register New Tenant</h2>
              <p className="text-gray-400">
                Fill in tenant details to create their account
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
           {errors.general && (
            <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4">
              <p className="text-red-200 text-sm">{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Arnold k"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tenant@email.com"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254712345678"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border ${
                      errors.phone ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Room Number
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="101"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border ${
                      errors.roomNumber ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                {errors.roomNumber && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.roomNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">
              Rental Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Monthly Rent (KES)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    name="rentAmount"
                    value={formData.rentAmount}
                    onChange={handleChange}
                    placeholder="15000"
                    min="0"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border ${
                      errors.rentAmount ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                {errors.rentAmount && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.rentAmount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Move-in Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border ${
                      errors.moveInDate ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                  />
                </div>
                {errors.moveInDate && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.moveInDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>

          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">
              Account Credentials
            </h3>
            <p className="text-gray-400 text-sm">
              The tenant will use their room number as username and this
              password to login
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Set secure password"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border ${
                      errors.password ? "border-red-500" : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-900 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={generatePassword}
                className="px-4 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                Generate Secure Password
              </button>
              <button
                type="button"
                onClick={copy}
                disabled={!formData.password}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="w-4 h-4" />
                {copyPassword ? "Copied!" : "Copy Password"}
              </button>
            </div>
          </div>

          
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 cursor-pointer py-3 bg-gradient-to-r from-[#b5015b] to-pink-600 hover:from-[#b5015b]/90 hover:to-pink-600/90 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Creating..." : "Create Tenant Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTenantForm;