const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express(); // ✅ Initialize Express before using "app"

app.use(express.json());
app.use(cors());

const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/1wUEG981PU2leDPnlu9ADb86YCo5KigMZOSWPH51PLmw/prefill"; // ✅ Replace with your Google Form submission URL
const FIELD_ENTRY_ID = "
entry.226698447"; // ✅ Replace with correct field ID

app.post("/submit", async (req, res) => {
    try {
        const { userPhoneNumber } = req.body;
        
        if (!userPhoneNumber) {
            return res.status(400).json({ error: "Missing phone number" });
        }

        const formData = new URLSearchParams();
        formData.append(FIELD_ENTRY_ID, userPhoneNumber);

        const response = await fetch(GOOGLE_FORM_URL, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        res.json({ message: "✅ Number saved successfully in Google Sheets!" });
    } catch (error) {
        console.error("❌ Google Forms Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Fix: Ensure the server listens on process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
