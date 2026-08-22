import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import { Building2, Eye, MessageSquare, Heart, TrendingUp, Plus, Search, Bell, Clock, MapPin, ChevronRight, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      id: "active-listings",
      title: "Active Listings",
      value: "4",
      change: "+1 this week",
      icon: Building2,
      iconBg: "bg-primary/10 text-primary",
      badgeBg: "bg-primary/10 text-primary",
    },
    {
      id: "total-views",
      title: "Total Views",
      value: "1,245",
      change: "+124 this week",
      icon: Eye,
      iconBg: "bg-amber-100 text-amber-700",
      badgeBg: "bg-amber-100 text-amber-800",
    },
    {
      id: "new-inquiries",
      title: "New Inquiries",
      value: "17",
      change: "+5 today",
      icon: MessageSquare,
      iconBg: "bg-indigo-100 text-indigo-700",
      badgeBg: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "favorites",
      title: "Favorites",
      value: "43",
      change: "+8 this week",
      icon: Heart,
      iconBg: "bg-rose-100 text-rose-600",
      badgeBg: "bg-rose-100 text-rose-700",
    },
  ]

  const recentInquiries = [
    { id: 1, name: "Brian Kipchumba", property: "Kilimani Deluxe Studio", message: "Is the apartment available for rent starting next month?", time: "2h ago", status: "New", avatar: "BK" },
    { id: 2, name: "Amina Mohamed", property: "Westlands Cozy Bedsitter", message: "Does the rent include high-speed Wi-Fi and water?", time: "5h ago", status: "New", avatar: "AM" },
    { id: 3, name: "Kevin Ochieng", property: "Parklands Student 1-Bed", message: "Can I schedule a physical viewing this Saturday?", time: "1d ago", status: "Pending", avatar: "KO" },
  ]

  const propertyOverview = [
    { id: 1, name: "Kilimani Deluxe Studio", location: "Kilimani", rent: "KSh 25,000", status: "Available", views: 482, inquiries: 7 },
    { id: 2, name: "Westlands Cozy Bedsitter", location: "Westlands", rent: "KSh 18,000", status: "Available", views: 340, inquiries: 5 },
    { id: 3, name: "Parklands Student 1-Bed", location: "Parklands", rent: "KSh 30,000", status: "Occupied", views: 295, inquiries: 3 },
  ]
    
  return (
    <>
    </>
  )
}