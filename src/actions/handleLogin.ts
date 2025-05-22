'use server';
import type { FeedbackType } from "@/app/page";

export async function handleLogin(formData: FormData) {
  console.log("Handling Login....");
  console.log("Name", formData.get("name"));
}

export async function handleFeedBackAction(
  prevState: FeedbackType,
  formData: FormData
) {
  const email = formData.get("email")?.toString();
  const content = formData.get("content")?.toString();
  console.log(email);

  if (!email || !content) {
    return {
      email,
      content,
      message: "Email or Content of your idea are required.",
      success: false,
    };
  }
  return {
    email,
    content,
    message: "You have successfully sent feedback.",
    success: true,
  };
}

export async function handleCount(prevState: number, formData: FormData) {
  console.log(prevState);
  return prevState + Number.parseInt(formData.get("number")?.toString() || "0");
}