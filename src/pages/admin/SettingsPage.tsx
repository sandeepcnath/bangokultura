import { useState } from 'react';
import { useAuth } from '../../context/AdminAuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Loader2,
  Check,
  Moon,
  Sun
} from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || 'Admin User',
    email: user?.email || '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailOrders: true,
    emailLowStock: true,
    emailCustomers: false,
    pushOrders: true,
    pushLowStock: false,
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>
          Settings
        </h2>
        <p className="text-zinc-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
                data-testid={`settings-tab-${tab.id}`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Profile Information</h3>
                  <p className="text-zinc-500 text-sm">Update your account profile information</p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7000ff] p-[2px]">
                    <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-2xl font-bold text-white">
                      {profileData.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-zinc-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg pl-10 pr-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                        data-testid="settings-name-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg pl-10 pr-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                        data-testid="settings-email-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Notification Preferences</h3>
                  <p className="text-zinc-500 text-sm">Choose what notifications you receive</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-400">Email Notifications</h4>
                  
                  {[
                    { key: 'emailOrders', label: 'New Orders', desc: 'Get notified when a new order is placed' },
                    { key: 'emailLowStock', label: 'Low Stock Alerts', desc: 'Get notified when product stock is low' },
                    { key: 'emailCustomers', label: 'New Customers', desc: 'Get notified when a new customer signs up' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-zinc-500 text-sm">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({ 
                          ...notificationSettings, 
                          [item.key]: !notificationSettings[item.key as keyof typeof notificationSettings]
                        })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notificationSettings[item.key as keyof typeof notificationSettings] 
                            ? 'bg-[#00f0ff]' 
                            : 'bg-zinc-700'
                        }`}
                        data-testid={`toggle-${item.key}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notificationSettings[item.key as keyof typeof notificationSettings] 
                            ? 'translate-x-7' 
                            : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-400">Push Notifications</h4>
                  
                  {[
                    { key: 'pushOrders', label: 'Order Updates', desc: 'Receive push notifications for order changes' },
                    { key: 'pushLowStock', label: 'Inventory Alerts', desc: 'Receive push notifications for low inventory' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-zinc-500 text-sm">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({ 
                          ...notificationSettings, 
                          [item.key]: !notificationSettings[item.key as keyof typeof notificationSettings]
                        })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notificationSettings[item.key as keyof typeof notificationSettings] 
                            ? 'bg-[#00f0ff]' 
                            : 'bg-zinc-700'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notificationSettings[item.key as keyof typeof notificationSettings] 
                            ? 'translate-x-7' 
                            : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Security Settings</h3>
                  <p className="text-zinc-500 text-sm">Manage your account security</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg pl-10 pr-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg pl-10 pr-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-black/50 border border-zinc-800 text-zinc-200 rounded-lg pl-10 pr-4 py-3 focus:border-[#00f0ff]/50 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#ff0055]/10 border border-[#ff0055]/30 rounded-lg">
                  <h4 className="text-[#ff0055] font-semibold mb-2">Danger Zone</h4>
                  <p className="text-zinc-400 text-sm mb-4">Once you delete your account, there is no going back.</p>
                  <button className="px-4 py-2 bg-[#ff0055]/20 border border-[#ff0055]/50 text-[#ff0055] rounded-lg text-sm font-semibold hover:bg-[#ff0055]/30 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Appearance</h3>
                  <p className="text-zinc-500 text-sm">Customize the look and feel</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-400">Theme</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-zinc-800/50 border-2 border-[#00f0ff] rounded-xl text-center">
                      <Moon className="w-8 h-8 text-[#00f0ff] mx-auto mb-2" />
                      <p className="text-white font-medium">Dark</p>
                      <p className="text-xs text-zinc-500">Current</p>
                    </button>
                    <button className="p-4 bg-zinc-800/30 border border-zinc-700 rounded-xl text-center hover:border-zinc-600 transition-colors">
                      <Sun className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                      <p className="text-zinc-400 font-medium">Light</p>
                      <p className="text-xs text-zinc-600">Coming Soon</p>
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-400">Accent Color</h4>
                  <div className="flex gap-3">
                    {['#00f0ff', '#7000ff', '#00ff9d', '#ff0055', '#ffe600'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                          color === '#00f0ff' ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 mt-6 border-t border-zinc-800">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] px-6 py-2.5 rounded-lg font-semibold hover:bg-[#00f0ff] hover:text-black transition-all disabled:opacity-50"
                data-testid="save-settings-btn"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : saved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
