/* eslint-disable @next/next/no-img-element */
"use client";

import { Separator } from "@/components/Separator";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FormField } from "@/components/form/FormField";
import { RegisterFormData, registerSchema } from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { handleSubmit, formState, control } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log({ data });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-depreceated-soonutilitiespage-background">
      <div className="inline-flex flex-col items-start gap-6 w-full max-w-[500px] px-4">
        <div
          className="relative w-[145px] h-[50px] bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(images/logo_with_text.svg)` }}
        />

        <Card className="w-full bg-neutral-10 shadow-button border-0">
          <CardContent className="flex flex-col items-start gap-4 p-10">
            <div className="flex flex-col items-start gap-2 w-full">
              <h1 className="font-nunito-sans-font-size-7-20-bold font-[number:var(--nunito-sans-font-size-7-20-bold-font-weight)] text-neutral-90 text-[length:var(--nunito-sans-font-size-7-20-bold-font-size)] tracking-[var(--nunito-sans-font-size-7-20-bold-letter-spacing)] leading-[var(--nunito-sans-font-size-7-20-bold-line-height)] [font-style:var(--nunito-sans-font-size-7-20-bold-font-style)]">
                Bergabung dengan Rakamain
              </h1>

              <div className="flex items-center gap-2.5 w-full">
                <p className="font-text-m-regular font-[number:var(--text-m-regular-font-weight)] text-[length:var(--text-m-regular-font-size)] tracking-[var(--text-m-regular-letter-spacing)] leading-[var(--text-m-regular-line-height)] [font-style:var(--text-m-regular-font-style)]">
                  <span className="text-neutral-70">Sudah punya akun? </span>
                  <button
                    className="text-[#01959f] hover:underline"
                    onClick={() => router.push("/login")}
                  >
                    Masuk
                  </button>
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-start gap-4 w-full"
            >
              <div className="flex flex-col items-start gap-2 w-full">
                <FormField
                  control={control}
                  id="email"
                  name="email"
                  label="Alamat email"
                  error={formState.errors.email?.message}
                />
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <FormField
                  control={control}
                  id="password"
                  name="password"
                  type="password"
                  label="Kata Sandi"
                  error={formState.errors.password?.message}
                />
              </div>

              <Button
                className="w-full h-auto bg-secondary-main hover:bg-secondary-hover rounded-[8px] shadow-button px-2 py-[6px]"
                type="submit"
              >
                <span className="text-text-l font-bold text-neutral-90 ">
                  Daftar
                </span>
              </Button>
            </form>

            <div className="flex items-center justify-center gap-3 w-full">
              <Separator className="flex-1" />
              <span className="font-nunito-sans-font-size-2-12-regular font-[number:var(--nunito-sans-font-size-2-12-regular-font-weight)] text-neutral-60 text-[length:var(--nunito-sans-font-size-2-12-regular-font-size)] tracking-[var(--nunito-sans-font-size-2-12-regular-letter-spacing)] leading-[var(--nunito-sans-font-size-2-12-regular-line-height)] [font-style:var(--nunito-sans-font-size-2-12-regular-font-style)]">
                or
              </span>
              <Separator className="flex-1" />
            </div>

            <Button
              variant="outline"
              className="w-full h-[48px] bg-neutral-10 hover:bg-neutral-10/90  border-2 border-neutral-30 rounded-[8px] px-2 py-[13.5px] flex items-center justify-center gap-2.5"
            >
              <EnvelopeIcon className="w-3 h-[9.33px] stroke-[2px]" />
              <span className="text-text-m font-bold text-neutral-100">
                Kirim link melalui email
              </span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-[48px] bg-neutral-10 hover:bg-neutral-10/90  border-2 border-neutral-30 rounded-[8px] px-2 py-[13.5px] flex items-center justify-center gap-2.5"
            >
              <img
                className="w-[24px] h-[24px]"
                alt="icon_google"
                src="/images/icon_google.png"
              />
              <span className="text-text-m font-bold text-neutral-90">
                Daftar dengan Google
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
