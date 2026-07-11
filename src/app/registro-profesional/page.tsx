import { redirect } from "next/navigation";

export default function RegistroProfesionalRedirect() {
  redirect("/registro?role=profesional");
}
