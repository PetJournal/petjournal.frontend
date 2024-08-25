'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitLogin } from '@/services/submitLogin';
import { submitRegister } from '@/services/submitRegister';
import { Button } from '@/components/Button';
import { getSession } from '@/services/getSession';
import { UserContext } from '@/context/UserContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/Fields/Input';
import { UserRegisterProps, userRegisterSchema } from '@/schemas/userRegister';
import { InputControl } from '@/components/Fields/InputControl';
import { Label } from '@/components/Label';
import { InputMessage } from '@/components/Fields/InputMessage';

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<UserRegisterProps>({
    resolver: zodResolver(userRegisterSchema),
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  async function handleSubmitRegister({
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
    phone,
  }: UserRegisterProps) {
    setIsLoading(true);
    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
        phone,
        isPrivacyPolicyAccepted: remember,
      };

      const { error: errorRegister, data } = await submitRegister(newUser);
      if (errorRegister) throw new Error(errorRegister);

      const { error: errorLogin } = await submitLogin({
        email: data.email,
        password: newUser.password,
      });
      if (errorLogin) throw errorLogin;

      const { session, error: errorSession } = await getSession();
      if (errorSession || !session) {
        throw new Error(errorSession ?? 'Usuário não autenticado...');
      }

      const { user } = session;

      setUser(user);

      router.push('/');
    } catch (error) {
      setIsLoading(false);
      const err = error as Error;
      alert(err.message);
    }
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setRemember(checked);
    setValue('isPrivacyPolicyAccepted', checked, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitRegister)}
      className="flex flex-col gap-y-4"
    >
      <InputControl>
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          placeholder="Digite seu primeiro nome"
          {...register('firstName')}
          error={errors.firstName ? true : false}
        />
        {errors.firstName && (
          <InputMessage variant="error" message={errors.firstName?.message} />
        )}
      </InputControl>
      <InputControl>
        <Label htmlFor="lastname">Sobrenome</Label>
        <Input
          type="text"
          id="lastname"
          placeholder="Digite seu sobrenome"
          {...register('lastName')}
          error={errors.lastName ? true : false}
        />
        {errors.lastName && (
          <InputMessage variant="error" message={errors.lastName?.message} />
        )}
      </InputControl>
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
        <Label htmlFor="phone">Telefone</Label>
        <Input
          type="text"
          id="phone"
          placeholder="Telefone"
          {...register('phone')}
          error={errors.phone ? true : false}
        />
        {errors.phone && (
          <InputMessage variant="error" message={errors.phone?.message} />
        )}
      </InputControl>
      <InputControl>
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          placeholder="Senha"
          {...register('password')}
          error={errors.password ? true : false}
        />
        {errors.password && (
          <InputMessage variant="error" message={errors.password?.message} />
        )}
      </InputControl>
      <InputControl>
        <Label htmlFor="password-confirm">Confirmar senha</Label>
        <Input
          type="password"
          id="password-confirm"
          placeholder="Confirmar senha"
          {...register('passwordConfirmation')}
          error={errors.passwordConfirmation ? true : false}
        />
        {errors.passwordConfirmation && (
          <InputMessage
            variant="error"
            message={errors.passwordConfirmation?.message}
          />
        )}
      </InputControl>

      <label className="flex justify-center items-center relative">
        <input
          className="appearance-none"
          type="checkbox"
          checked={remember}
          {...register('isPrivacyPolicyAccepted')}
          onChange={handleCheckboxChange}
        />
        <span className="flex items-center justify-center w-4 h-4 mr-2 rounded-full border-2 border-studio-600">
          <span
            className={`absolute w-[6px] h-[6px] rounded-full ${
              remember ? 'bg-studio-600' : ''
            }`}
          />
        </span>

        <span className="text-xs font-medium">
          Eu concordo com a política de privacidade
        </span>
      </label>
      {errors.isPrivacyPolicyAccepted && (
        <span className="text-red-500 text-xs self-center">
          {errors.isPrivacyPolicyAccepted.message}
        </span>
      )}
      <Button className="mt-16" type="submit" disabled={!!isLoading}>
        {isLoading ? 'Enviando...' : 'Continuar'}
      </Button>
    </form>
  );
}
