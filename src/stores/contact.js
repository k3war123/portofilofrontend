// src/stores/contact.js
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { ref } from "vue";

export const useContactStore = defineStore("contact", () => {
  // ========================================================
  // Form state
  // ========================================================
  const form = ref({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ========================================================
  // Loading state
  // ========================================================
  const loading = ref(false);

  // ========================================================
  // Send message function
  // ========================================================
  const sendMessage = async () => {
    // ===================== FRONTEND VALIDATION =====================
    // Ensure required fields are filled before sending
    if (
      !form.value.full_name ||
      !form.value.email ||
      !form.value.phone ||
      !form.value.message
    ) {
      alert("Please fill in all required fields: Name, Email, Phone, Message.");
      return; // Stop function if validation fails
    }

    loading.value = true;

    try {
      // ===================== SEND REQUEST =====================
      const response = await api.post("/contact", {
        full_name: form.value.full_name,
        email: form.value.email,
        phone: form.value.phone,
        subject: form.value.subject,
        message: form.value.message,
      });

      // ===================== SUCCESS =====================
      alert(response.data.message || "Message sent successfully");

      // Reset form after successful submission
      form.value = {
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      };
    } catch (error) {
      // ===================== ERROR HANDLING =====================
      // Log full backend error for debugging
      console.error("Contact API Error:", error.response?.data);

      // Show validation errors from Laravel if available
      if (error.response?.data?.errors) {
        const messages = Object.values(error.response.data.errors)
          .flat()
          .join("\n");
        alert("Validation errors:\n" + messages);
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to send message. Please try again."
        );
      }
    } finally {
      loading.value = false;
    }
  };

  // ========================================================
  // Return state and actions
  // ========================================================
  return { form, loading, sendMessage };
});
