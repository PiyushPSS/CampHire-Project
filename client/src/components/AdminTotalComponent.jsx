import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  BarChart3,
  Building2,
  Download,
  FileText,
  Home,
  Lock,
  ShieldAlert,
  Users,
} from "lucide-react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminDashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const ADMIN_ID = "piyushpratapsingh67@gmail.com";
  const isAdmin = user?.email === ADMIN_ID;

  const handleDownload = (reportType, backendLink) => {
    toast.success(`Downloading ${reportType} report...`);

    try {
      axios
        .get(backendLink, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data;

          //JOBS REPORT DOWNLOAD
          if (reportType == "Jobs") {
            const cleanedJobs = data.jobs.map((job) => ({
              ID: job._id,
              Title: job.title,
              Description: job.description,
              Salary: job.salary + " LPA",
              Location: job.location,
              JobType: job.jobType,
              ExperienceLevel: job.experienceLevel + " years",
              Position: job.position,
              Requirements: job.requirements?.join(", ") || "",
              ApplicationsCount: job.applications?.length || 0,
              Company: job.company?.name || "N/A",
              CreatedAt: new Date(job.createdAt).toLocaleString(),
              UpdatedAt: new Date(job.updatedAt).toLocaleString(),
            }));

            const worksheet = XLSX.utils.json_to_sheet(cleanedJobs);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");

            const excelBuffer = XLSX.write(workbook, {
              bookType: "xlsx",
              type: "array",
            });
            const fileData = new Blob([excelBuffer], {
              type: "application/octet-stream",
            });
            saveAs(fileData, "JobsExport.xlsx");
          }

          //COMPANIES REPORT DOWNLOAD
          if (reportType == "Companies") {
            const cleanedCompanies = data.companies.map((company) => ({
              ID: company._id,
              Name: company.name,
              Description: company.description,
              Location: company.location,
              Website: company.website,
              Logo: company.logo,
              CreatedAt: new Date(company.createdAt).toLocaleString(),
              UpdatedAt: new Date(company.updatedAt).toLocaleString(),
            }));

            const worksheet = XLSX.utils.json_to_sheet(cleanedCompanies);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Companies");

            const excelBuffer = XLSX.write(workbook, {
              bookType: "xlsx",
              type: "array",
            });
            const fileData = new Blob([excelBuffer], {
              type: "application/octet-stream",
            });
            saveAs(fileData, "CompaniesExport.xlsx");
          }

          //APPLICANTS REPORT DOWNLOAD
          if (reportType == "Applicant") {
            const cleanedApplicants = data.applications.map((applicant) => ({
              ID: applicant._id,
              JobTitle: applicant.job.title,
              JobDescription: applicant.job.description,
              JobRequirements: applicant.job.requirements.join(", "),
              JobSalary: applicant.job.salary + " LPA",
              ApplicantPhoto: applicant.applicant.profile.profilePhoto,
              ApplicantSkills: applicant.applicant.profile.skills.join(", "),
              ApplicantName: applicant.applicant.fullname,
              ApplicantPhone: applicant.applicant.phoneNumber,
              ApplicationStatus: applicant.status,
              CreatedAt: new Date(applicant.createdAt).toLocaleString(),
              UpdatedAt: new Date(applicant.updatedAt).toLocaleString(),
            }));

            const worksheet = XLSX.utils.json_to_sheet(cleanedApplicants);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

            const excelBuffer = XLSX.write(workbook, {
              bookType: "xlsx",
              type: "array",
            });
            const fileData = new Blob([excelBuffer], {
              type: "application/octet-stream",
            });
            saveAs(fileData, "ApplicantsExport.xlsx");
          }

          //USERS REPORT DOWNLOAD
          if (reportType == "Users") {
            const cleanedUsers = data.users.map((user) => ({
              ID: user._id,
              Name: user.fullname,
              Email: user.email,
              PhoneNumber: user.phoneNumber,
              Role: user.role,
              CreatedAt: new Date(user.createdAt).toLocaleString(),
              UpdatedAt: new Date(user.updatedAt).toLocaleString(),
            }));

            const worksheet = XLSX.utils.json_to_sheet(cleanedUsers);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

            const excelBuffer = XLSX.write(workbook, {
              bookType: "xlsx",
              type: "array",
            });
            const fileData = new Blob([excelBuffer], {
              type: "application/octet-stream",
            });
            saveAs(fileData, "UsersExport.xlsx");
          }
        });
    } catch (error) {
      console.error("Error exporting jobs:", error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-2">
            🚨 You are not authorized to view this content! 🚨
          </p>
          <p className="text-gray-500 mb-6">
            If you are an admin, please contact support.
          </p>
          <button className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors">
            <Home className="mr-2 h-4 w-4" />
            <a href="/">Return to Home</a>
          </button>
        </div>
      </div>
    );
  }

  const reports = [
    {
      title: "Jobs Report",
      description:
        "Overview of all job postings, applications, and hiring metrics",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      color: "from-purple-500 to-indigo-500",
      backendLink: "http://localhost:8000/api/v1/job/get",
    },
    {
      title: "Companies Report",
      description: "Analysis of registered companies, activity, and engagement",
      icon: <Building2 className="h-5 w-5 text-blue-500" />,
      color: "from-blue-500 to-cyan-500",
      backendLink: "http://localhost:8000/api/v1/company/getAll",
    },
    {
      title: "Applicant Report",
      description:
        "Statistics on applicant demographics, skills, and placement rates",
      icon: <Users className="h-5 w-5 text-emerald-500" />,
      color: "from-emerald-500 to-teal-500",
      backendLink: "http://localhost:8000/api/v1/application/getAll",
    },
    {
      title: "Users Report",
      description: "User growth, engagement metrics, and platform activity",
      icon: <BarChart3 className="h-5 w-5 text-amber-500" />,
      color: "from-amber-500 to-orange-500",
      backendLink: "http://localhost:8000/api/v1/user/getAll",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Welcome back, Admin! Here you can access all system reports and
            analytics.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${report.color}`} />
              <div className="p-5 pb-2">
                <div className="flex items-center space-x-2">
                  {report.icon}
                  <h3 className="text-lg font-medium text-gray-900">
                    {report.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {report.description}
                </p>
              </div>
              <div className="px-5 py-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Last updated</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${report.color}`}
                      style={{
                        width: `${Math.floor(Math.random() * 40) + 60}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-600 text-sm">
                    This report contains sensitive data about{" "}
                    {report.title.toLowerCase().replace(" report", "")}
                    within the platform. Access is restricted to admin users
                    only.
                  </p>
                </div>
              </div>
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                <button
                  className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-gradient-to-r ${report.color} hover:opacity-90 transition-opacity`}
                  onClick={() =>
                    handleDownload(
                      report.title.replace(" Report", ""),
                      report.backendLink
                    )
                  }
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <button className="inline-flex items-center justify-center px-4 py-2 rounded-md text-purple-700 bg-white border border-purple-200 hover:bg-purple-50 transition-colors mr-4">
            <Home className="mr-2 h-4 w-4" />
            <a href="/">Return to Home</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
