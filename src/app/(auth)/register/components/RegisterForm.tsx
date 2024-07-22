'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitLogin } from '@/services/submitLogin';
import { submitRegister } from '@/services/submitRegister';
import { Button } from '@/components/Button';
import RememberCheckbox, { CheckBox } from './CheckBox';

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  async function handleSubmitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const newUser = {
        firstName: formData.get('name') as string,
        lastName: formData.get('lastname') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        passwordConfirmation: formData.get('password-confirm') as string,
        phone: formData.get('phone') as string,
        isPrivacyPolicyAccepted: remember,
      };

      const { error: errorRegister, data } = await submitRegister(newUser);
      if (errorRegister) throw new Error(errorRegister);

      const { error: errorLogin } = await submitLogin({
        email: data.email,
        password: newUser.password,
      });
      if (errorLogin) throw errorLogin;

      router.push('/');
    } catch (error) {
      setIsLoading(false);
      const err = error as Error;
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmitRegister} className="flex flex-col gap-y-4">
      <label>
        <div className="text-custom-purple text-sm font-medium">Nome</div>
        <div className="border border-[#1b1b1b] rounded-[5px] py-2 px-1">
          <input
            type="text"
            className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
            name="name"
            id="name"
            placeholder="Digite seu primeiro nome"
          />
        </div>
      </label>
      <label>
        <div className="text-custom-purple text-sm font-medium">Sobrenome</div>
        <div className="border border-[#1b1b1b] rounded-[5px] py-2 px-1">
          <input
            type="text"
            className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
            name="lastname"
            id="lastname"
            placeholder="Digite seu sobrenome"
          />
        </div>
      </label>
      <label>
        <div className="text-custom-purple text-sm font-medium">Email</div>
        <div className="border border-[#1b1b1b] rounded-[5px] py-2 px-1">
          <input
            type="email"
            className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
            name="email"
            id="email"
            placeholder="E-mail"
          />
        </div>
      </label>
      <label>
        <div className="text-custom-purple text-sm font-medium">Telefone</div>
        <div className="border border-[#1b1b1b] rounded-[5px] py-2 px-1">
          <input
            type="text"
            className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
            name="phone"
            id="phone"
            placeholder="Telefone"
          />
        </div>
      </label>
      <label>
        <div className="text-custom-purple text-sm font-medium">Senha</div>
        <div className="border border-[#1b1b1b] rounded-[5px] py-2 px-1">
          <input
            type="password"
            className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
            name="password"
            id="password"
            placeholder="Senha"
          />
        </div>
      </label>
      <label>
        <div className="text-custom-purple text-sm font-medium">
          Confirmar senha
        </div>
        <div className="border border-[#1b1b1b] rounded-[5px] py-2 px-1">
          <input
            type="password"
            className="w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]"
            name="password-confirm"
            id="password-confirm"
            placeholder="Confirmar senha"
          />
        </div>
      </label>
      {/* <label className="flex items-center relative mt-4 sm:mt-6 md:mt-8">
      <input
        className="appearance-none w-5 h-5 rounded-full border-2 border-[#7C54A7] relative cursor-pointer"
        type="checkbox"
        checked={remember}
        onChange={(event) => setRemember(event.target.checked)}
      />
      {remember && (
        <div className="absolute w-2 h-2 bg-[#7C54A7] rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      )}
      <span className="text-xs sm:text-sm font-medium ml-2">
        Eu concordo com a política de privacidade
      </span>
    </label> */}

    <CheckBox remember={remember} setRemember={setRemember} />
      <Button className="mt-8" type="submit" disabled={!!isLoading}>
        {isLoading ? 'Enviando...' : 'Continuar'}
      </Button>
    </form>
  );
}
