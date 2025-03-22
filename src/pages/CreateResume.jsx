import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateResume = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", formData);

      const response = await axios.post(
        "https://backend-resumify.onrender.com/api/resumes",
        {
          ...formData,
          skills: formData.skills.split(",").map((skill) => skill.trim()), 
        }
      );

      console.log("API Response:", response.data); // Debugging
      alert("Resume Created Successfully ;)");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating resume:", error.response?.data || error);
      alert("Failed to create resume  :(");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <Card className="w-full max-w-lg bg-black text-white">
        <CardHeader>
          <CardTitle className="text-2xl mx-auto mb-8">Create Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="text-md font-bold mb-8"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="text-md font-bold mb-8"
              required
            />
            <Input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="text-md font-bold mb-8"
              required
            />
            <Input
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
              className="text-md font-bold mb-8"
              required
            />
            <Input
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
              className="text-md font-bold mb-8"
              required
            />
            <Input
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
              className="text-md font-bold mb-8"
              required
            />
            <Button type="submit" className="flex mx-auto mt-10">
              Save Resume
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateResume;
