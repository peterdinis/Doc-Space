'use client'

import { FC, useState} from 'react';
import {
    Search,
    Bell,
    Home,
    Users,
    Folder,
    Calendar,
    FilePlus,
} from 'lucide-react';
import NotificationDropdown from '../dropdowns/NotificationsDropdown';
import UserProfileDropdown from '../dropdowns/UserProfileDropdown';


const Navigation: FC = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: Home },
        { name: 'Team', icon: Users },
        { name: 'Projects', icon: Folder },
        { name: 'Calendar', icon: Calendar }
    ];

    return (
        <div className="font-sans">
            <header className="relative">
                <div className="bg-black border border-gray-800 shadow-2xl p-4 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Logo and Desktop Navigation */}
                        <div className="flex items-center space-x-2 sm:space-x-8">
                            <div className="w-8 h-8 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center shadow-lg">
                                <FilePlus />
                            </div>

                            <nav className="hidden lg:flex space-x-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => setActiveTab(item.name)}
                                            className={`
                        flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300
                        ${activeTab === item.name
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-900'}
                      `}
                                        >
                                            <Icon size={18} />
                                            <span className="font-medium">{item.name}</span>
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Mobile Menu Hamburger Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl bg-gray-900 border border-gray-700 hover:bg-gray-800 transition-all duration-300"
                            >
                                <div className="w-5 h-5 flex flex-col justify-center items-center">
                                    <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></div>
                                    <div className={`w-4 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                                    <div className={`w-4 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                                </div>
                            </button>
                        </div>

                        {/* Right side: Search, Notifications, and User Profile */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="relative hidden sm:block">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="
                    bg-gray-900 border border-gray-700 rounded-xl 
                    pl-10 pr-4 py-2 w-40 md:w-64 text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-gray-600
                    transition-all duration-300
                  "
                                />
                            </div>

                            <button className="sm:hidden p-2 rounded-xl bg-gray-900 border border-gray-700 hover:bg-gray-800 transition-all duration-300">
                                <Search className="h-5 w-5 text-gray-400" />
                            </button>

                            <NotificationDropdown
                                trigger={<Bell className="w-5 h-5 text-gray-400 hover:text-white transition" />}
                            >
                                <div className="p-4 space-y-2">
                                    <div className="text-white font-semibold">Notifications</div>
                                    <div className="text-gray-400 text-sm">No new notifications.</div>
                                </div>
                            </NotificationDropdown>
                            <UserProfileDropdown />
                        </div>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="lg:hidden mt-4 pt-4 border-t border-gray-800">
                            <nav className="grid grid-cols-2 gap-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                setActiveTab(item.name);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`
                        flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300
                        ${activeTab === item.name
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-900'}
                      `}
                                        >
                                            <Icon size={18} />
                                            <span className="font-medium">{item.name}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Navigation;