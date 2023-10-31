import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useInput from '@/hooks/useInput';
import toggleShowPassword from '/public/images/show-password.svg';
import toggleHidePassword from '/public/images/hide-password.svg';
import Image from 'next/image';
import axios from '@/pages/api/axios';


function ChangePasswordForm() {
  const passwordProps = useInput({ validate: validatePassword });
  const confirmPasswordProps = useInput({ validate: validateConfirmPassword });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [accountAccess, setAccountAccess] = useState(false);
  const { push } = useRouter();

  const isButtonDisabled = !(
    !!passwordProps.value &&
    !!confirmPasswordProps.value &&
    !passwordProps.error &&
    !confirmPasswordProps.error &&
    !confirmPasswordError
  );

  const showPasswordMessage =
    isButtonDisabled &&
    !passwordProps.error &&
    !confirmPasswordProps.error &&
    !confirmPasswordError;

  function validatePassword(value: string) {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!value) {
      return 'Este campo é obrigatório';
    }
    if (!passwordRegex.test(value)) {
      return 'A senha deve ter ao menos 8 caracteres, com letras maiúsculas, minúsculas, números e símbolos';
    }
    if (value !== confirmPasswordProps.value) {
      setConfirmPasswordError('As senhas devem ser idênticas');
      return;
    }
    setConfirmPasswordError('');
    return undefined;
  }

  function validateConfirmPassword(value: string) {
    if (!value) {
      return 'Este campo é obrigatório';
    }
    if (value !== passwordProps.value) {
      setConfirmPasswordError('As senhas devem ser idênticas');
      return;
    }
    setConfirmPasswordError('');
    return undefined;
  }

  function handleChangePassword(password: string, passwordConfirmation: string) {
    return axios.patch('/guardian/change-password', {
      password, passwordConfirmation
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await handleChangePassword(passwordProps.value, confirmPasswordProps.value)
    console.log(response)

    // push('/login');
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="max-w-[375px]">
      <div className='flex flex-col gap-6'>
        <div>
          <label htmlFor="password" className='text-custom-purple font-medium text-sm'>
            Nova senha
          </label>
          <div className="flex w-full h-12 justify-between p-1 px-4 border-2 rounded-md">
            <input
              type={showPassword ? 'text' : 'password'}
              {...passwordProps}
              id="password"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Image
                src={toggleShowPassword}
                alt="Ícone de olho para mostrar e esconder a senha"
              /> : <Image
                src={toggleHidePassword}
                alt="Ícone de olho para mostrar e esconder a senha"
              />}
            </button>
          </div>
          {passwordProps.error && (
            <p className="text-xs text-red-500">{passwordProps.error}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className='text-custom-purple font-medium text-sm'>
            Confirmar senha
          </label>
          <div className="flex w-full h-12 justify-between p-1 px-4 border-2 rounded-md">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...confirmPasswordProps}
              id="confirmPassword"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <Image
                src={toggleShowPassword}
                alt="Ícone de olho para mostrar e esconder a senha"
              /> : <Image
                src={toggleHidePassword}
                alt="Ícone de olho para mostrar e esconder a senha"
              />}
            </button>
          </div>
          {confirmPasswordProps.error && (
            <p className="text-xs text-red-500">{confirmPasswordProps.error}</p>
          )}
          {!confirmPasswordProps.error && confirmPasswordError && (
            <p className="text-xs text-red-500">{confirmPasswordError}</p>
          )}
        </div>
      </div>

      <div className="flex items-baseline justify-center mt-5 gap-2">
        <input
          type="checkbox"
          id="check"
          checked={accountAccess}
          onChange={(event) => setAccountAccess(event.target.checked)}
        />
        <label htmlFor="check" className="text-sm">
          É necessário que todos os dispositivos acessem sua conta com a nova
          senha?
        </label>
      </div>

      <div className='w-full flex justify-center'>
        <button
          type="submit"
          className={`w-[154px] h-[48px] flex self-center font-medium items-center justify-center rounded-[16px] mt-16 ${isButtonDisabled
            ? 'bg-transparent border-2 border-[#B2B2B2] text-[#B2B2B2]'
            : 'bg-custom-purple text-white'
            }`}
          disabled={isButtonDisabled}
        >
          Redefinir senha
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
