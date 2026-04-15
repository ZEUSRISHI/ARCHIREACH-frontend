// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Blog from "./pages/blog/BlogPage";
import About from "./pages/blog/AboutPage";

import Contact from "./pages/blog/ContactPage";
import Pricing from "./pages/blog/PricingPage";
import StudentDash from "./pages/blog/StudentDash";
import CollegeDash from "./pages/blog/CollegeDash";
import BrandDash from "./pages/blog/BrandDash";
import FirmDash from "./pages/blog/FirmDash";
import JobSearch from "./pages/ExploreDrop/JobSearch";
import CollegeCourse from "./pages/ExploreDrop/CollegeCourse";
import StudInternship from "./pages/ExploreDrop/StudInternship";
import FindArch from "./pages/ExploreDrop/FindArch";
import ClientDash from "./pages/blog/CilentDash";
import ArchitectDash from "./pages/blog/ArchitectDash";
import FindProjects from "./pages/ExploreDrop/FindProjects";
import Dashboard from "./pages/Dashboard";
import PortfolioView from "./pages/PortfolioView";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ClientRegistrationPage from "./pages/ClientRegistrationPage";
import FirmRegistrationPage from "./pages/FirmRegistrationPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import { EditProvider } from "./context/EditContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import FirmProfileViewWrapper from "./pages/blog/ProfileView";
import { SocketProvider } from "./hooks/useSocket";

function App() {
  return (
    <EditProvider>
      <SubscriptionProvider>
        <SocketProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/client-registration" element={<ClientRegistrationPage />} />
              <Route path="/firm-registration" element={<FirmRegistrationPage />} />
              <Route path="/verify-otp" element={<VerifyOtpPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects/:projectId" element={<PortfolioView />} />
              <Route path="/portfolio/:firmId" element={<PortfolioView />} />
              <Route path="/pages/blog/StudentDash" element={<StudentDash />} />
              <Route path="/pages/blog/CollegeDash" element={<CollegeDash />} />
              <Route path="/pages/blog/BrandDash" element={<BrandDash />} />
              <Route path="/pages/blog/FirmDash" element={<FirmDash />} />
              <Route path="/pages/blog/FirmProfile" element={<FirmProfileViewWrapper />} />

              <Route path="/pages/blog/ClientDash" element={<ClientDash />} />
              <Route path="/pages/blog/ArchitectDash" element={<ArchitectDash />} />

              <Route path="/pages/ExploreDrop/JobSearch" element={<JobSearch />} />
              <Route path="/pages/ExploreDrop/CollegeCourse" element={<CollegeCourse />} />
              <Route path="/pages/ExploreDrop/StudInternship" element={<StudInternship />} />
              <Route path="/pages/ExploreDrop/FindArch" element={<FindArch />} />
              <Route path="/pages/ExploreDrop/FindProjects" element={<FindProjects />} />
            </Routes>
          </Router>
        </SocketProvider>
      </SubscriptionProvider>
    </EditProvider>
  );
}

export default App;
