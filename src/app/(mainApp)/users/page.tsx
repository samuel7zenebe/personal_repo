import SignUp from "@/comps_ui/client_components/sign-up";

export default function Users() {
  return (
    <div className="w-full">
      <h1 className="text-green-900 p-2 text-2xl font-bold bg-green-200 text-center">
        This is users Page.
      </h1>
      <SignUp />
    </div>
  );
}
