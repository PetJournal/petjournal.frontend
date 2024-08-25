'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { submitLogin } from '@/services/submitLogin';
import { Button } from '@/components/Button';
import { getSession } from '@/services/getSession';
import { UserContext } from '@/context/UserContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLoginProps, userLoginSchema } from '@/schemas/userLogin';
import { Input } from '@/components/Fields/Input';
import { InputControl } from '@/components/Fields/InputControl';
import { Label } from '@/components/Label';
import { InputMessage } from '@/components/Fields/InputMessage';

export function LoginForm() {
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const isButtonDisabled = !!loading;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLoginProps>({
    resolver: zodResolver(userLoginSchema),
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  async function handleSubmitLogin({ email, password }: UserLoginProps) {
    try {
      setLoading(true);
      const loginData = {
        email,
        password,
        remember: remember,
      };

      const { error } = await submitLogin(loginData);
      if (error) throw new Error(error);

      const { session, error: errorSession } = await getSession();
      if (errorSession || !session) {
        throw new Error(errorSession ?? 'Usuário não autenticado...');
      }

      const { user } = session;

      setUser(user);

      router.push('/');
    } catch (error) {
      setLoading(false);
      const err = error as Error;
      alert(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitLogin)}
      className="flex flex-col gap-y-4"
    >
      <InputControl>
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          placeholder="E-mail"
          {...register('email')}
          error={errors.email ? true : false}
        />
        {errors.email && (
          <InputMessage variant="error" message={errors.email?.message} />
        )}
      </InputControl>
      <InputControl>
        <Label htmlFor="password">Senha</Label>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Senha"
          {...register('password')}
          error={errors.password ? true : false}
        />
        {errors.password && (
          <InputMessage variant="error" message={errors.password?.message} />
        )}
      </InputControl>
      <div className="flex justify-between px-1">
        <label className="flex items-center justify-center relative">
          <input
            className="appearance-none"
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span className="flex items-center justify-center w-4 h-4 mr-2 rounded-full border-2 border-studio-600">
            <span
              className={`absolute w-[6px] h-[6px] rounded-full ${
                remember ? 'bg-studio-600' : ''
              }`}
            />
          </span>

          <span className="text-xs font-medium">Lembrar</span>
        </label>
        <Link className="text-xs font-medium" href="/forget-password">
          Esqueci minha senha
        </Link>
      </div>

      <Button
        className="mt-16"
        type="submit"
        variant="default"
        disabled={isButtonDisabled}
      >
        {loading ? 'Enviando...' : 'Continuar'}
      </Button>
    </form>
  );
}
