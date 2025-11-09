import React, { useState } from "react";


// import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.name || !form.email || !form.phone || !form.message) {
      setStatus("⚠️ Please fill all fields");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setStatus("❌ Invalid email address");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("https://vernanbackend.ezlab.in/api/contact-us/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Form Submitted Successfully");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("❌ Submission failed. Try again.");
      }
    } catch (err) {
      setStatus("⚠️ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 text-center text-2xl font-bold">
        EZ Labs Assignment
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Welcome to EZ Labs
        </h1>
        <p className="text-gray-600 max-w-md">
          Building responsive web experiences that adapt beautifully to every device.
        </p>
      </section>

      {/* Contact Form */}
      <section className="bg-white shadow-lg rounded-2xl p-6 w-11/12 max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-blue-500"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-blue-500 h-24"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {status && (
          <p className="mt-3 text-center text-sm text-gray-700">{status}</p>
        )}
      </section>

      <footer className="mt-8 text-gray-500 text-sm pb-4">
        © {new Date().getFullYear()} EZ Labs
      </footer>
    </div>
  );
}

export default App;
