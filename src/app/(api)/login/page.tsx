import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function LoginPage(){
  return (
    <form className="w-1/2 mx-auto">
      <h1> Login Page </h1>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Input />
      </div>
      <div>
        <label htmlFor="firstName">Last Name</label>
        <Input />
      </div>
      <div>
        <label htmlFor="firstName">Department</label>
        <Input className="focus:outline-0 focus:shadow-red-500" />
      </div>
    </form>
  );
}