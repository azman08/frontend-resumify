import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { FaDownload } from "react-icons/fa";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(
          `https://backend-resumify.onrender.com/api/resumes`
        );
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  // Delete resume function
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://backend-resumify.onrender.com/api/resumes/${id}`
      );
      setResumes(resumes.filter((resume) => resume._id !== id));
      alert("Resume deleted successfully!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Failed to delete resume");
    }
  };

  // Download resume as PDF
  const handleDownload = (resume) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Resume", 105, 20, null, null, "center");

    doc.setFontSize(14);
    doc.text(`Name: ${resume.name}`, 20, 40);
    doc.text(`Email: ${resume.email}`, 20, 50);
    doc.text(`Phone: ${resume.phone}`, 20, 60);
    doc.text(`Education: ${resume.education}`, 20, 70);
    doc.text(`Experience: ${resume.experience}`, 20, 80);
    doc.text(`Skills: ${resume.skills.join(", ")}`, 20, 90);

    doc.save(`${resume.name}_Resume.pdf`);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mx-auto text-white">
            YOUR RESUMES
          </h1>
          <Button asChild>
            <Link to="/create-resume">+ Create New Resume</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <Card key={resume._id} className="bg-black text-white">
                <CardHeader>
                  <CardTitle>{resume.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardTitle className="pb-2">Email: {resume.email}</CardTitle>
                  <CardTitle className="pb-2">Phone: {resume.phone}</CardTitle>
                  <CardTitle className="pb-2">
                    Education: {resume.education}
                  </CardTitle>
                  <CardTitle className="pb-2">
                    Experience: {resume.experience}
                  </CardTitle>
                  <CardTitle className="pb-2">
                    Skills: {resume.skills.join(", ")}
                  </CardTitle>

                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(resume._id)}
                      className="hover:bg-white hover:text-red-600"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDownload(resume)}
                      className="hover:bg-white hover:text-black flex items-center gap-2"
                    >
                      <FaDownload /> Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center mt-10 text-md">No resumes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
