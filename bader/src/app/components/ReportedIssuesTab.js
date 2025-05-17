import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  PlusCircle,
  ChevronDown,
  MessageCircle,
  Calendar,
} from "lucide-react";

export default function ReportedIssuesTab({ reportedIssues }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter issues based on status and search query
  const filteredIssues = reportedIssues.filter((issue) => {
    const matchesFilter = filter === "all" || issue.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      issue.problemType.includes(searchQuery) ||
      issue.description.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "تمت المعالجة":
        return "bg-emerald-500";
      case "قيد المعالجة":
        return "bg-blue-500";
      case "جديد":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  // Helper function for priority indicators
  const getPriorityIndicator = (priority) => {
    switch (priority) {
      case "عالية":
        return "bg-red-500";
      case "متوسطة":
        return "bg-amber-500";
      case "منخفضة":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-b from-white to-purple-50 rounded-xl p-6 shadow-sm"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-purple-100 p-2 rounded-lg">
            <AlertTriangle className="text-purple-700" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-purple-900 mr-3 tracking-tight">
            المشاكل المبلغ عنها
          </h2>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="text-purple-500" size={18} />
          </div>
          <input
            type="text"
            className="w-full pr-10 pl-4 py-2.5 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right"
            placeholder="ابحث عن مشكلة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>08886
      </div>

      {/* Issues List */}
      {filteredIssues.length > 0 ? (
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <motion.div
              key={issue._id}
              variants={itemVariants}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  {/* Priority indicator */}
                  <div className="flex-shrink-0 hidden md:block">
                    <div
                      className={`h-full w-1 ${getPriorityIndicator(
                        issue.priority
                      )}`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <span
                        className={`inline-block h-3 w-3 rounded-full mr-2 ${getPriorityIndicator(
                          issue.priority
                        )}`}
                      ></span>
                      <h3 className="font-bold text-lg text-purple-900">
                        {issue.problemType}
                      </h3>
                    </div>

                    <p className="text-gray-700 mb-4 pr-1">
                      {issue.description || "لا يوجد وصف"}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MessageCircle
                          size={14}
                          className="ml-1 text-purple-500"
                        />
                        <span>رقم البلاغ: #{issue._id}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="ml-1 text-purple-500" />
                        <span>
                          {new Date(issue.createdAt).toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <div className="flex items-center">
                      {issue.status === "تمت المعالجة" ? (
                        <CheckCircle
                          size={16}
                          className="ml-2 text-emerald-500"
                        />
                      ) : issue.status === "قيد المعالجة" ? (
                        <Clock size={16} className="ml-2 text-blue-500" />
                      ) : (
                        <AlertTriangle
                          size={16}
                          className="ml-2 text-amber-500"
                        />
                      )}
                      <span
                        className={`px-4 py-1.5 rounded-full text-white ${getStatusColor(
                          issue.status
                        )}`}
                      >
                        {issue.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="text-center py-16 bg-white rounded-xl border border-dashed border-purple-200"
        >
          <div className="bg-purple-50 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
            <CheckCircle className="text-purple-500" size={32} />
          </div>
          <h3 className="text-purple-900 font-medium text-xl mb-2">
            لا توجد مشاكل مبلغ عنها
          </h3>
          <p className="text-purple-600 max-w-md mx-auto">
            شكرًا لمساهمتك في تحسين النظام. يمكنك الإبلاغ عن أي مشكلة تواجهها في
            أي وقت.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
