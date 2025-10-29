"use client";
import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { AuthFormData, authSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { handleSubmit, formState, control, reset } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: AuthFormData) => {
    console.log({ data });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        reset();
        // arahkan berdasarkan role
        if (result.role === "admin") {
          router.push("/admin/jobs");
        } else {
          router.push("/applicant");
        }
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="inline-flex flex-col items-start gap-6 w-full max-w-[500px]">
        <div
          className="relative w-[145px] h-[50px] bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(/images/logo_with_text.svg)` }}
        />
        <Card className="w-full bg-neutral-10 shadow-button border-0">
          <CardContent className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-2 w-full">
              <h1 className="font-bold text-heading-s text-neutral-90">
                Masuk ke Rakamin
              </h1>

              <div className="flex items-center gap-2.5 w-full">
                <p className="font-regular text-text-m text-neutral-90">
                  <span className="text-neutral-70">Belum punya akun? </span>
                  <Link
                    href="/register"
                    className="text-primary-main font-regular text-text-m hover:underline"
                  >
                    Daftar menggunakan email
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start w-full space-y-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start gap-4 w-full"
              >
                <FormField
                  control={control}
                  id="email"
                  name="email"
                  label="Alamat email"
                  error={formState.errors.email?.message}
                />
                <FormField
                  control={control}
                  id="password"
                  name="password"
                  type="password"
                  label="Kata sandi"
                  error={formState.errors.password?.message}
                />
                <Button
                  type="submit"
                  className="w-full h-auto bg-secondary-main hover:bg-secondary-hover rounded-[8px] shadow-button px-2 py-[6px]"
                >
                  <span className="text-text-l font-bold text-neutral-90 ">
                    Masuk
                  </span>
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
