'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toggleShowPassword from '/public/images/show-password.svg';
import { submitLogin } from '@/services/submitLogin';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';

export function LoginForm() {
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = !!loading;

  async function handleSubmitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget);

      // TODO: validar dados do formulário
      const loginData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        remember: remember,
      };

      const { error } = await submitLogin(loginData);
      if (error) throw error;

      router.push('/');
    } catch (error) {
      // TODO: criar mensagens de erro
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmitLogin} className="flex flex-col gap-y-4">
      <label>
        <div className="text-custom-purple text-sm font-medium">Login</div>
        <div className="border border-[#1b1b1b] rounded-[5px] py-2 px-1">
          <Input type="email" placeholder="E-mail" name="email" />
        </div>
        {/* {errors.email && (
          <span className="text-red-600 text-xs">{errors.email.message}</span>
        )} */}
      </label>
      <label>
        <div className="text-custom-purple text-sm font-medium">Senha</div>
        <div className="border border-[#1b1b1b] rounded-[5px] flex py-2 px-1">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            name="password"
          />
          <Button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="px-1"
          >
            <Image
              src={toggleShowPassword}
              alt="Ícone de olho para mostrar e esconder a senha"
            />
          </Button>
        </div>
        {/* {errors.password && (
          <span className="text-red-600 text-xs">
            {errors.password.message}
          </span>
        )} */}
      </label>
      <div className="flex justify-between px-1">
        <label className="flex items-center justify-center relative">
          <Input
            className="appearance-none w-5 h-5 rounded-full border-2 border-custom-purple mr-1"
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span>Lembrar</span>
          {remember && (
            <div className="absolute w-2 h-2 bg-custom-purple rounded-full left-[0.375rem]"></div>
          )}
        </label>
        <Link className="underline" href="/forget-password">
          Esqueci minha senha
        </Link>
      </div>

      <Button type="submit" disabled={isButtonDisabled} loading={loading}>
        {loading ? 'Enviando...' : 'Continuar'}
      </Button>
    </form>
  );
}
