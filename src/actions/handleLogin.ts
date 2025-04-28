'use server';

export async function handleLogin(formData:FormData){
    console.log("Handling Login....");
    console.log("Name",formData.get("name"));
}