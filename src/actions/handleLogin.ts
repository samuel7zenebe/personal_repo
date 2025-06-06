'use server';
import type { FeedbackType } from "@/app/page";
import { supabase } from "@/utils/supabase/server";
import crypto from "node:crypto";

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

  if (!email || !content) {
    return {
      email,
      content,
      message: "Email or Content of your idea are required.",
      success: false,
    };
  }
    const { data, error } = await supabase.from("feedback").insert({
      email,
      created_at: "2025-05-22 13:18:54+00",
      name: email.split("@")[0],
      content,
      id: Math.floor(Math.random() * 100000),
    });
 

  if (error) {
    console.log(error);
    return {
      email,
      content,
      message: "Something went wrong while storing in database.",
      success: false,
    };
  }

  // if it survives

  return {
    email,
    content,
    message: "You have successfully submitted feedback.",
    success: true,
  };
}

